var wrapper = document.getElementById('wrapper');
var carousel = document.createElement('div');
var imageBlock = document.createElement('div');
var image = document.createElement('img');
var rightArrow = document.createElement('span');
var leftArrow = document.createElement('span');
var imageDotul = document.createElement('ul');

var imageArray = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
var imageInit = 0;
var imageInterval = setInterval(imageChange, 4000);

wrapper.appendChild(carousel);
carousel.appendChild(imageBlock);
imageBlock.appendChild(image);
imageBlock.appendChild(rightArrow);
imageBlock.appendChild(leftArrow);
imageBlock.appendChild(imageDotul);

carousel.style.position = 'relative';
carousel.style.height = '400px';
carousel.style.width = '600px';
carousel.style.background = 'whitesmoke';

imageBlock.style.position = 'absolute';
imageBlock.style.height = '400px';
imageBlock.style.width = '600px';
imageBlock.style.background = 'wheat';

image.style.height = '100%';
image.style.width = '100%';
image.style.display = 'block';
image.src = './images/' + imageArray[0];

rightArrow.style.position = 'absolute';
rightArrow.style.right = '5px';
rightArrow.style.top = '40%';
rightArrow.style.zIndex = '10';
rightArrow.style.fontSize = '40px';
rightArrow.style.color = 'white';
rightArrow.style.cursor = 'pointer';
rightArrow.style.opacity = '0.7';
rightArrow.innerHTML = '&#10095;';

leftArrow.style.position = 'absolute';
leftArrow.style.left = '5px';
leftArrow.style.top = '40%';
leftArrow.style.zIndex = '10';
leftArrow.style.fontSize = '40px';
leftArrow.style.color = 'white';
leftArrow.style.cursor = 'pointer';
leftArrow.style.opacity = '0.7';
leftArrow.innerHTML = '&#10094;';

imageDotul.style.position = 'absolute';
imageDotul.style.bottom = 0;
imageDotul.style.left = '40%';
imageDotul.style.bottom = '10px';

leftArrow.addEventListener('click', function () {
    if (imageInit !== 0)
        imageInit -= 1;
    else {
        imageInit = (imageArray.length - 1);
    }
    imageByIndex(imageInit);
    resetImageInterval();
});

rightArrow.addEventListener('click', function () {
    if (imageInit !== (imageArray.length - 1))
        imageInit += 1;
    else {
        imageInit = 0;
    }
    imageByIndex(imageInit);
    resetImageInterval();
});


imageArray.forEach(function (value, index) {
    var imageDotli = document.createElement('li');
    var imageDotA = document.createElement('a');

    imageDotli.style.float = 'left';
    imageDotli.style.height = '10px';
    imageDotli.style.width = '10px';
    imageDotli.style.marginRight = '10px';
    imageDotli.style.opacity = '0.7';

    imageDotA.style.height = '10px';
    imageDotA.style.width = '10px';
    imageDotA.style.display = 'block';
    imageDotA.style.borderRadius = '50%';
    imageDotA.style.border = '2px solid white';
    imageDotA.style.background = 'grey';
    imageDotA.style.cursor = 'pointer';
    imageDotA.className += ' image-button';

    imageDotul.appendChild(imageDotli);
    imageDotli.appendChild(imageDotA);

    imageDotA.addEventListener('mouseover', function () {
        imageDotA.style.background = 'blue';
    });
    imageDotA.addEventListener('mouseout', function () {
        imageDotA.style.background = 'grey';
    });

    imageDotA.addEventListener('click', function () {
        imageInit = index;
        imageByIndex(index);
        resetImageInterval();
    });
});

function imageChange() {
    if (imageArray.length <= (imageInit + 1)) {
        imageInit = 0;
    } else {
        imageInit += 1;
    }
    imageByIndex(imageInit);
}

function imageByIndex(index) {
    if (imageArray.hasOwnProperty(index))
        image.src = './images/' + imageArray[index];

    // var imageButtons = document.getElementsByClassName('image-button');
    // imageButtons[index].style.background ='red';
}

function resetImageInterval() {
    clearInterval(imageInterval);
    imageInterval = setInterval(imageChange, 4000);
}