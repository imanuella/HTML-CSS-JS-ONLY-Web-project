const left = document.getElementById("left-side");
let lastX = 0;
let widthUpdateRequested = false;


const handleMouseMove = e => {
  lastX = e.clientX;
  widthUpdateRequested = true;
};


const updateWidth = () => {
  if (widthUpdateRequested) {
    const p = lastX / window.innerWidth * 100;
    left.style.width = `${p}%`;
    widthUpdateRequested = false;
  }
  requestAnimationFrame(updateWidth);
};

document.addEventListener('mousemove', handleMouseMove);

requestAnimationFrame(updateWidth);


function getRandomPastelColor() {
  const r = Math.floor(Math.random() * 128) + 127; 
  const g = Math.floor(Math.random() * 128) + 127; 
  const b = Math.floor(Math.random() * 128) + 127;
  return `rgb(${r}, ${g}, ${b})`;
}

function changeColors() {
  document.documentElement.style.setProperty('--dark', getRandomPastelColor());
  document.documentElement.style.setProperty('--yellow', getRandomPastelColor());
  document.documentElement.style.setProperty('--blue', getRandomPastelColor());
  document.documentElement.style.setProperty('--c1', getRandomPastelColor());
  document.documentElement.style.setProperty('--c2', getRandomPastelColor());
}

window.onload = changeColors;