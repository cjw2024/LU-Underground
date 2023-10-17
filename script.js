/**
 * code from code pen: https://codepen.io/jpweller/pen/JpBxqm
 */

var $window = $(window),
    $parallax = $(".parallax"),
    $phone = $(".phone"),
    $items = $(".parallax__items li");

var scrollTop,
    parallaxOffset,
    windowHeight,
    phoneHeight,
    phoneWidth,
    parallaxHeight;

function updateVariableDependantOnWindowSize() {
  $phone.css({
    position: "",
    top: "",
    width: ""
  });
  windowHeight = $window.height();
  phoneHeight = $phone.height();
  phoneWidth = $phone.width();
  parallaxHeight = $parallax.height();
}

function updateVariableDependantOnScroll() {
  scrollTop = $window.scrollTop();
  parallaxOffset = $parallax.offset().top;
}

function getParallaxOffsetFromTop() {
  return (parallaxOffset - scrollTop);
}

function getPaddingAroundPhone() {
  return (windowHeight - phoneHeight) / 2;
}

function positionPhone() {
  if ($window.width() > 800) {
    if (
      getParallaxOffsetFromTop() + parallaxHeight <
      phoneHeight + getPaddingAroundPhone()
    ) {
      // past parallax element
      $phone.css({
        position: "absolute",
        top: (parallaxHeight - phoneHeight),
        width: phoneWidth
      });
    } else if (getParallaxOffsetFromTop() < getPaddingAroundPhone()) {
      // middle of parallax element
      $phone.css({
        position: "fixed",
        top: getPaddingAroundPhone(),
        width: phoneWidth
      });
    } else {
      // top of page
      $phone.css({
        position: "",
        top: "",
        width: ""
      });
    }
  } else {
    // mobile
    $phone.css({
      position: "",
      top: "",
      width: ""
    });
  }
}

function addClassesToPhone() {
  if ($window.width() > 800) {
    $items.each(function(index) {
      var $item = $(this),
          distance = $item.offset().top - scrollTop,
        itemNumber = index + 1;
      if (distance < windowHeight / 3 * 2) {
        $phone.removeClass("item-" + (itemNumber - 1));
        $phone.addClass("item-" + itemNumber);
      } else {
        $phone.removeClass("item-" + itemNumber);
      }
    });
  } else {
    // on mobile remove all item classes
    $phone.removeClass(function(index, className) {
      return (className.match(/(^|\s)item-\S+/g) || []).join(" ");
    });
  }
}

function parallax() {
  positionPhone();
  addClassesToPhone();
}

$(document).ready(function() {
  updateVariableDependantOnWindowSize();
  updateVariableDependantOnScroll();
  parallax();
});

$window.scroll(function() {
  updateVariableDependantOnScroll();
  parallax();
});

$window.resize(function() {
  updateVariableDependantOnWindowSize();
  parallax();
});