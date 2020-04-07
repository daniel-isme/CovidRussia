let dragndrop = document.getElementById("map");
let maxLeft = 0;
let maxTop = 0;

function moveMap() {
    dragndrop.addEventListener("mousedown", function (e) {
        maxTop = scale * 150;
        maxLeft = scale * 300;
        let shiftX = -(Number(dragndrop.style.left.replace('px', ''))) + Number(e.pageX);
        let shiftY = -(Number(dragndrop.style.top.replace('px', ''))) + Number(e.pageY);
        dragndrop.style.cursor = 'grabbing';

        dragndrop.onmousemove = function (event) {
            move(event.pageX, event.pageY);
        };

        function move(clientX, clientY) {
            if (((-(shiftY - clientY) < maxTop) && (-(shiftX - clientX) < maxLeft)) && ((-(shiftY - clientY) > -maxTop) && (-(shiftX - clientX) > -maxLeft))) {
                dragndrop.style.top = -(shiftY - clientY) + 'px';
                dragndrop.style.left = -(shiftX - clientX) + 'px';
            }
        }

        document.onmouseup = function () {
            dragndrop.onmousemove = null;
            dragndrop.onmouseup = null;
            dragndrop.style.cursor = 'grab';
        }

    });
}

moveMap();