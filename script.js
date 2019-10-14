window.addEventListener("load", function(event) {
      validateForm();
});

function validateForm() {

   document.addEventListener("submit", function(event) {

         let pilotName = document.querySelector("[name=pilotName]").value;
         let copilotName = document.querySelector("[name=copilotName]").value;
         let fuelLevel = document.querySelector("[name=fuelLevel]").value;
         let cargoMass = document.querySelector("[name=cargoMass]").value;
         let err1 = "";
         let err2 = "";
         let err3 = "";

         if ( !pilotName || !copilotName || !fuelLevel || !cargoMass ) { 
            err1 = "Fields can not be left empty.\n";
         }

         if ( pilotName.match(/\d+/g) != null || copilotName.match(/\d+/g) != null ) {
            err2 = "Pilot names can not contain numbers.\n";
         }

         if ( isNaN(fuelLevel) || isNaN(cargoMass) ) {
            err3 = "Fuel level and cargo mass must be numbers.\n";
         }

         if (err1 || err2 || err3) {
            let errors = `${err1}${err2}${err3}`;
            alert(errors);
            event.preventDefault();
          }

          else { updateShuttle(event, pilotName, copilotName, fuelLevel, cargoMass); }
         
   });
}

function updateShuttle(event, pilotName, copilotName, fuelLevel, cargoMass) {

   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   
   pilotStatus.innerHTML = `Pilot ${pilotName}, Ready.`;
   copilotStatus.innerHTML = `Co-pilot ${copilotName}, Ready`;

   if (fuelLevel >= 10000 && cargoMass <= 10000) {
         faultyItems.style.visibility = 'hidden';
         launchStatus.innerHTML = `Shuttle is ready for launch`;
         launchStatus.style.color = `green`;
         visitPlanet();
         event.preventDefault();
   }
   else {
         faultyItems.style.visibility = 'visible';
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = `red`;
         fuelStatus.innerHTML = (fuelLevel < 10000) ? `Not enough fuel for the journey` : `Fuel level high enough for launch`;
         cargoStatus.innerHTML = (cargoMass > 10000) ? `There is too much mass for the shuttle to take off` : `Cargo mass low enough for launch`;
         event.preventDefault();
   }
}

function visitPlanet() {
   let missionTarget = document.getElementById("missionTarget");
   let url = "https://handlers.education.launchcode.org/static/planets.json"
   fetch(url).then(function(response) {
      response.json().then(function(json) {
         let idx = Math.round(Math.random() * (json.length - 1));
         let planet = json[idx];
         missionTarget.innerHTML = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${planet.name}</li>
            <li>Diameter: ${planet.diameter}</li>
            <li>Star: ${planet.stat}</li>
            <li>Distance from Earth: ${planet.distance}</li>
            <li>Number of Moons: ${planet.moon}</li>
         </ol>
         <img src="${planet.image}">`
      });
   });
}
