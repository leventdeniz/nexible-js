function generate() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var title = document.getElementById("title");

  canvas.setAttribute("height", 600);
  canvas.setAttribute("width", 1024);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /** y - values (definiert den Bereich in dem gezeichnet wird, von bottom nach top) */
  let top = 100;
  let bottom = 450;

  /** x - values (definiert wo auf der x-Achse gezeichnet werden soll) */
  let middle = canvas.width / 2;

  /** legt die genauen Koordinaten fest */
  let start = { x: middle, y: bottom };
  let end = { x: middle, y: randomInBetween(top, bottom - 100) };

  let distance = randomInBetween(0, 200);
  let thickness = randomInBetween(30, 80);

  var curve = generateRandomBezierCurve(
    { x: start.x, y: start.y },
    { x: end.x, y: end.y },
    distance
  );
  let cp1 = curve.cp1;
  let cp2 = curve.cp2;

  var clone = cloneBezierCurve(curve, thickness);

  /** zeichnet den Schwanz */
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(clone.start.x, clone.start.y);
  ctx.bezierCurveTo(
    clone.cp1.x,
    clone.cp1.y,
    clone.cp2.x,
    clone.cp2.y,
    clone.end.x,
    clone.end.y
  );
  ctx.lineTo(end.x, end.y);
  ctx.bezierCurveTo(cp2.x, cp2.y, cp1.x, cp1.y, start.x, start.y);
  ctx.fillStyle = generateRandomColor();
  ctx.fill();

  /** zeichnet die Eichel */
  ctx.beginPath();
  let radius = (clone.end.x - end.x) / 2;
  ctx.arc(end.x + radius, end.y, radius, 0, Math.PI, true);
  ctx.fillStyle = generateRandomColor();
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = generateRandomColor();
  ctx.lineWidth = 5;
  ctx.moveTo(end.x + radius, end.y - radius);
  ctx.lineTo(end.x + radius, end.y - radius / 2);
  ctx.stroke();

  /** zeichnet den Hoden */
  let radiusScope = { min: 35, max: 60 };
  let leRadius = randomInBetween(radiusScope.min, radiusScope.max);
  let reRadius = randomInBetween(radiusScope.min, radiusScope.max);

  /** linkes Ei */
  ctx.beginPath();
  ctx.arc(middle, bottom, leRadius, 0, 2 * Math.PI);
  ctx.fillStyle = generateRandomColor();
  ctx.fill();

  /** rechtes Ei */
  ctx.beginPath();
  ctx.arc(clone.start.x, bottom, reRadius, 0, 2 * Math.PI);
  ctx.fill();

  /** setzt den Titel */
  title.innerText = data[randomInBetween(0, data.length)];
}

/** Generiert eine BezierCurve von Start- bis Endpunkt.
 *  Distanz gibt die Länge der Kurven zwischen Mitte und Kurvenbogen an.
 */
function generateRandomBezierCurve(start, end, distance) {
  /** +/- 100 damit oben und unten gerade ist und keine Kurve entsteht (sollte möglichst mittig sein) */
  let cp1 = {
    x: randomInBetween(start.x, start.x - distance),
    y: randomInBetween(start.y - 100, end.y + 100),
  };
  let cp2 = {
    x: randomInBetween(start.x, start.x + distance),
    y: randomInBetween(start.y - 100, end.y + 100),
  };

  return {
    start: start,
    cp1: cp1,
    cp2: cp2,
    end: end,
  };
}

/** Klont eine BezierCurve und addiert ein Offset um sie auf der x-Achse nach rechts zu verschieben. */
function cloneBezierCurve(curve, offset) {
  let start = { x: curve.start.x + offset, y: curve.start.y };
  let end = { x: curve.end.x + offset, y: curve.end.y };
  let cp1 = { x: curve.cp1.x + offset, y: curve.cp1.y };
  let cp2 = { x: curve.cp2.x + offset, y: curve.cp2.y };

  return {
    start: start,
    cp1: cp1,
    cp2: cp2,
    end: end,
  };
}

/** Kalkuliert einen zufälligen Wert zwischen einem Min- und einem Max-Wert  */
function randomInBetween(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/** Generiert eine zufällige Farbe */
function generateRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
