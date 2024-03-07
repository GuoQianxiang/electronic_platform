window.addEventListener('DOMContentLoaded', () => {
    // 获取选择框元素
    const shapeSelect = document.getElementById('shape');

    // 创建场景、渲染器和相机
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 5;

    // 添加灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // 创建几何体和材质
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 创建控制器
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // 渲染函数
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();

    // 选择框事件监听器
    shapeSelect.addEventListener('change', () => {
        const selectedShape = shapeSelect.value;

        // 移除之前的几何体
        scene.remove(mesh);

        // 根据选择的形状创建新的几何体
        if (selectedShape === 'box') {
            mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
        } else if (selectedShape === 'sphere') {
            mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
        } else if (selectedShape === 'cylinder') {
            mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1, 32), material);
        }

        // 添加新的几何体到场景中
        scene.add(mesh);
    });
});