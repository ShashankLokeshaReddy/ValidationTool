let search_suggestions = [];

$(document).ready(function(){
  $.getJSON("assets/json/settings.json", function(data){
    settings_meth = [data[1]["Cost_Meth"],data[1]["Vorbereitungszeit"],data[1]["Ausführungszeit"],data[1]["Personananzahl"],data[1]["Evidenz"]]; 
  }).fail(function(){
      console.log("An error has occurred while fetching method settings.");
  });
});

$(document).ready(function(){
    $.getJSON("assets/json/methods.json", function(data){
        meth_arr = data; 
        for (i = 0; i < meth_arr.length; i++) {
          search_suggestions.push(meth_arr[i].id);
          search_suggestions.push(meth_arr[i].name);
        }
    }).fail(function(){
        console.log("An error has occurred.");
    });
});

let suggested_meth_array = [];
var empt_meth = document.getElementById("methDIV_EMPTY");
empt_meth.style.display = "none";
reward_meth_nonfilters = 1;
reward_meth_filters = 0;
penalty_meth = -10000;

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
  var a_t_m = a_t_m_options;
  var Datentyp_Meth_options = document.getElementById('Datentyp_Meth').selectedOptions;
  var Datentyp_Meth = Array.from(Datentyp_Meth_options).map(({ value }) => value);
  var Umgebung_options = document.getElementById('Umgebung').selectedOptions;
  var Umgebung = Array.from(Umgebung_options).map(({ value }) => value);
  var Datenquelle_options = document.getElementById('Datenquelle').selectedOptions;
  var Datenquelle = Array.from(Datenquelle_options).map(({ value }) => value);
  var Befragungsform_options = document.getElementById('Befragungsform').selectedOptions;
  var Befragungsform = Array.from(Befragungsform_options).map(({ value }) => value);
  var Kundenintegration_options = document.getElementById('Kundenintegration').selectedOptions;
  var Kundenintegration = Array.from(Kundenintegration_options).map(({ value }) => value);
  var Entwicklerintegration_options = document.getElementById('Entwicklerintegration').selectedOptions;
  var Entwicklerintegration = Array.from(Entwicklerintegration_options).map(({ value }) => value);
  var Zielmarkt_options = document.getElementById('Zielmarkt').selectedOptions;
  var Zielmarkt = Array.from(Zielmarkt_options).map(({ value }) => value);
  var Detaillierungsgrad_options = document.getElementById('Detaillierungsgrad').selectedOptions;
  var Detaillierungsgrad = Array.from(Detaillierungsgrad_options).map(({ value }) => value);
  var Informationssuche_options = document.getElementById('Informationssuche').selectedOptions;
  var Informationssuche = Array.from(Informationssuche_options).map(({ value }) => value);

  var Cluster_meth_group_options = document.getElementById('Cluster_meth').selectedOptions;
  var Cluster_meth_groups = Array.from(Cluster_meth_group_options).map(({ value }) => value);
  if (Cluster_meth_groups.length == 0){
    Cluster_meth_groups = ['Beobachtung', 'Befragung', 'Experiment', 'Verhaltensdaten']
  }
  var meth_arr_values = [].concat(a_t_m, Datentyp_Meth , Umgebung, Datenquelle , Befragungsform , Kundenintegration, Entwicklerintegration, Zielmarkt, Detaillierungsgrad, Informationssuche, Cluster_meth_groups); 
  var filters = ["G-N-M","G-U-M","G-B-M","G-K-M","G-M-M","E-N-M","E-U-M","E-B-M","E-K-M","E-M-M","Qualitativ","Quantitativ","RealField","TestField","Lab","Virtuell","Primär","Sekundär","Schriftlich","Persönlich","Telefonisch","Online","Datenbasiert","kundenDirekt","kundenIndirekt","EntwicklerDirekt","EntwicklerIndirekt","B2B","B2C","AllgemeineInformation","SpezifischeInformation","Informell","Strukturiert"];
  var non_filters = ["Rel_Kosten_Method","PreparationTime_Method","ExecutionTime_Method","Personananzahl","Evidenz"];
  console.log("Cluster_meth_groups",Cluster_meth_groups);
  for (i = 0; i < meth_arr.length; i++) {
    score = 0;
    if (! meth_arr_values.includes(meth_arr[i]["Cluster_meth"])) // filter only Cluster_meth group
    {
      score = score + penalty_meth;
    }
    // all filters array
    for (k = 0; k < filters.length; k++) {
      // console.log(i,filters[k],meth_arr[i][filters[k]],meth_arr_values.includes(filters[k]));
      if(meth_arr[i][filters[k]] == "no" && meth_arr_values.includes(filters[k])){
        score = score + penalty_meth;
      }
      else{
        score = score + reward_meth_filters;
      }
    }
    // all non filters array
    for (k = 0; k < non_filters.length; k++) {
      if(document.querySelector(`input[name = ${non_filters[k]}]:checked`) && Array.isArray(meth_arr[i][non_filters[k]]) == false){
        if(meth_arr[i][non_filters[k]] == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value){
          score = score + (reward_meth_nonfilters*(settings_meth[k]/100)); // full reward
        }
        else if((meth_arr[i][non_filters[k]] - 1 == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value) || (meth_arr[i][non_filters[k]] + 1 == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value)){
          score = score + (reward_meth_nonfilters*(settings_meth[k]/100) / 2); // half reward
        }
        else{
          score = score + penalty_meth; // penalty_meth
        }
      }
      else if(! document.querySelector(`input[name = ${non_filters[k]}]:checked`)){
        score = score + (reward_meth_nonfilters*(settings_meth[k]/100));
      }
      else{
        for (l = 0; l < document.querySelector(`input[name = ${non_filters[k]}]`).length; l++) {
          if(meth_arr[i][non_filters[k]][l] == document.querySelector(`input[name = ${non_filters[k]}]:checked`).value){
            score = score + (reward_meth_nonfilters*(settings_meth[k]/100));
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
  if (sorted_meth_array[i].score >= 0){
    suggested_meth_array.push(sorted_meth_array[i]);
  }
}
console.log("suggested_meth_array",suggested_meth_array);
console.log("Filters selected",meth_arr_values);

var textMess = "Die vorgeschlagenen Methoden sind:";
var node= document.getElementById("container_id_meth");
node.querySelectorAll('*').forEach(n => n.remove());
if (suggested_meth_array.length == 0){
  textMess = "Für die von Ihnen ausgewählten Optionen wurden keine Ergebnisse gefunden! Bitte wählen Sie eingeschränkte Optionen aus und versuchen Sie es erneut.";
}
else{
  for (i = 0; i < suggested_meth_array.length; i++) {
    let article = document.createElement("article");
    article.id = "methpopupBtn";
    article.class = "style2";
    article.innerHTML = `
        <span class="image">
          <img src="images/pic02.jpg"/>
        </span>
        <a>
          <h2>${suggested_meth_array[i].id}</h2>
          <div class="content">
							<p>${suggested_meth_array[i].name}</p>
					</div>
        </a>`;

    article.onclick = function() {
      for(var i = 0; i < meth_arr.length; i++){
        if (article.innerHTML.includes(meth_arr[i].id)){
          let meth_image = document.getElementById("meth_image");
          meth_image.src = "images/methods/"+meth_arr[i].id+".PNG";
          let meth = document.getElementById("methDIV");
          meth.style.display = "none";
          let empt_meth = document.getElementById("methDIV_EMPTY");
          empt_meth.style.display = "block";
        }
      }
    }

    document.getElementById("container_id_meth").appendChild(article);
  }
}
document.getElementById('Meth_message').innerHTML  = textMess;
var elmnt = document.getElementById("Meth_message");
elmnt.scrollIntoView();
inputBox.value = "";
// search_suggested_meth_array = [];
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer-meth");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
});
}

//clear all methotype filters
function clearallmethods(){
  document.getElementById('Meth_message').innerHTML  = "";
  var node= document.getElementById("container_id_meth");
  node.querySelectorAll('*').forEach(n => n.remove());
  meth_selections = ["Datentyp_Meth","Umgebung","Datenquelle","Befragungsform","Kundenintegration","Entwicklerintegration","Zielmarkt","Detaillierungsgrad","Informationssuche","Cluster_meth"];
  meth_checked = ["Rel_Kosten_Method","PreparationTime_Method","ExecutionTime_Method","Personananzahl","Evidenz"];
  checked_meth_boxes = ["Acc-M"];
  for (var a = 0; a < meth_selections.length; a++) 
  {
  var elements = document.getElementById(meth_selections[a]).options;
    for(var i = 0; i < elements.length; i++){
      if(elements[i].selected)
	    elements[i].selected = false;
    }
  }

  for (var a = 0; a < meth_checked.length; a++) 
  {
    if(document.querySelector(`input[name = ${meth_checked[a]}]:checked`)){
      var radio = document.querySelector(`input[name = ${meth_checked[a]}]:checked`);
      radio.checked = false;
    }
  }

  for (var a = 0; a < checked_meth_boxes.length; a++) 
  {
    while(document.querySelector(`input[name = ${checked_meth_boxes[a]}]:checked`)){
      var checkbox = document.querySelector(`input[name = ${checked_meth_boxes[a]}]:checked`);
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
let webLink;
let meth_search_list = [];
let search_suggested_meth_array = [];

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
      meth_search_list = allList;
      search_suggested_meth_array = [];
      for (var i = 0; i < allList.length; i++) {
          //adding onclick attribute in all li tag
          allList[i].setAttribute("onclick", "select(this)");
      }
      console.log("meth_search_list",meth_search_list);
      icon.onclick = ()=>{
        clearallmethods();
        for (var i = 0; i < meth_search_list.length; i++) {
          for(var j = 0; j < meth_arr.length; j++){
            if(meth_search_list[i].innerHTML == meth_arr[j].id || meth_search_list[i].innerHTML == meth_arr[j].name){
              if(!search_suggested_meth_array.includes(meth_arr[j])) {
                search_suggested_meth_array.push(meth_arr[j]);
              }
            }
          }
        } 
        searchWrapper.classList.remove("active");
        var textMess = "Die vorgeschlagenen Methoden sind:";
        var node= document.getElementById("container_id_meth");
        node.querySelectorAll('*').forEach(n => n.remove());

        if (search_suggested_meth_array.length == 0){
          textMess = "Für die von Ihnen ausgewählten Optionen wurden keine Ergebnisse gefunden! Bitte wählen Sie eingeschränkte Optionen aus und versuchen Sie es erneut.";
        }
        else{
          for (i = 0; i < search_suggested_meth_array.length; i++) {
            let article = document.createElement("article");
            article.id = "methpopupBtn";
            article.class = "style2";
            article.innerHTML = `
                <span class="image">
                  <img src="images/pic02.jpg"/>
                </span>
                <a>
                  <h2>${search_suggested_meth_array[i].id}</h2>
                  <div class="content">
                      <p>${search_suggested_meth_array[i].name}</p>
                  </div>
                </a>`;

            article.onclick = function() {
              for(var i = 0; i < meth_arr.length; i++){
                if (article.innerHTML.includes(meth_arr[i].id)){
                  let meth_image = document.getElementById("meth_image");
                  meth_image.src = "images/methods/"+meth_arr[i].id+".PNG";
                  let meth = document.getElementById("methDIV");
                  meth.style.display = "none";
                  let empt_meth = document.getElementById("methDIV_EMPTY");
                  empt_meth.style.display = "block";
                }
              }
            }

            document.getElementById("container_id_meth").appendChild(article);
          }
        }

        document.getElementById('Meth_message').innerHTML  = textMess;
        var elmnt = document.getElementById("Meth_message");
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
    meth_search_list = [element];
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