$(document).ready(function(){
  $.getJSON("assets/json/settings.json", function(data){
    settings_prot = [data[0]["Budget_Prot"],data[0]["Zeit_Prot"],data[0]["VisFid_Prot"],data[0]["AudFid_Prot"],data[0]["HapFid_Prot"],data[0]["Funktionstiefe"],data[0]["Funktionsumfang"],data[0]["Eingabeverhalten"],data[0]["Ausgabeverhalten"]]; 
  }).fail(function(){
      console.log("An error has occurred while fetching prototype settings.");
  });
});

$(document).ready(function(){
    $.getJSON("assets/json/prototypes.json", function(data){
        prot_arr = data; 
    }).fail(function(){
        console.log("An error has occurred while fetching prototypes.");
    });
});

let suggested_proto_array = [];
var empt_prot = document.getElementById("protDIV_EMPTY");
empt_prot.style.display = "none";
reward_nonfilters = 10;
reward_filters = 0;
penalty = -10000;

function show_protDIV() {
    var prot = document.getElementById("protDIV");
    prot.style.display = "block";
    var empt_prot = document.getElementById("protDIV_EMPTY");
    empt_prot.style.display = "none";
  }
  
function show_all(){
  clearallprotypes();
  filterSelection_proto("submit");
}

function filterSelection_proto(c) {

if (c == "submit") {
  var a_t_options = [];
  $("input:checkbox[name=Acc-P]:checked").each(function(){
    a_t_options.push($(this).val());
  });
  var a_t = a_t_options;
  var a_v_options = document.getElementById('added_value_prot').selectedOptions;
  var a_v = Array.from(a_v_options).map(({ value }) => value);
  var mst_options = document.getElementById('market_service_type_prot').selectedOptions;
  var mst = Array.from(mst_options).map(({ value }) => value);
  var ts_options = document.getElementById('team_skills_prot').selectedOptions;
  var ts = Array.from(ts_options).map(({ value }) => value);
  var bas_options = document.getElementById('basics_prot').selectedOptions;
  var bas = Array.from(bas_options).map(({ value }) => value);
  var Cluster_prot_group_options = document.getElementById('Cluster_prot').selectedOptions;
  var Cluster_prot_groups = Array.from(Cluster_prot_group_options).map(({ value }) => value);
  if (Cluster_prot_groups.length == 0){
    Cluster_prot_groups = ['Virtuelle_nicht_funktionale_Gestalt', 'Physische_nicht_funktionale_Gestalt', 'Konzeptmodelle', 'Vertriebs-Simulation', 'Fiktionale,erlebbare-Marktleistungs-geschichten', 'FunktionaleMarkleistungs-repräsentationen']
  }
  var prot_arr_values = [].concat(a_t , a_v , mst , ts , bas, Cluster_prot_groups); 
  var filters = ["Problem", "Mehrwehrt", "Gesamtlösung", "Produktmerkmale", "Produkteigenschaften", "Preis", "Usability", "Erlösmechanik",  "technMachbarkeit", "Leistungserbringung", "hardware", "software", "human", "sachleistung", "pss", "Dienstleistung", "design", "ux", "it", "et", "mb", "BusinessAnalysis", "marketing", "basic_no", "int_sol", "own_mark_perf", "ext_sol"];
  var non_filters = ["Rel_Kosten", "time", "vis_fid", "aud_fid", "hap_fid", "Funktionstiefe", "Funktionsumfang", "Eingabeverhalten", "Ausgabeverhalten"];
  console.log("Cluster_prot_groups",Cluster_prot_groups);
  for (i = 0; i < prot_arr.length; i++) {
    score = 0;
    if (! prot_arr_values.includes(prot_arr[i]["Cluster_prot"])) // filter Cluster_prot group
    {
      score = score + penalty;
    }
    for (k = 0; k < filters.length; k++) {
      if(prot_arr[i][filters[k]] == "no" && prot_arr_values.includes(filters[k])){
        score = score + penalty;
      }
      else{
        score = score + reward_filters;
      }
    }

    for (k = 0; k < non_filters.length; k++) {
      if(document.querySelector(`input[name = ${non_filters[k]}]:checked`) && Array.isArray(prot_arr[i][non_filters[k]]) == false){
        if(prot_arr[i][non_filters[k]] == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value){
          score = score + (reward_nonfilters*settings_prot[k]); // full reward
        }
        else if((prot_arr[i][non_filters[k]] - 1 == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value) || (prot_arr[i][non_filters[k]] + 1 == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value)){
          score = score + (reward_nonfilters*settings_prot[k] / 2); // half reward
        }
        else{
          score = score + penalty; // penalty
        }
      }
      else if(! document.querySelector(`input[name = ${non_filters[k]}]:checked`)){
        score = score + (reward_nonfilters*settings_prot[k]);
      }
      else{
        for (l = 0; l < document.querySelector(`input[name = ${non_filters[k]}]`).length; l++) {
          if(prot_arr[i][non_filters[k]][l] == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value){
            score = score + (reward_nonfilters*settings_prot[k]);
          }
        }
      }

    }

    prot_arr[i].score = score;
  }
}

sorted_prot_array = prot_arr.sort(function (a, b) {
  return b.score - a.score;
});

suggested_proto_array = [];
for (i = 0; i < sorted_prot_array.length; i++) {
  if (sorted_prot_array[i].score > 0){
    suggested_proto_array.push(sorted_prot_array[i]);
  }
}
console.log("suggested_proto_array",suggested_proto_array);
console.log("Filters selected",prot_arr_values);

var textMess = "Die vorgeschlagenen Prototypen sind:";
var node= document.getElementById("container_id");
node.querySelectorAll('*').forEach(n => n.remove());
if (suggested_proto_array.length == 0){
  textMess = "Für die von Ihnen ausgewählten Optionen wurden keine Ergebnisse gefunden! Bitte wählen Sie eingeschränkte Optionen aus und versuchen Sie es erneut.";
}
else{
  for (i = 0; i < suggested_proto_array.length; i++) {
    let article = document.createElement("article");
    article.id = "protpopupBtn";
    article.class = "style3";
    article.innerHTML = `
        <span class="image">
          <img src="images/pic03.jpg"/>
        </span>
        <a>
          <h2>${suggested_proto_array[i].name}</h2>
          <div class="content">
							<p>${suggested_proto_array[i].name}</p>
					</div>
        </a>`;

    article.onclick = function() {
      let prot = document.getElementById("protDIV");
      prot.style.display = "none";
      let empt_prot = document.getElementById("protDIV_EMPTY");
      empt_prot.style.display = "block";
    }

    document.getElementById("container_id").appendChild(article);
  }
}
document.getElementById('Proto_message').innerHTML  = textMess;
var elmnt = document.getElementById("Proto_message");
elmnt.scrollIntoView();
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
});
}

