/*
@param {string} carouselId
@param {int} length
Name: CarouselContainer
Class: carousel-container
 */
function CarouselContainer(carouselId, length) {
  this.length = length;
  this.carouselId = carouselId;
  /*
  Initialize carousel container with input length
   */
  this.getInitContainer = function () {
    var carouselContainer = document.getElementById(this.carouselId);
    carouselContainer.style.width = this.length + 'px';
    carouselContainer.style.height = this.length + 'px';
    this.element = carouselContainer;
    return carouselContainer;
  };

  /*
  Left button in Container
   */
  this.getLeftArrow = function () {
    var leftArrow = document.createElement('span');
    leftArrow.classList.add('left-arrow-btn');
    leftArrow.innerHTML = '&#10094;';
    this.element.appendChild(leftArrow);
    return leftArrow;
  };

  /*
  Right button in Container
   */

  this.getRightArrow = function () {
    var rightArrow = document.createElement('span');
    rightArrow.classList.add('right-arrow-btn');
    rightArrow.innerHTML = '&#10095;';
    this.element.appendChild(rightArrow);
    return rightArrow;
  };

  /*
  Dot list in Container
  */
  this.getDotList = function () {
    var dotList = document.createElement('ul');
    dotList.classList.add('image-dot-list');
    this.element.appendChild(dotList);
    return dotList;
  };
}

/*
@param {string} carouselId
@param {int} px imageLength
@param {int} ms sliderTimer
@param {int} ms animationTime
Name: Carousel
Class: carousel-wrapper
 */
