var SPEED = 10;
var BOX_HEIGHT = 400;
var CIRCLE_DIAMETER = 50;
var wrapper = document.getElementById('wrapper');
var box = document.createElement('div');
var circle = document.createElement('span');
var circlePosition = 0;
//direction :  true => downward , false => upward
var direction = true;

wrapper.appendChild(box);
box.appendChild(circle);

box.style.height = BOX_HEIGHT + 'px';
box.style.width = '200px';
box.style.background = 'whitesmoke';
box.style.position = 'relative';

circle.style.height = CIRCLE_DIAMETER + 'px';
circle.style.width = CIRCLE_DIAMETER + 'px';
circle.style.background = 'blue';
circle.style.borderRadius = '50%';
circle.style.position = 'absolute';


var setBounceInterval = setInterval(function () {
    if (direction) {
        if ((BOX_HEIGHT - CIRCLE_DIAMETER) >= circlePosition)
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
}, SPEED);

setTimeout(function () {
    clearInterval(setBounceInterval);
}, 120000);
