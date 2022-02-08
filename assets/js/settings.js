
filepath = "assets/json/settings.json";
let prot_max = 100;

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

$(document).ready(function(){
  $.getJSON(filepath, function(data){
      console.log("data",data);
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
  }).fail(function(){
      console.log("An error has occurred while reading setting values.");
  });
});


Budget_Prot.oninput = function() {
  output_Budget_Prot.innerHTML = this.value;
  if (output_Budget_Prot.innerHTML >= (prot_max - output_Zeit_Prot.innerHTML - output_VisFid_Prot.innerHTML - output_AudFid_Prot.innerHTML - output_HapFid_Prot.innerHTML - output_Funktionstiefe.innerHTML - output_Funktionsumfang.innerHTML - output_Eingabeverhalten.innerHTML - output_Ausgabeverhalten.innerHTML)){
    Budget_Prot.disabled = true;
  }
  else{
    Budget_Prot.disabled = false;
  }
}


Zeit_Prot.oninput = function() {
  output_Zeit_Prot.innerHTML = this.value;
}


VisFid_Prot.oninput = function() {
  output_VisFid_Prot.innerHTML = this.value;
}


AudFid_Prot.oninput = function() {
  output_AudFid_Prot.innerHTML = this.value;
}


HapFid_Prot.oninput = function() {
  output_HapFid_Prot.innerHTML = this.value;
}


Funktionstiefe.oninput = function() {
  output_Funktionstiefe.innerHTML = this.value;
}


Funktionsumfang.oninput = function() {
  output_Funktionsumfang.innerHTML = this.value;
}


Eingabeverhalten.oninput = function() {
  output_Eingabeverhalten.innerHTML = this.value;
}


Ausgabeverhalten.oninput = function() {
  output_Ausgabeverhalten.innerHTML = this.value;
}

function save_settings(){
  console.log("save settihgs");
  var data = [{"Budget_Prot":Budget_Prot.value, "Zeit_Prot":Zeit_Prot.value, "VisFid_Prot":VisFid_Prot.value, "AudFid_Prot":AudFid_Prot.value, "HapFid_Prot":HapFid_Prot.value, "Funktionstiefe":Funktionstiefe.value,"Funktionsumfang":Funktionsumfang.value,"Eingabeverhalten":Eingabeverhalten.value,"Ausgabeverhalten":Ausgabeverhalten.value},
  {"Budget_Meth":25,"Prep_Time_Meth":18,"Exec_Time_Meth":18,"People_needed_Meth":14,"Evidence_Meth":25}
  ];
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
  document.getElementById('Setting_message').innerHTML  = "Einstellwerte aktualisiert";
}