console.log('Task4: Transfrom array');
var numbers = [1, 2, 3, 4];

function transform(collection, tran) {
    var newColletion = collection.map(function (value) {
        return tran(value);
        // newColletion.push(tran(value));
    });
    return newColletion;
}

var output = transform(numbers, function (num) {
    return num * 3;
});
console.log('Transfrom input: ', numbers);
console.log('Transfrom result: ', output);