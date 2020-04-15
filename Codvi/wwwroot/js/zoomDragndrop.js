let buttonPlus = document.getElementById('zoomPlus');
let buttonMinus = document.getElementById('zoomMinus');
let returnMap = document.getElementById('returnMapButtom');

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
    if (viewBox.h > 150) {
        let dh = h * 0.1;
        let dy = dh / 2;
        viewBox = {x: viewBox.x, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h - dh};
        svgObj.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    }
});

returnMap.addEventListener('click', function () {
    viewBox = {x: 435, y: -100, w: 360, h: 300};
    svgObj.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
});

buttonMinus.addEventListener("click", function () {
    if (viewBox.h < 1380) {
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
    if ((e.deltaY > 0) && (viewBox.h < 1380)) zoomMinus(e);
    if ((e.deltaY < 0) && (viewBox.h > 150)) zoomPlus(e);
};
svgObj.onmouseleave = function () {
    document.body.style.overflow = "auto";
};

function move() {
    svgContainer.addEventListener("mousedown", function (e) { // DRAG'n'DROP
            startPoint = {x: e.x, y: e.y};
            svgContainer.onmousemove = function (e) {
                svgObj.style.cursor = 'grabbing';
                endPoint = {x: e.x, y: e.y};
                let dx = ((startPoint.x - endPoint.x) / scale) / 2;
                let dy = ((startPoint.y - endPoint.y) / scale) / 2;
                let movedViewBox = {x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h};
                svgObj.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
            };
            svgContainer.onmouseup = function (e) {
                svgContainer.onmousemove = null;
                endPoint = {x: e.x, y: e.y};
                let dx = ((startPoint.x - endPoint.x) / scale) / 2;
                let dy = ((startPoint.y - endPoint.y) / scale) / 2;
                viewBox = {x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h};
                svgContainer.onmouseup = null;
                svgObj.style.cursor = "default"
            };

            svgContainer.onmouseleave = function () {
                document.getElementById("info").style.display = 'none';
                svgObj.style.cursor = "default";
                svgContainer.onmousemove = null;
                document.body.style.overflow = 'auto';
            };
        }
    )
}

move();

window.addEventListener("resize", function () {
    if (window.innerWidth < 1700) {
        svgContainer.style.width = 80 + '%';
        // svgContainer.style.height = 80 + '%';
        $('.zoom').css({'width': '80%'});
    }

    if (window.innerWidth > 1700) {
        svgContainer.style.width = 1500 + 'px';
        // svgContainer.style.height = 700 + 'px';
        $('.zoom').css({'width': '1500px'});
    }
});
