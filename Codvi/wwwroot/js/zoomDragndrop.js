window.onload = () => {
    setStats(); // for chart data

    let scale = 1
    let buttonZoomPlus = document.getElementById("zoomPlus")
    let buttonZoomMinus = document.getElementById("zoomMinus")
    let svgContainer = document.getElementById("svgContainer");
    let returnMap = document.getElementById("returnMapButton");
    let map = document.getElementById("map");


    buttonZoomMinus.addEventListener("click", () => {
        if (scale > 0.5) zooming(0.8)
    })

    buttonZoomPlus.addEventListener("click", () => {
        if (scale < 4.4) zooming(1.2)
    })

    returnMap.addEventListener("click", () => {
        map.style.left = 0 + 'px'
        map.style.top = 0 + 'px'
        leftStop = 0
        topStop = 0
        $(map).css("transform", "scale(1) scaleY(1.4)")
    })

    svgContainer.onmouseover = () => {
        $("body").css("overflow", "hidden");
        document.body.style.cursor = 'default'
        svgContainer.onwheel = (e) => {
            //zoom(e)
            if (e.deltaY > 0 && (scale > 0.5)) {
                zooming(0.9);
            }
            if ((e.deltaY < 0) && (scale < 4.4)) {
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

    // device with touches
    map.ontouchstart = (e) => {
        let leftStart = Number(e.touches[0].clientX) - Number(leftStop)
        let topStart = Number(e.touches[0].clientY) - Number(topStop)
        map.ontouchmove = (e) => {
            map.style.left = -(leftStart - e.touches[0].clientX) + 'px'
            map.style.top = -(topStart - e.touches[0].clientY) + 'px'
        }
        map.addEventListener("touchend", () => {
            leftStop = map.style.left.replace('px', '')
            topStop = map.style.top.replace('px', '')
            map.onmousemove = null
        })
    }
}

