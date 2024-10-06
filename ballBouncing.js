const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    -400, 400, 400, -400, 0.1, 1000
);
camera.position.z = 500; 
//fanlo,matthew
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

// Change geometry from BoxGeometry to CircleGeometry
const geometry = new THREE.CircleGeometry(25, 32);  // 25 is the radius, 32 is the number of segments
let color = new THREE.Color(Math.random(), Math.random(), Math.random());
const material = new THREE.MeshBasicMaterial({ color: color });
const circle = new THREE.Mesh(geometry, material);
scene.add(circle);

let velocityX = Math.random() * 4 + 1; 
let velocityY = Math.random() * 4 + 1; 
let bounceCount = 0; 

function getRandomColor() {
    return new THREE.Color(Math.random(), Math.random(), Math.random());
}

function animate() {
    requestAnimationFrame(animate);

    circle.position.x += velocityX;
    circle.position.y += velocityY;

    // Detect collisions with walls and change direction and color
    if (circle.position.x + 25 > 400 || circle.position.x - 25 < -400) {
        velocityX = -velocityX; 
        circle.material.color.set(getRandomColor());
        bounceCount++; 
    }
    if (circle.position.y + 25 > 400 || circle.position.y - 25 < -400) {
        velocityY = -velocityY; 
        circle.material.color.set(getRandomColor());
        bounceCount++; 
    }

    // Handle scaling down after each bounce
    if (bounceCount > 7) {
        circle.scale.set(0, 0, 0);
    } else if (bounceCount > 0) {
        const scaleFactor = Math.max(0.1, 1 - bounceCount * 0.1); 
        circle.scale.set(scaleFactor, scaleFactor, scaleFactor); 
    }

    // Add randomness to the velocity after bouncing
    if (circle.position.x + 25 > 400 || circle.position.x - 25 < -400 || 
        circle.position.y + 25 > 400 || circle.position.y - 25 < -400) {
        velocityX += (Math.random() * 2 - 1); 
        velocityY += (Math.random() * 2 - 1); 

        if (Math.abs(velocityX) < 1) velocityX = Math.sign(velocityX) * 1; 
        if (Math.abs(velocityY) < 1) velocityY = Math.sign(velocityY) * 1; 
    }

    renderer.render(scene, camera);
}

circle.position.set(0, 0, 0);

animate();
