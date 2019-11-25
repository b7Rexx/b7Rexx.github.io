console.log('Task3: Search by key value');

var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
];

function searchByKeyName(array, key, term) {
    term = term.toLowerCase();
    var returnable = {};
    if (key === null) {
        array.forEach(function (value) {
            var valuesOfrow = Object.values(value);
            var test = valuesOfrow.find(function (ele) {
                ele = String(ele).toLowerCase();
                if (ele === term)
                // console.log(ele);
                    return true;
            });
            if (test !== undefined)
            // console.log(value);
                returnable = value;
        })
    } else {
        array.forEach(function (value) {
            if (value.hasOwnProperty(key)) {
                if (term === value[key].toLowerCase())
                // console.log(value);
                    returnable = value;
            }
        });
    }
    return returnable;
}

var output1 = searchByKeyName(fruits, null, 'YEllow');
var output2 = searchByKeyName(fruits, 'name', 'APple');
console.log('Search result by Value: ', output1);
console.log('Search result by Key Value: ', output2);