var url = "static/data/pokemon.csv"


d3.csv(url).then((data) => {    

    // Extract pokemon types for Type 1.
    var holder = {};
    data.forEach(function (d) {

        if (d["Type 2"] !== "") {
            if (holder.hasOwnProperty(d["Type 2"])) {
                holder[d["Type 2"]] = holder[d["Type 2"]] + 1;
            } else {
                holder[d["Type 2"]] = 1;
            }
        }        
    });

    var objTypes = [];
    for (var prop in holder) {
        objTypes.push({ type: prop, value: holder[prop] });
    }
    //console.log(objTypes);

    const types = objTypes.map(d => d.type);
    const values = objTypes.map(d => d.value);

    objTypes.sort(function(a,b) {
        if (a.type > b.type) {
            return 1;
        }
        if (a.type < b.type) {
            return -1            
        }

        return 0;
    });

    //console.log(objTypes)

});