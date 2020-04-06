window.onload = function () {
    let chart = document.getElementsByClassName("myC");
    let bar = document.getElementsByClassName("myB");
    document.getElementById('sw').addEventListener("mousedown", function () {
        for (let i = 0; i < bar.length; i++) {
            if (bar[i].style.display === "block") {
                bar[i].style.display = "none";
                chart[i].style.display = "block";
            } else {
                bar[i].style.display = "block";
                chart[i].style.display = "none";
            }
        }
    })
};