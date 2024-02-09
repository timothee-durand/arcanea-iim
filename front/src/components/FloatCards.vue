<template>
  <canvas ref="canvas"/>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import {ref, onMounted} from "vue";
import Back from "@/assets/back.jpg";
import {cards} from "@/store/cards/cards-content";
const canvas = ref<HTMLCanvasElement | null>(null);
async function initCards() {
  const group = new THREE.Group();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.value as HTMLCanvasElement,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const promises = cards.map(async (item) => {

    const textureLoader = new THREE.TextureLoader();
    const textureFront =  textureLoader.load(item.image);
    const textureBack = textureLoader.load(Back);
    textureFront.wrapS = textureFront.wrapT = THREE.MirroredRepeatWrapping;
    textureBack.wrapS = textureBack.wrapT = THREE.MirroredRepeatWrapping;

    const geometry = new THREE.BoxGeometry(0.65, 1, 0.001);
    const materials = [
      new THREE.MeshBasicMaterial({map: textureFront}),
      new THREE.MeshBasicMaterial({map: textureBack}),
      new THREE.MeshBasicMaterial({map: textureFront}),
      new THREE.MeshBasicMaterial({map: textureBack}),
      new THREE.MeshBasicMaterial({map: textureFront}),
      new THREE.MeshBasicMaterial({map: textureBack}),
    ];
    const mesh = new THREE.Mesh(geometry, materials);
    group.add(mesh);
  });

  await Promise.all(promises);

  /* const controls = new DragControls(group, camera, renderer.domElement); */

  scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x333333));
  const keyLight = new THREE.PointLight(0xaaaaaa);
  keyLight.position.x = 15;
  keyLight.position.y = -10;
  keyLight.position.z = 35;
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x888888);
  rimLight.position.x = 100;
  rimLight.position.y = 100;
  rimLight.position.z = -50;
  scene.add(rimLight);

  camera.position.z = 2.5;

  /* const controls = new OrbitControls(camera, renderer.domElement); */

  //controls.update() must be called after any manual changes to the camera's transform

  group.children[10].position.x = 1.5;
  group.children[10].position.y = 0.2;
  group.children[10].rotateX(-0.2);
  group.children[10].rotateZ(-0.5);

  group.children[6].position.x = 2;
  group.children[6].position.y = 1.5;
  group.children[6].rotateX(5.9);
  group.children[6].rotateY(6.2);
  group.children[6].rotateZ(5.8);

  group.children[0].position.x = 2.8;
  group.children[0].position.y = 1.1;
  group.children[0].rotateX(6);

  group.children[2].position.x = 3;
  group.children[2].position.y = -0.5;
  group.children[2].rotateX(6);

  group.children[4].position.x = 1.7;
  group.children[4].position.y = 0.2;
  group.children[4].rotateX(6);


  group.children.forEach((item, index) => {
    scene.add(item);
    const render = function () {
      // rotate group every frame
      requestAnimationFrame(render);
      item.rotation.y += (index + 1) * 0.001;
      item.rotation.x += 0.0035 / (index + 1);

      renderer.render(scene, camera);
    };

    render();
  });

  let num = 7;
  for (let i = 0; i < 14; i++) {
    scene.children.splice(num, 9);
  }

  window.addEventListener("resize", onWindowResize, false);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /*  controls.update(); */

  function animate() {
    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true

    /*  controls.update(); */
    renderer.render(scene, camera);
  }

  animate();
}

onMounted(() => {
  initCards();
});
</script>

<style scoped lang="scss"></style>
