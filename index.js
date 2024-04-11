var map = L.map("map", {
    crs: L.CRS.Simple,
    minZoom: -3, // ajusta o zoom inicial, se necessário
  });

  let markersLayer = L.layerGroup().addTo(map);
  let selectedImage = 

  function getLastSaturday() {
    var today = new Date();
    if (today < new Date(2024, 5, 8)) {
      today = new Date(2024, 5, 8);
    }
    var day = today.getDay();
    var diff = today.getDate() - day + (day === 0 ? -6 : day > 6 ? 6 : -1); // ajuste para obter o último sábado
    return new Date(today.setDate(diff)).toISOString().split("T")[0];
  }

  document.querySelectorAll(".navbar-item").forEach((item) => {
    item.addEventListener("click", async function () {
      selectedJson = this.getAttribute("data-json");
      await updateSystemData(selectedJson);
      updateMap(ctx, canvas, systemData);
    });
  });

  // Função para atualizar a imagem com base na opção selecionada
  function updateImage(event) {
    var target = event.target;
    var dataImage = target.getAttribute("data-image");

    if (dataImage.includes("Sol")) {
      var lastSaturday = getLastSaturday();
      var year = lastSaturday.slice(0, 4);
      var month = lastSaturday.slice(5, 7);
      var day = lastSaturday.slice(8, 10);
      var url = `${dataImage}Resources/${dataImage}-${day}_${month}_${
        parseInt(year) + 200
      }`;

      var imageUrl = url + ".png";
      var jsonUrl = url + ".json";
    } else {
      var imageUrl = `Legacy/${dataImage}.png`;
      var jsonUrl = `Legacy/${dataImage}.json`;
    }

    var imageBounds = [
      [0, 0],
      [8640, 8640],
    ]; // ajusta a altura e largura da imagem

    map.eachLayer(function (layer) {
      if (layer instanceof L.ImageOverlay) {
        map.removeLayer(layer);
      }
    });

    L.imageOverlay(imageUrl, imageBounds).addTo(map);
    map.setMaxBounds(imageBounds);
    map.setView([4320, 4320], -3);

    let placesData = {}
    addMarkers(map, placesData);
  }

  // Adiciona evento de clique a cada item da navbar
  var navbarItems = document.querySelectorAll(".navbar-item");
  navbarItems.forEach(function (item) {
    item.addEventListener("click", updateImage);
  });

  // Define a imagem inicial como "Sistema Solar Interior"
  var defaultImage = document.querySelector(
    '.navbar-item[data-image="SolInterior"]'
  );
  updateImage({ target: defaultImage });

  function addMarkers(map, placesData) {
    clearMap(map);

    //   for (const place in placesData) {
        // const placeData = placesData[place];

        const latLng = map.containerPointToLatLng(L.point(922.125, 213.125));

        const marker = L.marker(latLng).bindPopup("placeData.name");
        markersLayer.addLayer(marker);
    //   }
  }

  function clearMap(map) {
    markersLayer.clearLayers();

    map.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  }