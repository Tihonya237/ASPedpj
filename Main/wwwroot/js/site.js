
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var headerHeight = document.querySelector('header').offsetHeight;
var isDrawing = false;

// Set the size of the brush to match the canvas
ctx.lineWidth = 5;

// Start drawing when the left mouse button is pressed
canvas.addEventListener("mousedown", function (event) {
    isDrawing = true;
    ctx.beginPath();
    ctx.arc(event.clientX, event.clientY - headerHeight, 1, 0, 2 * Math.PI);
    ctx.moveTo(event.clientX, event.clientY - headerHeight);
});

// Draw a line on the canvas while the left mouse button is held down
canvas.addEventListener("mousemove", function (event) {
    if (isDrawing) {
        ctx.lineTo(event.clientX, event.clientY - headerHeight);
        ctx.stroke();
    }
});

// Stop drawing when the left mouse button is released
canvas.addEventListener("mouseup", function (event) {
    isDrawing = false;
});