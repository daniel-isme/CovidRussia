let scale = 1.4;
let elem = document.getElementById("map");
let zoomPlus = document.getElementById("zoomPlus");
let zoomMinus = document.getElementById("zoomMinus");

$('#map').mouseover(function (e) {
    document.body.style.overflow = "hidden";
});
$('body').mouseout(function (e) {
    document.body.style.overflow = "auto";
});


function zoom(event) {
    scale += event.deltaY * -0.002;
    scale = Math.min(Math.max(.125, scale), 10);
    console.log(scale);
    elem.style.transform = `scale(${scale})`;
}

zoomPlus.addEventListener("click", function () {
    scale *= 1.4;
    elem.style.transform = `scale(${scale})`;
});

zoomMinus.addEventListener("click", function () {
    scale /= 1.4;
    elem.style.transform = `scale(${scale})`;
});