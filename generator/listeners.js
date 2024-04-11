import { updateMap } from "./script.js";

const dateInput = document.getElementById("dateInput");
const dateSlider = document.getElementById("dateSlider");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let selectedJson = "sun";
let systemData = await getSystemData(selectedJson);

dateSlider.addEventListener("input", function () {
  const sliderValue = parseInt(dateSlider.value);
  const diaInicio = new Date(2224, 5, 1);
  const selectedDate = new Date(
    diaInicio.getTime() + sliderValue * 7 * 24 * 60 * 60 * 1000
  );
  dateInput.value = `${selectedDate.getDate()}/${
    selectedDate.getMonth() + 1
  }/${selectedDate.getFullYear()}`;

  const event = new Event("change");
  dateInput.dispatchEvent(event);

  updatePositions(sliderValue);
});

dateInput.addEventListener("change", function () {
  const selectedDate = dateInput.value + "";
  updatePositions(selectedDate);
});

document.getElementById("saveButton").addEventListener("click", saveImage);
document.getElementById("saveButton52").addEventListener("click", saveImage52);

export async function getSystemData(selectedJson) {
  let systemData = {};

  await fetch(`../json/${selectedJson}.json`)
    .then((response) => response.json())
    .then((data) => {
      systemData = data;
    })
    .catch((error) => {
      console.error("Erro:", error);
    });

  return systemData;
}

export async function updateSystemData(selectedJson) {
  systemData = await getSystemData(selectedJson);
}

function parseDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return new Date(year, month - 1, day); // month - 1 porque os meses no objeto Date são 0-indexados
}

export async function updatePositions(dateText) {
  const diaInicio = new Date(2224, 5, 1);
  const selectedDate = parseDate(dateText);
  const diasPassados = (selectedDate - diaInicio) / (1000 * 60 * 60 * 24);
  for (const orbit in systemData.orbits) {
    const grauDias = systemData.orbits[orbit].grauPorDia;
    const grau =
      diasPassados * grauDias < 360
        ? diasPassados * grauDias
        : (diasPassados * grauDias) % 360;
    systemData.orbits[orbit].grau =
      systemData.orbits[orbit].grauBase + grau * -1;
  }
  const formattedDate = selectedDate.toLocaleDateString("pt-BR");

  systemData.date = formattedDate;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateMap(ctx, canvas, systemData);

}

document.querySelectorAll(".navbar-item").forEach((item) => {
  item.addEventListener("click", async function () {
    selectedJson = this.getAttribute("data-json");
    await updateSystemData(selectedJson);
    updateMap(ctx, canvas, systemData);
  });
});

export async function saveImage52() {
  const startDate = new Date(2224, 5, 1);
  for (let i = 0; i < 52; i++) {
    const selectedDate = new Date(
      startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000
    );
    const formattedDate = selectedDate.toLocaleDateString("pt-BR");
    generateImage(formattedDate);
    generateMarkers(formattedDate);
    console.log("Imagem salva para a data: ", formattedDate);
  }
}

function saveImage() {
  const selectedDate = dateInput.value;
  generateImage(selectedDate);
  generateMarkers(selectedDate);
}

function generateImage(date) {
  updatePositions(date);
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `sun-${date}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function generateMarkers(date) {
  updatePositions(date);

  var placesData = {
    systemId: systemData.id,
    systemDate:  systemData.date,
    systemName: systemData.name,
    markersData: systemData.markersData,
  };

  // Converte os dados dos marcadores para JSON
  const markersJSON = JSON.stringify(placesData, null, 2);

  // Salva o JSON em um arquivo
  const blob = new Blob([markersJSON], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${systemData.id}-${systemData.date}.json`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}