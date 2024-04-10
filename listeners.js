import { updateMap } from './script.js';

const dateInput = document.getElementById('dateInput');
const dateSlider = document.getElementById('dateSlider');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let selectedJson = 'sun';
let systemData = await getSystemData(selectedJson)

document.addEventListener('DOMContentLoaded', function () {
    // Defina o campo de texto para a data "01/06/2224"
    const dateInput = document.getElementById('dateInput');
    dateInput.value = '01/06/2224';

    // Defina o slider para a posição zero
    const dateSlider = document.getElementById('dateSlider');
    dateSlider.value = 0;
});


dateSlider.addEventListener('input', function () {
    const sliderValue = parseInt(dateSlider.value);
    const diaInicio = new Date(2224, 5, 1);
    const selectedDate = new Date(diaInicio.getTime() + sliderValue * 7 * 24 * 60 * 60 * 1000);
    dateInput.value = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

    const event = new Event('change');
    dateInput.dispatchEvent(event);

    updatePositions(sliderValue);
});

dateInput.addEventListener('change', function () {
    const selectedDate = dateInput.value + "";
    updatePositions(selectedDate);
});

document.getElementById("saveButton").addEventListener("click", saveImage);



export async function getSystemData(selectedJson) {
    let systemData = {}

    await fetch(`json/${selectedJson}.json`)
        .then(response => response.json())
        .then(data => {
            systemData = data
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    return systemData
}

export async function updateSystemData(selectedJson) {
    systemData = await getSystemData(selectedJson);
}


document.querySelectorAll('.navbar-item').forEach(item => {
    item.addEventListener('click', async function () {
        selectedJson = this.getAttribute('data-json');
        await updateSystemData(selectedJson);
        updateMap(ctx, canvas, systemData);
    });
});

function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day); // month - 1 porque os meses no objeto Date são 0-indexados
}


export function saveImage() {
    const dataURL = canvas.toDataURL('image/svg');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'orbitas_celestes_4k.svg'; //make that generate a svg
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


export async function updatePositions(dateText) {
    const diaInicio = new Date(2224, 5, 1);
    const selectedDate = parseDate(dateText)
    const diasPassados = (selectedDate - diaInicio) / (1000 * 60 * 60 * 24);
    for (const orbit in systemData.orbits) {
        const grauDias = systemData.orbits[orbit].grauPorDia;
        const grau = (diasPassados * grauDias) < 360 ? (diasPassados * grauDias) : (diasPassados * grauDias) % 360;
        systemData.orbits[orbit].grau = systemData.orbits[orbit].grauBase + (grau * -1);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateMap(ctx, canvas, systemData);
}

document.querySelectorAll('.navbar-item').forEach(item => {
    item.addEventListener('click', async function () {
        selectedJson = this.getAttribute('data-json');
        await updateSystemData(selectedJson);
        updateMap(ctx, canvas, systemData);
    });
});