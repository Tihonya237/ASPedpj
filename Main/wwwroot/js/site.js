
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var myColor = 'black'
var lineSize = 5;

ctx.lineCap = "round"
ctx.lineJoin = "round"

var description;

var headerHeight = document.querySelector('header').offsetHeight;
var isDrawing = false;

var caption_field = document.getElementById("caption_input")

// ластик имеет толщину линии выбранную на слайдере 
// вкл - ластик активен; выкл - ластик неактивен
function erase() 
{  
    var chbox;
    chbox=document.getElementById('erase_check');
    if (chbox.checked) {
        ctx.globalCompositeOperation = "destination-out"
    }
    else {
        ctx.globalCompositeOperation = "source-over"
    }
}

function push()
{
    do
    {
        description = prompt("Опишите что вы нарисовали", "")
        if(description == "")
        {
            alert("Ввод описания в этом режиме обязателен")
        }
    }
    while(description == "")

    //const canvas = document.getElementById("canvas");
    const dataURL = canvas.toDataURL();
    //console.log(dataURL);

    let link = document.createElement('a');
    link.download = 'outimage.png';

    var blob = dataURItoBlob(dataURL)
    //console.log(blob);

    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
}

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }

const saveBtn = document.getElementById("downloud")
saveBtn.addEventListener("click", () => 
{
    let image = new Image()

        image.onload = function()
        {
            let a = document.createElement("a")
        
            a.href = canvas.toDataURL("imag/png")
            a.download = "new_drawing.png"
            a.click()
        }
        image.src = canvas.toDataURL()
})

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
