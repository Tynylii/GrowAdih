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
let currentDih = "default";


kuva.addEventListener("click", () => {
  koko += clickvalue;
  clickattu += clickvalue;
  kuva.style.width = koko + "px";
  count.textContent = clickattu + "mm";   

  clicksound.volume = 1.0;
  clicksound.play();

  if (kuva.clientWidth > 350) {
    koko = 200;
    kuva.style.width = koko + "px";
  }

  if (clickattu > 74999 && currentDih !== "demonic") {
    kuva.src = "assets/demonic_dih";
    resetKuva();
    showAchievement("Uusi dih avattu, Demonic dih!");
    currentDih = "demonic";
  } 

  else if (clickattu > 7499 && currentDih !== "alien") {
    kuva.src = "assets/alien_dih.png";
    resetKuva();
    showAchievement("Uusi dih avattu, Alien dih!");
    currentDih = "alien";
  } 
  else if (clickattu > 749 && currentDih !== "black" && currentDih !== "alien") {
    kuva.src = "assets/black.png";
    resetKuva();
    showAchievement("Uusi dih avattu, Black dih!");
    currentDih = "black";
  } 
  else if (clickattu > 74 && currentDih === "default") {
    kuva.src = "assets/dih2.png";
    resetKuva();
    showAchievement("Uusi dih avattu, Inferno dih!");
    currentDih = "inferno";
  }
});

function resetKuva() {
  koko = 200;
  kuva.style.width = koko + "px";
}

function showAchievement(text) {
  achievementBox.textContent = text;
  achievementBox.classList.add("show");

  setTimeout(() => {
    achievementBox.classList.remove("show");
  }, 3000);
}

function autoclicker() {
  setInterval(() => {
    if (automationvalue > 0) {
      koko += automationvalue;
      clickattu += automationvalue;
      kuva.style.width = koko + "px";
      count.textContent = clickattu + "mm";

      if (kuva.clientWidth > 350) {
        koko = 200;
        kuva.style.width = koko + "px";
      }
    }
  }, 1000);
}
autoclicker(); // käynnistetään aina taustalle

function setAutomaatioarvo(amount, cost) {
  if(clickattu >= cost) {
    clickattu -= cost;
    automationvalue += amount;
    count.textContent = clickattu + "mm";

    // päivitä teksti
    document.getElementById("automaatioteho").textContent = 
      "Automaatioteho " + automationvalue.toFixed(1);
  } else {
    showAchievement("Sinun dih on liian pieni ostoon!");
  }
}

function setKlikkausarvo(amount, cost) {
  if(clickattu >= cost) {
    clickattu -= cost;
    clickvalue += amount;
    count.textContent = clickattu + "mm";

    // päivitä teksti
    document.getElementById("klikkausteho").textContent = 
      "Klikkausteho " + clickvalue.toFixed(1);
  } else {
    showAchievement("Sinun dih on liian pieni ostoon!");
  }
}

function save() {
  // tallennus 0.5s välein
  setInterval(() => {
    localStorage.setItem("klikit", clickattu);
    localStorage.setItem("currentDih", currentDih);
    localStorage.setItem("klikkausteho", clickvalue);
    localStorage.setItem("automaatioteho", automationvalue);
    localStorage.setItem("koko", koko);
  }, 500);
}

function load() {
  // haetaan arvot ja muunnetaan numerot takaisin
  clickattu = parseInt(localStorage.getItem("klikit")) || 0;
  currentDih = localStorage.getItem("currentDih") || "";
  clickvalue = parseInt(localStorage.getItem("klikkausteho")) || 1;
  automationvalue = parseInt(localStorage.getItem("automaatioteho")) || 0;
  koko = parseInt(localStorage.getItem("koko")) || 200;
}

window.onload = function() {
  load();
  save();
};
