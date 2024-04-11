import { draw } from "./drawSystem.js";
import { getSystemData } from "./listeners.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

var map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -3,
});
let markersLayer = L.layerGroup().addTo(map);

let systemData = await getSystemData("sun");

updateMap(ctx, canvas, systemData);

export function updateMap(ctx, canvas, systemData) {
  draw(ctx, canvas, systemData);

  var imageUrl = canvas.toDataURL();

  var imageBounds = [
    [0, 0],
    [8640, 8640],
  ];

  clearMap(map);

  L.imageOverlay(imageUrl, imageBounds).addTo(map);

  map.setMaxBounds(imageBounds);
  map.setView([4320, 4320], -3);

  addMarkers(map, systemData);
}

export function addMarkers(map, systemData) {
  clearMap(map);

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
      markersLayer.addLayer(marker);

      // Adiciona os dados do marcador ao array
      markersData.push({
        orbit: orbit,
        name: placeData.name,
        latlng: { lat: latLng.lat, lng: latLng.lng },
      });
    }
  }
  systemData.markersData = markersData;
}


export function clearMap(map) {
  markersLayer.clearLayers();

  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
}
