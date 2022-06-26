
filepath = "assets/json/settings.json";
let prot_max = 100;
let meth_max = 100;
let message = document.getElementById('Setting_message');

let Budget_Prot = document.getElementById("Budget_Prot");
let Zeit_Prot = document.getElementById("Zeit_Prot");
let VisFid_Prot = document.getElementById("VisFid_Prot");
let AudFid_Prot = document.getElementById("AudFid_Prot");
let HapFid_Prot = document.getElementById("HapFid_Prot");
let Funktionstiefe = document.getElementById("Funktionstiefe");
let Funktionsumfang = document.getElementById("Funktionsumfang");
let Eingabeverhalten = document.getElementById("Eingabeverhalten");
let Ausgabeverhalten = document.getElementById("Ausgabeverhalten");
var output_Budget_Prot = document.getElementById("demo_Budget_Prot");
var output_Zeit_Prot = document.getElementById("demo_Zeit_Prot");
var output_VisFid_Prot = document.getElementById("demo_VisFid_Prot");
var output_AudFid_Prot = document.getElementById("demo_AudFid_Prot");
var output_HapFid_Prot = document.getElementById("demo_HapFid_Prot");
var output_Funktionstiefe = document.getElementById("demo_Funktionstiefe");
var output_Funktionsumfang = document.getElementById("demo_Funktionsumfang");
var output_Eingabeverhalten = document.getElementById("demo_Eingabeverhalten");
var output_Ausgabeverhalten = document.getElementById("demo_Ausgabeverhalten");

let Cost_Meth = document.getElementById("Cost_Meth");
let Vorbereitungszeit = document.getElementById("Vorbereitungszeit");
let Ausführungszeit = document.getElementById("Ausführungszeit");
let Personananzahl = document.getElementById("Personananzahl");
let Evidenz = document.getElementById("Evidenz");
var output_Cost_Meth = document.getElementById("demo_Cost_Meth");
var output_Vorbereitungszeit = document.getElementById("demo_Vorbereitungszeit");
var output_Ausführungszeit = document.getElementById("demo_Ausführungszeit");
var output_Personananzahl = document.getElementById("demo_Personananzahl");
var output_Evidenz = document.getElementById("demo_Evidenz");

function set_slider_values(data){
  Budget_Prot.value = data[0]["Budget_Prot"];
  output_Budget_Prot.innerHTML = Budget_Prot.value;
  Zeit_Prot.value = data[0]["Zeit_Prot"];
  output_Zeit_Prot.innerHTML = Zeit_Prot.value;
  VisFid_Prot.value = data[0]["VisFid_Prot"];
  output_VisFid_Prot.innerHTML = VisFid_Prot.value;
  AudFid_Prot.value = data[0]["AudFid_Prot"];
  output_AudFid_Prot.innerHTML = AudFid_Prot.value;
  HapFid_Prot.value = data[0]["HapFid_Prot"];
  output_HapFid_Prot.innerHTML = HapFid_Prot.value;
  Funktionstiefe.value = data[0]["Funktionstiefe"];
  output_Funktionstiefe.innerHTML = Funktionstiefe.value;
  Funktionsumfang.value = data[0]["Funktionsumfang"];
  output_Funktionsumfang.innerHTML = Funktionsumfang.value;
  Eingabeverhalten.value = data[0]["Eingabeverhalten"];
  output_Eingabeverhalten.innerHTML = Eingabeverhalten.value;
  Ausgabeverhalten.value = data[0]["Ausgabeverhalten"];
  output_Ausgabeverhalten.innerHTML = Ausgabeverhalten.value;

  Cost_Meth.value = data[1]["Cost_Meth"];
  output_Cost_Meth.innerHTML = Cost_Meth.value;
  Vorbereitungszeit.value = data[1]["Vorbereitungszeit"];
  output_Vorbereitungszeit.innerHTML = Vorbereitungszeit.value;
  Ausführungszeit.value = data[1]["Ausführungszeit"];
  output_Ausführungszeit.innerHTML = Ausführungszeit.value;
  Personananzahl.value = data[1]["Personananzahl"];
  output_Personananzahl.innerHTML = Personananzahl.value;
  Evidenz.value = data[1]["Evidenz"];
  output_Evidenz.innerHTML = Evidenz.value;
}

$(document).ready(function(){
  $.getJSON(filepath, function(data){
      // console.log("data",data);
      set_slider_values(data);
  }).fail(function(){
      console.log("An error has occurred while reading setting values.");
  });
});

function change_color(labels, color) {
  message.innerHTML = "";
  var elements = document.getElementsByClassName(labels); // get all elements
  for(var i = 0; i < elements.length; i++){
    elements[i].style.color = color;
  }
}

