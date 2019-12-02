var appWrapper = document.getElementById('app-wrapper');
var carTraffic = new CarTraffic(appWrapper).setHeightWidth(600, 400).init();
carTraffic.changeGameKeys('a', 'd', 'w', 's');