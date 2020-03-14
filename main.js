const timer = document.getElementById('timer');
const mode = document.getElementById('mode');
const cycle = document.getElementById('cycle');

function pad(x) {
  if (x < 10) {
    return '0' + x;
  }
  else {
    return x;
  }
}

function replicate(c, x) {
  let str = '';

  for (let i = 0; i < x; i++) {
    str += c + (i < x - 1 ? ((i + 1) % 5 == 0 ? '&nbsp;&nbsp;&nbsp;&nbsp;' : '&nbsp;') : '');
  }

  return str;
}

function timerFrom(times) {
  let start = Date.now();
  let index = 0;
  let cycles = 1;

  mode.innerHTML = times[0].mode;
  cycle.innerHTML = replicate('●', cycles);

  setInterval(function() {
    const now = Date.now();

    let secs = Math.floor((times[index].secs * 1000 - 1 - (now - start)) / 1000);

    // next step
    if (secs < 0) {
      start = Date.now();

      index = (index + 1) % times.length;
      cycles++;

      secs = Math.floor((times[index].secs * 1000 - 1 - (now - start)) / 1000);
      mode.innerHTML = times[index].mode;
      cycle.innerHTML = replicate('●', cycles);
    }

    timer.innerHTML = '' + secs;

  }, 100);
}

timerFrom([{
  secs: 30,
  mode: 'Jump'
}, {
  secs: 30,
  mode: 'Rest'
}]);
