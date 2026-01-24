const ville_select = document.getElementById('ville');
const carburant_select = document.getElementById('carburant')
const boite_select = document.getElementById('boite')
const porte_select = document.getElementById('porte')
const origine_select = document.getElementById('origine')
ville_option = [
  'Temara', 'Casablanca', 'Meknès', 'Mohammedia', 'Tanger',
       'Rabat', 'Marrakech', 'Tétouan', 'El Jadida', 'Kénitra', 'Fès',
       'Agadir', 'Salé', 'Oujda', 'Safi', 'Béni Mellal', 'Nador', 'Autres'
]

carburant_option = [
  'Diesel', 'Essence', 'Hybride', 'Electrique'
]

boite_option = [
  'Manuelle', 'Automatique'
]
porte_option = [3,5]
origine_option = ['WW au Maroc', 'Dédouanée', 'Importée neuve']
//ville option
ville_option.forEach(ville=>{
  const option = document.createElement('option')
  option.textContent=ville
  option.value=ville
  ville_select.appendChild(option)
})
ville_select.addEventListener('focus',e=>{
  const firstoption = ville_select.querySelector('option[value=""]')
  if(firstoption){
    firstoption.remove()
  }
})

//carburant option
carburant_option.forEach(carburant=>{
  const option = document.createElement('option')
  option.textContent=carburant
  option.value=carburant
  carburant_select.appendChild(option)
})
carburant_select.addEventListener('focus',e=>{
  const firstoption = carburant_select.querySelector('option[value=""]')
  if(firstoption){
    firstoption.remove()
  }
})

