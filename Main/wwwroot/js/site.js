
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

let ws = new WebSocket("wss://stabledraw.com:8081");
let chain_id = "";
let task_id;
let last_task_image_name;
let last_task_image_suffix
let is_human_caption
let original_image_buf
let original_image_w
let original_image_h

let cW = canvas.offsetWidth
let cH = canvas.offsetHeight

ws.onmessage = function (event) {
    let jdata = JSON.parse(event.data);
    let type = jdata[0];
    if (type == 't') //если текстовое сообщение
    {
        //alert(jdata[1])
        return;
    }
    if (type == 'c') //если описание
    {
        task_id = jdata[1];
        chain_id = jdata[3];
        last_task_image_name = jdata[4];
        last_task_image_suffix = jdata[5];
        is_human_caption = false;
        return;
    }
    if (type == 'i') //если изображение
    {
        let image = new Image();
        image.onload = function () 
        {
            original_image_buf = image.src;
            ctx.clearRect(0, 0, cW, cH); // очищаем верхний холст
            let img_w = image.width;
            let img_h = image.height;
            ctx.drawImage(image, 0, 0, img_w, img_h, 0, 0, cW, cH);
            return;
        };
        original_image_w = jdata[2];
        original_image_h = jdata[3];
        chain_id = jdata[4];
        last_task_image_name = jdata[5];
        task_id = jdata[6];
        last_task_image_suffix = jdata[8];
        image.src = "data:image/png;base64," + jdata[1];
    }
};

function gen_picture_by_drawing(full_prompt) {
    let is_depth = false
    let is_inpainting = false
    let is_upscale = false
    let is_upscale_xX = false
    let send_data_pbp;
    background_data = canvas.toDataURL("imag/png");
        send_data_pbp = JSON.stringify({
            "type": 'g',
            "is_human_caption": true,
            "is_depth": is_depth,
            "is_inpainting": is_inpainting,
            "is_upscale": is_upscale,
            "is_upscale_xX": is_upscale_xX,
            "chain_id": chain_id,
            "task_id": task_id,
            "backgroung": "",
            "foreground": background_data,
            "prompt": full_prompt,
            "is_drawing": true,
            "sure": true,
            "prims_count": 0,
            "dots_count": 0,
            "img_name": "drawing",
            "img_suf": 0
        });
    ws.send(send_data_pbp);
}

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
        else
        {
            gen_picture_by_drawing(description)
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
