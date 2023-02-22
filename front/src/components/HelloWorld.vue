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

      const back = await fetch("https://ktyxaunussvaacscgpon.supabase.co/rest/v1/Cards?name=eq.Lumos", requestOptions)
      this.resultBack = await back.json()
      console.log(this.resultBack)

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
      imageBack.src = this.result[0].image;
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
      scene.add(plane1);
      const plane2 = new THREE.Mesh(geometry2, material2);
      scene.add(plane2);



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
      controls.update();

      function animate() {

        requestAnimationFrame(animate);

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        renderer.render(scene, camera);

      }
    }
  }
}
</script>

<template>
  <div class="deckPage">
    <div class="cross" v-show="canvas"></div>
    <canvas ref="canvas" v-show="canvas">
    </canvas>
    <div class="deck">
      <div class="cards" v-for="item in result" :key="item.result">
        <div v-if="item.name !== 'back'">
          <img :src="item.image" :alt="item.name" @click="Image(item.image)">
        </div>
      </div>

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
  height: 100vh
}

.cross {
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  aspect-ratio: 1/1;
  top: 15px;
  right: 15px
}


canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;


}

.deck {
  display: flex;
  justify-content: center;
  gap: 5%;

  .cards {
    img {
      width: 250px;


    }
  }

}
</style>
