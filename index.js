const kuva = document.getElementById("kulli1id");
const count = document.getElementById("count");
const achievementBox = document.getElementById("achievement");
const automaatiolvl1button = document.getElementById("automaatiolvl1");
const klikkauslvl1button = document.getElementById("klikkauslvl1");

let koko = 200;
let clickattu = 0;
let clickvalue = 1;
let automationvalue = 0;
let clicksound = new Audio("audio/mouse-click.mp3");

let firstupragecost = 100;

kuva.addEventListener("click", () => {
  koko += clickvalue; clickattu += clickvalue;
  kuva.style.width = koko + "px"
  count.textContent = clickattu + "mm";   
  
  clicksound.volume = 1.0;
  clicksound.play()

  if (kuva.clientWidth > 350) {
        koko = 200;
  }

  if(clickattu > 75) {
    if(!kuva.src.endsWith("dih2.png")) {
        kuva.src = "assets/dih2.png";
        koko = 200;
        kuva.style.width = koko + "px";
        showAchievement("Uusi dih avattu, Inferno dih!");
      }
    }
    if(clickattu > 750) {
       if(!kuva.src.endsWith("black.png")) {
          kuva.src = "assets/black.png";
          koko = 200;
          kuva.style.width = koko + "px";
         showAchievement("Uusi dih avattu, Black dih!");
      }
    }
     if(clickattu > 7500) {
       if(!kuva.src.endsWith("alien dih.png")) {
          kuva.src = "assets/alien dih.png";
          koko = 200;
          kuva.style.width = koko + "px";
         showAchievement("Uusi dih avattu, Alien dih!");
     }
    }
  });

    function showAchievement(text) {
      achievementBox.textContent = text;
      achievementBox.classList.add("show");

      setTimeout(() => {
        achievementBox.classList.remove("show");
      }, 3000);}

function autoclicker(number) {
  setInterval(() => {
    koko += number; clickattu += number;
    kuva.style.width = koko + "px";
    count.textContent = clickattu + "mm";
    
     if (kuva.clientWidth > 350) {
        koko = 200;
  }
  }, 1000)
}

kuva.addEventListener("load", () => {
  autoclicker(automationvalue)
})

function sC(number, number2) {
  if(clickattu > number2) {
   clickattu -= number2
   automationvalue =+ number;
  }}

function setKlikkausarvo(number, number2) {
  if(clickattu > number2) {
   clickattu -= number2
   clickvalue =+ number;
}}