import { getSystemData } from "./listeners.js";

const minZoom = -3;
let currentZoom = minZoom;

var map = (map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: minZoom,
}));

let bodiesLayer = L.layerGroup().addTo(map);
let placesLayer = L.layerGroup().addTo(map);

let systemData = await getSystemData("mars");

updateMap(systemData);

export function updateMap(systemData) {
  map.setView([4320, 4320], minZoom);

  var imageUrl = systemData.imageUrl;

  var imageBounds = [
    [0, 0],
    [8640, 8640],
  ];

  clearMap(map);

  L.imageOverlay(imageUrl, imageBounds).addTo(map);

  map.setMaxBounds(imageBounds);
  map.setView([4320, 4320], minZoom);

  addBodies(map, systemData);
  // addPlaces(map, systemData);
}

export function addBodies(map, systemData) {
  const orbits = systemData.orbits;
  const mapCenter = map.latLngToContainerPoint(map.getCenter());

  for (const orbit in orbits) {
    const orbitData = orbits[orbit];
    const bodyDiameter = orbitData.diametro * systemData.scale * systemData.bodyScale;
    if (bodyDiameter > 0) {
      const raioOrbita = (orbitData.diametroOrbita * systemData.scale) / 8;
      const x =
        mapCenter.x +
        raioOrbita * Math.cos((orbitData.grau - 90) * (Math.PI / 180));
      const y =
        mapCenter.y +
        raioOrbita * Math.sin((orbitData.grau - 90) * (Math.PI / 180));

      const latLng = map.containerPointToLatLng(L.point(x, y));

      var html = `
      <div style="width: ${bodyDiameter}px; height: ${bodyDiameter}px; background-color: ${orbitData.cor}; border-radius: 50%; position: relative;">
        <div style="position: absolute; top: -50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 12px;">
          ${orbitData.name}
        </div>
      </div>`;

      // Criar um ícone personalizado para o marcador
      const markerIcon = L.divIcon({
        className: "custom-marker",
        html: html,
        iconSize: [bodyDiameter, bodyDiameter],
        iconAnchor: [bodyDiameter / 2, bodyDiameter / 2],
      });

      const marker = L.marker(latLng, { icon: markerIcon }).bindPopup(
        orbitData.name
      );
      bodiesLayer.addLayer(marker);
    }
  }
}

function resizeBodiesIcons(map, zoomMultiplier) {
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker && bodiesLayer.hasLayer(layer)) {
          var icon = layer.options.icon;
          var iconSize = icon.options.iconSize;
          if (iconSize) {
            var newSize = [
              iconSize[0] * zoomMultiplier,
              iconSize[1] * zoomMultiplier,
            ];
            var newAnchor = [newSize[0] / 2, newSize[1] / 2];
            icon.options.iconSize = newSize;
            icon.options.iconAnchor = newAnchor;
            var popupContent = layer.getPopup()
              ? layer.getPopup().getContent()
              : "";
            layer.setIcon(icon);

            var html = `
            <div style="width: ${newSize[0]}px; height: ${newSize[1]}px; background-color: ${
              icon.options.html.match(/background-color:\s*(.*?);/)[1]
            }; border-radius: 50%; position: relative;">
              <div style="position: absolute; top: -50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 12px;">
                ${popupContent}
              </div>
            </div>`;
            icon.options.html = html;
            layer.setIcon(icon);
          }
    }
  });
}

export function addPlaces(map, systemData) {
  const orbits = systemData.orbits;
  const mapCenter = map.latLngToContainerPoint(map.getCenter());
  const markersData = []; // Array para armazenar os dados dos marcadores

  for (const orbit in orbits) {
    const orbitData = orbits[orbit];
    const orbitPlaces = orbitData.places;
    for (const place in orbitPlaces) {
      const placeData = orbitPlaces[place];

      const raioOrbita = (orbitData.diametroOrbita * systemData.scale) / 8;
      const x =
        mapCenter.x +
        placeData.xOffset / 8 +
        raioOrbita * Math.cos((orbitData.grau - 90) * (Math.PI / 180));
      const y =
        mapCenter.y +
        placeData.yOffset / 8 +
        raioOrbita * Math.sin((orbitData.grau - 90) * (Math.PI / 180));

      const latLng = map.containerPointToLatLng(L.point(x, y));

      const marker = L.marker(latLng).bindPopup(placeData.name);
      placesLayer.addLayer(marker);
    }
  }
  systemData.markersData = markersData;
}

export function clearMap() {
  resetMap();
}

export function resetMap() {
  const mapContainer = document.getElementById("mapContainer");
  mapContainer.innerHTML = ""; // Remove o conteúdo existente

  const newMapDiv = document.createElement("div");
  newMapDiv.id = "map";
  mapContainer.appendChild(newMapDiv); // Adiciona um novo div com o id "map"

  map = map = L.map("map", {
    crs: L.CRS.Simple,
    minZoom: minZoom,
  });

  bodiesLayer = L.layerGroup().addTo(map);
  placesLayer = L.layerGroup().addTo(map);

  // Event listener for zoom end
  map.on("zoomend", function () {
    // Calcula o multiplicador com base na diferença de zoom
    var zoomDifference = map.getZoom() - currentZoom;
    var zoomMultiplier = Math.pow(1.5, zoomDifference);

    // Atualiza o nível de zoom atual
    currentZoom = map.getZoom();

    // Redimensiona os ícones dos marcadores
    resizeBodiesIcons(map, zoomMultiplier);
  });
}
