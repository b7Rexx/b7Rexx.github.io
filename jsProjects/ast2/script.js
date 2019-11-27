function CarouselContainer(carouselId, length) {
  this.length = length;

  /*
  Initialize carousel container with input length
   */
  this.getInitContainer = function () {
    var carouselContainer = document.getElementById(carouselId);
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

function Carousel(carouselId, imageLength, sliderTimer = 2000, animationSpeed = 20) {
  //Carousel extends CarouselContainer
  CarouselContainer.call(this, carouselId, imageLength);

  var that = this;
  this.imageLength = imageLength;
  this.sliderTimer = sliderTimer;
  this.animationSpeed = animationSpeed;
  this.carouselWrapperIndex = 0;
  this.animateIntervalRight = 0;
  this.animateIntervalLeft = 0;

  /*
  Call extended funtions from CarouselContainer
   */
  this.carouselContainer = this.getInitContainer();
  this.leftArrow = this.getLeftArrow();
  this.rightArrow = this.getRightArrow();
  this.dotList = this.getDotList();

  this.element = this.carouselContainer.getElementsByClassName('carousel-wrapper')[0];
  this.element.style.height = this.imageLength + 'px';

  /*
  @return {array} imageArray
   */
  this.getImages = function () {
    return this.element.getElementsByTagName('img');
  };

  /*
  initialize active class along with dot buttons
   */
  this.initImages = function () {
    var imageArray = this.getImages();
    this.element.style.width = (this.imageLength * imageArray.length) + 'px';
    var getDotButtons = Object.values(imageArray).map(function (value, index) {
      value.style.width = that.imageLength + 'px';
      value.style.height = that.imageLength + 'px';
      var dotButtonLi = document.createElement('li');
      var dotButton = document.createElement('a');
      if (index === 0)
        dotButtonLi.classList.add('active');
      dotButton.classList.add('image-dot-button');
      that.dotList.appendChild(dotButtonLi);
      dotButtonLi.appendChild(dotButton);
      return dotButtonLi;
      // return dotButton;
    });

    getDotButtons.forEach(function (value, index) {
      value.addEventListener('click', function () {
        getDotButtons.forEach(function (value) {
          value.classList.remove('active');
        });
        that.wrapperSliderByImageIndex(index);
        this.classList.add('active');
      });
    });
  };

  /*
  Start Auto Slide Show after setting height width on carousel wrapper
   */
  this.startAutoSlideShow = function () {
    this.startImageSlider = setInterval(that.setImageIntervalFunc, that.sliderTimer);
  };
  this.startImageSlider = setInterval(that.setImageIntervalFunc, that.sliderTimer);
  /*
  Auto carousel set interval function
   */
  this.setImageIntervalFunc = function () {
    that.wrapperSliderByImageIndex((that.carouselWrapperIndex + 1))
  };

  this.wrapperSliderByImageIndex = function (imageIndex) {
    //reset slider interval
    clearInterval(that.startImageSlider);
    var imageNewIndex = 0;
    var carouselWrapperPosition = 0;
    var imageArrayLength = that.getImages().length;
    if (imageIndex < 0) {
      imageNewIndex = (imageArrayLength - 1);
      carouselWrapperPosition = imageNewIndex * that.imageLength;
      that.element.style.left = '-' + carouselWrapperPosition + 'px';
      //reset slider interval
      that.startImageSlider = setInterval(that.setImageIntervalFunc, that.sliderTimer);
    } else if (imageIndex >= (imageArrayLength)) {
      imageNewIndex = 0;
      carouselWrapperPosition = imageNewIndex * that.imageLength;
      that.element.style.left = '-' + carouselWrapperPosition + 'px';
      //reset slider interval
      that.startImageSlider = setInterval(that.setImageIntervalFunc, that.sliderTimer);
    } else {
      that.slideImageAnimation(that.carouselWrapperIndex, imageIndex);
      imageNewIndex = imageIndex;
      // carouselWrapperPosition = imageNewIndex * that.imageLength;
      // that.element.style.left = '-' + carouselWrapperPosition + 'px';
      // that.startImageSlider = setInterval(that.setImageIntervalFunc, that.sliderTimer);
    }
    that.carouselWrapperIndex = imageNewIndex;
    Object.values(that.dotList.getElementsByTagName('li')).forEach(function (value, index) {
      value.classList.remove('active');
      if (index === imageNewIndex)
        value.classList.add('active');
    });

  };

  /*
@param {int} start
@param {int} end
start,end from imageArray index
 */
  this.slideImageAnimation = function (start, end) {
    var smallShiftAnimate = 0;
    var animationWrapperStart = start * that.imageLength;
    var animationWrapperEnd = end * that.imageLength;

    //clear remains of interrupted animateInterval
    clearInterval(that.animateIntervalRight);
    clearInterval(that.animateIntervalLeft);

    if (start < end) {
      smallShiftAnimate = animationWrapperStart;
      //Animate Right
      that.animateIntervalRight = setInterval(function () {
        smallShiftAnimate += 10;
        that.element.style.left = '-' + smallShiftAnimate + 'px';

        //clear current interval to reset default interval on complete
        if (smallShiftAnimate >= animationWrapperEnd) {
          clearInterval(that.animateIntervalRight);
          setTimeout(function () {
            that.startImageSlider = setInterval(that.setImageIntervalFunc, that.sliderTimer);
          }, 1000);
        }
      }, that.animationSpeed);
    } else {
      smallShiftAnimate = animationWrapperStart;
      that.animateIntervalLeft = setInterval(function () {
        smallShiftAnimate -= 10;
        that.element.style.left = '-' + smallShiftAnimate + 'px';

        //clear current interval to reset default interval on complete
        if (smallShiftAnimate <= animationWrapperEnd) {
          clearInterval(that.animateIntervalLeft);
          setTimeout(function () {
            that.startImageSlider = setInterval(that.setImageIntervalFunc, that.sliderTimer);
          }, 1000);
        }
      }, that.animationSpeed);
    }
  };

  this.leftArrow.addEventListener('click', function () {
    that.wrapperSliderByImageIndex((that.carouselWrapperIndex - 1))
  });

  this.rightArrow.addEventListener('click', function () {
    that.wrapperSliderByImageIndex((that.carouselWrapperIndex + 1))
  });

}

var firstCarousel = new Carousel('first-carousel', 400);
firstCarousel.initImages();
firstCarousel.startAutoSlideShow();
var secondCarousel = new Carousel('second-carousel', 300);
secondCarousel.initImages();
secondCarousel.startAutoSlideShow();
var threeCarousel = new Carousel('three-carousel', 200);
threeCarousel.initImages();
threeCarousel.startAutoSlideShow();
