var unique1 = [];
var occurence = [];
console.log('Task 2 > Occurence of item');

languages.map(function (value, index) {
    if (unique1.indexOf(value) === -1) {
        unique1.push(value);
        occurence[value] = 1;
    } else {
        occurence[value] += 1;
    }
});
console.log('Occurence Object> ', occurence);
