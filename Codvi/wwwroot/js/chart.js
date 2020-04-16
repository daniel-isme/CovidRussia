let casesArr = [];
let deathsArr = [];
let recoveredArr = [];
let casesArrSum = [];
let deathsArrSum = [];
let recoveredArrSum = [];
let regions;
let dates = [];
let regionName = "";
let regionId = 0;
let statsType;
let check = 0;

$(document).ready(function () {
    $('path').click(function () {
        if(check !== 0) document.getElementById(regionId).style.fill = '#333333';
        regionId = $(this).attr('id');
        check++;
        setStats();
        selection(regionId);
    });
});

window.onload = function () {
    setStats();
    selection(regionId);
};

function selection(regionId) {
    document.getElementById(regionId).style.fill = 'black';
}

function receiveJsonData(regs) {
    regions = regs;
}

function setStats() {
    statsType = document.getElementById("statsType").value;

    let statLength = regions[0].DailyStats.length;
    casesArr = zeroIntArray(statLength);
    deathsArr = zeroIntArray(statLength);
    recoveredArr = zeroIntArray(statLength);
    dates = initDates();

    for (var i = 0; i < regions.length; i++) {
        if (regions[i].Id == regionId || regionId == 0) { // if id == 0 (russia) - sum all of reg stats
            regionName = regions[i].Name;
            for (var j = 0; j < statLength; j++) {
                casesArr[j] += regions[i].DailyStats[j].NewCases;
                deathsArr[j] += regions[i].DailyStats[j].NewDeaths;
                recovered[j] += regions[i].DailyStats[j].NewRecovered;
            }
        }
    }

    if (regionId == 0) regionName = "Россия";

    if (statsType == "total") {
        sumStats();
    }

    updateData();
}

function setRussiaId() {
    regionId = 0;
    setStats();
}

document.getElementById('button_russia').onclick = function() {
    document.getElementById(regionId).style.fill = '#333333';
};

function sumStats() {
    for (var i = casesArr.length - 1; i >= 1; i--) {
        for (var j = i - 1; j >= 0; j--) {
            casesArr[i] += casesArr[j];
            deathsArr[i] += deathsArr[j];
            recoveredArr[i] += recoveredArr[j];
        }
    }
}

function updateData() {
    chart.data.labels = dates;
    chart.options.title.text = regionName;
    chart.data.datasets[0].data = casesArr;
    chart.data.datasets[1].data = deathsArr;
    chart.data.datasets[2].data = recoveredArr;
    chart.update();
}

function zeroIntArray(length) {
    return Array.from(new Array(length), (x) => 0);
}

function initDates() {
    newDates = [];
    for (var i = 0; i < regions[0].DailyStats.length; i++) {
        let date = new Date(regions[0].DailyStats[i].Date);
        let dateStr = date.toLocaleString('default', {month: 'long'}) + " " + date.getDate();
        newDates.push(dateStr);
    }
    return newDates;
}

let chartColors = { //obj colors
    white: 'rgb(255,255,255)',
    grey: 'rgb(180,180,180)',
    yellow: 'rgb(255,252,1)',
    green: 'rgb(0,251,26)',
    darkgreen: 'rgb(0,191,26)',
    dodgerblue: 'rgb(5,161,220)',
    blue: 'rgb(2,1,255)',
    red: 'rgb(254,0,0)',
    darkred: 'rgb(204,0,0)',
    darkviolet: 'rgb(255,0,232)',
    darkmagenta: 'rgb(165,23,151)',
    darkmagenta2: 'rgb(125,23,151)',
    black: "rgb(0,0,0)"
};

let ctx = document.getElementById('myChart').getContext('2d');

let cases = {
    label: 'Подтвержденных случаев',
    borderColor: chartColors.red,
    pointBackgroundColor: chartColors.darkred,
    pointBorderColor: chartColors.darkred,
    pointBorderWidth: 5,
    data: casesArr,
};
let recovered = {
    label: 'Выздоровело',
    borderColor: chartColors.green,
    pointBackgroundColor: chartColors.darkgreen,
    pointBorderColor: chartColors.darkgreen,
    pointBorderWidth: 5,
    data: recoveredArr,
};
let deaths = {
    label: 'Летальных исходов',
    borderColor: chartColors.darkmagenta,
    pointBackgroundColor: chartColors.darkmagenta2,
    pointBorderColor: chartColors.darkmagenta2,
    pointBorderWidth: 5,
    data: deathsArr,
};
let addCanvas = {
    labels: dates,
    datasets: [cases, recovered, deaths]
};

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
                fontFamily: 'Roboto',
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
            text: 'Россия',
            fontSize: 35,
            fontFamily: 'Roboto'
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: chartColors.white,
                    fontSize: 16,
                    fontFamily: 'Roboto',

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
                    suggestedMax: 25,
                    fontSize: 16,
                    fontFamily: 'Roboto',
                    fontColor: chartColors.white
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




