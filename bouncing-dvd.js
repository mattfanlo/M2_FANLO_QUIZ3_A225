const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    -400, 400, 400, -400, 0.1, 1000
);
camera.position.z = 500; 
//fanlo,matthew
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(50, 50, 50);  
let color = new THREE.Color(Math.random(), Math.random(), Math.random());
const material = new THREE.MeshBasicMaterial({ color: color });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

let velocityX = Math.random() * 4 + 1; 
let velocityY = Math.random() * 4 + 1; 
let bounceCount = 0; 

function getRandomColor() {
    return new THREE.Color(Math.random(), Math.random(), Math.random());
}

function animate() {
    requestAnimationFrame(animate);

    cube.position.x += velocityX;
    cube.position.y += velocityY;

    
    if (cube.position.x + 25 > 400 || cube.position.x - 25 < -400) {
        velocityX = -velocityX; 
        cube.material.color.set(getRandomColor());
        bounceCount++; 
    }
    if (cube.position.y + 25 > 400 || cube.position.y - 25 < -400) {
        velocityY = -velocityY; 
        cube.material.color.set(getRandomColor());
        bounceCount++; 
    }

    
    if (bounceCount > 8) {
        cube.scale.set(0, 0, 0);
    } else if (bounceCount > 0) {
        const scaleFactor = Math.max(0.1, 1 - bounceCount * 0.2); 
        cube.scale.set(scaleFactor, scaleFactor, scaleFactor); 
    }

    
    if (cube.position.x + 25 > 400 || cube.position.x - 25 < -400 || 
        cube.position.y + 25 > 400 || cube.position.y - 25 < -400) {
        velocityX += (Math.random() * 2 - 1); 
        velocityY += (Math.random() * 2 - 1); 

        
        if (Math.abs(velocityX) < 1) velocityX = Math.sign(velocityX) * 1; 
        if (Math.abs(velocityY) < 1) velocityY = Math.sign(velocityY) * 1; 
    }

    renderer.render(scene, camera);
}

cube.position.set(0, 0, 0);

animate();