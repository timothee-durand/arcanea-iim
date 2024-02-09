<script lang="ts" setup>
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GAME_ROUTE_NAME} from "@/router/routes";
import {cards} from "@/store/cards/cards-content";
import {ref} from "vue";
import Back from "@/assets/back.jpg";
import {Card} from "@/store/cards";

const canvas = ref(false)

const threeCanvas = ref<HTMLCanvasElement | null>(null)

function showCard(image: Card) {
  if(!threeCanvas.value) {
    throw new Error("Canvas is not defined")
  }
  console.log(image)
  const imageFront = new Image();
  imageFront.src = image.image;
  const textureFront = new THREE.Texture();
  textureFront.image = imageFront;
  imageFront.onload = function () {
    textureFront.needsUpdate = true;
  };

  textureFront.wrapS = textureFront.wrapT = THREE.MirroredRepeatWrapping;

  const imageBack = new Image();
  imageBack.src = Back;
  const textureBack = new THREE.Texture();
  textureBack.image = imageBack;
  imageBack.onload = function () {
    textureBack.needsUpdate = true;
  };

  textureBack.wrapS = textureBack.wrapT = THREE.MirroredRepeatWrapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: threeCanvas.value,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry1 = new THREE.PlaneGeometry(0.65, 1);

  const geometry2 = new THREE.PlaneGeometry(0.65, 1);

  const material1 = new THREE.MeshLambertMaterial({map: textureFront});
  const material2 = new THREE.MeshLambertMaterial({map: textureBack});

  const plane1 = new THREE.Mesh(geometry1, material1);
  const plane2 = new THREE.Mesh(geometry2, material2);
  plane2.rotation.y = Math.PI;
  const group = new THREE.Group();
  group.add(plane1);
  group.add(plane2);

  scene.add(group);

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

  camera.position.z = 2;

  const render = function () {

    requestAnimationFrame(render);

    renderer.render(scene, camera);

  };

  render();

  const controls = new OrbitControls(camera, renderer.domElement);

  //controls.update() must be called after any manual changes to the camera's transform
  camera.position.set(0, 0, 1);
  controls.autoRotate = true;
  controls.update();

  function animate() {

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

</script>
<template>
  <div class="deckPage">
    <div class="allCards">
      <div class="cross" v-show="canvas" @click="canvas = false"></div>
      <div class="blur" v-show="canvas"></div>
      <canvas ref="threeCanvas" v-show="canvas"></canvas>
      <div class="deck">
        <div class="cards" v-for="item in cards" :key="item.key" :class="item.key">
          <img :src="item.image" :alt="item.name" @click="showCard(item)">
        </div>
      </div>
    </div>
    <div class="info">
      <img src="@/assets/img/Arcanea-logo.png" alt="logo arcanea">
      <p>Découvrez les différentes cartes de sorts utilisables en jeu&nbsp;!
        <br/><br/>
        Pour découvrir un sort et visualiser sa carte en 3D, vous pouvez cliquer dessus.
        <br/><br/>
        Lors de la partie, votre main sera toujours composée de 3 cartes attribuées aléatoirement. Le jeu se terminera
        lorsqu'un des deux joueurs atteindra 0 HP.
      </p>
      <router-link :to="{name: GAME_ROUTE_NAME}" class="connexionButton">Retour au jeu</router-link>
    </div>
  </div>
</template>
<style scoped lang="scss">
.read-the-docs {
  color: #888888;
}

.deckPage {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5718662464985995) 0%, rgba(19, 35, 59, 1) 100%);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: space-between;

  .allCards {
    width: 80%;
    margin: 20px 0;

    .blur {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.2); // Make sure this color has an opacity of less than 1
      backdrop-filter: blur(8px); // This be the blur
      z-index: 8;
    }
  }

  .info {
    position: fixed;
    height: 100vh;
    right: 0;
    width: 20%;
    background-color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    padding: 56px 20px;

    .game {
      position: absolute;
      bottom: 56px;
      color: #ffffff;
      background-color: #514a92;
      padding: 10px 35px;
      border-radius: 50px
    }

    img {
      width: 104px;
      padding-bottom: 56px
    }

    p {
      color: #ffffff;
      width: 100%;
      padding: 0 40px
    }
  }
}

.cross {
  position: fixed;
  background-image: url('@/assets/img/close.svg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  aspect-ratio: 1/1;
  top: 15px;
  right: 15px;
  z-index: 10;
  cursor: pointer
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  z-index: 9;
}

.deck {
  display: flex;
  justify-content: space-between;
  padding: 20px 65px;
  flex-wrap: wrap;
  gap: 5%;

  .cards {
    cursor: pointer;
    transition: transform ease-out 100ms;

    img {
      width: 250px;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
