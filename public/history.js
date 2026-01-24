document.addEventListener("DOMContentLoaded", async () => {
  const userEmail = localStorage.getItem("userEmail");
  const container = document.getElementById("history-container");

  if (!userEmail) {
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/api/predictions", {
    method: "GET",
    credentials: "include", //sends the JWT cookie
    });
    const data = await response.json();

    if (data.success && data.history.length > 0) {
      data.history.forEach(item => {
        const prediction = item.prediction; // ici tu récupères ton objet enregistré
        const div = document.createElement("div");
        div.classList.add("prediction-card");

        div.innerHTML = `
          <p><strong>Marque:</strong> ${prediction.Marque}</p>
          <p><strong>Modèle:</strong> ${prediction.Modèle}</p>
          <p><strong>Ville:</strong> ${prediction.Ville}</p>
          <p><strong>Prix prédit:</strong> ${prediction.Prix} DH</p>
          <p><strong>Kilométrage:</strong> ${prediction.Kilométrage}</p>
          <p><strong>Année:</strong> ${2025 - prediction.Age_vehicule}</p>
          <p><strong>Nombre de portes:</strong> ${prediction["Nombre de portes"]}</p>
          <p><strong>Puissance fiscale:</strong> ${prediction["Puissance fiscale"]}</p>
          <p><strong>Boîte de vitesses:</strong> ${prediction["Boite de vitesses"]}</p>
          <p><strong>Carburant:</strong> ${prediction["Type de carburant"]}</p>
          <p><strong>Origine:</strong> ${prediction.Origine}</p>
          <p><strong>Première main:</strong> ${prediction["Première main"]}</p>
          <hr>
        `;
        container.appendChild(div);
      });
    } else {
      container.textContent = "Aucune prédiction sauvegardée pour le moment.";
    }
  } catch (err) {
    console.error(err);
    container.textContent = "Erreur lors de la récupération de l'historique.";
  }
});