//boite choix
boite_option.forEach(boite=>{
  const option = document.createElement('option')
  option.textContent=boite
  option.value=boite
  boite_select.appendChild(option)
})
boite_select.addEventListener('focus',e=>{
  const firstoption = boite_select.querySelector('option[value=""]')
  if(firstoption){
    firstoption.remove()
  }
})
//nombre portes option
porte_option.forEach(porte=>{
  const option = document.createElement('option')
  option.textContent=porte
  option.value=porte
  porte_select.appendChild(option)
})
porte_select.addEventListener('focus',e=>{
  const firstoption = porte_select.querySelector('option[value=""]')
  if(firstoption){
    firstoption.remove()
  }
})
//origine  option
origine_option.forEach(origine=>{
  const option = document.createElement('option')
  option.textContent=origine
  option.value=origine
  origine_select.appendChild(option)
})
origine_select.addEventListener('focus',e=>{
  const firstoption = origine_select.querySelector('option[value=""]')
  if(firstoption){
    firstoption.remove()
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const sliders = [
    { id: 'annee', display: 'annee-value' },
    { id: 'kilometrage', display: 'km-value' },
    { id: 'puissance', display: 'puissance-value' }
  ];

  sliders.forEach(slider => {
    const input = document.getElementById(slider.id);
    const span = document.getElementById(slider.display);

    // Initialiser la valeur affichée
    span.textContent = input.value;

    // Mettre à jour dynamiquement au mouvement du slider
    input.addEventListener('input', () => {
      span.textContent = input.value;
    });
  });
});


/// marque et modèle
const marquesModeles = {
  Renault: [
    "Clio",
    "Kangoo",
    "Megane",
    "19",
    "Express",
    "Megane 4",
    "Scenic",
    "Megane 3",
    "Laguna",
    "Captur",
    "Kadjar",
    "R19",
    "Symbol",
    "Fluence",
    "Talisman",
    "R4",
    "Megane Coupe",
    "Megane Sedan",
    "Koleos",
    "Latitude",
    "Twingo",
    "Super 5",
    "Express Van",
    "Kangoo Express",
    "R9",
    "Master",
    "Grand Scenic",
    "R21",
    "Espace",
    "Laguna Coupe",
    "R11",
    "Arkana",
    "Kangoo Ze",
    "Trafic",
    "R5",
    "R25",
    "R18",
  ],
  Volkswagen: [
    "Tiguan",
    "Polo",
    "Passat",
    "Golf 7",
    "Touareg",
    "Caddy",
    "Golf 4",
    "Touran",
    "Jetta",
    "Golf 5",
    "Golf 6",
    "Passat Cc",
    "Golf 2",
    "Golf 3",
    "Cc",
    "Golf",
    "T-Roc",
    "Bora",
    "Arteon",
    "Coccinelle",
    "Sharan",
    "Golf 8",
    "Fox",
    "Vento",
    "Golf Plus",
    "Amarok",
    "Polo Sedan",
    "Up",
    "Eos",
    "Scirocco",
    "Transporter",
    "Beetle",
    "Caddy Maxi",
    "Parati",
    "Caddy Van",
  ],
  Dacia: [
    "Logan",
    "Duster",
    "Dokker",
    "Sandero",
    "Sandero Stepway",
    "Dokker Van",
    "Lodgy",
    "Sandero Streetway",
    "Logan Mcv",
    "Spring",
    "Jogger",
    "Pick-Up Double Cab",
    "Pickup",
    "Solenza",
  ],
  Peugeot: [
    "208",
    "308",
    "Partner",
    "206",
    "3008",
    "301",
    "508",
    "205",
    "407",
    "2008",
    "206+",
    "307",
    "Tepee",
    "207",
    "306",
    "309",
    "406",
    "Rifter",
    "405",
    "Bipper",
    "Boxer",
    "106",
    "107",
    "Expert",
    "5008",
    "607",
    "108",
    "504",
    "307 Cc",
    "407 Sw",
    "307 Sw",
    "207 Cc",
    "807",
    "206 Sw",
    "206 Cc",
    "Rcz",
    "Traveller",
    "308 Cc",
    "505",
    "4008",
    "305",
    "605",
    "1007",
    "104",
    "407 Coupe",
    "207 Sw",
    "J5",
    "J9",
    "806",
    "203",
    "4007",
    "406 Coupe",
  ],
  "Mercedes-Benz": [
    "220",
    "Classe C",
    "190",
    "Classe E",
    "250",
    "Classe A",
    "Classe B",
    "Classe Cla",
    "Classe Ml",
    "270",
    "Classe S",
    "Classe Glk",
    "Classe Cls",
    "Classe Gla",
    "Sprinter",
    "Vito",
    "210",
    "280",
    "310D",
    "240",
    "Classe Glc",
    "Classe E Coupe",
    "300",
    "Classe Clk",
    "200",
    "Viano",
    "230",
    "Amg Glc",
    "Citan",
    "180",
    "Amg Gt",
    "Classe Slk",
    "Classe V",
    "Classe Cl",
    "Classe Cla Amg",
    "Classe C Coupe",
    "Classe Gle",
    "Classe M",
    "Classe G",
    "Classe E Cabriolet",
    "Classe Sls",
    "Classe Gls",
    "Classe Gl",
    "Classe R",
  ],
  Fiat: [
    "Palio",
    "500",
    "Punto",
    "Doblo",
    "Uno",
    "Fiorino",
    "Siena",
    "Tipo",
    "Panda",
    "Grande Punto",
    "500X",
    "Punto Classic",
    "Freemont",
    "Albea",
    "Ducato",
    "Linea",
    "Bravo",
    "Doblo Panorama",
    "500L",
    "Tipo Hatchback",
    "Fullback",
    "126",
    "Doblo Classic",
    "500C",
    "Brava",
    "500 X",
    "Fiorino Cargo",
    "Scudo",
    "131",
    "Marea",
    "Stilo",
    "Tempra",
    "127",
    "500L Living",
    "Barchetta",
    "500 C",
    "Multipla",
    "Idea",
    "Croma",
  ],
  Hyundai: [
    "Accent",
    "Tucson",
    "Santa Fe",
    "I 10",
    "Ix 35",
    "I 30",
    "I 20",
    "Elantra",
    "Creta",
    "Grand I10",
    "H-1",
    "I 40",
    "Grand Santa Fe",
    "Atos",
    "H-100",
    "I10",
    "I30",
    "Sonata",
    "I20",
    "Atos Prime",
    "Ioniq Hybrid",
    "Ix35",
    "Kona",
    "Veracruz",
    "Terracan",
    "Lantra",
    "Ix55",
    "Matrix",
    "H200",
    "Coupe",
    "Trajet",
    "Centennial",
    "Bayon",
    "Grandeur",
    "County",
    "Genesis",
    "Genesis Coupe",
    "H100",
    "Xg",
    "Azera",
  ],
  Ford: [
    "Focus",
    "Fiesta",
    "Kuga",
    "Fusion",
    "Mondeo",
    "C-Max",
    "Transit",
    "Ecosport",
    "Ranger",
    "Ka",
    "Connect",
    "Escort",
    "Tourneo",
    "Cougar",
    "Fusion Berline",
    "C Max",
    "Mustang Cabriolet",
    "B-Max",
    "Mustang",
    "Focus C-Max",
    "Tourneo Connect",
    "Galaxy",
    "S-Max",
    "Edge",
    "Escape",
    "Expedition",
    "Tourneo Custom",
    "Grand C Max",
    "Everest",
    "Raptor",
    "F350",
    "Explorer",
  ],
  Citroen: [
    "Berlingo",
    "C3",
    "C4",
    "C5",
    "C-Elysée",
    "Xsara",
    "C4 Picasso",
    "C15",
    "Xsara Picasso",
    "C4 Cactus",
    "Nemo",
    "C1",
    "C5 Aircross",
    "C3 Aircross",
    "Jumper",
    "Ax",
    "Saxo",
    "Ds 5",
    "C3 Picasso",
    "Ds 4",
    "Zx",
    "Grand C4 Picasso",
    "C3 Cactus",
    "Ami",
    "Xantia",
    "Jumpy",
    "C4 Aircross",
    "Ds 3",
    "Ds7",
    "C8",
    "C3 Pluriel",
    "C-Crosser",
    "C2",
    "Bx",
    "C4 Spacetourer",
    "2 Cv",
    "Ds4",
    "Ds",
    "Evasion",
    "C25",
  ],
  Toyota: [
    "Corolla",
    "Rav 4",
    "Yaris",
    "C-Hr",
    "Hilux",
    "Prado",
    "Auris",
    "Avensis",
    "Verso",
    "Tercel",
    "Corolla Verso",
    "Aygo",
    "Land Cruiser Prado",
    "Starlet",
    "Land Cruiser",
    "Hi Ace",
    "Corolla Cross",
    "Rav-4",
    "4Runner",
    "Prius",
    "Fj",
    "Fortuner",
    "Avensis Verso",
    "Yaris Cross",
    "Tundra",
    "Vios",
    "Supra",
    "Fj Cruiser",
    "Celica",
  ],
  Opel: [
    "Astra",
    "Corsa",
    "Insignia",
    "Crossland X",
    "Grandland X",
    "Mokka",
    "Adam",
    "Combo",
    "Zafira",
    "Grandland",
    "Vectra",
    "Crossland",
    "Meriva",
    "Antara",
    "Combo Life",
    "Insignia Grand Sport",
    "Vivaro",
    "Omega",
    "Adam Rocks",
    "Gt",
    "Campo",
    "Kadett",
    "Sintra",
    "Agila",
    "Tigra",
    "Movano",
    "Frontera",
    "Calibra",
    "Combo Cargo",
    "Rekord",
  ],
  Kia: [
    "Picanto",
    "Sportage",
    "Carens",
    "Sorento",
    "Cerato",
    "Ceed",
    "Rio",
    "Seltos",
    "Soul",
    "Optima",
    "Niro",
    "K5",
    "K2700",
    "Sonet",
    "K2500",
    "Mohave",
    "Carnival",
    "Proceed",
    "Opirus",
    "Pregio",
    "Besta",
    "K 2700",
    "Stinger",
  ],
  Bmw: [
    "Serie 5",
    "Serie 3",
    "Serie 1",
    "X5",
    "X1",
    "X3",
    "Serie 4 Gran Coupé",
    "Serie 1 Coupé",
    "Série 5",
    "X6",
    "Série 1",
    "Serie 3 Coupé",
    "Serie 7",
    "Serie 2 Coupé",
    "Série 3",
    "M3",
    "Serie 4",
    "X4",
    "Serie 2",
    "Serie 4 Coupé",
    "Série 4",
    "M5",
    "X6M",
    "Serie 3 Cabriolet",
    "Serie 2 Active Tourer",
    "Serie 4 Cabriolet",
    "Serie 5 Gt",
    "Ix",
    "M4",
    "Serie 3 Gt",
    "Ix3",
    "X2",
    "Serie 6 Gran Coupé",
    "I3",
    "X5M",
    "Serie 6",
    "X4M",
    "Série 7",
    "Série 6",
    "Z4",
    "Serie 5 M2",
    "Serie 8 Cabriolet",
    "Serie 6 Gt",
    "Serie 2 Gran Coupé",
  ],
  Audi: [
    "A3",
    "A4",
    "Q5",
    "A6",
    "Q3",
    "A3 Sportback",
    "Q7",
    "A5",
    "A1",
    "A5 Sportback",
    "Q2",
    "A7",
    "80",
    "Q5 Sportback",
    "Sq5",
    "A1 Sportback",
    "A8",
    "S3",
    "Tt",
    "Q3 Sportback",
    "Rs3",
    "A2",
    "S6",
    "A4 Allroad",
    "Tts",
    "Etron S Line",
  ],
  Nissan: [
    "Qashqai",
    "Juke",
    "Micra",
    "X-Trail",
    "Pathfinder",
    "Note",
    "Navara",
    "Primera",
    "Tiida",
    "Almera",
    "Murano",
    "Sunny",
    "240Sx",
    "Terrano",
    "Evalia",
    "Serena",
    "Patrol",
    "Kicks",
    "350Z",
    "Altima",
    "Kubistar",
    "370 Z",
    "Urvan",
    "Maxima",
    "Vanette",
    "Primastar",
    "Tino",
    "Rogue",
  ],
  Seat: [
    "Leon",
    "Ibiza",
    "Ateca",
    "Cordoba",
    "Arona",
    "Altea Xl",
    "Toledo",
    "Altea",
    "Alhambra",
    "Exeo",
    "Leon St",
    "Inca",
    "Vario",
  ],
  Skoda: [
    "Octavia",
    "Superb",
    "Kodiaq",
    "Fabia",
    "Karoq",
    "Rapid",
    "Yeti",
    "Kamiq",
    "Scala",
    "Roomster",
    "Felicia",
  ],
  "land rover": [],
  Honda: [
    "Accord",
    "Civic",
    "Cr-V",
    "Jazz",
    "City",
    "Civic Berline",
    "Civic Coupe",
    "Hr-V",
    "Legend",
    "Acty",
    "Civic Tourer",
    "Vigor",
    "Concerto",
    "Cr-X",
    "Stream",
    "Carry",
    "Prelude",
  ],
  Jeep: [
    "Grand Cherokee",
    "Renegade",
    "Cherokee",
    "Compass",
    "Wrangler",
    "Patriot",
    "Liberty",
    "Commander",
  ],
  Suzuki: [
    "Alto",
    "Celerio",
    "Grand Vitara",
    "Carry",
    "Swift",
    "Vitara",
    "Jimny",
    "Sx4",
    "Splash",
    "Wagon R",
    "Baleno",
    "Ignis",
    "Apv",
    "S Cross",
    "Xl7",
    "Aerio",
    "Liana",
  ],
  Mitsubishi: [
    "L200",
    "Lancer",
    "Pajero",
    "Pajero Sport",
    "Outlander",
    "Canter",
    "Colt",
    "Grandis",
    "Nativa",
  ],
  "Alfa Romeo": [
    "Giulietta",
    "Stelvio",
    "159",
    "147",
    "Mito",
    "Giulia",
    "156",
    "Gt",
    "Tonale",
    "147 Gta",
    "166",
    "155",
    "145",
    "Gtv",
  ],
  Chevrolet: [
    "Spark",
    "Cruze",
    "Captiva",
    "Aveo",
    "Optra",
    "Aveo Berline",
    "Orlando",
    "Astro",
    "Alero",
    "Avalanche",
    "Trans Sport",
    "Beretta",
    "Trax",
    "Ssr",
    "Epica",
  ],
  Volvo: [
    "Xc60",
    "S60",
    "V40",
    "Xc40",
    "S40",
    "Xc90",
    "S90",
    "C30",
    "S80",
    "V40 Cross Country",
    "V60",
    "V70",
    "240",
    "C70",
  ],
  Mini: [
    "Cooper",
    "One",
    "Mini",
    "Clubman",
    "Countryman",
    "Mini Coupe",
    "Cabrio",
    "Hatch",
  ],
  Ssangyong: [
    "Kyron",
    "Korando",
    "Actyon",
    "Rexton",
    "Stavic",
    "Rodius",
    "Xlv",
    "Tivoli",
    "Ceo",
  ],
  Jaguar: [
    "Xf",
    "Xe",
    "Xj",
    "X-Type",
    "F-Pace",
    "E-Pace",
    "Xj8",
    "S-Type",
    "Xk",
    "Xj6",
    "F-Type",
  ],
  chery: ["Qq", "Tiggo", "Qq6", "Tiggo 2 Pro"],
  "Range Rover": [
    "Range Rover Evoque",
    "Range Rover Sport",
    "Range Rover",
    "Freelander",
    "Discovery Sport",
    "Range Rover Vogue",
    "Defender",
    "Discovery",
    "Range Rover Evoque Cabriolet",
    "Velar",
  ],
};

const marqueSelect = document.getElementById("marque");
const modeleSelect = document.getElementById("modele");

// Charger les marques
function chargerMarques() {
  Object.keys(marquesModeles).forEach((marque) => {
    const option = document.createElement("option");
    option.value = marque;
    option.textContent = marque.toUpperCase();
    marqueSelect.appendChild(option);
  });
}

// Quand une marque est sélectionnée
marqueSelect.addEventListener("change", () => {
  const marque = marqueSelect.value;

  // Reset modèles
  modeleSelect.innerHTML = '<option value="">Choisir un modèle</option>';
  modeleSelect.disabled = true;

  if (marque && marquesModeles[marque].length > 0) {
    marquesModeles[marque].forEach((modele) => {
      const option = document.createElement("option");
      option.value = modele;
      option.textContent = modele;
      modeleSelect.appendChild(option);
    });
    modeleSelect.disabled = false;
  }
});
marqueSelect.addEventListener('focus',e=>{
  const firstoption = marqueSelect.querySelector('option[value=""]')
  if(firstoption){
    firstoption.remove()
  }
})
modeleSelect.addEventListener('focus',e=>{
  const firstoption = modeleSelect.querySelector('option[value=""]')
  if(firstoption){
    firstoption.remove()
  }
})
// Initialisation
chargerMarques();










// login+logout
// Sélection du bouton de connexion
const loginBtn = document.querySelector(".login-btn");

// Vérifier si utilisateur connecté
const userEmail = localStorage.getItem("userEmail");

if (userEmail) {
  
  loginBtn.textContent = "Déconnecter";

  // Ajouter le click pour logout
  loginBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/signout", {
        method: "POST", 
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        localStorage.removeItem("userEmail"); 
        window.location.reload(); //reload and it will cheeck that the usermail doesnt exists so change textcontent for loginbtn
      }
    } catch (err) {
      console.error("Erreur logout:", err);
    }
  });
} else {
  // Si pas connecté, le bouton reste "Connexion"
  loginBtn.textContent = "Connexion";
}

