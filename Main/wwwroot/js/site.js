
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var myColor = 'black'
var lineSize = 5;

ctx.lineCap = "round"
ctx.lineJoin = "round"

var headerHeight = document.querySelector('header').offsetHeight;
var isDrawing = false;

document.getElementById('color').oninput = function()
{
    myColor = this.value;
}

document.getElementById('Size').oninput = function()
{
    lineSize = this.value;
}

canvas.addEventListener("mousedown", function (event) {
    isDrawing = true;
    ctx.beginPath();
    //ctx.arc(event.clientX, event.clientY - headerHeight, 1, 0, 1 * Math.PI);
    ctx.moveTo(event.clientX, event.clientY - headerHeight);
    ctx.lineWidth = lineSize;
});

canvas.addEventListener("mousemove", function (event) {
    if (isDrawing) {
        ctx.lineTo(event.clientX, event.clientY - headerHeight);
        ctx.stroke();
        ctx.strokeStyle = myColor;
           ctx.fillStyle = myColor;
    }
});

canvas.addEventListener("mouseup", function (event) {
    isDrawing = false;
});