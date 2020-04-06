let scale = 1;
let elem = document.getElementById("map");
let zoomMinus = document.getElementById("zoomMinus");
let zoomPlus = document.getElementById("zoomPlus");

zoomPlus.addEventListener("click", function (e) {
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(.125, scale), 10);
    elem.style.transform = `scale(${scale})`;
});
zoomMinus.addEventListener("click", function (e) {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(.125, scale), 10);
    elem.style.transform = `scale(${scale})`;
});

function zoom(event) {
    event.preventDefault();
    scale += event.deltaY * -0.001;
    scale = Math.min(Math.max(.125, scale), 10);
    elem.style.transform = `scale(${scale})`;
}

