

var arDrone = require('ar-drone');

var client = arDrone.createClient();

var notPhaseTwo = true;

client.on('navdata', function (data) {
  console.log(data.demo);
  if (notPhaseTwo && data.demo && data.demo.altitudeMeters > 2.3) {
    notPhaseTwo = false;
    phaseTwo();
  }
  if (data.demo && data.demo.altitudeMeters <= 2) client.up(0.10);
  if (data.demo && data.demo.altitudeMeters >= 2.4) client.down(0.10);
});

client.takeoff(function () {
  client.up(0.25);
});

function phaseTwo() {
  client.stop();
  client.front(0.35);
  client.after(10000, phaseThree);
}

function phaseThree() {
  client.stop();
  client.back(0.25);
  client.after(4000, function () {
    client.stop();
    client.land();
  });
}
