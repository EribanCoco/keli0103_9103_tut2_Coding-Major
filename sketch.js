
// Create an array of plates to store the positions of the outer layer of the plates
let plates = [
  // Outermost layer
  { x: 0.135, y: 0.13, type: 1 },
  { x: 0.43, y: 0.07, type: 2 },
  { x: 0.73, y: 0.008, type: 3 },
  { x: 0.07, y: 0.4, type: 4 },
  { x: 0.35, y: 0.34, type: 3 },
  { x: 0.63, y: 0.27, type: 5 },
  { x: 0.93, y: 0.2, type: 5 },
  { x: -0.02, y: 0.67, type: 5 },
  { x: 0.27, y: 0.62, type: 6 },
  { x: 0.56, y: 0.55, type: 7 },
  { x: 0.85, y: 0.48, type: 2 },
  { x: 0.16, y: 0.89, type: 7 },
  { x: 0.46, y: 0.85, type: 2 },
  { x: 0.76, y: 0.77, type: 1 },
  { x: 1.05, y: 0.71, type: 4 },
  { x: 0.65, y: 1.07, type: 5 },
  { x: 0.95, y: 1.0, type: 1 },
];

// Create an array of foods to store the positions of the food items
let foods = [
  //The center of the food position
  { x: 0.135, y: 0.13, type: 1 },
  { x: 0.43, y: 0.07, type: 2 },
  { x: 0.73, y: 0.008, type: 3 },
  { x: 0.07, y: 0.4, type: 4 },
  { x: 0.35, y: 0.34, type: 3 },
  { x: 0.63, y: 0.27, type: 5 },
  { x: 0.93, y: 0.2, type: 6 },
  { x: -0.02, y: 0.67, type: 6 },
  // { x: 0.27, y: 0.62 ,type:6},
  { x: 0.56, y: 0.55, type: 7 },
  { x: 0.85, y: 0.48, type: 8 },
  { x: 0.16, y: 0.89, type: 9 },
  { x: 0.46, y: 0.85, type: 10 },
  { x: 0.76, y: 0.77, type: 11 },
  { x: 1.05, y: 0.71, type: 4 },
  { x: 0.65, y: 1.07, type: 5 },
  { x: 0.95, y: 1.0, type: 1 },
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Set rectMode to CENTER to facilitate subsequent drawing
  rectMode(CENTER);
  // noLoop();
  plates=[];
}
//Function to adjust the canvas size when the window is resized
function windowResized() {
  let side = min(windowWidth, windowHeight);
  resizeCanvas(side, side);
}

function draw() {
  //Get the smaller dimension of windowWidth and windowHeight
  let side = min(windowWidth, windowHeight);
  // Resize canvas to make it a square
  resizeCanvas(side, side);
  // Set the background color
  background(255, 216, 216);

 // Plate dimensions and position settings
  let PlateRatio = sqrt(2)/6; // Ratio for the plate size
  let initPoint = sqrt(2)/4 * PlateRatio // Initial position of the plate
  let PlateDiameter = PlateRatio * side; // Diameter of the plate based on the side of the canvas
  let moveSpeed = 1/120; // Speed at which the plates move
  let timer = millis(); // Get the current time in milliseconds
  console.log(timer); 
  // When the timer exceeds a certain value and the plate count is less than 35, add a new plate
  if (timer>600*plates.length && plates.length<35){
    plates.push({ x: initPoint, y: initPoint, type: Math.round(random(0,8)) });
  }
  console.log(plates);

  // The section dealing with the "medication" part

  // Loop to control the number of pills
  for (let i = 0; i < 0.6 * side; i++) {
    let x = random(0, 1); // Random x position
    let y = random(0, 1); // Random y position

    // Define colors for the capsules and pills
    let color1 = color(255, 152, 129); // Capsule top color
    let color2 = color(254, 254, 162); // Capsule bottom color
    let color3 = color(139, 195, 219); // Pill color
    let color4 = color(255); // Secondary pill color

    // Generate a random angle for the capsules
    let angle = random(TWO_PI);

    // Draw capsules and pills
    // Capsule drawing
    drawCapsule(x, y, 0.25 * side, side, color1, color2, angle);

    // Pill drawing (can add more variations in size and color here)
    fill(color3);
    noStroke();
    circle((x + 0.1) * side, (y + 0.1) * side, 0.015 * side)

    fill(color4);
    circle((x + 0.05) * side, (y + 0.07) * side, 0.01 * side)

  }

  // Loop to draw each plate
  for (let i = 0; i < plates.length; i++) {
    let plate = plates[i];
    plate.x = plate.x + moveSpeed * sin(PI / 4); // Move plate along x-axis
    plate.y = plate.y - moveSpeed * cos(PI / 4); // Move plate along y-axis
    // Reset plate position when it goes off the canvas
    if (plate.y <= 0 - PlateRatio / 2) {
      plate.y = plate.x + sqrt(2) * PlateRatio;
      plate.x = 0 - PlateRatio / 2;
      if (plate.y >= 2) {
        plate.x = plate.y = -sqrt(2) / 4 * PlateRatio;
      }
    }
    // Initialize drawing style for plates
    noFill();
    noStroke();
    // Determine plate drawing based on its type
    switch (plate.type) {
      case 1:
        drawPinkPlate(plate.x, plate.y, PlateDiameter, side)
        break;
      case 2:
        drawYellowPlate(plate.x, plate.y, PlateDiameter, side)
        break;
      case 3:
        drawPurplePlate(plate.x, plate.y, PlateDiameter, side)
        break;
      case 4:
        drawBluePlate(plate.x, plate.y, PlateDiameter, side)
        break;
      case 5:
        drawGreenPlate(plate.x, plate.y, PlateDiameter, side)
        break;
      case 6:
        drawHotpot(plate.x, plate.y, PlateRatio, side)
        break;
      case 7:
        drawRainbowPlate(plate.x, plate.y, PlateDiameter, side)
        break;
    }
  }

  // Loop to draw each food item
  for (let i = 0; i < foods.length; i++) {
    let food = foods[i];
    // Initialize drawing style for food
    noFill();
    noStroke();
    // Determine food drawing based on its type
    switch (food.type) {
      case 1:
        drawSushi(food.x, food.y, PlateDiameter, side)
        break;
      case 2:
        drawCurry(food.x, food.y, PlateDiameter, side)
        break;
      case 3:
        drawPudding(food.x, food.y, PlateDiameter, side)
        break;
      case 4:
        drawLightDonut(food.x, food.y, PlateDiameter, side)
        break;
      case 5:
        drawBurger(food.x, food.y, PlateDiameter, side)
        break;
      case 6:
        drawSushi(food.x, food.y, PlateDiameter, side)
        break;
      case 7:
        drawLimeCake(food.x, food.y, PlateDiameter, side)
        break;
      case 8:
        drawToast(food.x, food.y, PlateDiameter, side)
        break;
      case 9:
        drawDarkDonut(food.x, food.y, PlateDiameter, side)
        break;
      case 10:
        drawPizza(food.x, food.y, PlateDiameter, side)
        break;
      case 11:
        drawLimeCake(food.x, food.y, PlateDiameter, side)
        break;
    }
  }
}