// predicted history button
// Récupérer le bouton
const historyLink = document.getElementById("history-link");

historyLink.addEventListener("click", (e) => {
  e.preventDefault(); // empêche le comportement par défaut
  if (userEmail) {
    window.location.href = "historypredicted.html"; // connecté → page historique
  } else {
    window.location.href = "login.html"; // pas connecté → page login
  }
});


// Pour le bouton "Sauvegarder la prédiction"
const saveBtn = document.querySelector(".save-btn");
saveBtn.addEventListener("click", (e) => {
  if (!userEmail) {
    // si pas connecté → rediriger vers login
    window.location.href = "login.html";
    return;
  }
  // sinon, sauvegarder la prédiction via API ou logique existante
  console.log("Prédiction sauvegardée pour", userEmail);
});


//prediction to backend
const predictBtn = document.querySelector(".predict-btn");
const priceDisplay = document.querySelector(".price");

predictBtn.addEventListener("click", async () => {
  
  //dic key-value to predict price
  const data = {
    Ville: document.getElementById("ville").value,
    Marque: document.getElementById("marque").value,
    Modèle: document.getElementById("modele").value,
    Kilométrage: parseInt(document.getElementById("kilometrage").value),
    Age_vehicule: 2025 - parseInt(document.getElementById("annee").value),
    "Nombre de portes": parseInt(document.getElementById("porte").value),
    "Puissance fiscale": parseInt(document.getElementById("puissance").value),
    "Boite de vitesses": document.getElementById("boite").value,
    "Type de carburant": document.getElementById("carburant").value,
    Origine: document.getElementById("origine").value,
    "Première main": document.getElementById("main").value
  };

  try {
    const response = await fetch("/predict",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.error) {
      priceDisplay.textContent = result.error; 

    } else {
      priceDisplay.textContent = result.prix + " DH";   
    }
  } catch (err) {
    console.error(err);
    priceDisplay.textContent = "Erreur lors de la prédiction";
  }
});

