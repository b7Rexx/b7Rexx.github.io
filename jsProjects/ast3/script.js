/*
@param {string} carouselId
@param {int} length
Name: CarouselContainer
Class: carousel-container
 */
function CarouselContainer(carouselId, length) {
  this.length = length;
  this.carouselId = carouselId;
  this.carouselContainer = {};

  /*
  Initialize carousel container with input length
   */
  this.getInitContainer = function () {
    var carouselContainer = document.getElementById(this.carouselId);
    carouselContainer.style.width = this.length + 'px';
    carouselContainer.style.height = this.length + 'px';
    this.carouselContainer = carouselContainer;
    return carouselContainer;
  };

  /*
  Left button in Container
   */
  this.getLeftArrow = function () {
    var leftArrow = document.createElement('span');
    leftArrow.classList.add('left-arrow-btn');
    leftArrow.innerHTML = '&#10094;';
    this.carouselContainer.appendChild(leftArrow);
    return leftArrow;
  };

  /*
  Right button in Container
   */

  this.getRightArrow = function () {
    var rightArrow = document.createElement('span');
    rightArrow.classList.add('right-arrow-btn');
    rightArrow.innerHTML = '&#10095;';
    this.carouselContainer.appendChild(rightArrow);
    return rightArrow;
  };

  /*
  Dot list in Container
  */
  this.getDotList = function () {
    var dotList = document.createElement('ul');
    dotList.classList.add('image-dot-list');
    this.carouselContainer.appendChild(dotList);
    return dotList;
  };
}

/*
@param {string} carouselId
@param {int} px imageLength
@param {int} ms holdTime
@param {int} ms animationTime
Name: Carousel
Class: carousel-wrapper
 */
