const dateInput = document.getElementById('dateInput');

const dateSlider = document.getElementById('dateSlider');
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

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// const fator = canvas.width / 960
const fator = canvas.width / 480 * 1.5

const astros = {
    "Sol": { "cor": "#FFB703", "corTexto": "#FFFFFF", "grau": 0, "divisores": 0, "diametroOrbita": 9.36 * fator, "diametro": 10 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Orientacao1": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 12, "diametroOrbita": 40 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Orientacao2": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 18, "diametroOrbita": 60 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Orientacao3": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 24, "diametroOrbita": 80 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Orientacao4": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 30, "diametroOrbita": 100 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Mercúrio": { "cor": "#FF8D02", "corTexto": "#FFFFFF", "grau": 0, "divisores": 36, "diametroOrbita": 120 * fator, "diametro": 0.55 * fator, "grauPorDia": 4.09, "grauBase": 0 },
    "Orientacao5": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 42, "diametroOrbita": 140 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Vênus": { "cor": "#CF9311", "corTexto": "#FFFFFF", "grau": 60, "divisores": 48, "diametroOrbita": 160 * fator, "diametro": 0.87 * fator, "grauPorDia": 1.60, "grauBase": 60 },
    "Orientacao6": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 54, "diametroOrbita": 180 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Terra": { "cor": "#0274FF", "corTexto": "#FFFFFF", "grau": 300, "divisores": 60, "diametroOrbita": 200 * fator, "diametro": 0.90 * fator, "grauPorDia": 0.99, "grauBase": 300 },
    "Orientacao7": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 66, "diametroOrbita": 220 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Marte": { "cor": "#FD4902", "corTexto": "#FFFFFF", "grau": 60, "divisores": 72, "diametroOrbita": 240 * fator, "diametro": 0.65 * fator, "grauPorDia": 0.52, "grauBase": 60 },

    "Orientacao8": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 42, "diametroOrbita": 280 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Vesta": { "cor": "lightgray", "corTexto": "#FFFFFF", "grau": 300, "divisores": 48, "diametroOrbita": 320 * fator, "diametro": 0.18 * fator, "grauPorDia": 0.214, "grauBase": 300 },
    "Orientacao Cinturão de Asteroides": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 330, "divisores": 48, "diametroOrbita": 320 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Pallas": { "cor": "lightgray", "corTexto": "#FFFFFF", "grau": 210, "divisores": 48, "diametroOrbita": 320 * fator, "diametro": 0.18 * fator, "grauPorDia": 0.214, "grauBase": 210 },
    "Ceres": { "cor": "lightgray", "corTexto": "#FFFFFF", "grau": 120, "divisores": 48, "diametroOrbita": 320 * fator, "diametro": 0.24 * fator, "grauPorDia": 0.214, "grauBase": 120 },
    "Orientacao9": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 54, "diametroOrbita": 360 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Orientacao10": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 60, "diametroOrbita": 400 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Júpiter": { "cor": "#FFCF54", "corTexto": "#000000", "grau": 180, "divisores": 66, "diametroOrbita": 440 * fator, "diametro": 2.97 * fator, "grauPorDia": 0.083, "grauBase": 180 },

    "Orientacao12": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 39, "diametroOrbita": 520 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Saturno": { "cor": "#FFE9B3", "corTexto": "#000000", "grau": 270, "divisores": 45, "diametroOrbita": 600 * fator, "diametro": 2.71 * fator, "grauPorDia": 0.033, "grauBase": 270 },
    "Orientacao15": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 51, "diametroOrbita": 680 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Orientacao17": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 57, "diametroOrbita": 760 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Orientacao19": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 63, "diametroOrbita": 840 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Urano": { "cor": "#01AD82", "corTexto": "#000000", "grau": 330, "divisores": 69, "diametroOrbita": 920 * fator, "diametro": 1.79 * fator, "grauPorDia": 0.012, "grauBase": 330 },
    "Orientacao22": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 75, "diametroOrbita": 1000 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },
    "Netuno": { "cor": "#1842FF", "corTexto": "#FFFFFF", "grau": 90, "divisores": 81, "diametroOrbita": 1080 * fator, "diametro": 1.76 * fator, "grauPorDia": 0.006, "grauBase": 90 },

    "Orientacao Cinturão de Kuiper": { "cor": "gray", "corTexto": "#FFFFFF", "grau": 0, "divisores": 87, "diametroOrbita": 1160 * fator, "diametro": 0 * fator, "grauPorDia": 0, "grauBase": 0 },

    "Plutão e Haumea": { "cor": "#CCB99A", "corTexto": "#FFFFFF", "grau": 0, "divisores": 93, "diametroOrbita": 1240 * fator, "diametro": 0.39 * fator, "grauPorDia": 0.004, "grauBase": 0 },
    "Sistema Haumea": { "cor": "#CCB99A", "corTexto": "#FFFFFF", "grau": 0.4, "divisores": 0, "diametroOrbita": 1240 * fator, "diametro": 0.35 * fator, "grauPorDia": 0.006, "grauBase": .4 },
    "Eris": { "cor": "#808080", "corTexto": "#FFFFFF", "grau": 60, "divisores": 0, "diametroOrbita": 1240 * fator, "diametro": 0.38 * fator, "grauPorDia": 0.002, "grauBase": 60 },
    "Makemake": { "cor": "#808080", "corTexto": "#FFFFFF", "grau": 320, "divisores": 0, "diametroOrbita": 1240 * fator, "diametro": 0.30 * fator, "grauPorDia": 0.005, "grauBase": 320 },
};

