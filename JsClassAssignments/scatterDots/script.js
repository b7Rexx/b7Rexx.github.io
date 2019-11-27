var wrapper = document.getElementById('wrapper');
var scatterBlock = document.createElement('div');

var points = [
  {x: 10, y: 20, color: 'red'},
  {x: 120, y: 30, color: 'blue'},
  {x: 210, y: 40, color: 'yellow'},
  {x: 20, y: 50, color: 'green'},
  {x: 105, y: 200, color: 'purple'},
  {x: 100, y: 30, color: 'white'},
];

wrapper.appendChild(scatterBlock);

scatterBlock.style.height = '250px';
scatterBlock.style.width = '250px';
scatterBlock.style.background = 'whitesmoke';
scatterBlock.style.position = 'relative';

points.forEach(function (value) {
  var dot = document.createElement('span');

  scatterBlock.appendChild(dot);

  dot.style.position = 'absolute';
  dot.style.background = value.color;
  dot.style.height = '10px';
  dot.style.width = '10px';
  dot.style.borderRadius = '50%';
  dot.style.left = value.x + 'px';
  dot.style.top = value.y + 'px';
});
