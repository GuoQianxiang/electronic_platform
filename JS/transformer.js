// 创建场景
const scene = new THREE.Scene();

// 创建材质
const poleMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
const transformerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// 创建电线杆
const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 10, 32);
const pole1 = new THREE.Mesh(poleGeometry, poleMaterial);
pole1.position.set(-2.5, 5, 0);
scene.add(pole1);

const pole2 = new THREE.Mesh(poleGeometry, poleMaterial);
pole2.position.set(2.5, 5, 0);
scene.add(pole2);

// 创建变压器
const transformerGeometry = new THREE.BoxGeometry(3, 4, 5);
const transformer = new THREE.Mesh(transformerGeometry, transformerMaterial);
transformer.position.set(0, 10, 0);
scene.add(transformer);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建相机
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
camera.position.set(0, 20, 30);
camera.lookAt(0, 0, 0);

// 渲染场景
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

// 监听下载按钮点击事件
const downloadButton = document.getElementById('downloadButton');
downloadButton.addEventListener('click', function() {
    // 导出场景为JSON格式
    const gltfExporter = new THREE.GLTFExporter();
    gltfExporter.parse(
        scene,
        function(result) {
            const output = JSON.stringify(result, null, 2);
            // 将JSON数据保存为文件
            downloadJSON(output, 'scene.json');
        },
        { binary: false }
    );
});


// 下载JSON文件
function downloadJSON(data, filename) {
    const file = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}