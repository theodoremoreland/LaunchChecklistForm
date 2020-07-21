window.addEventListener("load", function () {
   visitPlanet();
   validateForm();
});

function validateForm() {
   document.addEventListener("submit", function (event) {
      event.preventDefault();
      const pilotName = document.querySelector("[name=pilotName]").value;
      const copilotName = document.querySelector("[name=copilotName]").value;
      const fuelLevel = document.querySelector("[name=fuelLevel]").value;
      const cargoMass = document.querySelector("[name=cargoMass]").value;
      let err1 = "";
      let err2 = "";
      let err3 = "";

      if (!pilotName || !copilotName || !fuelLevel || !cargoMass) {
         err1 = "Fields can not be left empty.\n";
      }

      if (pilotName.match(/\d+/g) != null || copilotName.match(/\d+/g) != null) {
         err2 = "Pilot names can not contain numbers.\n";
      }

      if (isNaN(fuelLevel) || isNaN(cargoMass)) {
         err3 = "Fuel level and cargo mass must be numbers.\n";
      }

      if (err1 || err2 || err3) {
         let errors = `${err1}${err2}${err3}`;
         alert(errors);
      }

      else { updateShuttle(event, pilotName, copilotName, fuelLevel, cargoMass); }

   });
}

function updateShuttle(event, pilotName, copilotName, fuelLevel, cargoMass) {

   const launchStatus = document.querySelector("#launchStatus");
   const faultyItems = document.querySelector("#faultyItems");
   const pilotStatus = document.querySelector("#pilotStatus");
   const copilotStatus = document.querySelector("#copilotStatus");
   const fuelStatus = document.querySelector("#fuelStatus");
   const cargoStatus = document.querySelector("#cargoStatus");

   pilotStatus.innerHTML = `Pilot ${pilotName}, Ready.`;
   copilotStatus.innerHTML = `Co-pilot ${copilotName}, Ready`;

   if (fuelLevel >= 10000 && cargoMass <= 10000) {
      faultyItems.style.visibility = 'hidden';
      launchStatus.innerHTML = `Shuttle is ready for launch`;
      launchStatus.style.color = `green`;
   }
   else {
      faultyItems.style.visibility = 'visible';
      launchStatus.innerHTML = `Shuttle not ready for launch`;
      launchStatus.style.color = `red`;
      fuelStatus.innerHTML = (fuelLevel < 10000) ? `Not enough fuel for the journey` : `Fuel level high enough for launch`;
      cargoStatus.innerHTML = (cargoMass > 10000) ? `There is too much mass for the shuttle to take off` : `Cargo mass low enough for launch`;
   }
}

function visitPlanet() {
   const missionTarget = document.querySelector("#missionTarget");
   const url = "https://handlers.education.launchcode.org/static/planets.json"
   fetch(url).then(function (response) {
      response.json().then(function (json) {
         let idx = Math.floor(Math.random() * (json.length));
         let planet = json[idx];
         missionTarget.innerHTML = `<h2>Mission Destination</h2>
         
            <p>Name: ${planet.name}</p>
            <p>Diameter: ${planet.diameter}</p>
            <p>Star: ${planet.star}</p>
            <p>Distance from Earth: ${planet.distance}</p>
            <p>Number of Moons: ${planet.moons}</p>
         
         <img src="${planet.image}">`
      });
   });
}