function Carousel(carouselId, imageLength, sliderTimer, animationTime) {
  /*
  Carousel extends CarouselContainer
  Call extended functions from CarouselContainer
   */
  CarouselContainer.call(this, carouselId, imageLength);
  var carouselContainer = this.getInitContainer();
  var leftArrow = this.getLeftArrow();
  var rightArrow = this.getRightArrow();
  var dotList = this.getDotList();

  var that = this;
  var animateIntervalLeft = 0;
  var animateIntervalRight = 0;

  this.animationSpeed = 50;
  this.carouselWrapperIndex = 0;
  this.imageLength = imageLength;
  this.sliderTimer = sliderTimer;
  this.animationTime = animationTime;
  this.startImageSlider = setInterval(setImageIntervalFunc, that.sliderTimer);
  this.element = carouselContainer.getElementsByClassName('carousel-wrapper')[0];

  /*
  initialize active class along with dot buttons
   @return this
   */
  this.initImages = function () {
    var getDotButtons = {};
    var imageArray = getImages();
    // define carousel wrapper height width
    this.element.style.width = (this.imageLength * imageArray.length) + 'px';
    this.element.style.height = this.imageLength + 'px';
    // Calculate animation speed by animation time from params
    this.animationSpeed = parseInt((this.animationTime * 10) / this.imageLength);
    //arrow events
    leftArrow.addEventListener('click', function () {
      wrapperSliderByImageIndex((that.carouselWrapperIndex - 1))
    });

    rightArrow.addEventListener('click', function () {
      wrapperSliderByImageIndex((that.carouselWrapperIndex + 1))
    });

    getDotButtons = Object.values(imageArray).map(function (value, index) {
      var dotButtonLi = document.createElement('li');
      var dotButton = document.createElement('a');
      value.style.width = that.imageLength + 'px';
      value.style.height = that.imageLength + 'px';
      if (index === 0)
        dotButtonLi.classList.add('active');
      dotButton.classList.add('image-dot-button');
      dotList.appendChild(dotButtonLi);
      dotButtonLi.appendChild(dotButton);
      return dotButtonLi;
      // return dotButton;
    });

    getDotButtons.forEach(function (value, index) {
      value.addEventListener('click', function () {
        getDotButtons.forEach(function (value) {
          value.classList.remove('active');
        });
        wrapperSliderByImageIndex(index);
        this.classList.add('active');
      });
    });
    return this;
  };

  /*
  Start Auto Slide Show after setting height width on carousel wrapper
  @return this
   */
  this.startAutoSlideShow = function () {
    that.startImageSlider = setInterval(setImageIntervalFunc, that.sliderTimer);
    return this;
  };

  /*
@return {array} imageArray
 */
  function getImages() {
    return that.element.getElementsByTagName('img');
  }

  /*
Auto carousel set interval function
 */
  function setImageIntervalFunc() {
    wrapperSliderByImageIndex((that.carouselWrapperIndex + 1))
  }

  /*
  @params {int} imageIndex
   */
  function wrapperSliderByImageIndex(imageIndex) {
    var imageNewIndex = 0;
    var carouselWrapperPosition = 0;
    var imageArrayLength = getImages().length;

    //reset slider interval
    clearInterval(that.startImageSlider);

    if (imageIndex < 0) {
      imageNewIndex = (imageArrayLength - 1);
      carouselWrapperPosition = imageNewIndex * that.imageLength;
      that.element.style.left = '-' + carouselWrapperPosition + 'px';
      //reset slider interval
      that.startImageSlider = setInterval(setImageIntervalFunc, that.sliderTimer);
    } else if (imageIndex >= (imageArrayLength)) {
      imageNewIndex = 0;
      carouselWrapperPosition = imageNewIndex * that.imageLength;
      that.element.style.left = '-' + carouselWrapperPosition + 'px';
      //reset slider interval
      that.startImageSlider = setInterval(setImageIntervalFunc, that.sliderTimer);
    } else {
      slideImageAnimation(that.carouselWrapperIndex, imageIndex);
      imageNewIndex = imageIndex;
    }
    //update carousel image index, active state of dot buttons
    that.carouselWrapperIndex = imageNewIndex;
    Object.values(dotList.getElementsByTagName('li')).forEach(function (value, index) {
      value.classList.remove('active');
      if (index === imageNewIndex)
        value.classList.add('active');
    });
  }

  /*
@param {int} start
@param {int} end
start,end from imageArray index
 */
  function slideImageAnimation(start, end) {
    var animationWrapperStart = start * that.imageLength;
    var animationWrapperEnd = end * that.imageLength;
    var smallShiftAnimate = animationWrapperStart;

    //clear remains of interrupted animateInterval
    clearInterval(animateIntervalRight);
    clearInterval(animateIntervalLeft);

    if (start < end) {
      /*
      Animate Right
       */
      animateIntervalRight = setInterval(function () {
        smallShiftAnimate += 10;
        that.element.style.left = '-' + smallShiftAnimate + 'px';

        //clear current interval to reset default interval on complete
        if (smallShiftAnimate >= animationWrapperEnd) {
          clearInterval(animateIntervalRight);
          setTimeout(function () {
            that.startImageSlider = setInterval(setImageIntervalFunc, that.sliderTimer);
          }, 10);
        }
      }, that.animationSpeed);
    } else {
      /*
      Animate Left
       */
      animateIntervalLeft = setInterval(function () {
        smallShiftAnimate -= 10;
        that.element.style.left = '-' + smallShiftAnimate + 'px';

        //clear current interval to reset default interval on complete
        if (smallShiftAnimate <= animationWrapperEnd) {
          clearInterval(animateIntervalLeft);
          setTimeout(function () {
            that.startImageSlider = setInterval(setImageIntervalFunc, that.sliderTimer);
          }, 10);
        }
      }, that.animationSpeed);
    }
  }
}

// window.addEventListener('resize', function () {
//   console.log();
// });


/*
@param {string} carouselId
@param {int} px imageLength
@param {int} ms sliderTimer
@param {int} ms animationTime
Name: Carousel
Class: carousel-wrapper
 */
var firstCarousel = new Carousel('first-carousel', 400, 4000, 1000);
firstCarousel.initImages().startAutoSlideShow();

var secondCarousel = new Carousel('second-carousel', 400, 3000, 500);
secondCarousel.initImages().startAutoSlideShow();

var threeCarousel = new Carousel('three-carousel', 400, 2000, 250);
threeCarousel.initImages().startAutoSlideShow();
