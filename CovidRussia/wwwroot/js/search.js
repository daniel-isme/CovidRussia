let openSearch = document.getElementById("lupa");
let search = document.getElementById('search');
let inputSearch = document.getElementById('inputSearch');
let check = 0;
openSearch.addEventListener("click", function () {
    if (check % 2 === 0) {
        openSearch.style.left = 26.8 + '%';
        inputSearch.style.display = 'block';
        check++;
    } else {
        openSearch.style.left = 0 + 'px';
        inputSearch.style.display = 'none';
        check++;
    }
});


