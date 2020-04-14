let inf = document.getElementById("info");

document.addEventListener("mousemove", function (e) {
    inf.style.left = (e.pageX + 10) + 'px';
    inf.style.top = (e.pageY + 15) + 'px';
});

$(document).ready(function () {
    $('path').mouseover(function () {
        displayInfo(getRegionName($(this).attr('id')));
        $('path').mouseout(function () {
            inf.style.display = 'none';
        });
    });
});

function getRegionName(id) {
    for (var i = 0; i < regions.length; i++) {
        if (regions[i].Id == id) {
            return regions[i].Name;
        }
    }
}

function displayInfo(regionName) {
    inf.style.display = 'block';
    inf.innerText = regionName;
}