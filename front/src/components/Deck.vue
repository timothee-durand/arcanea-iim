<script>
import { ref } from 'vue';
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/MTLLoader.js";


export default {

  data() {
    return {
      name: "",
      result: "",
      resultBack: "",
      canvas: false,
    }
  },


  mounted() {
    this.fetchCards();

  },

  methods: {
    async fetchCards() {
      var myHeaders = new Headers();
      myHeaders.append("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0eXhhdW51c3N2YWFjc2NncG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5ODU5MDksImV4cCI6MTk5MjU2MTkwOX0.uq-mxWGU7ayNeoA0gkGRkWBTEz2hR1bIuReLittF0BI");
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0eXhhdW51c3N2YWFjc2NncG9uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3Njk4NTkwOSwiZXhwIjoxOTkyNTYxOTA5fQ.RP5ToLS04asei6AMnzwDgse6LyG0vANaFqM5uzn-SJc");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch("https://ktyxaunussvaacscgpon.supabase.co/rest/v1/Cards", requestOptions)
      this.result = await response.json()

      const back = await fetch("https://ktyxaunussvaacscgpon.supabase.co/rest/v1/Cards?name=eq.back", requestOptions)
      this.resultBack = await back.json()
      console.log(this.resultBack)
      let toto = document.querySelector('.BACK').style.display = 'none'

    },

    Image(image) {

      this.canvas = true


      var imageFront = new Image();
      imageFront.src = image
      var textureFront = new THREE.Texture();
      textureFront.image = imageFront;
      imageFront.onload = function () {
        textureFront.needsUpdate = true;
      };

      textureFront.wrapS = textureFront.wrapT = THREE.MirroredRepeatWrapping;


      var imageBack = new Image();
      imageBack.src = this.resultBack[0].image;
      var textureBack = new THREE.Texture();
      textureBack.image = imageBack;
      imageBack.onload = function () {
        textureBack.needsUpdate = true;
      };

      textureBack.wrapS = textureBack.wrapT = THREE.MirroredRepeatWrapping;

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      var renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.canvas,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);


      const geometry1 = new THREE.PlaneGeometry(0.65, 1);

      const geometry2 = new THREE.PlaneGeometry(0.65, 1);
      geometry2.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));

      var material1 = new THREE.MeshLambertMaterial({ map: textureFront });
      var material2 = new THREE.MeshLambertMaterial({ map: textureBack });

      const plane1 = new THREE.Mesh(geometry1, material1);
      const plane2 = new THREE.Mesh(geometry2, material2);

      const group = new THREE.Group();
      group.add(plane1);
      group.add(plane2);

      scene.add(group);



      scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x333333));

      var keyLight = new THREE.PointLight(0xaaaaaa);
      keyLight.position.x = 15;
      keyLight.position.y = -10;
      keyLight.position.z = 35;
      scene.add(keyLight);

      var rimLight = new THREE.PointLight(0x888888);
      rimLight.position.x = 100;
      rimLight.position.y = 100;
      rimLight.position.z = -50;
      scene.add(rimLight);

      camera.position.z = 2;

      var render = function () {

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

      animate()
    }
  }
}
</script>

<template>
  <div class="deckPage">
    <div class="allCards">
      <div class="cross" v-show="canvas" @click="this.canvas = false"></div>
      <div class="blur" v-show="canvas"></div>
      <canvas ref="canvas" v-show="canvas">
      </canvas>
      <div class="deck">
        <div class="cards" v-for="item in result" :key="item.result" :class="item.key">
          <div v-if="item.name !== 'back'">
            <img :src="item.image" :alt="item.name" @click="Image(item.image)">
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <img src="/src/assets/img/Arcanea-logo.png" alt="logo arcanea">
      <p>Découvrez les différentes cartes de sorts utilisables en jeu&nbsp;!
        <br /><br />
        Pour découvrir un sort et visualiser sa carte en 3D, vous pouvez cliquer dessus.
        <br /><br />
        Lors de la partie, votre main sera toujours composée de 3 cartes attribuées aléatoirement. Le jeu se terminera
        lorsqu'un des deux joueurs atteindra 0 HP.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
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
    padding: 56px 0;

    .game {
      position: absolute;
      bottom: 56px;
      color: #FFFFFF;
      background-color: #514A92;
      padding: 10px 35px;
      border-radius: 50px
    }

    img {
      width: 104px;
      padding-bottom: 56px
    }

    p {
      color: #FFFFFF;
      width: 100%;
      padding: 0 40px
    }
  }
}

.cross {
  position: fixed;
  background-image: url('/src/assets/img/close.svg');
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
    img {
      width: 250px;
    }
  }

}
</style>
