let casesArr = [];
let deathsArr = [];
let recoveredArr = [];
let regions;
let dates = [];
let regionName = "";

$(document).ready(function () {
    $('path').click(function () {
        getRegionStats($(this).attr('id'));
        updateData();
    });
});

function receiveJsonData(regs) {
    regions = regs;
}

function getRegionStats(id) {
    casesArr = [];
    deathsArr = [];
    recoveredArr = [];
    dates = [];
    for (var i = 0; i < regions.length; i++) {
        if (regions[i].Id == id) {
            regionName = regions[i].Name;
            for (var j = 0; j < regions[i].DailyStats.length; j++) {
                casesArr.push(regions[i].DailyStats[j].NewCases);
                deathsArr.push(regions[i].DailyStats[j].NewDeaths);
                recoveredArr.push(regions[i].DailyStats[j].NewRecovered);
                let date = new Date(regions[i].DailyStats[j].Date);
                let dateStr = date.toLocaleString('default', { month: 'long' }) + " " + date.getDate();
                dates.push(dateStr);
            }
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


let chartColors = {
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

let cases = {
    label: 'Cases',
    borderColor: chartColors.red,
    pointBackgroundColor: chartColors.red,
    pointBorderWidth: 5,
    data: casesArr,
};
let recovered = {
    label: 'Recovered',
    borderColor: chartColors.green,
    pointBackgroundColor: chartColors.green,
    pointBorderWidth: 5,
    data: recoveredArr,
};
let deaths = {
    label: 'Deaths',
    borderColor: chartColors.darkmagenta,
    pointBackgroundColor: chartColors.darkmagenta,
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
                    //suggestedMin: 0,
                    //suggestedMax: 35,
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