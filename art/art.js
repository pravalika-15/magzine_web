// get canvas element and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// set canvas width and height to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// set some initial variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  // exit function if not drawing
  if (!isDrawing) return;

  // set line styles
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.lineCap = "round";
  ctx.lineWidth = 10;

  // draw a line
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();

  // update last coordinates
  lastX = e.clientX;
  lastY = e.clientY;

  // update hue for changing color
  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  // update direction for changing line width
  if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

// add event listeners for mouse events
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

canvas.addEventListener("mousemove", draw);

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mouseout", () => {
  isDrawing = false;
});
