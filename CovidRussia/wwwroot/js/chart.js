$(document).ready(function(){               //get ID
    $('path').click(function() {
        let clickId = $(this).attr('id');
        console.log(clickId)
    });
});




function randomInteger(min, max) { // function fill array
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

let chartColors = { //obj colors
    white: 'rgb(255,255,255)',
    grey: 'rgb(180,180,180)',
    yellow: 'rgb(255,252,1)',
    green: 'rgb(0,251,26)',
    dodgerblue: 'rgb(5,161,220)',
    blue: 'rgb(2,1,255)',
    red: 'rgb(254,0,0)',
    darkviolet: 'rgb(255,0,232)',
    darkmagenta: 'rgb(135,23,151)',
    black: "rgb(0,0,0)"
};

let ctx = document.getElementById('myChart').getContext('2d');

let lengthAr = 12;
let array = new Array(lengthAr);


let label = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let infected = {
    label: 'Infected',
    borderColor: chartColors.red,
    pointBackgroundColor: chartColors.red,
    pointBorderWidth: 5,
    data: [],
};
let recovered = {
    label: 'Recovered',
    borderColor: chartColors.green,
    pointBackgroundColor: chartColors.green,
    pointBorderWidth: 5,
    data: [],
};
let died = {
    label: 'Died',
    borderColor: chartColors.darkmagenta,
    pointBackgroundColor: chartColors.darkmagenta,
    pointBorderWidth: 5,
    data: [],
};
let addCanvas = {
    labels: label,
    datasets: [infected, recovered, died]
};

function fillArray(array) {
    if (array[0] === 'Infected') {
        for (let i = 1; i < lengthAr + 1; i++) {
            array[i] = randomInteger(5, 20);
        }
    }
    if (array[0] === 'Recovered') {
        for (let i = 1; i < lengthAr + 1; i++) {
            array[i] = randomInteger(2, 10);
        }
    }
    if (array[0] === 'Died') {
        for (let i = 1; i < lengthAr + 1; i++) {
            array[i] = randomInteger(1, 5);
        }
    }
}

array.unshift("Infected");
fillArray(array);
addData(array);
array.unshift("Recovered");
fillArray(array);
addData(array);
array.unshift("Died");
fillArray(array);
addData(array);

function addData(data) {
    if (data[0] === 'Infected') {
        data.splice(0, 1);
        data.forEach(elem => infected.data.push(elem));
    }
    if (data[0] === 'Recovered') {
        data.splice(0, 1);
        data.forEach(elem => recovered.data.push(elem));
    }
    if (data[0] === 'Died') {
        data.splice(0, 1);
        data.forEach(elem => died.data.push(elem));
    }
}

let chart = new Chart(ctx, {
    type: 'line',
    data: addCanvas,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        stacked: false,
        legend: {
            labels: {
                fontColor: chartColors.white,
                boxWidth: 30,
                fontSize: 18,
                fontFamily: 'Montserrat',
            }
        },
        elements: {
            rectangle: {
                borderSkipped: 'left',
            }
        },
        title: {
            fontColor: chartColors.white,
            display: true,
            text: 'COVID Chart',
            fontSize: 18,
            fontFamily: 'Montserrat '
        },
        scales: {
            defaultFontColor: chartColors.white,
            xAxes: [{
                ticks: {
                    fontSize: 16,
                    fontFamily: 'Montserrat',
                },
                gridLines: {
                    drawBorder: true,
                    display: true,
                    color: chartColors.dodgerblue,
                    lineWidth: 0.8
                }
            },
            ],
            yAxes: [{
                scaleLabel: {
                    display: true,
                },
                ticks: {
                    offset: false,
                    suggestedMin: 0,
                    suggestedMax: 35,
                    fontSize: 16,
                    fontFamily: 'Montserrat'
                },
                gridLines: {
                    drawBorder: true,
                    display: true,
                    color: chartColors.dodgerblue,
                    lineWidth: 0.8
                },
            }
            ],
        }
    }
});


