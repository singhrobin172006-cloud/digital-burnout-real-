function startAssessment() {
    window.location.href = "dashboard.html";
}

/* THREE JS */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bg"),
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

/* GLOBE */
const particles = 2500;
const geometry = new THREE.BufferGeometry();
const positions = [];

for (let i = 0; i < particles; i++) {
    const radius = 2.5;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
    );
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.03
});

const globe = new THREE.Points(geometry, material);
scene.add(globe);

/* STARS */
const bgGeometry = new THREE.BufferGeometry();
const bgPositions = [];

for (let i = 0; i < 2000; i++) {
    bgPositions.push(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25
    );
}

bgGeometry.setAttribute('position', new THREE.Float32BufferAttribute(bgPositions, 3));

const stars = new THREE.Points(bgGeometry, new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.01
}));

scene.add(stars);

/* MOUSE */
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

/* ANIMATION */
function animate() {
    requestAnimationFrame(animate);

    globe.rotation.y += 0.003 + mouseX * 0.05;
    globe.rotation.x += 0.001 + mouseY * 0.05;

    stars.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

animate();

/* RESPONSIVE */
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});