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
        saveNormal.children = test;
    }
    outputNormalized.push(saveNormal);
}

function passObjectNormal(obj) {
    Object.values(obj).forEach(function (obj1) {
        objNormalize(obj1);
    });
    return outputNormalized;
}

var outputNormal = passObjectNormal(input);
console.log(outputNormal);