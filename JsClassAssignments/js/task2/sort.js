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
    sortArray.sort(function (first, second) {
        first = first[1];
        second = second[1];
        return first < second ? -1 : (first > second ? 1 : 0);
    });
    sortArray.forEach(function (value) {
        newArray.push(array[value[0]]);
    });
    return newArray;
}

var sorted = sortBy(arr, 'name');
console.log('Sorted result ', sorted);