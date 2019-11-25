var languages =
    [
        'js', 'php', 'c', 'c++', 'python', 'java', 'ruby',
        'js', 'php', 'c', 'c++', 'python', 'java', 'ruby',
    ];

var unique = [];
console.log('Array > ', languages);
console.log('Task 1 > Unique Array');

languages.map(function (value, index) {
    if (unique.indexOf(value) === -1) {
        unique.push(value);
    }
});
console.log('Unique Array > ', unique);