function Carousel(carouselId, imageLength, holdTime, animationTime) {
  /*
  Carousel extends CarouselContainer
  Call extended functions from CarouselContainer
   */
  CarouselContainer.call(this, carouselId, imageLength);
  var carouselContainer = this.getInitContainer();

  var that = this;
  var dotList = {};
  var leftArrow = false;
  var rightArrow = false;
  var getDotButtons = false;
  var dotListEnableStatus = false;
  var appWrapper = document.getElementById('app-wrapper');

  this.animationSpeed = 50;
  this.carouselWrapperIndex = 0;
  this.originalWidth = imageLength;
  this.imageLength = imageLength;
  this.holdTime = holdTime;
  this.animationTime = animationTime;
  this.animateIntervalLeft = 0;
  this.animateIntervalRight = 0;
  this.startImageSlider = setInterval(setImageIntervalFunc, that.holdTime);
  this.carousel = carouselContainer.getElementsByClassName('carousel-wrapper')[0];

  /*
  Initialize will all features
   */
  this.initAll = function () {
    this.initImages();
    this.enableArrowLeftRightSlide();
    this.enableListDotButtons();
    this.enableResponsiveSlider();
  };

  /*
  initialize active class along with dot buttons
   @return this
  */
  this.enableResponsiveSlider = function () {
    responsiveLength();
    return this;
  };

  /*
  initialize active class along with dot buttons
   @return this
  */
  this.initImages = function () {
    // define carousel wrapper height width
    this.carousel.style.width = (this.imageLength * getImages().length) + 'px';
    this.carousel.style.height = this.imageLength + 'px';
    // Calculate animation speed by animation time from params
    this.animationSpeed = parseInt((this.animationTime * 10) / this.imageLength);
    return this;
  };

  /*
  Enable arrow left right buttons
  @return this
   */
  this.enableArrowLeftRightSlide = function () {
    leftArrow = this.getLeftArrow();
    rightArrow = this.getRightArrow();
    leftArrow.addEventListener('click', function () {
      if (!(this.classList.contains('disabled'))) {
        buttonDisableOnTransition(true);
        wrapperSliderByImageIndex((that.carouselWrapperIndex - 1))
      }
    });
    rightArrow.addEventListener('click', function () {
      if (!(this.classList.contains('disabled'))) {
        buttonDisableOnTransition(true);
        wrapperSliderByImageIndex((that.carouselWrapperIndex + 1))
      }
    });
    return this;
  }
  ;

  /*
  Enable list dot buttons
  @return this
   */
  this.enableListDotButtons = function () {
    var imageArray = getImages();
    dotList = this.getDotList();
    dotListEnableStatus = true;

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
        if (!(this.classList.contains('disabled'))) {
          buttonDisableOnTransition(true);
          getDotButtons.forEach(function (value) {
            value.classList.remove('active');
          });
          wrapperSliderByImageIndex(index);
          this.classList.add('active');
        }
      });
    });
    return this;
  };


  function responsiveLength() {
    resizeWindow();
    window.addEventListener('resize', function () {
      resizeWindow();
    })
  }

  function resizeWindow() {
    var appWidth = (appWrapper.offsetWidth -1);
    if (that.originalWidth > appWidth) {
      that.imageLength = appWidth;
    } else {
      /*
        @media only screen and (min-width: 992px)
       */
      if (that.originalWidth > 992) {
        that.imageLength = 992;
      } else {
        that.imageLength = that.originalWidth;
      }
    }
    carouselContainer.style.width = that.imageLength + 'px';
    carouselContainer.style.height = that.imageLength + 'px';

    that.carousel.style.width = (that.imageLength * getImages().length) + 'px';
    that.carousel.style.height = that.imageLength + 'px';
    // Calculate animation speed by animation time from params
    that.animationSpeed = parseInt((that.animationTime * 10) / that.imageLength);
    Object.values(getImages()).forEach(function (value) {
      value.style.height = that.imageLength + 'px';
      value.style.width = that.imageLength + 'px';
    })
  }

  /*
  @return {array} imageArray
  */
  function getImages() {
    return that.carousel.getElementsByTagName('img');
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
      that.carousel.style.left = '-' + carouselWrapperPosition + 'px';
      //reset slider interval
      buttonDisableOnTransition(false);
      that.startImageSlider = setInterval(setImageIntervalFunc, that.holdTime);
    } else if (imageIndex >= (imageArrayLength)) {
      imageNewIndex = 0;
      carouselWrapperPosition = imageNewIndex * that.imageLength;
      that.carousel.style.left = '-' + carouselWrapperPosition + 'px';
      //reset slider interval
      buttonDisableOnTransition(false);
      that.startImageSlider = setInterval(setImageIntervalFunc, that.holdTime);
    } else {
      slideImageAnimation(that.carouselWrapperIndex, imageIndex);
      imageNewIndex = imageIndex;
    }
    //update carousel image index, active state of dot buttons
    that.carouselWrapperIndex = imageNewIndex;
    if (dotListEnableStatus)
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
    clearInterval(that.animateIntervalRight);
    clearInterval(that.animateIntervalLeft);

    if (start < end) {
      /*
      Animate Right
       */
      that.animateIntervalRight = setInterval(function () {
        smallShiftAnimate += 10;
        that.carousel.style.left = '-' + smallShiftAnimate + 'px';

        //clear current interval to reset default interval on complete
        if (smallShiftAnimate >= animationWrapperEnd) {
          buttonDisableOnTransition(false);
          clearInterval(that.animateIntervalRight);
          setTimeout(function () {
            that.startImageSlider = setInterval(setImageIntervalFunc, that.holdTime);
          }, 500);
        }
      }, that.animationSpeed);
    } else {
      /*
      Animate Left
       */
      that.animateIntervalLeft = setInterval(function () {
        smallShiftAnimate -= 10;
        that.carousel.style.left = '-' + smallShiftAnimate + 'px';

        //clear current interval to reset default interval on complete
        if (smallShiftAnimate <= animationWrapperEnd) {
          buttonDisableOnTransition(false);
          clearInterval(that.animateIntervalLeft);
          setTimeout(function () {
            that.startImageSlider = setInterval(setImageIntervalFunc, that.holdTime);
          }, 500);
        }
      }, that.animationSpeed);
    }
  }

  /*
  Disable slide buttons on transition
   @params {boolean} set  - true => add class disabled, false => remove class disabled
   */
  function buttonDisableOnTransition(set) {
    if (set) {
      if (leftArrow)
        leftArrow.classList.add('disabled');
      if (rightArrow)
        rightArrow.classList.add('disabled');
      Object.values(getDotButtons).forEach(function (value) {
        value.classList.add('disabled');
      });
    } else {
      if (leftArrow)
        leftArrow.classList.remove('disabled');
      if (rightArrow)
        rightArrow.classList.remove('disabled');
      Object.values(getDotButtons).forEach(function (value) {
        value.classList.remove('disabled');
      });
    }
  }
}

/*
@param {string} carouselId
@param {int} px imageLength
@param {int} ms holdTime
@param {int} ms animationTime
Name: Carousel
Class: carousel-wrapper
 */
// var firstCarousel = new Carousel('first-carousel', 400, 3000, 250);
// firstCarousel.initAll();

var secondCarousel = new Carousel('second-carousel', 1000, 1000, 500);
secondCarousel.initAll();
