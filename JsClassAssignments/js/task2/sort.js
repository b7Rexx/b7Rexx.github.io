console.log('Task5: Array sort ');

var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}];

function sortBy(array, key) {
    var newArray = [];
    var sortArray = [];

    array.forEach(function (value, index) {
        if (value.hasOwnProperty(key))
            sortArray.push([index, value[key]]);
    });
    sortArray.sort(function (a, b) {
        a = a[1];
        b = b[1];
        return a < b ? -1 : (a > b ? 1 : 0);
    });
    sortArray.forEach(function (value, index) {
        newArray.push(array[value[0]]);
    });
    return newArray;
}

var sorted = sortBy(arr, 'name');
console.log('Sorted result ', sorted);