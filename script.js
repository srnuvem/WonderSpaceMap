import { draw } from './drawSystem.js';

const dateInput = document.getElementById('dateInput');
const dateSlider = document.getElementById('dateSlider');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const primary = { "name": "Sol","cor": "#FFB703", "corTexto": "#FFFFFF", "grau": 0, "divisores": 0, "diametroOrbita": 9.36 , "diametro": 10 , "grauPorDia": 0, "grauBase": 0 }

const orbits = {
    "GuideLine1": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 12, "diametroOrbita": 40 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "GuideLine2": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 18, "diametroOrbita": 60 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "GuideLine3": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 24, "diametroOrbita": 80 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "GuideLine4": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 30, "diametroOrbita": 100 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "Mercury": { "name": "Mercúrio","cor": "#FF8D02", "corTexto": "#FFFFFF", "grau": 0, "divisores": 36, "diametroOrbita": 120 , "diametro": 0.55 , "grauPorDia": 4.09, "grauBase": 0 },
    "GuideLine5": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 42, "diametroOrbita": 140 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "Venus": { "name": "Vênus","cor": "#CF9311", "corTexto": "#FFFFFF", "grau": 60, "divisores": 48, "diametroOrbita": 160 , "diametro": 0.87 , "grauPorDia": 1.60, "grauBase": 60 },
    "GuideLine6": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 54, "diametroOrbita": 180 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "Earth": { "name": "Terra","cor": "#0274FF", "corTexto": "#FFFFFF", "grau": 300, "divisores": 60, "diametroOrbita": 200 , "diametro": 0.90 , "grauPorDia": 0.99, "grauBase": 300 },
    "GuideLine7": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 66, "diametroOrbita": 220 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "Mars": { "name": "Marte","cor": "#FD4902", "corTexto": "#FFFFFF", "grau": 60, "divisores": 72, "diametroOrbita": 240 , "diametro": 0.65 , "grauPorDia": 0.52, "grauBase": 60 },

    "GuideLine8": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 42, "diametroOrbita": 280 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "Vesta": { "name": "Vesta","cor": "lightgray", "corTexto": "#FFFFFF", "grau": 300, "divisores": 48, "diametroOrbita": 320 , "diametro": 0.18 , "grauPorDia": 0.214, "grauBase": 300 },
    "Asteroid Belt": { "name": "Cinturão de Asteroides","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 48, "diametroOrbita": 320 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "Pallas": { "name": "Pallas","cor": "lightgray", "corTexto": "#FFFFFF", "grau": 210, "divisores": 48, "diametroOrbita": 320 , "diametro": 0.18 , "grauPorDia": 0.214, "grauBase": 210 },
    "Ceres": { "name": "Ceres","cor": "lightgray", "corTexto": "#FFFFFF", "grau": 120, "divisores": 48, "diametroOrbita": 320 , "diametro": 0.24 , "grauPorDia": 0.214, "grauBase": 120 },
    "GuideLine9": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 54, "diametroOrbita": 360 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "GuideLine10": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 60, "diametroOrbita": 400 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "Jupiter": { "name": "Júpiter","cor": "#FFCF54", "corTexto": "#000000", "grau": 180, "divisores": 66, "diametroOrbita": 440 , "diametro": 2.97 , "grauPorDia": 0.083, "grauBase": 180 },

    "GuideLine12": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 39, "diametroOrbita": 520 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "Saturno": { "name": "Saturno","cor": "#FFE9B3", "corTexto": "#000000", "grau": 270, "divisores": 45, "diametroOrbita": 600 , "diametro": 2.71 , "grauPorDia": 0.033, "grauBase": 270 },
    "GuideLine15": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 51, "diametroOrbita": 680 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "GuideLine17": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 57, "diametroOrbita": 760 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "GuideLine19": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 63, "diametroOrbita": 840 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "Urano": { "name": "Urano","cor": "#01AD82", "corTexto": "#000000", "grau": 330, "divisores": 69, "diametroOrbita": 920 , "diametro": 1.79 , "grauPorDia": 0.012, "grauBase": 330 },
    "GuideLine22": { "name": "","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 75, "diametroOrbita": 1000 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },
    "Netuno": { "name": "Netuno","cor": "#1842FF", "corTexto": "#FFFFFF", "grau": 90, "divisores": 81, "diametroOrbita": 1080 , "diametro": 1.76 , "grauPorDia": 0.006, "grauBase": 90 },

    "Kuiper Belt": { "name": "Cinturão de Kuiper","cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 87, "diametroOrbita": 1160 , "diametro": 0 , "grauPorDia": 0, "grauBase": 0 },

    "Pluto and Haumea": { "name": "Plutão e Haumea","cor": "#CCB99A", "corTexto": "#FFFFFF", "grau": 0, "divisores": 93, "diametroOrbita": 1240 , "diametro": 0.39 , "grauPorDia": 0.004, "grauBase": 0 },
    "Haumea": { "name": "","cor": "#CCB99A", "corTexto": "#FFFFFF", "grau": 0.4, "divisores": 0, "diametroOrbita": 1240 , "diametro": 0.35 , "grauPorDia": 0.006, "grauBase": .4 },
    "Eris": { "name": "Eris","cor": "#808080", "corTexto": "#FFFFFF", "grau": 60, "divisores": 0, "diametroOrbita": 1240 , "diametro": 0.38 , "grauPorDia": 0.002, "grauBase": 60 },
    "Makemake": { "name": "Makemake","cor": "#808080", "corTexto": "#FFFFFF", "grau": 320, "divisores": 0, "diametroOrbita": 1240 , "diametro": 0.30 , "grauPorDia": 0.005, "grauBase": 320 },
};


dateSlider.addEventListener('input', function () {
    const sliderValue = parseInt(dateSlider.value);
    const diaInicio = new Date(2224, 5, 1);
    const selectedDate = new Date(diaInicio.getTime() + sliderValue * 7 * 24 * 60 * 60 * 1000);

    // Atualize o texto da data no input text
    dateInput.value = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

    const event = new Event('change');
    dateInput.dispatchEvent(event);

    updatePositions(sliderValue);
});

dateInput.addEventListener('change', function () {
    const selectedDate = dateInput.value + "";
    updatePositions(selectedDate);
});

document.addEventListener('DOMContentLoaded', function () {
    // Defina o campo de texto para a data "01/06/2224"
    const dateInput = document.getElementById('dateInput');
    dateInput.value = '01/06/2224';

    // Defina o slider para a posição zero
    const dateSlider = document.getElementById('dateSlider');
    dateSlider.value = 0;
});

function saveImage() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'orbitas_celestes_4k.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day); // month - 1 porque os meses no objeto Date são 0-indexados
}

function updatePositions(dateText) {
    const diaInicio = new Date(2224, 5, 1);
    const selectedDate = parseDate(dateText)
    const diasPassados = (selectedDate - diaInicio) / (1000 * 60 * 60 * 24);
    // console.log(diasPassados)

    for (const astro in orbits) {
        if (astro !== "Sol" && !astro.includes("GuideLine")) {
            const grauDias = orbits[astro].grauPorDia;
            console.log(grauDias * diasPassados)
            const grau = (diasPassados * grauDias) < 360 ? (diasPassados * grauDias) : (diasPassados * grauDias) % 360;
            orbits[astro].grau = orbits[astro].grauBase + (grau * -1);
        }
    }

    // Redraw celestial bodies with updated positions
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    draw(ctx, canvas, orbits, primary);
}

document.getElementById("saveButton").addEventListener("click", saveImage);

draw(ctx, canvas, orbits, primary);