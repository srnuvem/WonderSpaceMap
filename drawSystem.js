

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


function drawBody(ctx, canvas, orbit) {

    const { diametroOrbita, cor, grau, diametro, corTexto } = orbit;

    const raioOrbita = diametroOrbita / 8;
    const x = canvas.width / 2 + raioOrbita * Math.cos((grau - 90) * (Math.PI / 180));
    const y = canvas.height / 2 + raioOrbita * Math.sin((grau - 90) * (Math.PI / 180));

    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(x, y, diametro, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = corTexto;
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(orbit.name, x, y - 1);
    
}

function drawGuideLine(ctx, canvas, orbit) {
    const { diametroOrbita, cor, grau } = orbit;

    const raioOrbita = diametroOrbita / 8;
    const x = canvas.width / 2 + raioOrbita * Math.cos((grau - 90) * (Math.PI / 180));
    const y = canvas.height / 2 + raioOrbita * Math.sin((grau - 90) * (Math.PI / 180));

    ctx.strokeStyle = cor;
    ctx.setLineDash([5, 2]); // 5 é o tamanho do traço, 5 é o espaço entre traços
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, raioOrbita, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawMarkers(ctx, canvas, orbit) {
    const divisores = orbit.divisores;
  
    for (let i = 0; i < divisores; i++) {
      const angulo = (360 / divisores) * i;
  
      const { diametroOrbita, cor } = orbit;
      const grau = angulo;
  
      const lineSize = 4;
      const midSize = lineSize / 2;
  
      const raioOrbita = diametroOrbita / 8;
      const x = canvas.width / 2 + raioOrbita * Math.cos((grau - 90) * (Math.PI / 180));
      const y = canvas.height / 2 + raioOrbita * Math.sin((grau - 90) * (Math.PI / 180));
  
      const inicioX = x - midSize * Math.cos((grau - 90) * (Math.PI / 180));
      const inicioY = y - midSize * Math.sin((grau - 90) * (Math.PI / 180));
  
      const fimX = inicioX + lineSize * Math.cos((grau - 90) * (Math.PI / 180));
      const fimY = inicioY + lineSize * Math.sin((grau - 90) * (Math.PI / 180));
  
      ctx.strokeStyle = cor;
      ctx.setLineDash([]); // 5 é o tamanho do traço, 5 é o espaço entre traços
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(inicioX, inicioY);
      ctx.lineTo(fimX, fimY);
      ctx.stroke();
    }
  }



function drawAsteroids(ctx, canvas, orbit) {
    const numAsteroids = 4000; // Número de asteroides a serem desenhados
    const asteroidSize = 27 / 16
    const raioBelt = orbit.diametroOrbita / 8; // Raio da órbita
    if (raioBelt) {

        const cor = orbit.cor; // Cor dos asteroides

        ctx.fillStyle = cor;


        for (let i = 0; i < numAsteroids; i++) {
            // Gerar uma posição aleatória ao longo da órbita
            const angulo = Math.random() * 360;
            const raioVariacao = Math.random() * 27; // Variacao aleatoria de até 5 pixels para cima ou para baixo
            const raioFinal = raioBelt + raioVariacao - 27 / 2;
            const x = canvas.width / 2 + raioFinal * Math.cos((angulo - 90) * (Math.PI / 180));
            const y = canvas.height / 2 + raioFinal * Math.sin((angulo - 90) * (Math.PI / 180));

            // Desenhar o asteroide
            ctx.fillRect(x, y, asteroidSize, asteroidSize);
        }
    }
}

function drawPrimary(ctx, canvas, primary) {
    const { diametroOrbita, cor, grau, diametro } = primary;

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

export function draw(ctx, canvas, orbits, primary) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawStars(ctx, canvas);
    drawHeaderText(ctx, canvas)

    drawAsteroids(ctx, canvas, orbits["Asteroid Belt"]);
    drawAsteroids(ctx, canvas, orbits["Kuiper Belt"]);
    console.log(orbits)
    
    for (const orbit in orbits) {
        drawGuideLine(ctx, canvas, orbits[orbit])
        if (orbit.diametro !== 0) {
            drawBody(ctx, canvas, orbits[orbit]);
        }
        drawMarkers(ctx, canvas, orbits[orbit]);

    }
    drawPrimary(ctx, canvas, primary);
}