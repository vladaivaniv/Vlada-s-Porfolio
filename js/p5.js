let canvas;
let homeSection;

function setup() {
    homeSection = document.getElementById('home');
    // Create the canvas to match the #home section dimensions
    canvas = createCanvas(homeSection.offsetWidth, homeSection.offsetHeight);
    canvas.parent('home'); // Attach the canvas to the home section
    background(15, 0, 0);
    angleMode(DEGREES);
    describe('Two eyes that follow the cursor.');
}

function draw() {
    fill(getComputedStyle(document.documentElement).getPropertyValue('--color-background-secondary'));
    noStroke(); // Disables drawing points, lines, and the outlines of shapes.
    ellipse(mouseX, mouseY, 150, 150);

    // Position eyes at the bottom of the canvas
    let leftX = (homeSection.offsetWidth / 2) - 50;
    let leftY = homeSection.offsetHeight - 100; // Positioned 100px from the bottom

    // Calculate angle between left eye and mouse
    let leftAngle = atan2(mouseY - leftY, mouseX - leftX);

    push();
    translate(leftX, leftY);
    fill(255);
    ellipse(0, 0, 50, 50); // Left eye
    rotate(leftAngle);
    fill(0);
    ellipse(12.5, 0, 25, 25); // Left pupil
    pop();

    // Draw right eye
    let rightX = (homeSection.offsetWidth / 2) + 50;
    let rightY = homeSection.offsetHeight - 100; // Positioned 100px from the bottom

    // Calculate angle between right eye and mouse
    let rightAngle = atan2(mouseY - rightY, mouseX - rightX);

    push();
    translate(rightX, rightY);
    fill(255);
    ellipse(0, 0, 50, 50); // Right eye
    rotate(rightAngle);
    fill(0);
    ellipse(12.5, 0, 25, 25); // Right pupil
    pop();
}

function windowResized() {
    resizeCanvas(homeSection.offsetWidth, homeSection.offsetHeight);
}
