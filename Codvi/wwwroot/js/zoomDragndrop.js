window.onload = () => {
    setStats(); // for chart data

    let scale = 1;
    let maxScale = 10;
    let minScale = 0.5;
    let buttonZoomPlus = document.getElementById("zoomPlus")
    let buttonZoomMinus = document.getElementById("zoomMinus")
    let svgContainer = document.getElementById("svgContainer");
    let returnMap = document.getElementById("returnMapButton");
    let map = document.getElementById("map");


    buttonZoomMinus.addEventListener("click", () => {
        if (scale > minScale) zooming(0.8)
    })

    buttonZoomPlus.addEventListener("click", () => {
        if (scale < maxScale) zooming(1.2)
    })

    returnMap.addEventListener("click", () => {
        map.style.left = 0 + 'px'
        map.style.top = 0 + 'px'
        leftStop = 0
        topStop = 0
        scale = 1;
        $(map).css("transform", "scale(1) scaleY(1.4)")
    })

    svgContainer.onmouseover = () => {
        $("body").css("overflow", "hidden");
        document.body.style.cursor = 'default'
        svgContainer.onwheel = (e) => {
            //zoom(e)
            if (e.deltaY > 0 && (scale > minScale)) {
                zooming(0.9);
            }
            if ((e.deltaY < 0) && (scale < maxScale)) {
                zooming(1.1);
            }
        }
        svgContainer.onmouseout = () => {
            $("body").css("overflow", "auto");
            document.body.style.cursor = 'default'
        }
    }

    function zooming(koef) {
        scale *= koef;
        $(map).css("transform", "scale(" + scale + ") scaleY(1.4) ");
    }

    function zoomPlus(k) {
        scale += k
        $(map).css("transform", "scale(" + scale + ") scaleY(1.4)")
    }

    let leftStop = 0
    let topStop = 0

    // PC/Laptop

    map.onmousedown = (e) => {
        document.body.style.cursor = "grabbing"
        let leftStart = Number(e.clientX) - Number(leftStop)
        let topStart = Number(e.clientY) - Number(topStop)
        map.onmousemove = (e) => {
            map.style.left = -(leftStart - e.clientX) +  'px'
            map.style.top = -(topStart - e.clientY) + 'px'
        }
        map.addEventListener("mouseup", () => {
            document.body.style.cursor = "default"
            leftStop = map.style.left.replace('px', '')
            topStop = map.style.top.replace('px', '')
            map.onmousemove = null
        })
        map.addEventListener("mouseleave", () => {
            leftStop = map.style.left.replace('px', '')
            topStop = map.style.top.replace('px', '')
            map.onmousemove = null
        })
    }

    let distance1 = 0;
    let distance2 = 0;

    // device with touches
    svgContainer.ontouchstart = (e) => {
        $("body").css("overflow", "hidden");
        zoomPageDisable();

        let leftStart = Number(e.touches[0].clientX) - Number(leftStop)
        let topStart = Number(e.touches[0].clientY) - Number(topStop)

        svgContainer.ontouchmove = (e) => {

            if (e.touches.length <= 1) {

                map.style.left = -(leftStart - e.touches[0].clientX) + 'px'
                map.style.top = -(topStart - e.touches[0].clientY) + 'px'

            } else if (e.touches.length > 1) {

                var x1 = e.touches[0].clientX;
                var x2 = e.touches[1].clientX;
                var y1 = e.touches[0].clientY;
                var y2 = e.touches[1].clientY;
                distance2 = Math.hypot(x2 - x1, y2 - y1);
                var delta = distance2 - distance1;
                var deltaMax = 1;
                var deltaMin = 0.01;

                if (Math.abs(delta) > deltaMin && Math.abs(delta) < deltaMax) {
                    if (scale >= minScale && scale <= maxScale) {
                        zoomPlus(delta * 0.1);
                    } else if (scale > maxScale) {
                        scale = maxScale;
                    } else if (scale < minScale) {
                        scale = minScale;
                    }
                }

                distance1 = distance2;
            }
        }
        svgContainer.addEventListener("touchend", () => {
            leftStop = map.style.left.replace('px', '')
            topStop = map.style.top.replace('px', '')
            map.onmousemove = null
            $("body").css("overflow", "auto");
            if (e.touches.length > 1) {
                zoomPageEnable();
            }
            distance1 = 0;
            distance2 = 0;
        })
    }
}


var $objHead = $('head');

// define a function to disable zooming
var zoomPageDisable = function () {
    $objHead.find('meta[name=viewport]').remove();
    $objHead.prepend('<meta name="viewport", content = "width=device-width, initial-scale=1.0, user-scalable=0" /> ');
};

// ... and another to re-enable it
var zoomPageEnable = function () {
    $objHead.find('meta[name=viewport]').remove();
    $objHead.prepend('<meta name="viewport", content = "width=device-width, initial-scale=1.0, user-scalable=1" /> ');
};


