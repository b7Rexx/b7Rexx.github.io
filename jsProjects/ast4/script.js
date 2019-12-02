var appWrapper = document.getElementById('app-wrapper');
var carTraffic = new CarTraffic(appWrapper).setHeightWidth(600, 400).init();
carTraffic.changeGameKeys('a', 'd', 'w');
var appWrapper1 = document.getElementById('app-wrapper1');
var carTraffic1 = new CarTraffic(appWrapper1).setHeightWidth(600, 400).init();
carTraffic1.changeGameKeys('ArrowLeft', 'ArrowRight', 'ArrowUp');
