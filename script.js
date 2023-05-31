const timer = {
  start() {
    const startTime = Date.now();
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const { hours, mins, secs } = getTimeComponents(deltaTime);

      // console.log('start -> currentTime:', currentTime);
      // console.log('Consol inside');
      console.log(`${hours}:${mins}:${secs}`);
    }, 1000);
  },
};

// timer.start();

function pud(value) {
  return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
  const hours = pud(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pud(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pud(Math.floor((time % (1000 * 60)) / 1000));

  return { hours, mins, secs };
}
