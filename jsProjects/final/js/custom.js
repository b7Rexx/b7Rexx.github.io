let wrappers = document.getElementsByClassName('b7-wrapper');
Object.values(wrappers).forEach(function (value) {
  let newPosition = value.getAttribute('temp-position');
  if (newPosition !== undefined && newPosition !== null) {
    value.style.position = newPosition;
  }
});
