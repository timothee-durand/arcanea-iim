<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
/* import { ref } from "vue"; */
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
/* import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js"; */
/* import { DragControls } from "three/examples/jsm/controls/DragControls"; */
/* import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/MTLLoader.js"; */

export default {
  data() {
    return {
      result: "",
      resultBack: "",
    };
  },

  mounted() {
    this.fetchCards();
  },

  methods: {
    async fetchCards() {
      var myHeaders = new Headers();
      myHeaders.append(
        "apikey",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0eXhhdW51c3N2YWFjc2NncG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5ODU5MDksImV4cCI6MTk5MjU2MTkwOX0.uq-mxWGU7ayNeoA0gkGRkWBTEz2hR1bIuReLittF0BI"
      );
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0eXhhdW51c3N2YWFjc2NncG9uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3Njk4NTkwOSwiZXhwIjoxOTkyNTYxOTA5fQ.RP5ToLS04asei6AMnzwDgse6LyG0vANaFqM5uzn-SJc"
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        "https://ktyxaunussvaacscgpon.supabase.co/rest/v1/Cards",
        requestOptions
      );
      this.result = await response.json();

      const back = await fetch(
        "https://ktyxaunussvaacscgpon.supabase.co/rest/v1/Cards?name=eq.back",
        requestOptions
      );
      this.resultBack = await back.json();
      this.Cards();
      /* document.querySelector(".BACK").style.display = "none"; */
    },

    Cards() {
      let image = [];
      let groups = [];

      let geometry1 = new THREE.PlaneGeometry(0.65, 1);

      const group = new THREE.Group();
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      var renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.canvas,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      this.result.forEach((item) => {
        var imageFront = new Image();
        var textureFront = new THREE.Texture();
        var material1 = new THREE.MeshLambertMaterial({ map: textureFront });
        image = item.image;
        imageFront.src = image;

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

        geometry1 = new THREE.PlaneGeometry(0.65, 1);
        const geometry2 = new THREE.PlaneGeometry(0.65, 1);
        geometry2.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));
        material1 = new THREE.MeshLambertMaterial({
          map: textureFront,
          side: THREE.DoubleSide,
        });
        var material2 = new THREE.MeshLambertMaterial({
          map: textureBack,
          side: THREE.DoubleSide,
        });

        const plane1 = new THREE.Mesh(geometry1, material1);
        const plane2 = new THREE.Mesh(geometry2, material2);

        group.add(plane1);
        group.add(plane2);
        groups.push(group);
      });

      /* const controls = new DragControls(group, camera, renderer.domElement); */

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
        var render = function () {
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
        render();
      }

      /*  controls.update(); */

      function animate() {
        requestAnimationFrame(animate);

        // required if controls.enableDamping or controls.autoRotate are set to true

        /*  controls.update(); */
        renderer.render(scene, camera);
      }

      animate();
    },
  },
};
</script>

<style scoped lang="scss"></style>