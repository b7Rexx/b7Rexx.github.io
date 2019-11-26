var wrapper = document.getElementById('wrapper');
var box = document.createElement('div');
var circle = document.createElement('span');
var circlePosition = 0;
//direction :  true => downward , false => upward
var direction = true;

wrapper.appendChild(box);
box.appendChild(circle);

box.style.height = '200px';
box.style.width = '200px';
box.style.background = 'whitesmoke';
box.style.position = 'relative';

circle.style.height = '50px';
circle.style.width = '50px';
circle.style.background = 'blue';
circle.style.borderRadius = '50%';
circle.style.position = 'absolute';


var circleInterval = setInterval(function () {

    var boxHeight = parseInt((box.style.height).replace('px', ''));
    var circleHeight = parseInt((circle.style.height).replace('px', ''));
    // console.log(typeof (circlePosition));
    if (direction) {
        if ((boxHeight - circleHeight) >= circlePosition)
            circlePosition += 1;
        else {
            circlePosition -= 1;
            direction = false;
        }
    } else {
        if (0 <= circlePosition)
            circlePosition -= 1;
        else {
            circlePosition += 1;
            direction = true;
        }
    }
    circle.style.top = circlePosition + 'px';
}, 10);

setTimeout(function () {
    clearInterval(circleInterval);
}, 60000);