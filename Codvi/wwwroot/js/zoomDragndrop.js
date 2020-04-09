let buttonPlus = document.getElementById('zoomPlus');
let buttonMinus = document.getElementById('zoomMinus');

const svgObj = document.getElementById("map");
const svgContainer = document.getElementById("svgContainer");

let viewBox = {x: 435, y: -100, w: 360, h: 300};
svgObj.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);

let startPoint = {x: 0, y: 0};
let endPoint = {x: 0, y: 0};
let scale = 1.9;


let h = viewBox.h;

let maxRight = 280;
let maxLeft = 560;

buttonPlus.addEventListener("click", function () {
    if (viewBox.h > 210) {
        let dh = h * 0.1;
        let dy = dh / 2;
        viewBox = {x: viewBox.x, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h - dh};
        svgObj.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    }
});

buttonMinus.addEventListener("click", function () {
    if (viewBox.h < 360) {
        let dh = -(h * 0.1);
        let dy = dh / 2;
        viewBox = {x: viewBox.x, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h - dh};
        svgObj.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    }
});

function zoomPlus(e) {
    e.preventDefault();
    let dh = h * Math.sign(e.deltaY) * 0.1;
    let dy = dh / 2;
    viewBox = {x: viewBox.x, y: viewBox.y + Math.abs(dy), w: viewBox.w, h: viewBox.h - Math.abs(-dh)};
    svgObj.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
}

function zoomMinus(e) {
    e.preventDefault();
    let dh = h * Math.sign(e.deltaY) * 0.1;
    let dy = dh / 2;
    viewBox = {x: viewBox.x, y: viewBox.y + (-dy), w: viewBox.w, h: viewBox.h - (-dh)};
    svgObj.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);

}


svgContainer.onmousewheel = function (e) { // ZOOM
    document.body.style.overflow = "hidden";
    if ((e.deltaY > 0) && (viewBox.h < 360)) zoomMinus(e);
    if ((e.deltaY < 0) && (viewBox.h > 210)) zoomPlus(e);
};
svgObj.onmouseleave = function () {
    document.body.style.overflow = "auto";
};


function move() {
    svgContainer.addEventListener("mousedown", function (e) { // DRAG'n'DROP
            startPoint = {x: e.x, y: e.y};
            $('path').mousedown(function () {
                document.getElementById("info").style.display = 'none';
                document.getElementById("map").style.cursor = 'grabbing';
            });
            svgContainer.onmousemove = function (e) {
                endPoint = {x: e.x, y: e.y};
                let dx = ((startPoint.x - endPoint.x) / scale) / 2;
                let dy = ((startPoint.y - endPoint.y) / scale) / 2;
                let movedViewBox = {x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h};
                if ((movedViewBox.x > maxRight) && (movedViewBox.x < maxLeft)) {
                    svgObj.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
                }
            };
            svgContainer.onmouseup = function (e) {
                svgContainer.onmousemove = null;
                $('path').mouseup(function () {
                    document.getElementById("info").style.display = 'block';
                    document.getElementById("map").style.cursor = "default";
                });
                endPoint = {x: e.x, y: e.y};
                let dx = ((startPoint.x - endPoint.x) / scale) / 2;
                let dy = ((startPoint.y - endPoint.y) / scale) / 2;
                viewBox = {x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h};
                svgContainer.onmouseup = null;
            };

            svgContainer.onmouseleave = function () {
                document.getElementById("info").style.display = 'none';
                document.getElementById("map").style.cursor = "default";
                svgContainer.onmousemove = null;
            };
        }
    )
}

move();