// Function to draw capsule
function drawCapsule(x, y, r, side, color1, color2, angle) {
  // Save the current coordinate system state
  push();
  // Move to the center of the capsule and rotate the coordinate system
  translate(x * side, y * side);
  rotate(angle);

  drawSemiCircle(0, -0.04 * side, 0.05 * r, PI / 2, color1)
  rect(0, -0.04 * side - 0.02 * r, 0.05 * r, 0.04 * r)
  drawSemiCircle(0, -0.04 * side - 0.08 * r, 0.05 * r, 3 * PI / 2, color2)
  rect(0, -0.04 * side - 0.06 * r, 0.05 * r, 0.04 * r)
  // Restore the original coordinate system state
  pop();
}

// Function to draw plates
  // Function to draw a pink plate
  function drawPinkPlate(x, y, r, side) {

    // function to draw pink flower pattern 
    function drawPinkFlower(x, y, PlateDiameter) {
      noStroke();
      fill(255, 205, 205);
      rect(x, y, 0.06 * PlateDiameter, 0.12 * PlateDiameter, 10);
      rect(x, y, 0.12 * PlateDiameter, 0.06 * PlateDiameter, 10);
      fill(255);
      circle(x, y, 0.03 * PlateDiameter);
    }

    // Plate body
    noStroke();
    fill(233, 167, 165);
    circle(x * side, y * side, r);

    fill(255);
    circle(x * side, y * side, 0.95 * r);

    stroke(233, 167, 165);
    strokeWeight(0.01 * r);
    noFill();
    circle(x * side, y * side, 0.65 * r);

    // Draw 8 flowers around the center
    for (let i = 0; i < 8; i++) {
      let angle = TWO_PI * i / 8; // Each flower is spaced by 1/8 of a circle
      let px = (x * side) + (0.4 * r) * cos(angle); // Calculate flower's x-coordinate
      let py = (y * side) + (0.4 * r) * sin(angle); // Calculate flower's y-coordinate
      drawPinkFlower(px, py, r); // Draw the flower
    }
  }
  // Function to draw a yellow plate
  function drawYellowPlate(x, y, r, side) {

    // Yellow plate body
    noStroke();
    fill(253, 224, 161);
    circle(x * side, y * side, r);

    fill(255, 243, 217);
    circle(x * side, y * side, 0.95 * r);

    stroke(242, 183, 101);
    strokeWeight(0.015 * r);
    fill(255);
    circle(x * side, y * side, 0.65 * r);

    // Circular flower pattern
    fill(242, 183, 101)
    noStroke();
    for (let i = 0; i < 4; i++) {
      let angle = (TWO_PI * i / 4) + ((PI / 4)); // Each circle is spaced 1/4 of a circle, starting from 4/PI
      let yx = (x * side) + (0.4 * r) * cos(angle); // Calculate flower's x-coordinate
      let yy = (y * side) + (0.4 * r) * sin(angle); // Calculate flower's y-coordinate
      circle(yx, yy, 0.1 * r);
    }

    // Rhombus pattern
    drawRhombus(x * side + r * 0.4, y * side, 0.04 * side, 0.02 * side, 0, color(242, 183, 101));
    drawRhombus(x * side - r * 0.4, y * side, 0.04 * side, 0.02 * side, 0, color(242, 183, 101));
    drawRhombus(x * side, y * side - r * 0.4, 0.02 * side, 0.04 * side, 0, color(242, 183, 101));
    drawRhombus(x * side, y * side + r * 0.4, 0.02 * side, 0.04 * side, 0, color(242, 183, 101));
  }
  // Function to draw a green plate
  function drawGreenPlate(x, y, r, side) {
    // Green plate body
    noStroke();
    fill(193, 217, 170);
    circle(x * side, y * side, r);

    noFill();
    stroke(227, 246, 203);
    strokeWeight(0.02 * r);
    circle(x * side, y * side, 0.85 * r);

    fill(255);
    stroke(227, 246, 203);
    strokeWeight(0.015 * r);
    circle(x * side, y * side, 0.70 * r);

      // Call the leaf pattern function and draw leaves at different positions
      for (let i = 0; i < 4; i++) {
        let angle = TWO_PI * i / 4; // Each leaf is spaced by 1/4 of a circle
        let gx = (x * side) + (0.43 * r) * cos(angle); // Calculate leaf's x-coordinate
        let gy = (y * side) + (0.43 * r) * sin(angle); // Calculate leaf's y-coordinate
        drawLeafPattern(gx, gy, r); // Draw the leaf pattern
      }

      // Leaf pattern function
      function drawLeafPattern(centerX, centerY, PlateDiameter) {
        fill(227, 246, 203); // Fixed leaf color
        noStroke();
    
        let width = 0.13 * PlateDiameter;  // Fixed leaf width
        let height = 0.05 * PlateDiameter; // Fixed leaf height

      // Calculate the coordinates of two ellipses
      let x1 = centerX - 0.015 * PlateDiameter; // First ellipse's x-coordinate
      let x2 = centerX + 0.023 * PlateDiameter; // Second ellipse's x-coordinate
      let y1 = centerY - 0.005 * PlateDiameter; // First ellipse's y-coordinate
      let y2 = centerY + 0.005 * PlateDiameter; // Second ellipse's y-coordinate

      // Draw two rotated ellipses for leaves
      drawRotatedEllipse(x1, y1, width, height, PI / 4); // First leaf
      drawRotatedEllipse(x2, y2, width, height, PI / 1.6); // Second leaf
    }
  }
  // Function to draw a blue plate
  function drawBluePlate(x, y, r, side) {
    noStroke();
    fill(170, 211, 215);
    circle(x * side, y * side, r);

    fill(220, 243, 254);
    circle(x * side, y * side, 0.95 * r);

    noFill();
    stroke(139, 195, 219);
    strokeWeight(0.02 * r);
    circle(x * side, y * side, 0.75 * r);

    fill(255);
    stroke(170, 211, 215);
    strokeWeight(0.015 * r);
    circle(x * side, y * side, 0.65 * r);
  }
  // Function to draw a purple plate
  function drawPurplePlate(x, y, r, side) {
    // Purple plate
    noStroke();
    fill(230, 216, 241);
    circle(x * side, y * side, r);

    fill(247, 236, 255);
    circle(x * side, y * side, 0.82 * r);

    fill(255);
    stroke(218, 192, 242);
    strokeWeight(0.015 * r);
    circle(x * side, y * side, 0.63 * r);

    // Draw 4 flowers around the center
    for (let i = 0; i < 4; i++) {
      let angle = TWO_PI * i / 4; // Each flower is spaced by 1/4 of the circle
      let px = (x * side) + (0.4 * r) * cos(angle); // Calculate the x coordinate of the flower
      let py = (y * side) + (0.4 * r) * sin(angle); // Calculate the y coordinate of the flower
      drawPurpleFlower(px, py); // Draw the flower
    }

    // Function to draw purple flower pattern
    function drawPurpleFlower(px, py) {
      //   let side = min(windowWidth, windowHeight);
      //   let PlateRadius = 0.265 * side;
      noStroke();
      fill(218, 192, 242);
      rect(px, py, 0.06 * r, 0.12 * r);
      rect(px, py, 0.12 * r, 0.06 * r,);
      fill(247, 236, 255);
      rect(px, py, 0.03 * r, 0.03 * r,);
    }
  }

  // Function to draw a rainbow plate
  function drawRainbowPlate(x, y, r, side) {

    noStroke();
    fill(170, 211, 215);
    circle(x * side, y * side, r);

    fill(220, 243, 254);
    circle(x * side, y * side, 0.95 * r);

    noFill();
    stroke(255, 205, 205);
    strokeWeight(0.03 * r);
    circle(x * side, y * side, 0.85 * r);

    fill(255);
    stroke(253, 224, 161);
    strokeWeight(0.03 * r);
    circle(x * side, y * side, 0.725 * r);
  }
  // Function to draw a Hotpot
  function drawHotpot(x, y, r, side) {
    // Multiply the ratio by side to get specific pixel coordinates
    x *= side;
    y *= side;
    r *= side;

    // Silver pot
    noStroke();
    fill(160);
    circle(x, y, r);
    circle(x - 0.12 * side, y, 0.2 * r);
    circle(x + 0.12 * side, y, 0.2 * r);

    // Hotpot soup
    drawSemiCircle(x, y, 0.92 * r, 0, color(219, 128, 89));
    drawSemiCircle(x, y, 0.92 * r, PI, color(200, 95, 95));
    drawSemiCircle(x, y - 0.23 * r, 0.46 * r, PI, color(219, 128, 89));
    drawSemiCircle(x, y + 0.23 * r, 0.46 * r, 0, color(200, 95, 95));

    // Tomato
    fill(218, 86, 63);
    circle(x, y - 0.07 * side, 0.32 * r);
    drawStar(x, y - 0.07 * side, 0.06 * r, color(119, 221, 81));
    fill(218, 86, 63);
    circle(x + 0.07 * side, y - 0.02 * side, 0.32 * r);
    drawStar(x + 0.07 * side, y - 0.02 * side, 0.06 * r, color(119, 221, 81));

    // Orange
    fill(255, 220, 89);
    circle(x - 0.072 * side, y + 0.02 * side, 0.32 * r);
    stroke(219, 128, 89);
    strokeWeight(0.01 * r);
    for (let i = 0; i < 8; i++) {
      let angle = i * (PI / 4);
      let lineX = x - 0.072 * side + 0.16 * r * cos(angle);
      let lineY = y + 0.02 * side + 0.16 * r * sin(angle);
      line(x - 0.072 * side, y + 0.02 * side, lineX, lineY);
    }


    // 黄瓜
    noStroke();
    fill(212, 255, 139);
    circle(x - 0.083 * side, y - 0.05 * side, 0.13 * r);
    circle(x - 0.05 * side, y + 0.08 * side, 0.13 * r);
    circle(x, y + 0.03 * side, 0.13 * r);

    // 黄色丸子
    fill(255, 220, 89);
    circle(x + 0.015 * side, y + 0.08 * side, 0.09 * r);
    circle(x + 0.06 * side, y - 0.08 * side, 0.09 * r);
    circle(x + 0.09 * side, y + 0.04 * side, 0.08 * r);

    // 气泡
    noFill();
    stroke(255);
    strokeWeight(0.01 * r);
    circle(x + 0.03 * side, y + 0.04 * side, 0.08 * r);
    circle(x - 0.01 * side, y - 0.02 * side, 0.06 * r);
    circle(x - 0.07 * side, y - 0.08 * side, 0.05 * r);
    circle(x - 0.02 * side, y + 0.1 * side, 0.07 * r);
    circle(x + 0.07 * side, y + 0.08 * side, 0.04 * r);
  }