Budget_Prot.oninput = function() {
  
  output_Budget_Prot.innerHTML = this.value;
  if (output_Budget_Prot.innerHTML > (prot_max - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "red");
  }
  else if(output_Budget_Prot.innerHTML == (prot_max - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "#0be57d");
  }
  else{
    change_color("prot_labels", "black");
  }
}

Zeit_Prot.oninput = function() {
  
  output_Zeit_Prot.innerHTML = this.value;
  if (output_Zeit_Prot.innerHTML > (prot_max - output_Budget_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "red");
  }
  else if (output_Zeit_Prot.innerHTML == (prot_max - output_Budget_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "#0be57d");
  }
  else{
    change_color("prot_labels", "black");
  }
}


VisFid_Prot.oninput = function() {
  
  output_VisFid_Prot.innerHTML = this.value;
  if (output_VisFid_Prot.innerHTML > (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "red");
  }
  else if (output_VisFid_Prot.innerHTML == (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "#0be57d");
  }
  else{
    change_color("prot_labels", "black");
  }
}

AudFid_Prot.oninput = function() {
  
  output_AudFid_Prot.innerHTML = this.value;
  if (output_AudFid_Prot.innerHTML > (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "red");
  }
  else if (output_AudFid_Prot.innerHTML == (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "#0be57d");
  }
  else{
    change_color("prot_labels", "black");
  }
}

HapFid_Prot.oninput = function() {
  
  output_HapFid_Prot.innerHTML = this.value;
  if (output_HapFid_Prot.innerHTML > (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "red");
  }
  else if (output_HapFid_Prot.innerHTML == (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "#0be57d");
  }
  else{
    change_color("prot_labels", "black");
  }
}

Funktionstiefe.oninput = function() {
  
  output_Funktionstiefe.innerHTML = this.value;
  if (output_Funktionstiefe.innerHTML > (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "red");
  }
  else if (output_Funktionstiefe.innerHTML == (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "#0be57d");
  }
  else{
    change_color("prot_labels", "black");
  }
}

Funktionsumfang.oninput = function() {
  
  output_Funktionsumfang.innerHTML = this.value;
  if (output_Funktionsumfang.innerHTML > (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "red");
  }
  else if (output_Funktionsumfang.innerHTML == (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "#0be57d");
  }
  else{
    change_color("prot_labels", "black");
  }
}

Eingabeverhalten.oninput = function() {
  
  output_Eingabeverhalten.innerHTML = this.value;
  if (output_Eingabeverhalten.innerHTML > (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "red");
  }
  else if (output_Eingabeverhalten.innerHTML == (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Ausgabeverhalten.innerHTML)){
    change_color("prot_labels", "#0be57d");
  }
  else{
    change_color("prot_labels", "black");
  }
}

Ausgabeverhalten.oninput = function() {
  
  output_Ausgabeverhalten.innerHTML = this.value;
  if (output_Ausgabeverhalten.innerHTML > (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML)){
    change_color("prot_labels", "red");
  }
  else if (output_Ausgabeverhalten.innerHTML == (prot_max - output_Budget_Prot.innerHTML - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML)){
    change_color("prot_labels", "#0be57d");
  }
  else{
    change_color("prot_labels", "black");
  }
}

Cost_Meth.oninput = function() {
  
  output_Cost_Meth.innerHTML = this.value;
  if (output_Cost_Meth.innerHTML > (meth_max - output_Vorbereitungszeit.innerHTML - output_Ausführungszeit.innerHTML - output_Personananzahl.innerHTML - output_Evidenz.innerHTML)){
    change_color("meth_labels", "red");
  }
  else if (output_Cost_Meth.innerHTML == (meth_max - output_Vorbereitungszeit.innerHTML - output_Ausführungszeit.innerHTML - output_Personananzahl.innerHTML - output_Evidenz.innerHTML)){
    change_color("meth_labels", "#0be57d");
  }
  else{
    change_color("meth_labels", "black");
  }
}

Vorbereitungszeit.oninput = function() {
  
  output_Vorbereitungszeit.innerHTML = this.value;
  if (output_Vorbereitungszeit.innerHTML > (meth_max - output_Cost_Meth.innerHTML - output_Ausführungszeit.innerHTML - output_Personananzahl.innerHTML - output_Evidenz.innerHTML)){
    change_color("meth_labels", "red");
  }
  else if (output_Vorbereitungszeit.innerHTML == (meth_max - output_Cost_Meth.innerHTML - output_Ausführungszeit.innerHTML - output_Personananzahl.innerHTML - output_Evidenz.innerHTML)){
    change_color("meth_labels", "#0be57d");
  }
  else{
    change_color("meth_labels", "black");
  }
}