//save prediction backend (if logged)
const saveMessage = document.getElementById("save-message")
saveBtn.addEventListener('click',async (e)=>{
  const userEmail = localStorage.getItem("userEmail"); // <- récupéré ici
  if (!userEmail) {
    window.location.href = "login.html";
    return;
  }
  const data_user= {
    Ville: document.getElementById("ville").value,
    Marque: document.getElementById("marque").value,
    Modèle: document.getElementById("modele").value,
    Kilométrage: parseInt(document.getElementById("kilometrage").value),
    Age_vehicule: 2025 - parseInt(document.getElementById("annee").value),
    "Nombre de portes": parseInt(document.getElementById("porte").value),
    "Puissance fiscale": parseInt(document.getElementById("puissance").value),
    "Boite de vitesses": document.getElementById("boite").value,
    "Type de carburant": document.getElementById("carburant").value,
    Origine: document.getElementById("origine").value,
    "Première main": document.getElementById("main").value,
    Prix: document.querySelector(".price").textContent.replace(" DH","") // récupérer le prix affiché
  };
  try {
    const response = await fetch("http://localhost:8000/api/predictions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ prediction: data_user })
    });

    const result = await response.json();

    if (result.success) {
      saveMessage.textContent = "Prédiction sauvegardée !";
      saveMessage.style.color = "#0d1b2a";
    } else {
      saveMessage.textContent = "Erreur: " + result.error;
      saveMessage.style.color = "red";
    }
  } catch (err) {
    console.error(err);
     console.error(err);
    saveMessage.textContent = "Erreur lors de la sauvegarde";
    saveMessage.style.color = "red";
  }
})