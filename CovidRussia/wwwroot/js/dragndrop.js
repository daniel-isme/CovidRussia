let dragndrop = document.getElementById("map");
let maxLeft = 1000;
let maxTop = 600;

function moveMap() {
    dragndrop.addEventListener("mousedown", function (e) {
        let shiftX = -(Number(dragndrop.style.left.replace('px', ''))) + Number(e.pageX);
        let shiftY = -(Number(dragndrop.style.top.replace('px', ''))) + Number(e.pageY);
        dragndrop.style.cursor = 'grabbing';

        dragndrop.onmousemove = function (event) {
            move(event.pageX, event.pageY);
        };

        function move(clientX, clientY) {
            if (((-(shiftY - clientY) < maxTop) && (-(shiftX - clientX) < maxLeft))&&((-(shiftY - clientY) > -maxTop) && (-(shiftX - clientX) > -maxLeft))) {
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