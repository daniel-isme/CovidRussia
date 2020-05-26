window.onload = () => {
    setStats(); // for chart data

    let scale = 1.8
    let buttonZoomPlus = document.getElementById("zoomPlus")
    let buttonZoomMinus = document.getElementById("zoomMinus")
    let svgContainer = document.getElementById("svgContainer");
    let returnMap = document.getElementById("returnMapButton");
    let map = document.getElementById("map")


    buttonZoomMinus.addEventListener("click", () => {
        if (scale > 1.5) zoomMinus(0.5)
    })

    buttonZoomPlus.addEventListener("click", () => {
        if (scale < 4.4) zoomPlus(0.5)
    })

    returnMap.addEventListener("click", () => {
        map.style.left = 0 + 'px'
        map.style.top = 0 + 'px'
        leftStop = 0
        topStop = 0
    })

    svgContainer.onmouseover = () => {
        $("body").css("overflow", "hidden");
        document.body.style.cursor = 'grab'
        svgContainer.onwheel = (e) => {
            zoom(e)
        }
        svgContainer.onmouseout = () => {
            $("body").css("overflow", "auto");
            document.body.style.cursor = 'default'
        }
    }


    function zoom(e) {
        if ((e.deltaY > 0) && (scale > 1.5)) zoomMinus(0.1);
        if ((e.deltaY < 0) && (scale < 4.4)) zoomPlus(0.1);
    }

    function zoomMinus(k) {
        scale -= k
        $(map).css("transform", "scale(" + scale + ") scaleY(1.4)")
        console.log(scale)
    }

    function zoomPlus(k) {
        scale += k
        $(map).css("transform", "scale(" + scale + ") scaleY(1.4)")
        console.log(scale)
    }

    let leftStop = 0
    let topStop = 0
    let lockMoveTop = 380
    let lockMoveLeft = 900

    // PC/Laptop

    map.onmousedown = (e) => {
        document.body.style.cursor = "grabbing"
        let leftStart = Number(e.clientX) - Number(leftStop)
        let topStart = Number(e.clientY) - Number(topStop)
        map.onmousemove = (e) => {
            let moveL = Number(map.style.left.replace('px', ''))
            let moveT = Number(map.style.top.replace('px', ''))
            console.log(moveL, moveT)
            if (moveL < lockMoveLeft && moveL > -lockMoveLeft && moveT < lockMoveTop && moveT > -lockMoveTop) {
                map.style.left = -(leftStart - e.clientX) + 'px'
                map.style.top = -(topStart - e.clientY) + 'px'
            } else {
                map.onmousemove = null
                if (moveL >= lockMoveLeft) {
                    map.style.left = lockMoveLeft - 1 + 'px'
                }
                if (moveL <= -lockMoveLeft) {
                    map.style.left = -lockMoveLeft + 1 + 'px'
                }
                if (moveT >= lockMoveTop) {
                    map.style.top = lockMoveTop - 1 + 'px'
                }
                if (moveT <= -lockMoveTop) {
                    map.style.top = -lockMoveTop + 1 + 'px'
                }
            }
        }
        map.addEventListener("mouseup", () => {
            document.body.style.cursor = "grab"
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
            let moveL = Number(map.style.left.replace('px', ''))
            let moveT = Number(map.style.top.replace('px', ''))
            console.log(moveL, moveT)
            if (moveL < lockMoveLeft && moveL > -lockMoveLeft && moveT < lockMoveTop && moveT > -lockMoveTop) {
                map.style.left = -(leftStart - e.touches[0].clientX) + 'px'
                map.style.top = -(topStart - e.touches[0].clientY) + 'px'
            } else {
                map.ontouchmove = null
                if (moveL >= lockMoveLeft) {
                    map.style.left = lockMoveLeft - 1 + 'px'
                }
                if (moveL <= -lockMoveLeft) {
                    map.style.left = -lockMoveLeft + 1 + 'px'
                }
                if (moveT >= lockMoveTop) {
                    map.style.top = lockMoveTop - 1 + 'px'
                }
                if (moveT <= -lockMoveTop) {
                    map.style.top = -lockMoveTop + 1 + 'px'
                }
            }

        }
        map.addEventListener("touchend", () => {
            leftStop = map.style.left.replace('px', '')
            topStop = map.style.top.replace('px', '')
            map.onmousemove = null
        })
    }
    window.addEventListener("resize", () => {
        if (1300 > window.innerWidth) {
            svgContainer.style.width = 90 + '%';
            map.style.width = 100 + '%'
        }

        if (1300 < window.innerWidth) {
            svgContainer.style.width = 1500 + 'px'
            map.style.width = 100 + '%'
        }
    })
}

