let search_suggestions = [];

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
        for (i = 0; i < prot_arr.length; i++) {
          search_suggestions.push(prot_arr[i].id);
          search_suggestions.push(prot_arr[i].name);
        }
    }).fail(function(){
        console.log("An error has occurred while fetching prototypes.");
    });
});

let suggested_proto_array = [];
var empt_prot = document.getElementById("protDIV_EMPTY");
empt_prot.style.display = "none";
reward_nonfilters = 1;
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
    Cluster_prot_groups = ['Virtuelle_nicht_funktionale_Gestalt', 'Physische_nicht_funktionale_Gestalt', 'Konzeptmodelle', 'Vertriebs-Simulation', 'Fiktionale,erlebbare-Marktleistungs-geschichten', 'FunktionaleMarkleistungs-repr??sentationen']
  }
  var prot_arr_values = [].concat(a_t , a_v , mst , ts , bas, Cluster_prot_groups); 
  var filters = ["G-N-P","G-U-P","G-B-P","G-K-P","G-M-P","E-N-P","E-U-P","E-B-P","E-K-P","E-M-P","Problem", "Mehrwehrt", "Gesamtl??sung", "Produktmerkmale", "Produkteigenschaften", "Preis", "Usability", "Erl??smechanik",  "technMachbarkeit", "Leistungserbringung", "hardware", "software", "human", "sachleistung", "pss", "Dienstleistung", "design", "ux", "it", "et", "mb", "BusinessAnalysis", "marketing", "basic_no", "int_sol", "own_mark_perf", "ext_sol"];
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
          score = score + (reward_nonfilters*(settings_prot[k]/100)); // full reward
        }
        else if((prot_arr[i][non_filters[k]] - 1 == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value) || (prot_arr[i][non_filters[k]] + 1 == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value)){
          score = score + (reward_nonfilters*(settings_prot[k]/100) / 2); // half reward
        }
        else{
          score = score + penalty; // penalty
        }
      }
      else if(! document.querySelector(`input[name = ${non_filters[k]}]:checked`)){
        score = score + (reward_nonfilters*(settings_prot[k]/100));
      }
      else{
        for (l = 0; l < document.querySelector(`input[name = ${non_filters[k]}]`).length; l++) {
          if(prot_arr[i][non_filters[k]][l] == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value){
            score = score + (reward_nonfilters*(settings_prot[k]/100));
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
  textMess = "F??r die von Ihnen ausgew??hlten Optionen wurden keine Ergebnisse gefunden! Bitte w??hlen Sie eingeschr??nkte Optionen aus und versuchen Sie es erneut.";
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
          <h2>${suggested_proto_array[i].id}</h2>
          <div class="content">
							<p>${suggested_proto_array[i].name}</p>
					</div>
        </a>`;

        article.onclick = function() {
          for(var i = 0; i < prot_arr.length; i++){
            if (article.innerHTML.includes(prot_arr[i].id)){
              let prot_image = document.getElementById("prot_image");
              prot_image.src = "images/prototypes/"+prot_arr[i].id+".PNG";
              let prot = document.getElementById("protDIV");
              prot.style.display = "none";
              let empt_prot = document.getElementById("protDIV_EMPTY");
              empt_prot.style.display = "block";
            }
          }
        }

    document.getElementById("container_id").appendChild(article);
  }
}
document.getElementById('Proto_message').innerHTML  = textMess;
var elmnt = document.getElementById("Proto_message");
elmnt.scrollIntoView();
inputBox.value = "";
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

// Search bar
// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let prot_search_list = [];
let search_suggested_prot_array = [];

function autosuggest(e){
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if(userData){
      emptyArray = search_suggestions.filter((data)=>{
          //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
          return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
      });
      emptyArray = emptyArray.map((data)=>{
          // passing return data inside li tag
          return data = `<li>${data}</li>`;
      });
      searchWrapper.classList.add("active"); //show autocomplete box
      showsearch_suggestions(emptyArray);
      let allList = suggBox.querySelectorAll("li");
      prot_search_list = allList;
      search_suggested_prot_array = [];
      for (var i = 0; i < allList.length; i++) {
          //adding onclick attribute in all li tag
          allList[i].setAttribute("onclick", "select(this)");
      }
      console.log("prot_search_list",prot_search_list);
      icon.onclick = ()=>{
        clearallprotypes();
        for (var i = 0; i < prot_search_list.length; i++) {
          for(var j = 0; j < prot_arr.length; j++){
            if(prot_search_list[i].innerHTML == prot_arr[j].id || prot_search_list[i].innerHTML == prot_arr[j].name){
              if(!search_suggested_prot_array.includes(prot_arr[j])) {
                search_suggested_prot_array.push(prot_arr[j]);
              }
            }
          }
        } 
        searchWrapper.classList.remove("active");
        var textMess = "Die vorgeschlagenen Prototypen sind:";
        var node= document.getElementById("container_id");
        node.querySelectorAll('*').forEach(n => n.remove());

        if (search_suggested_prot_array.length == 0){
          textMess = "F??r die von Ihnen ausgew??hlten Optionen wurden keine Ergebnisse gefunden! Bitte w??hlen Sie eingeschr??nkte Optionen aus und versuchen Sie es erneut.";
        }
        else{
          for (i = 0; i < search_suggested_prot_array.length; i++) {
            let article = document.createElement("article");
            article.id = "protpopupBtn";
            article.class = "style2";
            article.innerHTML = `
                <span class="image">
                  <img src="images/pic03.jpg"/>
                </span>
                <a>
                  <h2>${search_suggested_prot_array[i].id}</h2>
                  <div class="content">
                      <p>${search_suggested_prot_array[i].name}</p>
                  </div>
                </a>`;

            article.onclick = function() {
              for(var i = 0; i < prot_arr.length; i++){
                if (article.innerHTML.includes(prot_arr[i].id)){
                  let prot_image = document.getElementById("prot_image");
                  prot_image.src = "images/prototypes/"+prot_arr[i].id+".PNG";
                  let prot = document.getElementById("protDIV");
                  prot.style.display = "none";
                  let empt_prot = document.getElementById("protDIV_EMPTY");
                  empt_prot.style.display = "block";
                }
              }
            }

            document.getElementById("container_id").appendChild(article);
          }
        }

        document.getElementById('Proto_message').innerHTML  = textMess;
        var elmnt = document.getElementById("Proto_message");
        elmnt.scrollIntoView();
    }

  }else{
      searchWrapper.classList.remove("active"); //hide autocomplete box
  }
}
// if user press any key and release
inputBox.onkeyup = (e)=>{
  autosuggest(e);
}

inputBox.onmouseup = (e)=>{
  autosuggest(e);
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    searchWrapper.classList.remove("active");
    console.log("element",element);
    prot_search_list = [element];
}

function showsearch_suggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

document.addEventListener('click', function(event) {
    var isClickInsideElement = searchWrapper.contains(event.target);
    if (!isClickInsideElement) {
        //Do something click is outside specified element
        searchWrapper.classList.remove("active");
    }
});