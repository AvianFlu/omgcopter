

var arDrone = require('ar-drone');

var client = arDrone.createClient();

client.takeoff(function () {
  client.up(0.25);
  client.clockwise(0.75);
  client.front(0.25);
  client.after(8000, phaseTwo);
});

function phaseTwo() {
  client.stop();
  client.front(0.25);
  client.after(3000, client.land);
}
