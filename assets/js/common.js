$(document).ready(function(){
    $.getJSON("assets/json/prototypes.json", function(data){
        console.log(data); // Prints: Harry
    }).fail(function(){
        console.log("An error has occurred.");
    });
});


let suggested_array = [];
var yes = '&#9989;';
var no = '&#10060;';
var empt_prot = document.getElementById("protDIV_EMPTY");
empt_prot.style.display = "none";

function show_protDIV() {
    var prot = document.getElementById("protDIV");
    prot.style.display = "block";
    var empt_prot = document.getElementById("protDIV_EMPTY");
    empt_prot.style.display = "none";
  }
  
// Prototypes.js
function filterSelection(c) {

if (c == "submit") {
  var a_t_options = document.getElementById('acceptance_type').selectedOptions;
  var a_t = Array.from(a_t_options).map(({ value }) => value);
  var a_v_options = document.getElementById('added_value').selectedOptions;
  var a_v = Array.from(a_v_options).map(({ value }) => value);
  var mst_options = document.getElementById('market_service_type').selectedOptions;
  var mst = Array.from(mst_options).map(({ value }) => value);
  var ts_options = document.getElementById('team_skills').selectedOptions;
  var ts = Array.from(ts_options).map(({ value }) => value);
  var bas_options = document.getElementById('basics').selectedOptions;
  var bas = Array.from(bas_options).map(({ value }) => value);
  var cluster_group_options = document.getElementById('Cluster').selectedOptions;
  var cluster_groups = Array.from(cluster_group_options).map(({ value }) => value);
  if (cluster_groups.length == 0){
    cluster_groups = ['Virtuelle_nicht_funktionale_Gestalt', 'Physische_nicht_funktionale_Gestalt', 'Konzeptmodelle', 'Vertriebs-Simulation', 'Fiktionale,erlebbare-Marktleistungs-geschichten', 'FunktionaleMarkleistungs-repräsentationen']
  }
  var arr_values = [].concat(a_t , a_v , mst , ts , bas, cluster_groups); 
  var filters = ["Problem", "Mehrwehrt", "Gesamtlösung", "Produktmerkmale", "Produkteigenschaften", "Preis", "Usability", "Erlösmechanik",  "technMachbarkeit", "Leistungserbringung", "hardware", "software", "human", "sachleistung", "pss", "Dienstleistung", "design", "ux", "it", "et", "mb", "BusinessAnalysis", "marketing", "basic_no", "int_sol", "own_mark_perf", "ext_sol"];
  var non_filters = ["Rel_Kosten", "time", "vis_fid", "aud_fid", "hap_fid", "Funktionstiefe", "Funktionsumfang", "Eingabeverhalten", "Ausgabeverhalten"];
  console.log("cluster_groups",cluster_groups);
  for (i = 0; i < prot_arr.length; i++) {
    score = 0;
    reward = 10;
    penalty = -10000;
    if (! arr_values.includes(prot_arr[i]["Cluster"])) // filter cluster group
    {
      score = score + penalty;
    }
    for (k = 0; k < filters.length; k++) {
      if(prot_arr[i][filters[k]] == no && arr_values.includes(filters[k])){
        score = score + penalty;
      }
      else{
        score = score + reward;
      }
    }

    for (k = 0; k < non_filters.length; k++) {
      if(document.querySelector(`input[name = ${non_filters[k]}]:checked`) && Array.isArray(prot_arr[i][non_filters[k]]) == false){
        if(prot_arr[i][non_filters[k]] == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value){
          score = score + reward; // full reward
        }
        else if((prot_arr[i][non_filters[k]] - 1 == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value) || (prot_arr[i][non_filters[k]] + 1 == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value)){
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
          if(prot_arr[i][non_filters[k]][l] == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value){
            score = score + reward;
          }
        }
      }

    }

    prot_arr[i].score = score;
  }
}

sorted_array = prot_arr.sort(function (a, b) {
  return b.score - a.score;
});

suggested_array = [];
for (i = 0; i < sorted_array.length; i++) {
  if (sorted_array[i].score > 0){
    suggested_array.push(sorted_array[i]);
  }
}
console.log("suggested_array",suggested_array);
console.log("Filters selected",arr_values);

var textMess = "Die vorgeschlagenen Prototypen sind:";
var node= document.getElementById("container_id");
node.querySelectorAll('*').forEach(n => n.remove());
if (suggested_array.length == 0){
  textMess = "Für die von Ihnen ausgewählten Optionen wurden keine Ergebnisse gefunden! Bitte wählen Sie eingeschränkte Optionen aus und versuchen Sie es erneut.";
}
else{
  for (i = 0; i < suggested_array.length; i++) {
    let article = document.createElement("article");
    article.class = "style3";
    article.style.background = "#7bd0c1";
    article.style.float= "left";
    article.style.width = "300px";
    article.style.height = "300px";
    article.style.margin= "2px";

    let a = document.createElement("a");
    let h2 = document.createElement("h2");
    h2.innerHTML = `${suggested_array[i].name}`;
    h2.id = "protpopupBtn";
    a.appendChild(h2);
    article.appendChild(a);
    article.cursor = "pointer";
    article.onclick = function() {
      let prot = document.getElementById("protDIV");
      prot.style.display = "none";
      let empt_prot = document.getElementById("protDIV_EMPTY");
      empt_prot.style.display = "block";
    }

    //div.innerHTML = `<button style="text-align:center">${suggested_array[i].name}</button>`;
    document.getElementById("container_id").appendChild(article);
  }
}
document.getElementById('Proto_message').innerHTML  = textMess;
var elmnt = document.getElementById("cluster-group-div");
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
  proto_selections = ["acceptance_type", "added_value", "market_service_type", "team_skills", "basics", "Cluster"];
  proto_checked = ["Rel_Kosten", "time", "vis_fid", "aud_fid", "hap_fid", "Funktionstiefe", "Funktionsumfang", "Eingabeverhalten", "Ausgabeverhalten"];
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
}

