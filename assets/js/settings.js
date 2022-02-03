const fs = require('fs');

filepath = "assets/json/settings.json";

let Budget_Prot = document.getElementById("Budget_Prot");
let Zeit_Prot = document.getElementById("Zeit_Prot");
let VisFid_Prot = document.getElementById("VisFid_Prot");
let AudFid_Prot = document.getElementById("AudFid_Prot");
let HapFid_Prot = document.getElementById("HapFid_Prot");
let Funktionstiefe = document.getElementById("Funktionstiefe");
let Funktionsumfang = document.getElementById("Funktionsumfang");
let Eingabeverhalten = document.getElementById("Eingabeverhalten");
let Ausgabeverhalten = document.getElementById("Ausgabeverhalten");

$(document).ready(function(){
  $.getJSON(filepath, function(data){
      console.log("data",data);
      Budget_Prot.value = data[0]["Budget_Prot"];
      Zeit_Prot.value = data[0]["Zeit_Prot"];
      VisFid_Prot.value = data[0]["VisFid_Prot"];
      AudFid_Prot.value = data[0]["AudFid_Prot"];
      HapFid_Prot.value = data[0]["HapFid_Prot"];
      Funktionstiefe.value = data[0]["Funktionstiefe"];
      Funktionsumfang.value = data[0]["Funktionsumfang"];
      Eingabeverhalten.value = data[0]["Eingabeverhalten"];
      Ausgabeverhalten.value = data[0]["Ausgabeverhalten"];
  }).fail(function(){
      console.log("An error has occurred.");
  });
});

var slider_Budget_Prot = document.getElementById("Budget_Prot");
var output_Budget_Prot = document.getElementById("demo_Budget_Prot");
output_Budget_Prot.innerHTML = slider_Budget_Prot.value;
slider_Budget_Prot.oninput = function() {
  output_Budget_Prot.innerHTML = this.value;
}

var slider_Zeit_Prot = document.getElementById("Zeit_Prot");
var output_Zeit_Prot = document.getElementById("demo_Zeit_Prot");
output_Zeit_Prot.innerHTML = slider_Zeit_Prot.value;
slider_Zeit_Prot.oninput = function() {
  output_Zeit_Prot.innerHTML = this.value;
}

var slider_VisFid_Prot = document.getElementById("VisFid_Prot");
var output_VisFid_Prot = document.getElementById("demo_VisFid_Prot");
output_VisFid_Prot.innerHTML = slider_VisFid_Prot.value;
slider_VisFid_Prot.oninput = function() {
  output_VisFid_Prot.innerHTML = this.value;
}

var slider_AudFid_Prot = document.getElementById("AudFid_Prot");
var output_AudFid_Prot = document.getElementById("demo_AudFid_Prot");
output_AudFid_Prot.innerHTML = slider_AudFid_Prot.value;
slider_AudFid_Prot.oninput = function() {
  output_AudFid_Prot.innerHTML = this.value;
}

var slider_HapFid_Prot = document.getElementById("HapFid_Prot");
var output_HapFid_Prot = document.getElementById("demo_HapFid_Prot");
output_HapFid_Prot.innerHTML = slider_HapFid_Prot.value;
slider_HapFid_Prot.oninput = function() {
  output_HapFid_Prot.innerHTML = this.value;
}

var slider_Funktionstiefe = document.getElementById("Funktionstiefe");
var output_Funktionstiefe = document.getElementById("demo_Funktionstiefe");
output_Funktionstiefe.innerHTML = slider_Funktionstiefe.value;
slider_Funktionstiefe.oninput = function() {
  output_Funktionstiefe.innerHTML = this.value;
}

var slider_Funktionsumfang = document.getElementById("Funktionsumfang");
var output_Funktionsumfang = document.getElementById("demo_Funktionsumfang");
output_Funktionsumfang.innerHTML = slider_Funktionsumfang.value;
slider_Funktionsumfang.oninput = function() {
  output_Funktionsumfang.innerHTML = this.value;
}

var slider_Eingabeverhalten = document.getElementById("Eingabeverhalten");
var output_Eingabeverhalten = document.getElementById("demo_Eingabeverhalten");
output_Eingabeverhalten.innerHTML = slider_Eingabeverhalten.value;
slider_Eingabeverhalten.oninput = function() {
  output_Eingabeverhalten.innerHTML = this.value;
}

var slider_Ausgabeverhalten = document.getElementById("Ausgabeverhalten");
var output_Ausgabeverhalten = document.getElementById("demo_Ausgabeverhalten");
output_Ausgabeverhalten.innerHTML = slider_Ausgabeverhalten.value;
slider_Ausgabeverhalten.oninput = function() {
  output_Ausgabeverhalten.innerHTML = this.value;
}

var slider_Budget_Prot = document.getElementById("Budget_Prot");
var output_Budget_Prot = document.getElementById("demo_Budget_Prot");
output_Budget_Prot.innerHTML = slider_Budget_Prot.value;
slider_Budget_Prot.oninput = function() {
  output_Budget_Prot.innerHTML = this.value;
}

function save_settings(){
  var data = [{"Budget_Prot":50, "Zeit_Prot":10, "VisFid_Prot":10, "AudFid_Prot":10, "HapFid_Prot":10, "Funktionstiefe":10,"Funktionsumfang":10,"Eingabeverhalten":10,"Ausgabeverhalten":10},
  {"Budget_Meth":25,"Prep_Time_Meth":18,"Exec_Time_Meth":18,"People-needed_Meth":14,"Evidence_Meth":25}
  ]
  fs.writeFile (filepath, JSON.stringify(data), function(err) {
      if (err) throw err;
      console.log('complete');
      }
  );
}