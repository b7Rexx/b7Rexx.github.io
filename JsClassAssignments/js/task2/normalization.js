console.log('Task6: Normalization');

var input = {
    '1': {
        id: 1,
        name: 'John',
        children: [
            {id: 2, name: 'Sally'},
            {id: 3, name: 'Mark', children: [{id: 4, name: 'Harry'}]}
        ]
    },
    '5': {
        id: 5,
        name: 'Mike',
        children: [{id: 6, name: 'Peter'}]
    }
};

var outputNormalized = [];

function objNormalize(obj1) {
    var saveNormal = {id: obj1.id, name: obj1.name};
    if (obj1.hasOwnProperty('children')) {
        var childrens = Object.values(obj1.children).map(function (value) {
            objNormalize(value);
            return value.id;
        });
        saveNormal.children = childrens;
    }
    outputNormalized.push(saveNormal);
}

function passObjectNormal(obj) {
    Object.values(obj).forEach(function (obj1) {
        objNormalize(obj1);
    });
    return outputNormalized;
}

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

var outputNormal = sortBy(passObjectNormal(input),'id');
console.log(outputNormal);