let fishes = [];
let score = 0;

function setup() {
  createCanvas(1366, 768);

  // Create the big fish
  let bigFish = new Fish(width / 2, height / 2, 40, color(255, 0, 0), true);
  fishes.push(bigFish);

  // Start generating small fish every 1 second
  setInterval(generateSmallFish, 500);
}

function mouseClicked() {
	for (let i = fishes.length - 1; i >= 0; i--) {
    let fish = fishes[i];
    if (fish.isBigFish) {
      fish.size = 10;
		}
	}
}

function draw() {
  background(220);

  // Update and display all the fishes
  for (let i = fishes.length - 1; i >= 0; i--) {
    let fish = fishes[i];
    fish.update();
    fish.display();

    // Check if the big fish eats a small fish
    if (fish.isBigFish) {
      for (let j = fishes.length - 1; j >= 0; j--) {
        let otherFish = fishes[j];
        if (!otherFish.isBigFish && fish.intersects(otherFish)) {
          fishes.splice(j, 1); // Remove the eaten fish
          score += 1; // Increase the score
					fish.size += 10;
        }
      }
    }
  }

  // Display the score
  fill(0);
  textSize(20);
  textAlign(RIGHT);
  text("Score: " + score, width - 20, 30);
}

function generateSmallFish() {
  let x = random(width);
  let y = random(height);
  let size = random(10, 20);
  let color_ele = color(0, 0, 255);
  let fish = new Fish(x, y, size, color_ele, false);
  fishes.push(fish);
}

class Fish {
  constructor(x, y, size, color_ele, isBigFish) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color_ele = color_ele;
    this.isBigFish = isBigFish;
  }

  update() {
    if (this.isBigFish) {
      // Big fish moves towards the mouse
      this.x = lerp(this.x, mouseX, 0.1);
      this.y = lerp(this.y, mouseY, 0.1);
    } else {
      // Small fish moves randomly
      this.x += random(-1, 1);
      this.y += random(-1, 1);
    }
  }

  display() {
    // Draw the fish
    fill(this.color_ele);
    noStroke();
    ellipse(this.x, this.y, this.size * 2, this.size);

    // Draw the eye
    let eyeSize = this.size * 0.2;
    fill(255);
    ellipse(this.x + this.size * 0.3, this.y, eyeSize, eyeSize);
  }

  intersects(otherFish) {
    // Check if two fish intersect (collide)
    let d = dist(this.x, this.y, otherFish.x, otherFish.y);
    return d < this.size + otherFish.size;
  }
}

setup();
