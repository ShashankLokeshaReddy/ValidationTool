$(document).ready(function(){
    $.getJSON("assets/json/methods.json", function(data){
        meth_arr = data; 
    }).fail(function(){
        console.log("An error has occurred.");
    });
});

let suggested_meth_array = [];
var yes = '&#9989;';
var no = '&#10060;';
var empt_meth = document.getElementById("methDIV_EMPTY");
empt_meth.style.display = "none";

function show_methDIV() {
    var meth = document.getElementById("methDIV");
    meth.style.display = "block";
    var empt_meth = document.getElementById("methDIV_EMPTY");
    empt_meth.style.display = "none";
  }
  
function show_all_methods(){
  clearallmethods();
  filterSelection_meth("submit");
}

function filterSelection_meth(c) {

if (c == "submit") {
  var a_t_m_options = [];
  $("input:checkbox[name=Acc-M]:checked").each(function(){
    a_t_m_options.push($(this).val());
  });
  var a_t_m = Array.from(a_t_m_options).map(({ value }) => value);
  var Datentyp_Meth_options = document.getElementById('Datentyp_Meth').selectedOptions;
  var Datentyp_Meth = Array.from(a_v_options).map(({ value }) => value);
  var Umgebung_options = document.getElementById('Umgebung').selectedOptions;
  var Umgebung = Array.from(mst_options).map(({ value }) => value);
  var Datenquelle_options = document.getElementById('Datenquelle').selectedOptions;
  var Datenquelle = Array.from(ts_options).map(({ value }) => value);
  var Befragungsform_options = document.getElementById('Befragungsform').selectedOptions;
  var Befragungsform = Array.from(bas_options).map(({ value }) => value);
  var Kundenintegration_options = document.getElementById('Kundenintegration').selectedOptions;
  var Kundenintegration = Array.from(bas_options).map(({ value }) => value);
  var Entwicklerintegration = document.getElementById('Entwicklerintegration').selectedOptions;
  var Entwicklerintegration = Array.from(bas_options).map(({ value }) => value);
  var Zielmarkt = document.getElementById('Zielmarkt').selectedOptions;
  var Zielmarkt = Array.from(bas_options).map(({ value }) => value);
  var Detaillierungsgrad = document.getElementById('Detaillierungsgrad').selectedOptions;
  var Detaillierungsgrad = Array.from(bas_options).map(({ value }) => value);
  var Informationssuche = document.getElementById('Informationssuche').selectedOptions;
  var Informationssuche = Array.from(bas_options).map(({ value }) => value);

  var Cluster_meth_group_options = document.getElementById('Cluster_meth').selectedOptions;
  var Cluster_meth_groups = Array.from(Cluster_meth_group_options).map(({ value }) => value);
  if (Cluster_meth_groups.length == 0){
    Cluster_meth_groups = ['Beobachtung', 'Befragung', 'Experiment', 'Verhaltensdaten']
  }
  var meth_arr_values = [].concat(a_t_m , Datentyp_Meth , Umgebung, Datenquelle , Befragungsform , Kundenintegration, Entwicklerintegration, Zielmarkt, Detaillierungsgrad, Informationssuche, Cluster_meth_groups); 
  var filters = ["Problem", "Mehrwehrt", "Gesamtlösung", "Produktmerkmale", "Produkteigenschaften", "Preis", "Usability", "Erlösmechanik",  "technMachbarkeit", "Leistungserbringung", "hardware", "software", "human", "sachleistung", "pss", "Dienstleistung", "design", "ux", "it", "et", "mb", "BusinessAnalysis", "marketing", "basic_no", "int_sol", "own_mark_perf", "ext_sol"];
  var non_filters = ["Rel_Kosten", "time", "vis_fid", "aud_fid", "hap_fid", "Funktionstiefe", "Funktionsumfang", "Eingabeverhalten", "Ausgabeverhalten"];
  console.log("Cluster_prot_groups",Cluster_prot_groups);
  for (i = 0; i < meth_arr.length; i++) {
    score = 0;
    reward = 10;
    penalty = -10000;
    if (! meth_arr_values.includes(meth_arr[i]["Cluster_prot"])) // filter Cluster_prot group
    {
      score = score + penalty;
    }
    for (k = 0; k < filters.length; k++) {
      if(meth_arr[i][filters[k]] == no && meth_arr_values.includes(filters[k])){
        score = score + penalty;
      }
      else{
        score = score + reward;
      }
    }

    for (k = 0; k < non_filters.length; k++) {
      if(document.querySelector(`input[name = ${non_filters[k]}]:checked`) && Array.isArray(meth_arr[i][non_filters[k]]) == false){
        if(meth_arr[i][non_filters[k]] == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value){
          score = score + reward; // full reward
        }
        else if((meth_arr[i][non_filters[k]] - 1 == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value) || (meth_arr[i][non_filters[k]] + 1 == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value)){
          score = score + (reward / 2); // half reward
        }
        else{
          score = score + penalty; // penalty
        }
      }
      else if(! document.querySelector(`input[name = ${non_filters[k]}]:checked`)){
        score = score + reward;
      }
      else{
        for (l = 0; l < document.querySelector(`input[name = ${non_filters[k]}]`).length; l++) {
          if(meth_arr[i][non_filters[k]][l] == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value){
            score = score + reward;
          }
        }
      }

    }

    meth_arr[i].score = score;
  }
}

sorted_meth_array = meth_arr.sort(function (a, b) {
  return b.score - a.score;
});

suggested_meth_array = [];
for (i = 0; i < sorted_meth_array.length; i++) {
  if (sorted_meth_array[i].score > 0){
    suggested_meth_array.push(sorted_meth_array[i]);
  }
}
console.log("suggested_meth_array",suggested_meth_array);
console.log("Filters selected",meth_arr_values);

var textMess = "Die vorgeschlagenen Prototypen sind:";
var node= document.getElementById("container_id");
node.querySelectorAll('*').forEach(n => n.remove());
if (suggested_meth_array.length == 0){
  textMess = "Für die von Ihnen ausgewählten Optionen wurden keine Ergebnisse gefunden! Bitte wählen Sie eingeschränkte Optionen aus und versuchen Sie es erneut.";
}
else{
  for (i = 0; i < suggested_meth_array.length; i++) {
    let article = document.createElement("article");
    article.id = "protpopupBtn";
    article.class = "style3";
    article.innerHTML = `
        <span class="image">
          <img src="images/pic03.jpg"/>
        </span>
        <a>
          <h2>${suggested_meth_array[i].name}</h2>
          <div class="content">
							<p>${suggested_meth_array[i].name}</p>
					</div>
        </a>`;

    article.onclick = function() {
      let prot = document.getElementById("protDIV");
      prot.style.display = "none";
      let empt_meth = document.getElementById("protDIV_EMPTY");
      empt_meth.style.display = "block";
    }

    //div.innerHTML = `<button style="text-align:center">${suggested_meth_array[i].name}</button>`;
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
function clearallmethods(){
  document.getElementById('Proto_message').innerHTML  = "";
  var node= document.getElementById("container_id");
  node.querySelectorAll('*').forEach(n => n.remove());
  proto_selections = ["added_value_prot", "market_service_type_prot", "team_skills_prot", "basics_prot", "Cluster_prot"];
  proto_checked = ["Rel_Kosten", "time", "vis_fid", "aud_fid", "hap_fid", "Funktionstiefe", "Funktionsumfang", "Eingabeverhalten", "Ausgabeverhalten"];
  checked_boxes = ["Acc-M"];
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

