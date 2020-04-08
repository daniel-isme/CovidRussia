let inf = document.getElementById("info");

document.addEventListener("mousemove", function (e) {
    inf.style.left = (e.pageX + 10) + 'px';
    inf.style.top = (e.pageY + 15) + 'px';
});

let Id;
$(document).ready(function () {
    $('path').mouseover(function () {
        Id = $(this).attr('id');
        displayInfo(Id);
        $('path').mouseout(function () {
            inf.style.display = 'none';
        });
    });
});
inf.innerText = "infected";
function displayInfo(Id) {
    inf.style.display = 'block';
}