// var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// // var test = [];
// var test = a.forEach(function (value, index, test) {
//     console.log('a val : ', value);
//     test[index] = value + 1
// });
//
// console.log('test', test);
//
// var array = [1, 2, 3, 4];
// //
// // var result = array.map(function (value, index) {
// //     console.log(index, value);
// //     return value + 1;
// // });
// //
// // console.log('Map', result, array);
//
// param = [1, 2];
// array = Object.assign([], param);
// console.log(array);

// var array = [1, 2, 3, 4];
// var result = array.filter(function (value, index) {
//     return value % 2 === 1;
// });
// console.log('result ', result);
// for (var i = 0; i < 10; i++) {
//     setTimeout((function () {
//
//         console.log(i);
//     })(i), 1000)
// }

function test(x) {
    function add(y) {
        return x + y;
    }

    return {addtwo: add};
}

var testing = test(5);
console.log(testing.addtwo(2));