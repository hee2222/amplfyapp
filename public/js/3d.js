
//  어바웃 3d 추가
document.addEventListener("DOMContentLoaded", function() {
    const loader = new THREE.GLTFLoader();
    const loader2 = new THREE.GLTFLoader();
    const canvas = document.querySelector('canvas.webgl');
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    // camera.position.set(-4, 4, 4);
    camera.position.z = 5;
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    
// 라이트

    // textture
    const textureLoader = new THREE.TextureLoader();
    const cubeTextureLoader = new THREE.CubeTextureLoader()
    // 큐브 텍스텨 
    const environmentMap = cubeTextureLoader.load([
        '/js/model/px.png',
        '/js/model/nx.png',
        '/js/model/py.png',
        '/js/model/ny.png',
        '/js/model/pz.png',
        '/js/model/nz.png',
    ])

    scene.environment = environmentMap

    // 라이트 가이드
    // Ambient Light
var ambientLight = new THREE.AmbientLight(0xffffff, 10); // 첫 번째 인자는 색상, 두 번째 인자는 강도입니다.
scene.add(ambientLight);

// Directional Light
var directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 첫 번째 인자는 색상, 두 번째 인자는 강도입니다.
directionalLight.position.set(0, 1, 1); // 빛의 위치를 설정합니다.
scene.add(directionalLight);
    // 큐브 모델
    var mixer;
    var model;
    var modelMar;
    var modelLe;
    var originCube;
    var objectControls;
    
    // clock
    const clock = new THREE.Clock();
    loader.load(
      '/js/model/mar.glb',
      (gltf) => {
        if (matchMedia("screen and (min-width: 599px)").matches) {
          gltf.scene.scale.set(0.68, 0.68, 0.68);
        } else {
          gltf.scene.scale.set(0.5, 0.5, 0.5);
        }
        modelMar = gltf.scene;
        gsap.to(modelMar.rotation, {
            duration: 80,
            y: "+=6.28", // 360도 (2 * π)
            // x: "+=6.28", // 360도 (2 * π)
            repeat: -1   // 무한 반복
        })
        modelMar.traverse((child) => {
            if (child.isMesh && child.material.isMeshStandardMaterial) {
              child.material.metalness = 0.9; // 예를 들어, 여기에서 metalness를 0.9로 설정합니다.
              child.material.roughness = 0.08;
              child.material.envMap = environmentMap; // 환경맵을 설정합니다.
              child.material.needsUpdate = true; // 소재 업데이트
            }
          });
        scene.add(modelMar);
      }
    );
    // loader2.load(
    //   '/js/model/le.glb',
    //   (gltf) => {
    //     if (matchMedia("screen and (min-width: 599px)").matches) {
    //       gltf.scene.scale.set(0.7, 0.7, 0.7);
    //     } else {
    //       gltf.scene.scale.set(0.5, 0.5, 0.5);
    //     }
    //     modelLe = gltf.scene;
    //     gsap.to(modelLe.rotation, {
    //         duration: 80,
    //         y: "+=6.28", // 360도 (2 * π)
    //         // x: "+=6.28", // 360도 (2 * π)
    //         repeat: -1   // 무한 반복
    //     })
    //     modelLe.traverse((child) => {
    //         if (child.isMesh && child.material.isMeshStandardMaterial) {
    //           child.material.metalness = 0.9; // 예를 들어, 여기에서 metalness를 0.9로 설정합니다.
    //           child.material.roughness = 0.08;
    //           child.material.envMap = environmentMap; // 환경맵을 설정합니다.
    //           child.material.needsUpdate = true; // 소재 업데이트
    //         }
    //       });
    //     scene.add(modelLe);
    //     modelLe.visible = false; // 초기 상태에서 이 모델을 숨깁니다.
    //   }
    // );
    /* Sizes */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.physicallyCorrectLights = true;
    
    
    // 리사이즈 할때
    window.addEventListener('resize', () => {
      // Update sizes
      
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
    
      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
    
      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    
    var controls = new THREE.OrbitControls(camera, canvas);
    controls.enabled = true;
    controls.enableDamping = true; // 부드러운 움직임 활성화
    controls.dampingFactor = 0.01;
    controls.enableZoom = false; // Zoom 비활성화
    controls.minPolarAngle = Math.PI/2;
    controls.maxPolarAngle = Math.PI/2;
    
    // 애니메이션
    function animate() {
        requestAnimationFrame(animate);
       
        // 카메라 애니메이션
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) {
          window.addEventListener('mousemove', (event) => {
            // mousemove(event);
          });
        }
        controls.update();
        renderer.render(scene, camera);
      }
      animate();
    
      let tabs = document.querySelectorAll(".link-wrap a");

      tabs.forEach(function (tab) {
        tab.addEventListener("click", function (e) {
            let target = this.getAttribute("data-tab");
            if (this.getAttribute("data-tab") === "luckymarche") {
                if (modelMar) modelMar.visible = true;
                // 아래의 "luckylematch" 관련 코드를 주석 처리했습니다.
                // if (modelLe) modelLe.visible = false;
            } 
            // 아래의 "luckylematch" 관련 코드를 주석 처리했습니다.
            // else if (this.getAttribute("data-tab") === "luckylematch") {
            //     if (modelMar) modelMar.visible = false;
            //     if (modelLe) modelLe.visible = true;
            // }
        });
    });
    
    })