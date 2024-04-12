const dateInput = document.getElementById("dateInput");
const dateSlider = document.getElementById("dateSlider");

dateSlider.addEventListener("input", async function () {
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

  selectedJson = `${selectedSystem}-${formatDate(dateInput.value)}`;
  await updateSystemData(selectedJson);
  updateMap(systemData);
});

let selectedSystem = `jupiter`;
let selectedJson = "jupiter-01_06_2224";
let systemData = await getSystemData(selectedJson);
let imageURL = selectedJson+".png"

dateInput.addEventListener("change", async function () {
  const selectedDate = dateInput.value + "";
  selectedJson = `${selectedSystem}-${formatDate(dateInput.value)}`;
  await updateSystemData(selectedJson);
  updateMap(systemData);
});

export async function getSystemData(selectedJson) {
  let systemData = {};

  await fetch(`${selectedJson}.json`)
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

document.querySelectorAll(".navbar-item").forEach((item) => {
  item.addEventListener("click", async function () {
    selectedSystem = this.getAttribute("data-selected");

    selectedJson = `${selectedSystem}-${formatDate(dateInput.value)}`;
    await updateSystemData(selectedJson);
    updateMap(systemData);
  });
});

function parseDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return new Date(year, month - 1, day); // month - 1 porque os meses no objeto Date são 0-indexados
}

function formatDate(dateString) {
  const selectedDate = parseDate(dateString);
  const formattedDate = selectedDate.toLocaleDateString("pt-BR").toString();
  return formattedDate.replaceAll("/", "_");
}

var map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -3,
});

let markersLayer = L.layerGroup().addTo(map);

updateMap(systemData);

export function updateMap(systemData) {
  console.log(systemData.imageURL);
  imageURL = `${systemData.imageURL}`;

  var imageBounds = [
    [0, 0],
    [8640, 8640],
  ];

  clearMap(map);

  L.imageOverlay(imageURL, imageBounds).addTo(map);

  map.setMaxBounds(imageBounds);
  map.setView([4320, 4320], -3);

  addMarkers(map, systemData);
}

function addMarkers(map, systemData) {
  clearMap(map);

  const iconSize = [100, 100]; // Tamanho fixo do ícone do marcador

  systemData.markersData.forEach(markerData => {
    const { name, latlng } = markerData;
    const markerIcon = L.icon({
      iconUrl: 'marker-icon.png', // URL do ícone do marcador
      iconSize: iconSize, // Tamanho do ícone do marcador
      iconAnchor: [iconSize[0] / 2, iconSize[1]/2], // Ponto de ancoragem do ícone
    });
    
    L.marker([latlng.lat, latlng.lng], { icon: markerIcon }).addTo(map).bindPopup(name);
  });
}

export function clearMap(map) {
  markersLayer.clearLayers();

  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
}

document.getElementById("saveImage").addEventListener("click", saveImage);


function saveImage() {
  const selectedDate = dateInput.value;

  const formattedDate = formatDate(selectedDate);

  const dataURL = imageURL;
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `${selectedSystem}-${formattedDate}.png`;
  systemData.imageURL = link.download;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}