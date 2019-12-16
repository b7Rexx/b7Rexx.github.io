let wrappers = document.getElementsByClassName('b7-wrapper');
Object.values(wrappers).forEach(function (value) {
  let newPosition = value.getAttribute('temp-position');
  if (newPosition !== undefined && newPosition !== null) {
    value.style.position = newPosition;
  }
});

let links = document.querySelectorAll('div[class^="b7-"]');
Object.values(links).forEach(function (value) {
  let linkHref = value.getAttribute('data-href');
  if (linkHref !== undefined && linkHref !== null) {
    value.style.cursor = 'pointer';
    value.onclick = function () {
      window.location.replace(linkHref)
    };
  }
});

let listLinkes = document.querySelectorAll('li[class^="b7-"]');
Object.values(listLinkes).forEach(function (value) {
  let linkHref = value.getAttribute('data-href');
  if (linkHref !== undefined && linkHref !== null) {
    value.style.cursor = 'pointer';
    value.onclick = function () {
      window.location.replace(linkHref)
    };
  }
});