// Function to draw the food
  // Function to draw the lime cake
  function drawLimeCake(x, y, r, side) {
  // Cake part
  fill(255, 245, 221);  // Cake color
  stroke(251, 234, 189); // Cake border color
  strokeWeight(0.015 * r); // Border thickness
  square(x * side, y * side, 0.33 * r); // Draw the square cake

  // Lime part
  // Dark green large circles
  fill(141, 180, 97);  // Dark green circle color
  noStroke();  // No border for circles
  circle(x * side - 0.012 * side, y * side - 0.012 * side, 0.09 * r); // Draw the lime circle
  circle(x * side + 0.012 * side, y * side + 0.012 * side, 0.09 * r); // Draw the lime circle
  circle(x * side + 0.012 * side, y * side - 0.012 * side, 0.09 * r); // Draw the lime circle

  // Light green large circles
  fill(191, 221, 158); // Light green circle color
  circle(x * side - 0.012 * side, y * side + 0.012 * side, 0.09 * r); // Draw the lime circle
  circle(x * side + 0.012 * side, y * side - 0.012 * side, 0.09 * r); // Draw the lime circle

  // Light green small circles
  circle(x * side - 0.011 * side, y * side - 0.013 * side, 0.08 * r); // Draw the small lime circle
  circle(x * side + 0.013 * side, y * side + 0.011 * side, 0.08 * r); // Draw the small lime circle

  // Dark green small circles
  fill(141, 180, 97); // Dark green circle color
  circle(x * side + 0.013 * side, y * side - 0.013 * side, 0.08 * r); // Draw the small lime circle
  circle(x * side - 0.011 * side, y * side + 0.011 * side, 0.08 * r); // Draw the small lime circle

  // Lines to add decoration on the lime cake
  fill(251, 234, 189); // Line color
  noStroke(); // No border for lines
  drawRotatedRectangle(x * side + 0.015 * side, y * side - 0.031 * side, 0.04 * r, 0.015 * r, -PI / 3); // Draw rotated line
  drawRotatedRectangle(x * side - 0.025 * side, y * side - 0.031 * side, 0.04 * r, 0.015 * r, -PI / 4); // Draw rotated line
  drawRotatedRectangle(x * side - 0.023 * side, y * side + 0.031 * side, 0.04 * r, 0.015 * r, PI / 3); // Draw rotated line
  drawRotatedRectangle(x * side + 0.03 * side, y * side + 0.030 * side, 0.04 * r, 0.015 * r, PI / 2); // Draw rotated line
  drawRotatedRectangle(x * side - 0.03 * side, y * side, 0.04 * r, 0.015 * r, PI / 3); // Draw rotated line
  drawRotatedRectangle(x * side + 0.03 * side, y * side - 0.01 * side, 0.04 * r, 0.015 * r, PI / 3); // Draw rotated line
  drawRotatedRectangle(x * side, y * side + 0.03 * side, 0.04 * r, 0.015 * r, -PI / 3); // Draw rotated line
}
  // Function to draw sushi
  function drawSushi(x, y, r, side) {
  // Seaweed rice balls
  fill(255);  // White color for rice
  stroke(60); // Light grey border for rice
  strokeWeight(0.013 * r); // Border thickness
  circle(x * side - 0.027 * side, y * side - 0.027 * side, 0.2 * r);
  circle(x * side + 0.027 * side, y * side + 0.027 * side, 0.2 * r);
  circle(x * side + 0.027 * side, y * side - 0.027 * side, 0.2 * r);
  circle(x * side - 0.027 * side, y * side + 0.027 * side, 0.2 * r);
  circle(x * side - 0.027 * side, y * side + 0.027 * side, 0.2 * r);

  // Red topping
  noStroke();
  fill(230, 132, 105); // Red color for the topping
  circle(x * side - 0.027 * side, y * side - 0.027 * side, 0.09 * r);
  circle(x * side + 0.027 * side, y * side + 0.027 * side, 0.09 * r);
  circle(x * side + 0.027 * side, y * side - 0.027 * side, 0.09 * r);
  circle(x * side - 0.027 * side, y * side + 0.027 * side, 0.09 * r);
  circle(x * side - 0.027 * side, y * side + 0.027 * side, 0.09 * r);

  // Dark green topping
  fill(110, 192, 77); // Dark green color for the topping
  circle(x * side - 0.038 * side, y * side - 0.022 * side, 0.045 * r);
  circle(x * side + 0.038 * side, y * side + 0.022 * side, 0.045 * r);
  circle(x * side + 0.038 * side, y * side - 0.022 * side, 0.045 * r);
  circle(x * side - 0.038 * side, y * side + 0.022 * side, 0.045 * r);

  // Yellow topping
  fill(255, 243, 77); // Yellow color for the topping
  circle(x * side - 0.033 * side, y * side - 0.039 * side, 0.045 * r);
  circle(x * side + 0.033 * side, y * side + 0.039 * side, 0.045 * r);
  circle(x * side + 0.033 * side, y * side - 0.039 * side, 0.045 * r);
  circle(x * side - 0.033 * side, y * side + 0.039 * side, 0.045 * r);

  // Light green topping
  fill(200, 241, 135); // Light green color for the topping
  circle(x * side - 0.039 * side, y * side - 0.032 * side, 0.045 * r);
  circle(x * side + 0.039 * side, y * side + 0.032 * side, 0.045 * r);
  circle(x * side + 0.039 * side, y * side - 0.032 * side, 0.045 * r);
  circle(x * side - 0.039 * side, y * side + 0.032 * side, 0.045 * r);
}
  // Function to draw pudding
  function drawPudding(x, y, r, side) {
  // Left side of the pudding
  fill(255, 231, 159); // Light yellow color for the pudding
  noStroke();
  circle(x * side - 0.027 * side, y * side, 0.34 * r);
  fill(146, 86, 60); // Dark brown for the bottom layer of pudding
  stroke(71, 32, 16); // Dark brown border
  strokeWeight(0.004 * r); // Border thickness
  circle(x * side - 0.027 * side, y * side, 0.19 * r);
  drawRhombus(x * side - 0.027 * side, y * side, 0.1 * r, 0.1 * r, 0, color(71, 32, 16));
  fill(255); // Set text color to white
  textSize(0.015 * r); // Set text size
  text("Pudding", x * side - 0.034 * side, y * side);

  // Right side spoon
  fill(170, 170, 170); // Gray color for the spoon
  ellipse(x * side + 0.039 * side, y * side - 0.04 * side, 0.08 * r, 0.13 * r);
  rect(x * side + 0.039 * side, y * side, 0.02 * r, 0.4 * r);
}
  // Function to draw a dark donut
  function drawDarkDonut(x, y, r, side) {
  // Donut body
  stroke(78, 55, 17); // Dark brown color for the border
  strokeWeight(0.14 * r); // Border thickness
  noFill();
  circle(x * side, y * side, 0.3 * r);

  // Blue frosting
  fill(124, 162, 242); // Light blue for frosting
  noStroke();
  circle(x * side + 0.04 * side, y * side, 0.03 * r);
  circle(x * side - 0.04 * side, y * side + 0.03 * side, 0.03 * r);
  circle(x * side - 0.03 * side, y * side - 0.02 * side, 0.03 * r);
  circle(x * side + 0.04 * side, y * side + 0.03 * side, 0.03 * r);

  // Yellow frosting
  fill(252, 244, 9); // Yellow for frosting
  noStroke();
  circle(x * side - 0.03 * side, y * side, 0.03 * r);
  circle(x * side + 0.03 * side, y * side - 0.02 * side, 0.03 * r);
  circle(x * side - 0.02 * side, y * side - 0.04 * side, 0.03 * r);
  circle(x * side + 0.004 * side, y * side + 0.035 * side, 0.03 * r);

  // Green frosting
  fill(135, 204, 104); // Green for frosting
  noStroke();
  circle(x * side, y * side - 0.045 * side, 0.03 * r);
  circle(x * side + 0.045 * side, y * side - 0.02 * side, 0.03 * r);
  circle(x * side + 0.02 * side, y * side + 0.04 * side, 0.03 * r);
  circle(x * side - 0.01 * side, y * side + 0.05 * side, 0.03 * r);

  // Red frosting
  fill(208, 113, 113); // Red for frosting
  noStroke();
  circle(x * side - 0.046 * side, y * side + 0.005 * side, 0.03 * r);
  circle(x * side - 0.02 * side, y * side + 0.03 * side, 0.03 * r);
  circle(x * side + 0.025 * side, y * side + 0.023 * side, 0.03 * r);
  circle(x * side + 0.023 * side, y * side - 0.037 * side, 0.03 * r);
}
  // Function to draw a light-colored donut
  function drawLightDonut(x, y, r, side) {

  // Drawing the main body of the donut
  stroke(230, 165, 59);  // Set stroke color to light yellow
  strokeWeight(0.14 * r);  // Set stroke weight based on radius
  noFill();  // No fill color for the circles
  circle(x * side + 0.004 * side, y * side, 0.3 * r);  // Draw the first outer circle
  stroke(251, 209, 141);  // Set stroke color to a lighter yellow
  circle(x * side, y * side, 0.3 * r);  // Draw the second inner circle

  // Drawing the blue frosting
  fill(124, 162, 242);  // Set fill color to blue
  noStroke();  // No stroke for the frosting
  circle(x * side + 0.04 * side, y * side, 0.04 * r);  // Draw blue frosting at position 1
  circle(x * side - 0.04 * side, y * side + 0.03 * side, 0.04 * r);  // Draw blue frosting at position 2
  circle(x * side - 0.03 * side, y * side - 0.02 * side, 0.04 * r);  // Draw blue frosting at position 3
  circle(x * side + 0.04 * side, y * side + 0.03 * side, 0.04 * r);  // Draw blue frosting at position 4

  // Drawing the yellow frosting
  fill(252, 244, 9);  // Set fill color to yellow
  noStroke();  // No stroke for the frosting
  circle(x * side - 0.03 * side, y * side, 0.04 * r);  // Draw yellow frosting at position 1
  circle(x * side + 0.03 * side, y * side - 0.02 * side, 0.04 * r);  // Draw yellow frosting at position 2
  circle(x * side - 0.02 * side, y * side - 0.04 * side, 0.04 * r);  // Draw yellow frosting at position 3
  circle(x * side + 0.004 * side, y * side + 0.035 * side, 0.04 * r);  // Draw yellow frosting at position 4

  // Drawing the green frosting
  fill(135, 204, 104);  // Set fill color to green
  noStroke();  // No stroke for the frosting
  circle(x * side, y * side - 0.045 * side, 0.04 * r);  // Draw green frosting at position 1
  circle(x * side + 0.045 * side, y * side - 0.02 * side, 0.04 * r);  // Draw green frosting at position 2
  circle(x * side + 0.02 * side, y * side + 0.04 * side, 0.04 * r);  // Draw green frosting at position 3
  circle(x * side - 0.01 * side, y * side + 0.05 * side, 0.04 * r);  // Draw green frosting at position 4

  // Drawing the red frosting
  fill(208, 113, 113);  // Set fill color to red
  noStroke();  // No stroke for the frosting
  circle(x * side - 0.046 * side, y * side + 0.005 * side, 0.04 * r);  // Draw red frosting at position 1
  circle(x * side - 0.02 * side, y * side + 0.03 * side, 0.04 * r);  // Draw red frosting at position 2
  circle(x * side + 0.025 * side, y * side + 0.023 * side, 0.04 * r);  // Draw red frosting at position 3
  circle(x * side + 0.023 * side, y * side - 0.037 * side, 0.04 * r);  // Draw red frosting at position 4
}

  // Function to draw a burger
  function drawBurger(x, y, r, side) {
  // Drawing the main body of the burger

  // Drawing the lettuce (green)
  noStroke();  // No stroke for the lettuce
  fill(166, 221, 155);  // Set fill color to lettuce green
  circle(x * side, y * side, 0.5 * r);  // Draw lettuce layer

  // Drawing the bun (top and bottom)
  stroke(233, 187, 104);  // Set stroke color to a light brown
  strokeWeight(0.02 * r);  // Set stroke weight based on radius
  fill(252, 217, 150);  // Set fill color to light bun color
  circle(x * side, y * side, 0.38 * r);  // Draw the top bun

  // Drawing sesame seeds on the bun
  noStroke();  // No stroke for the sesame seeds
  fill(255);  // Set fill color to white for sesame seeds
  ellipse(x * side + 0.04 * side, y * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 1
  ellipse(x * side - 0.02 * side, y * side + 0.03 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 2
  ellipse(x * side - 0.03 * side, y * side - 0.02 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 3
  ellipse(x * side + 0.02 * side, y * side + 0.03 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 4
  ellipse(x * side, y * side + 0.01 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 5
  ellipse(x * side + 0.02 * side, y * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 6
  ellipse(x * side + 0.01 * side, y * side + 0.02 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 7
  ellipse(x * side - 0.005 * side, y * side + 0.04 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 8
  ellipse(x * side - 0.003 * side, y * side - 0.02 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 9
  ellipse(x * side + 0.01 * side, y * side - 0.03 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 10
  ellipse(x * side + 0.005 * side, y * side - 0.01 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 11
  ellipse(x * side + 0.02 * side, y * side - 0.017 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 12
  ellipse(x * side - 0.02 * side, y * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 13
  ellipse(x * side - 0.04 * side, y * side + 0.01 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 14
  ellipse(x * side - 0.015 * side, y * side - 0.035 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 15
  ellipse(x * side + 0.03 * side, y * side - 0.027 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 16
  ellipse(x * side + 0.035 * side, y * side + 0.02 * side, 0.016 * r, 0.03 * r);  // Draw sesame seed 17
}
  // Function to draw a pizza
  function drawPizza(x, y, r, side) {
  // Drawing the main body of the pizza
  noStroke();  // Disable outline
  fill(248, 185, 103);  // Color for the pizza crust
  circle(x * side, y * side, 0.66 * r);  // Draw outer circle
  fill(255, 238, 194);  // Color for the pizza base
  circle(x * side, y * side, 0.57 * r);  // Draw inner circle (pizza base)

  // Draw sausage toppings
  fill(190, 67, 67);  // Color for sausage
  noStroke();  // Disable outline
  circle(x * side + 0.05 * side, y * side, 0.09 * r);
  circle(x * side + 0.04 * side, y * side - 0.04 * side, 0.09 * r);
  circle(x * side, y * side - 0.06 * side, 0.09 * r);
  circle(x * side - 0.04 * side, y * side - 0.04 * side, 0.09 * r);
  circle(x * side - 0.045 * side, y * side + 0.04 * side, 0.09 * r);
  circle(x * side + 0.04 * side, y * side + 0.04 * side, 0.09 * r);
  circle(x * side - 0.003 * side, y * side - 0.01 * side, 0.09 * r);
  circle(x * side - 0.058 * side, y * side, 0.09 * r);
  circle(x * side, y * side + 0.03 * side, 0.09 * r);
  circle(x * side, y * side + 0.063 * side, 0.09 * r);
  circle(x * side - 0.03 * side, y * side + 0.015 * side, 0.09 * r);
  // Draw mushroom toppings
  fill(114, 89, 89);  // Color for mushrooms
  circle(x * side - 0.03 * side, y * side - 0.01 * side, 0.05 * r);
  circle(x * side + 0.02 * side, y * side - 0.01 * side, 0.05 * r);
  circle(x * side - 0.022 * side, y * side + 0.04 * side, 0.05 * r);
  circle(x * side - 0.062 * side, y * side + 0.025 * side, 0.05 * r);
  circle(x * side, y * side + 0.01 * side, 0.05 * r);
  circle(x * side - 0.01 * side, y * side - 0.035 * side, 0.05 * r);
  circle(x * side - 0.025 * side, y * side - 0.06 * side, 0.05 * r);
  circle(x * side - 0.025 * side, y * side + 0.06 * side, 0.05 * r);
  circle(x * side - 0.06 * side, y * side - 0.025 * side, 0.05 * r);
  circle(x * side + 0.025 * side, y * side + 0.02 * side, 0.05 * r);
  circle(x * side + 0.055 * side, y * side + 0.025 * side, 0.05 * r);
  circle(x * side + 0.05 * side, y * side - 0.02 * side, 0.05 * r);
  circle(x * side + 0.015 * side, y * side - 0.03 * side, 0.05 * r);
  circle(x * side + 0.015 * side, y * side + 0.045 * side, 0.05 * r);
  circle(x * side + 0.023 * side, y * side - 0.05 * side, 0.05 * r);
  circle(x * side + 0.03 * side, y * side + 0.06 * side, 0.05 * r);
  // Draw green onions (using rhombus shape)
  drawRhombus(x * side - 0.04 * side, y * side - 0.02 * side, 0.03 * r, 0.07 * r, PI / 4, color(182, 215, 136))
  drawRhombus(x * side - 0.05 * side, y * side + 0.02 * side, 0.03 * r, 0.07 * r, -PI / 4, color(182, 215, 136))
  drawRhombus(x * side + 0.015 * side, y * side + 0.008 * side, 0.03 * r, 0.07 * r, PI / 4, color(182, 215, 136))
  drawRhombus(x * side + 0.03 * side, y * side + 0.008 * side, 0.03 * r, 0.07 * r, -PI / 3, color(182, 215, 136))
  drawRhombus(x * side + 0.01 * side, y * side - 0.042 * side, 0.03 * r, 0.07 * r, PI / 2.5, color(182, 215, 136))
  drawRhombus(x * side + 0.03 * side, y * side - 0.06 * side, 0.03 * r, 0.07 * r, -PI / 2.5, color(182, 215, 136))
  drawRhombus(x * side - 0.017 * side, y * side - 0.02 * side, 0.03 * r, 0.07 * r, PI / 8, color(182, 215, 136))
  drawRhombus(x * side - 0.014 * side, y * side + 0.05 * side, 0.03 * r, 0.07 * r, PI / 8, color(182, 215, 136))
  drawRhombus(x * side - 0.017 * side, y * side + 0.025 * side, 0.03 * r, 0.07 * r, PI / 8, color(182, 215, 136))
  drawRhombus(x * side - 0.015 * side, y * side + 0.005 * side, 0.03 * r, 0.07 * r, -PI / 4, color(182, 215, 136))
  drawRhombus(x * side + 0.068 * side, y * side + 0.005 * side, 0.03 * r, 0.07 * r, PI / 7, color(182, 215, 136))
  drawRhombus(x * side + 0.065 * side, y * side - 0.02 * side, 0.03 * r, 0.07 * r, -PI / 6, color(182, 215, 136))
  drawRhombus(x * side + 0.03 * side, y * side - 0.02 * side, 0.03 * r, 0.07 * r, -PI / 6, color(182, 215, 136))
  drawRhombus(x * side - 0.02 * side, y * side - 0.045 * side, 0.03 * r, 0.07 * r, PI / 6, color(182, 215, 136))
  drawRhombus(x * side + 0.017 * side, y * side + 0.03 * side, 0.03 * r, 0.07 * r, -PI / 6, color(182, 215, 136))
  drawRhombus(x * side + 0.018 * side, y * side + 0.065 * side, 0.03 * r, 0.07 * r, PI, color(182, 215, 136))
  drawRhombus(x * side + 0.06 * side, y * side + 0.038 * side, 0.03 * r, 0.07 * r, PI / 5, color(182, 215, 136))
  }
  // Function to draw curry
  function drawCurry(x, y, r, side) {
    // Define points for drawing mayonnaise
    let Mpoints = [
      { x: x * side - 0.06 * side, y: y * side - 0.02 * side },
      { x: x * side - 0.01 * side, y: y * side + 0.056 * side },
      { x: x * side - 0.03 * side, y: y * side - 0.045 * side },
      { x: x * side + 0.02 * side, y: y * side + 0.05 * side },
      { x: x * side + 0.01 * side, y: y * side - 0.05 * side },
      { x: x * side + 0.05 * side, y: y * side + 0.035 * side },
    ];
    /// Draw curry main part
    noStroke();
    fill(242, 183, 101);
    circle(x * side, y * side, 0.65 * r);
    fill(173, 72, 35);
    circle(x * side, y * side, 0.5 * r);
    // draw mayonnaise
    drawPolyline(Mpoints, 0.004 * side, color(255, 240, 211));
  }
  // Function to draw a toast with a fried egg
  function drawToast(x, y, r, side) {
    // Draw toast slice
    noStroke();
    fill(179, 133, 92)
    ellipse(x * side, y * side - 0.04 * side, 0.45 * r, 0.2 * r);
    rect(x * side, y * side + 0.02 * side, 0.1 * side, 0.09 * side)
    fill(255, 225, 144)
    ellipse(x * side, y * side - 0.04 * side, 0.4 * r, 0.17 * r);
    rect(x * side, y * side + 0.015 * side, 0.09 * side, 0.09 * side)
    // Draw fried egg
    fill(255);
    circle(x * side, y * side + 0.01 * side, 0.28 * r);
    fill(255, 213, 97);
    circle(x * side + 0.012 * side, y * side + 0.01 * side + 0.01 * side, 0.12 * r);
    // Draw chopped green onions
    fill(158, 204, 129);
    noStroke();
    // Draw rotated green onion slices
    drawRotatedRectangle(x * side + 0.015 * side, y * side - 0.031 * side, 0.03 * r, 0.015 * r, -PI / 3)
    drawRotatedRectangle(x * side - 0.025 * side, y * side - 0.031 * side, 0.03 * r, 0.015 * r, -PI / 4)
    drawRotatedRectangle(x * side - 0.023 * side, y * side + 0.031 * side, 0.03 * r, 0.015 * r, PI / 3)
    drawRotatedRectangle(x * side + 0.03 * side, y * side + 0.030 * side, 0.03 * r, 0.015 * r, PI / 2)
    drawRotatedRectangle(x * side - 0.03 * side, y * side, 0.03 * r, 0.015 * r, PI / 3)
    drawRotatedRectangle(x * side + 0.03 * side, y * side - 0.01 * side, 0.03 * r, 0.015 * r, PI / 3)
    drawRotatedRectangle(x * side, y * side + 0.03 * side, 0.03 * r, 0.015 * r, -PI / 3)
  }




//绘制形状的函数
  // Function to draw a rotated ellipse
  function drawRotatedEllipse(cx, cy, w, h, angle) {
  push();               // Save the current coordinate system
  translate(cx, cy);    // Move the origin to the center of the ellipse
  rotate(angle);        // Rotate the coordinate system by the given angle
  ellipse(0, 0, w, h);  // Draw the ellipse in the rotated coordinate system
  pop();                // Restore the previous coordinate system
  }
  // Function to draw a rhombus (diamond shape)
  function drawRhombus(cx, cy, width, height, angle, fillColor) {
    let side = min(windowWidth, windowHeight);
    
    // Calculate the four vertices of the rhombus
    let halfWidth = width / 2;
    let halfHeight = height / 2;

    // Coordinates of the vertices
    let x1 = cx;
    let y1 = cy - halfHeight; // Top vertex

    let x2 = cx + halfWidth; // Right vertex
    let y2 = cy;

    let x3 = cx;
    let y3 = cy + halfHeight; // Bottom vertex

    let x4 = cx - halfWidth; // Left vertex
    let y4 = cy;

    // Rotate the coordinates
    let points = [
      createVector(x1, y1),
      createVector(x2, y2),
      createVector(x3, y3),
      createVector(x4, y4),
    ];

    // Apply rotation to each vertex
    for (let p of points) {
      let xOffset = p.x - cx;
      let yOffset = p.y - cy;

      // Rotate each point's coordinates around the center
      p.x = cx + xOffset * cos(angle) - yOffset * sin(angle);
      p.y = cy + xOffset * sin(angle) + yOffset * cos(angle);
    }

    // Draw the rhombus shape
    noStroke(); // No border for the shape
    fill(fillColor); // Set the fill color for the rhombus
    beginShape();
    for (let p of points) {
      vertex(p.x, p.y); // Add each rotated vertex to the shape
    }
    endShape(CLOSE); // Close the shape
  }
  // Function to draw a star
  function drawStar(centerX, centerY, d, fillColor) {
    fill(fillColor); // Set the fill color for the star
    noStroke();      // No border for the star

    // Calculate the 10 points of the star
    let outerRadius = d; // Radius of the outer points
    let innerRadius = d * 0.382; // Radius of the inner points (approximately 38.2% of outer radius)

    beginShape();

    for (let i = 0; i < 10; i++) {
      // Alternate between outer and inner points for the star's shape
      let radius = i % 2 === 0 ? outerRadius : innerRadius;
      
      // Calculate the angle for each point
      let angle = PI / 2 + (TWO_PI * i) / 10; // Start from the top and move clockwise

      // Calculate the coordinates for each vertex
      let x = centerX + radius * cos(angle);
      let y = centerY - radius * sin(angle); // Use negative sin for correct Y-axis orientation

      vertex(x, y); // Add the vertex to the star shape
    }

    endShape(CLOSE); // Close the shape, completing the star
  }
  // Function to draw a semi-circle
  function drawSemiCircle(centerX, centerY, straightEdgeLength, angle, fillColor) {
    // Calculate the radius of the semi-circle from the straight edge length
    let radius = straightEdgeLength / 2;

    // Set the fill color for the semi-circle
    fill(fillColor);
    noStroke();

    // Apply the transformation matrix to rotate the shape
    push(); // Save the current coordinate system
    translate(centerX, centerY); // Move the origin to the center of the semi-circle
    rotate(angle); // Rotate the coordinate system by the specified angle

    // Draw the semi-circle (arc) starting from the right side
    arc(0, 0, straightEdgeLength, straightEdgeLength, -PI / 2, PI / 2, PIE); 

    pop(); // Restore the previous coordinate system
  }
  // Function to draw a rotated rectangle
  function drawRotatedRectangle(x, y, w, h, angle) {
      // Save the current coordinate system's state
      push();

      // Move the origin to the center of the rectangle
      translate(x, y);

      // Apply the rotation by the specified angle
      rotate(angle);

      // Draw the rectangle
      rect(0, 0, w, h);

      // Restore the original coordinate system state
      pop();
  }
  // Function to draw a polyline (multiple connected lines)
  function drawPolyline(points, weight, color) {
    if (points.length < 2) return; // If there are fewer than 2 points, a polyline cannot be drawn

    stroke(color); // Set the stroke color using the passed color parameter
    strokeWeight(weight); // Set the line width using the passed weight parameter
    noFill(); // Do not fill the polyline with color
    beginShape(); // Start drawing the polyline
    for (let i = 0; i < points.length; i++) {
      vertex(points[i].x, points[i].y); // Add each point as a vertex to the polyline
    }
    endShape(); // Finish the polyline drawing
  }




