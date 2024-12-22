// Select canvas and set dimensions
const canvas = document.getElementById('pllCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// Variables for PLL simulation
let gain = 50;
let noiseLevel = 1;
let phaseError = 0;
let frequency = 0;
let delay = 10;
let jitter = 5;

// Controls
document.getElementById('gain').addEventListener('input', (e) => gain = parseInt(e.target.value));
document.getElementById('noise').addEventListener('input', (e) => noiseLevel = parseFloat(e.target.value));
document.getElementById('delay').addEventListener('input', (e) => delay = parseInt(e.target.value));
document.getElementById('jitter').addEventListener('input', (e) => jitter = parseInt(e.target.value));

// Binary data generation for CDR
const binaryDataDiv = document.getElementById('binaryData');
function generateBinaryData() {
  const binaryStream = Array.from({ length: 32 }, () => Math.round(Math.random())).join(' ');
  binaryDataDiv.innerText = binaryStream;
  setTimeout(generateBinaryData, 1000); // Refresh every second
}

// Draw Loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Simulate phase error
  phaseError += (Math.random() * noiseLevel - noiseLevel / 2) * 0.1;
  phaseError = phaseError * (1 - gain / 100);

  // Simulate frequency locking
  frequency = 1 + gain * phaseError / 100;

  // Visualize Noise as a sine wave
  ctx.beginPath();
  ctx.moveTo(0, 200);
  for (let x = 0; x < canvas.width; x++) {
    const y = 200 + Math.sin((x + delay) / 20) * noiseLevel * 10 + (Math.random() - 0.5) * jitter;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'blue';
  ctx.stroke();

  // Draw Frequency
  ctx.fillStyle = 'green';
  ctx.fillRect(50, 200 - frequency * 50, 10, frequency * 100);

  // Draw labels
  ctx.fillStyle = 'black';
  ctx.fillText(`Phase Error: ${phaseError.toFixed(2)}`, 50, 140);
  ctx.fillText(`Frequency: ${frequency.toFixed(2)}`, 50, 230);

  requestAnimationFrame(draw);
}

// Start simulation
generateBinaryData();
draw();