Ausführungszeit.oninput = function() {
  
  output_Ausführungszeit.innerHTML = this.value;
  if (output_Ausführungszeit.innerHTML > (meth_max - output_Cost_Meth.innerHTML - output_Vorbereitungszeit.innerHTML - output_Personananzahl.innerHTML - output_Evidenz.innerHTML)){
    change_color("meth_labels", "red");
  }
  else if (output_Ausführungszeit.innerHTML == (meth_max - output_Cost_Meth.innerHTML - output_Vorbereitungszeit.innerHTML - output_Personananzahl.innerHTML - output_Evidenz.innerHTML)){
    change_color("meth_labels", "#0be57d");
  }
  else{
    change_color("meth_labels", "black");
  }
}

Personananzahl.oninput = function() {
  
  output_Personananzahl.innerHTML = this.value;
  if (output_Personananzahl.innerHTML > (meth_max - output_Cost_Meth.innerHTML - output_Vorbereitungszeit.innerHTML - output_Ausführungszeit.innerHTML - output_Evidenz.innerHTML)){
    change_color("meth_labels", "red");
  }
  else if (output_Personananzahl.innerHTML == (meth_max - output_Cost_Meth.innerHTML - output_Vorbereitungszeit.innerHTML - output_Ausführungszeit.innerHTML - output_Evidenz.innerHTML)){
    change_color("meth_labels", "#0be57d");
  }
  else{
    change_color("meth_labels", "black");
  }
}

Evidenz.oninput = function() {
  
  output_Evidenz.innerHTML = this.value;
  if (output_Evidenz.innerHTML > (meth_max - output_Cost_Meth.innerHTML - output_Vorbereitungszeit.innerHTML - output_Ausführungszeit.innerHTML - output_Personananzahl.innerHTML)){
    change_color("meth_labels", "red");
  }
  else if (output_Evidenz.innerHTML == (meth_max - output_Cost_Meth.innerHTML - output_Vorbereitungszeit.innerHTML - output_Ausführungszeit.innerHTML - output_Personananzahl.innerHTML)){
    change_color("meth_labels", "#0be57d");
  }
  else{
    change_color("meth_labels", "black");
  }
}

function save_settings(parameter){
  console.log("save settihgs");
  var data = data = [{"Budget_Prot":Budget_Prot.value, "Zeit_Prot":Zeit_Prot.value, "VisFid_Prot":VisFid_Prot.value, "AudFid_Prot":AudFid_Prot.value, "HapFid_Prot":HapFid_Prot.value, "Funktionstiefe":Funktionstiefe.value,"Funktionsumfang":Funktionsumfang.value,"Eingabeverhalten":Eingabeverhalten.value,"Ausgabeverhalten":Ausgabeverhalten.value},
    {"Cost_Meth":Cost_Meth.value,"Vorbereitungszeit":Vorbereitungszeit.value,"Ausführungszeit":Ausführungszeit.value,"Personananzahl":Personananzahl.value,"Evidenz":Evidenz.value}];

  if(parameter == 2)
  { 
   data = [{"Budget_Prot":"15","Zeit_Prot":"15","VisFid_Prot":"10","AudFid_Prot":"10","HapFid_Prot":"10","Funktionstiefe":"10","Funktionsumfang":"10","Eingabeverhalten":"10","Ausgabeverhalten":"10"}, {"Cost_Meth":"25","Vorbereitungszeit":"17","Ausführungszeit":"17","Personananzahl":"16","Evidenz":"25"}];
   set_slider_values(data);
  }
  var sum_meth = parseInt(data[1]["Cost_Meth"]) + parseInt(data[1]["Vorbereitungszeit"]) + parseInt(data[1]["Ausführungszeit"]) + parseInt(data[1]["Personananzahl"]) + parseInt(data[1]["Evidenz"]);
  var sum_prot = parseInt(data[0]["Budget_Prot"]) + parseInt(data[0]["Zeit_Prot"]) + parseInt(data[0]["VisFid_Prot"]) + parseInt(data[0]["AudFid_Prot"]) + parseInt(data[0]["HapFid_Prot"]) + parseInt(data[0]["Funktionstiefe"]) + parseInt(data[0]["Funktionsumfang"]) + parseInt(data[0]["Eingabeverhalten"]) + parseInt(data[0]["Ausgabeverhalten"]);
  console.log("sum_meth",sum_meth,sum_prot);
  if (sum_meth==meth_max && sum_prot==prot_max){
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('/api',options).then(response =>{
      console.log(response)
    });
    change_color("prot_labels", "black");
    change_color("meth_labels", "black");
    message.innerHTML  = "Einstellwerte aktualisiert";
  }
  else{
    message.innerHTML  = "Stellen Sie sicher, dass die Summe aller Gewichte genau gleich 100 % ist";
  }
}