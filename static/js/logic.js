var url = "static/data/pokemon.csv"

d3.csv(url).then(data => {

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


}); // END reading csv file.