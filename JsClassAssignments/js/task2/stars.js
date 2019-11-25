console.log('Task1: Stars');

function asterisks(startNum) {

    for (var i = 0; i < startNum; i++) {
        var stars = '';
        for (var j = (startNum - i); j > 0; j--) {
            stars += '* ';
        }
        console.log(stars);
    }
}

asterisks(5);