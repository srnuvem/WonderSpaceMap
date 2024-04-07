function drawHeaderText(ctx, canvas, name) {
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('Wonder Space', canvas.width - 20, 20);

    ctx.font = '36px Arial';
    ctx.fillText(`${name} ${dateInput.value}`, canvas.width - 20, 80);
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


function drawBody(ctx, canvas, orbit, scale, bodyScale) {

    const { diametroOrbita, cor, grau, diametro, corTexto } = orbit;

    const raioOrbita = diametroOrbita * scale ;
    const x = canvas.width / 2 + raioOrbita * Math.cos((grau - 90) * (Math.PI / 180));
    const y = canvas.height / 2 + raioOrbita * Math.sin((grau - 90) * (Math.PI / 180));

    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(x, y, diametro * scale * bodyScale, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = corTexto;
    ctx.font = `${scale * bodyScale}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(orbit.name, x, y - bodyScale * scale);
    
}

function drawGuideLine(ctx, canvas, orbit, scale) {
    const { diametroOrbita, cor, grau } = orbit;

    const raioOrbita = diametroOrbita * scale ;
    const x = canvas.width / 2 + raioOrbita * Math.cos((grau - 90) * (Math.PI / 180));
    const y = canvas.height / 2 + raioOrbita * Math.sin((grau - 90) * (Math.PI / 180));

    ctx.strokeStyle = cor;
    ctx.setLineDash([8, 2]);
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, raioOrbita, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawMarkers(ctx, canvas, orbit, scale) {
    const divisores = orbit.divisores;
  
    for (let i = 0; i < divisores; i++) {
      const angulo = (360 / divisores) * i;
  
      const { diametroOrbita, cor } = orbit;
      const grau = angulo;
  
      const lineSize = 9;
      const midSize = lineSize / 2;
  
      const raioOrbita = diametroOrbita * scale ;
      const x = canvas.width / 2 + raioOrbita * Math.cos((grau - 90) * (Math.PI / 180));
      const y = canvas.height / 2 + raioOrbita * Math.sin((grau - 90) * (Math.PI / 180));
  
      const inicioX = x - midSize * Math.cos((grau - 90) * (Math.PI / 180));
      const inicioY = y - midSize * Math.sin((grau - 90) * (Math.PI / 180));
  
      const fimX = inicioX + lineSize * Math.cos((grau - 90) * (Math.PI / 180));
      const fimY = inicioY + lineSize * Math.sin((grau - 90) * (Math.PI / 180));
  
      ctx.strokeStyle = cor;
      ctx.setLineDash([]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(inicioX, inicioY);
      ctx.lineTo(fimX, fimY);
      ctx.stroke();
    }
  }



function drawAsteroids(ctx, canvas, orbit, scale) {
    const numAsteroids = 4000; 
    const asteroidSize = 2;
    const raioBelt = orbit?.diametroOrbita * scale ; 
    if (raioBelt) {

        const cor = orbit.cor; 

        ctx.fillStyle = cor;


        for (let i = 0; i < numAsteroids; i++) {
            const angulo = Math.random() * 360;
            const raioVariacao = Math.random() * scale*6;
            const raioFinal = raioBelt + raioVariacao - scale*6 / 2;
            const x = canvas.width / 2 + raioFinal * Math.cos((angulo - 90) * (Math.PI / 180));
            const y = canvas.height / 2 + raioFinal * Math.sin((angulo - 90) * (Math.PI / 180));

            ctx.fillRect(x, y, asteroidSize, asteroidSize);
        }
    }
}

function drawPrimary(ctx, canvas, primary, scale, bodyScale) {
    const { cor, diametro } = primary

    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, diametro * scale * bodyScale, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = `${bodyScale * scale * 5 }px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(primary.name, canvas.width / 2, canvas.height / 2
    );
}

export function draw(ctx, canvas, systemData) {
    const { name, orbits, scale, bodyScale, primary} = systemData;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawStars(ctx, canvas);
    drawHeaderText(ctx, canvas, name)

    drawAsteroids(ctx, canvas, orbits["Asteroid Belt"], scale);
    drawAsteroids(ctx, canvas, orbits["Kuiper Belt"], scale);
    
    for (const orbit in orbits) {
        drawGuideLine(ctx, canvas, orbits[orbit], scale)
        drawMarkers(ctx, canvas, orbits[orbit], scale);
        if (parseInt(orbit.diametro) != 0) {
            drawBody(ctx, canvas, orbits[orbit], scale, bodyScale);
        }

    }
    drawPrimary(ctx, canvas, primary, scale, bodyScale);
}