//clear all prototype filters
function clearallprotypes(){
  document.getElementById('Proto_message').innerHTML  = "";
  var node= document.getElementById("container_id");
  node.querySelectorAll('*').forEach(n => n.remove());
  proto_selections = ["added_value_prot", "market_service_type_prot", "team_skills_prot", "basics_prot", "Cluster_prot"];
  proto_checked = ["Rel_Kosten", "time", "vis_fid", "aud_fid", "hap_fid", "Funktionstiefe", "Funktionsumfang", "Eingabeverhalten", "Ausgabeverhalten"];
  checked_boxes = ["Acc-P"];
  for (var a = 0; a < proto_selections.length; a++) 
  {
  var elements = document.getElementById(proto_selections[a]).options;
    for(var i = 0; i < elements.length; i++){
      if(elements[i].selected)
	    elements[i].selected = false;
    }
  }

  for (var a = 0; a < proto_checked.length; a++) 
  {
    if(document.querySelector(`input[name = ${proto_checked[a]}]:checked`)){
      var radio = document.querySelector(`input[name = ${proto_checked[a]}]:checked`);
      radio.checked = false;
    }
  }

  for (var a = 0; a < checked_boxes.length; a++) 
  {
    while(document.querySelector(`input[name = ${checked_boxes[a]}]:checked`)){
      var checkbox = document.querySelector(`input[name = ${checked_boxes[a]}]:checked`);
      checkbox.checked = false;
    }
  }

}

