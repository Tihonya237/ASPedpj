
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var myColor = 'black'
var lineSize = 5;

ctx.lineCap = "round"
ctx.lineJoin = "round"

var headerHeight = document.querySelector('header').offsetHeight;
var isDrawing = false;

// ластик имеет толщину линии выбранную на слайдере 
// вкл - ластик активен; выкл - ластик неактивен
function erase() {  
    var chbox;
    chbox=document.getElementById('erase_check');
        if (chbox.checked) {
            ctx.globalCompositeOperation = "destination-out"
        }
        else {
            ctx.globalCompositeOperation = "source-over"
        }
    }

document.getElementById('color').oninput = function()
{
    myColor = this.value;
}

document.getElementById('Size').oninput = function()
{
    lineSize = this.value;
}

function cleanCanvas() 
 {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
 }

canvas.addEventListener("pointerdown", function (event) {
    isDrawing = true;
    ctx.beginPath();
    //ctx.arc(event.clientX, event.clientY - headerHeight, 1, 0, 1 * Math.PI);
    ctx.moveTo(event.clientX, event.clientY - headerHeight -15);
    ctx.lineWidth = lineSize;
});

canvas.addEventListener("pointermove", function (event) {
    if (isDrawing) {
        ctx.lineTo(event.clientX, event.clientY - headerHeight -15);
        ctx.stroke();
        ctx.strokeStyle = myColor;
           ctx.fillStyle = myColor;
    }
});

canvas.addEventListener("pointerup", function (event) {
    isDrawing = false;
});