function drawHeaderText(ctx, canvas) {
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('Wonder Space', canvas.width - 20, 20);

    ctx.font = '36px Arial';
    ctx.fillText('Sistema Solar' + dateInput.value, canvas.width - 20, 80);
    ctx.fillText('Marcações:', canvas.width - 300, 180);
    ctx.fillText('10Gh até Marte', canvas.width - 20, 220);
    ctx.fillText('20Gh até Jupiter', canvas.width - 20, 270);
    ctx.fillText('40Gh até Plutão', canvas.width - 20, 320);
}

function drawStars(ctx, canvas) {
    const numStars = 1000;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';

    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillRect(x, y, 2, 2);
    }
}


function drawBody(ctx, canvas, astro) {
    const { diametroOrbita, cor, grau, diametro, corTexto } = astros[astro];

    const raioOrbita = diametroOrbita / 8;
    const x = canvas.width / 2 + raioOrbita * Math.cos((grau - 90) * (Math.PI / 180));
    const y = canvas.height / 2 + raioOrbita * Math.sin((grau - 90) * (Math.PI / 180));

    ctx.strokeStyle = cor;
    ctx.setLineDash([5, 2]); // 5 é o tamanho do traço, 5 é o espaço entre traços
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, raioOrbita, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(x, y, diametro, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = corTexto;
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    if (!astro.includes("Sistema")) {
        ctx.fillText(astro, x, y - 1 * fator);
    }
}

function drawGuideLine(ctx, canvas, astro) {
    const { orbitDiameter, color, currentDegree } = astros[astro];

    const radius = orbitDiameter / 8;
    const x = canvas.width / 2 + radius * Math.cos((currentDegree - 90) * (Math.PI / 180));
    const y = canvas.height / 2 + radius * Math.sin((currentDegree - 90) * (Math.PI / 180));

    ctx.strokeStyle = color;
    ctx.setLineDash([5, 2]);
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
    ctx.stroke();
}


function drawMarkers(ctx, canvas, astro) {
    const { orbitDivisions, orbitDiameter, color } = astros[astro];

    for (let i = 0; i < orbitDivisions; i++) {
        const angle = (360 / orbitDivisions) * i;

        const radius = orbitDiameter / 8;
        const x = canvas.width / 2 + radius * Math.cos((angle - 90) * (Math.PI / 180));
        const y = canvas.height / 2 + radius * Math.sin((angle - 90) * (Math.PI / 180));

        const lineSize = fator / 4;
        const midSize = lineSize / 2;

        const startX = x - midSize * Math.cos((angle - 90) * (Math.PI / 180));
        const startY = y - midSize * Math.sin((angle - 90) * (Math.PI / 180));

        const endX = startX + lineSize * Math.cos((angle - 90) * (Math.PI / 180));
        const endY = startY + lineSize * Math.sin((angle - 90) * (Math.PI / 180));

        ctx.strokeStyle = color;
        ctx.setLineDash([]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
}


function drawAsteroids(ctx, canvas) {
    const numAsteroids = 4000; // Número de asteroides a serem desenhados
    const asteroidSize = fator / 16
    const raioBelt = astros["Orientacao Cinturão de Asteroides"]?.diametroOrbita / 8; // Raio da órbita
    if (raioBelt) {

        const cor = astros["Orientacao Cinturão de Asteroides"].cor; // Cor dos asteroides

        ctx.fillStyle = cor;


        for (let i = 0; i < numAsteroids; i++) {
            // Gerar uma posição aleatória ao longo da órbita
            const angulo = Math.random() * 360;
            const raioVariacao = Math.random() * fator; // Variacao aleatoria de até 5 pixels para cima ou para baixo
            const raioFinal = raioBelt + raioVariacao - fator / 2;
            const x = canvas.width / 2 + raioFinal * Math.cos((angulo - 90) * (Math.PI / 180));
            const y = canvas.height / 2 + raioFinal * Math.sin((angulo - 90) * (Math.PI / 180));

            // Desenhar o asteroide
            ctx.fillRect(x, y, asteroidSize, asteroidSize);
        }
    }
}

function drawKuiper(ctx, canvas) {
    const numAsteroids = 4000; // Número de asteroides a serem desenhados
    const asteroidSize = fator / 16
    const raioKuiper = astros["Orientacao Cinturão de Kuiper"]?.diametroOrbita / 8; // Raio da órbita
    if (raioKuiper) {

        const cor = astros["Orientacao Cinturão de Kuiper"].cor; // Cor dos asteroides

        ctx.fillStyle = cor;

        for (let i = 0; i < numAsteroids; i++) {
            // Gerar uma posição aleatória ao longo da órbita
            const angulo = Math.random() * 360;
            const raioVariacao = Math.random() * fator; // Variacao aleatoria de até 5 pixels para cima ou para baixo
            const raioFinal = raioKuiper + raioVariacao - fator / 2;
            const x = canvas.width / 2 + raioFinal * Math.cos((angulo - 90) * (Math.PI / 180));
            const y = canvas.height / 2 + raioFinal * Math.sin((angulo - 90) * (Math.PI / 180));

            // Desenhar o asteroide
            ctx.fillRect(x, y, asteroidSize, asteroidSize);
        }
    }
}

function saveImage() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'orbitas_celestes_4k.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function drawSun(ctx, canvas) {
    const { diametroOrbita, cor, grau, diametro } = astros["Sol"];

    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, diametro, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = "84px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Sol", canvas.width / 2, canvas.height / 2
    );
}

function draw(ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawStars(ctx, canvas); // Chamar drawStars() por último
    drawHeaderText(ctx, canvas)
    drawAsteroids(ctx, canvas);
    drawKuiper(ctx, canvas);
    for (const astro in astros) {
        if (astro !== "Sol") {
            if (astro.includes("Orientacao")) {
                drawGuideLine(ctx, canvas, astro)
            } else {
                drawBody(ctx, canvas, astro);
            }
            drawMarkers(ctx, canvas, astro);
        }
    }
    drawSun(ctx, canvas);
}

draw(ctx, canvas);

function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day); // month - 1 porque os meses no objeto Date são 0-indexados
}

function updatePositions(dateText) {
    const diaInicio = new Date(2224, 5, 1);
    const selectedDate = parseDate(dateText)
    const diasPassados = (selectedDate - diaInicio) / (1000 * 60 * 60 * 24);
    // console.log(diasPassados)

    for (const astro in astros) {
        if (astro !== "Sol" && !astro.includes("Orientacao")) {
            const grauDias = astros[astro].grauPorDia;
            console.log(grauDias * diasPassados)
            const grau = (diasPassados * grauDias) < 360 ? (diasPassados * grauDias) : (diasPassados * grauDias) % 360;
            astros[astro].grau = astros[astro].grauBase + (grau * -1);
        }
    }

    // Redraw celestial bodies with updated positions
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    draw();
}

document.getElementById("saveButton").addEventListener("click", saveImage);

function saveImage(date) {
    updatePositions(date);

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `Sol-${date}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById("saveButton").addEventListener("click", function () {
    const startDate = new Date(2224, 5, 1);
    for (let i = 0; i < 52; i++) {
        const selectedDate = new Date(startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
        const formattedDate = selectedDate.toLocaleDateString('pt-BR');
        saveImage(formattedDate);
    }




});