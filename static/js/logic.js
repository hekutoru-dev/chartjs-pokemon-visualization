// Call csv dataset.
var url = "static/data/pokemon.csv"

function buildCharts(pokemon1, pokemon2) {

    if (secondChart) {
        secondChart.destroy()
    }

    d3.csv(url).then(data => {

        // Get values for radar chart.
        var pk1 = data.filter(d => d.Name === pokemon1)
        var pk2 = data.filter(d => d.Name === pokemon2)

        var pk1_stats = [+pk1[0].Attack, +pk1[0].Defense, +pk1[0]["Sp. Atk"], +pk1[0]["Sp. Def"], +pk1[0].Speed]
        var pk2_stats = [+pk2[0].Attack, +pk2[0].Defense, +pk2[0]["Sp. Atk"], +pk2[0]["Sp. Def"], +pk2[0].Speed]
        var max_stats = Math.max(...[Math.max(...pk1_stats), Math.max(...pk2_stats)])

        var type1 = pk1[0]["Type 1"]
        var type2 = pk2[0]["Type 1"]
        var color1 = typeColors.filter(c => c.type == type1);
        var color2 = typeColors.filter(c => c.type == type2);

        document.getElementById('card-bg-pokemon1').style.backgroundColor = color1[0].surfaceColor
        document.getElementById('card-bg-pokemon2').style.backgroundColor = color2[0].surfaceColor

        const pokemons = {
            labels: ['Attack', 'Defense', 'Sp. Atk', 'Sp. Defense', 'Speed'],
            datasets: [{
                label: pk1[0].Name,
                data: pk1_stats,
                fill: true,
                backgroundColor: 'rgba(145, 91, 219, 0.2)',
                borderColor: 'rgb(145, 91, 219)',
                pointBackgroundColor: 'rgb(145, 91, 219)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(145, 91, 219)'
            }, {
                label: pk2[0].Name,
                data: pk2_stats,
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
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
                        suggestedMax: max_stats + 10
                    }
                }
            }
        } // END of radar.

        // Plot Radar chart
        secondChart = new Chart(
            document.getElementById('statsChart'),
            config_radar
        );

        document.getElementById('img-pokemon1').src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pk1[0]["#"]}.png`
        document.getElementById('img-pokemon2').src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pk2[0]["#"]}.png`

    }); // END reading csv file.

} // END function buildCharts

/** 
 * @param {*} data 
 * @param {*} pokemon_type 
 * 
 * Get the total number of pokemons for Type 1 and Type 2
 */
function getTypes(data, pokemon_type) {

    var holder = {};
    data.forEach(function (d) {

        if (d[pokemon_type] !== "") {
            if (holder.hasOwnProperty(d[pokemon_type])) {
                holder[d[pokemon_type]] = holder[d[pokemon_type]] + 1;
            } else {
                holder[d[pokemon_type]] = 1;
            }
        }

    });

    var objTypes = [];
    for (var prop in holder) {
        objTypes.push({ type: prop, value: holder[prop] });
    }

    objTypes.sort(function (a, b) {
        if (a.type > b.type) {
            return 1;
        }
        if (a.type < b.type) {
            return -1
        }
        return 0;
    });

    var types = objTypes.map(d => d.type);
    var values = objTypes.map(d => d.value);

    return [types, values];
}

// Build bar chart from init.
function init() {

    var selector = d3.selectAll(".pokemons");

    d3.csv(url).then((data) => {

        data.forEach((d) => {
            selector
                .append("option")
                .text(d.Name)
                .property("value", d.Name)
        }) // END foreach        

        let [types, values] = getTypes(data, "Type 1")
        let [types2, values2] = getTypes(data, "Type 2")

        // Config chart and plot all polemon different types.
        const chart = {
            labels: types,
            datasets: [{
                label: 'Type 1 Pokemon Findings',
                backgroundColor: ' rgb(33, 199, 109, 0.3)',
                borderColor: ' rgb(33, 199, 109)', // Works for line chart only
                borderWidth: 1,
                data: values,
            },
            {
                label: 'Type 2 Pokemon Findings',
                backgroundColor: ' rgb(250, 207, 139, 0.3)',
                borderColor: ' rgb(250, 207, 139)', // Works for line chart only
                borderWidth: 1,
                data: values2
            }
            ]
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
} // END function init.

// Check when pokemon selection changes.
function optionChange() {

    var pok1 = d3.select("#pokemon1").property("value");
    var pok2 = d3.select("#pokemon2").property("value");

    buildCharts(pok1, pok2);
}

// Start logic.
var secondChart;
init();