var SLIDE_TIMER = 3000;
var SLIDER_LENGTH = 500;
var ANIMATION_SPEED = 15;

var wrapper = document.getElementById('wrapper');
var carouselBlock = document.createElement('div');
var carouselWrapper = document.createElement('div');
var rightArrow = document.createElement('span');
var leftArrow = document.createElement('span');
var imageDotListParent = document.createElement('ul');

var carouselWrapperIndex = 0;
var animateIntervalRight = '';
var animateIntervalLeft = '';
var imageArray = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
var setImageInterval = setInterval(setImageIntervalFunc, SLIDE_TIMER);

wrapper.appendChild(carouselBlock);
carouselBlock.appendChild(carouselWrapper);
carouselBlock.appendChild(leftArrow);
carouselBlock.appendChild(rightArrow);
carouselBlock.appendChild(imageDotListParent);

carouselBlock.className += ' carousel-container';
carouselBlock.style.height = SLIDER_LENGTH + 'px';
carouselBlock.style.width = SLIDER_LENGTH + 'px';
carouselWrapper.className += ' carousel-wrapper';
carouselWrapper.style.height = SLIDER_LENGTH + 'px';
leftArrow.className += ' left-arrow-btn';
leftArrow.innerHTML = '&#10094;';
rightArrow.className += ' right-arrow-btn';
rightArrow.innerHTML = '&#10095;';
imageDotListParent.id = 'image-dot-list';

//accumulate images to carousel along with dot buttons
imageArray.forEach(function (value, index) {
    var image = document.createElement('img');
    image.className += 'carousel-image';
    image.style.width = SLIDER_LENGTH + 'px';
    image.src = 'images/' + value;
    image.alt = value;
    carouselWrapper.appendChild(image);

    var imageDotList = document.createElement('li');
    var imageDotA = document.createElement('a');
    if (index === 0)
        imageDotList.className += 'active';

    imageDotA.className += 'image-dot-button';
    imageDotListParent.appendChild(imageDotList);
    imageDotList.appendChild(imageDotA);
});

leftArrow.addEventListener('click', function () {
    wrapperSliderByImageIndex((carouselWrapperIndex - 1));
});

rightArrow.addEventListener('click', function () {
    wrapperSliderByImageIndex((carouselWrapperIndex + 1));
});

var listArray = document.getElementById('image-dot-list');
var listArrayButtons = listArray.getElementsByTagName('li');
Object.values(listArrayButtons).forEach(function (value, index) {
    value.addEventListener('click', function () {
        wrapperSliderByImageIndex(index);
    });
});

/*
set default image slider by SLIDE_TIMER
 */
function setImageIntervalFunc() {
    wrapperSliderByImageIndex((carouselWrapperIndex + 1));
}

/*
@param {int} imageIndex
imageIndex from imageArray index
 */
function wrapperSliderByImageIndex(imageIndex) {
    var imageNewIndex = 0;
    if (imageIndex < 0) {
        imageNewIndex = (imageArray.length - 1);
        carouselWrapperPosition = imageNewIndex * SLIDER_LENGTH;
        carouselWrapper.style.left = '-' + carouselWrapperPosition + 'px';
        //reset slider interval
        clearInterval(setImageInterval);
        setImageInterval = setInterval(setImageIntervalFunc, SLIDE_TIMER);
    } else if (imageIndex >= (imageArray.length)) {
        imageNewIndex = 0;
        carouselWrapperPosition = imageNewIndex * SLIDER_LENGTH;
        carouselWrapper.style.left = '-' + carouselWrapperPosition + 'px';
        //reset slider interval
        clearInterval(setImageInterval);
        setImageInterval = setInterval(setImageIntervalFunc, SLIDE_TIMER);
    } else {
        //clear slider interval
        clearInterval(setImageInterval);
        slideImageAnimation(carouselWrapperIndex, imageIndex);
        imageNewIndex = imageIndex;
    }
    carouselWrapperIndex = imageNewIndex;

    // var listArray = document.getElementsByClassName('image-dot-list');
    // var listArrayButtons = listArray[0].children || {};
    Object.values(listArrayButtons).forEach(function (value) {
        value.classList.remove('active');
    });

    if (listArrayButtons.hasOwnProperty(imageNewIndex))
        listArrayButtons[imageNewIndex].className += ' active';
}

/*
@param {int} start
@param {int} end
start,end from imageArray index
 */
function slideImageAnimation(start, end) {
    animationWrapperStart = start * SLIDER_LENGTH;
    animationWrapperEnd = end * SLIDER_LENGTH;
    var smallShiftAnimate = 0;

    //clear remains of interrupted animateInterval
    clearInterval(animateIntervalRight);
    clearInterval(animateIntervalLeft);

    if (start < end) {

        smallShiftAnimate = animationWrapperStart;
        //Animate Right
        animateIntervalRight = setInterval(function () {
            smallShiftAnimate += 10;
            carouselWrapper.style.left = '-' + smallShiftAnimate + 'px';

            //clear current interval to reset default interval on complete
            if (smallShiftAnimate >= animationWrapperEnd) {
                clearInterval(animateIntervalRight);
                setTimeout(function () {
                    setImageInterval = setInterval(setImageIntervalFunc, SLIDE_TIMER);
                }, 1000);
            }
        }, ANIMATION_SPEED);
    } else {
        smallShiftAnimate = animationWrapperStart;
        animateIntervalLeft = setInterval(function () {
            smallShiftAnimate -= 10;
            carouselWrapper.style.left = '-' + smallShiftAnimate + 'px';

            //clear current interval to reset default interval on complete
            if (smallShiftAnimate <= animationWrapperEnd) {
                clearInterval(animateIntervalLeft);
                setTimeout(function () {
                    setImageInterval = setInterval(setImageIntervalFunc, SLIDE_TIMER);
                }, 1000);
            }
        }, ANIMATION_SPEED);
    }
}
