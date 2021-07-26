// Call csv dataset.
var url = "static/data/pokemon.csv"

d3.csv(url).then(data => {



    // Get values for radar chart.
    var pk1 = data.filter(d => d.Name === "Pikachu")
    var pk2 = data.filter(d => d.Name === "Charmander")

    var pk1_stats = [+pk1[0].Attack, +pk1[0].Defense, +pk1[0]["Sp. Atk"], +pk1[0]["Sp. Def"], +pk1[0].Speed]
    var pk2_stats = [+pk2[0].Attack, +pk2[0].Defense, +pk2[0]["Sp. Atk"], +pk2[0]["Sp. Def"], +pk2[0].Speed]

    const pokemons = {
        labels: ['Attack', 'Defense', 'Sp. Atk', 'Sp. Defense', 'Speed'],
        datasets: [{
            label: pk1[0].Name,
            data: pk1_stats,
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235)',
            pointBackgroundColor: 'rgba(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235)'
        }, {
            label: pk2[0].Name,
            data: pk2_stats,
            fill: true,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }
        ]
    } // END of pokemobs comparison

    var config_radar = {
        type: 'radar',
        data: pokemons,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    suggestedMin: 50,
                    suggestedMax: 150
                }
            }
        }
    } // END of radar.

    // Plot Radar chart
    secondChart = new Chart(
        document.getElementById('statsChart'),
        config_radar
    );

}); // END reading csv file.


// Build bar chart from init.
function init() {

    d3.csv(url).then((data) => {

        // Extract pokemon types for Type 1.
        var holder = {};
        data.forEach(function (d) {
            if (holder.hasOwnProperty(d["Type 1"])) {
                holder[d["Type 1"]] = holder[d["Type 1"]] + 1;
            } else {
                holder[d["Type 1"]] = 1;
            }
        });

        var objTypes = [];
        for (var prop in holder) {
            objTypes.push({ type: prop, value: holder[prop] });
        }
        console.log(objTypes);

        const types = objTypes.map(d => d.type);
        const values = objTypes.map(d => d.value);

        // Config chart and plot all polemon different types.
        const chart = {
            labels: types,
            datasets: [{
                label: 'Pokemon Findings',
                backgroundColor: 'rgb(255, 99, 132, 0.3)',
                borderColor: 'rgb(255, 99, 132)', // Works for line chart only
                borderWidth: 1,
                data: values,
            }]
        };

        const config = {
            type: 'bar',
            data: chart,
            options: {
                title: {
                    display: true,
                    text: 'First Chart with Chart.js'
                }
            } // END options
        } // END Config Obj for Chart.js

        // Plot bar chart.
        var myChart = new Chart(
            document.getElementById('typeChart'),
            config
        );


    });

}


init();