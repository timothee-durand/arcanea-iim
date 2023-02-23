<template>
  <section class="draft">
    <section class="container">
      <section class="draft">
        <div class="draft-box box">
          <h2>Draft</h2>
          <img src="@/assets/img/draft.png" alt="draft">
        </div>
      </section>
      <section class="hand">
        <div class="hand-box box">
          <h2>Card 1</h2>
          <img :alt="hand[0].name" v-if="hand[0]" @click="showCard(hand[0].image)" v-on:click.right="playCard(hand[0])"
               class="hand-box__card" :src="hand[0].image">
        </div>
        <div class="hand-box box">
          <h2>Card 2</h2>
          <img :alt="hand[1].name" v-if="hand[1]" @click="showCard(hand[1].image)" v-on:click.right="playCard(hand[1])"
               class="hand-box__card" :src="hand[1].image">
        </div>
        <div class="hand-box box">
          <h2>Card 3</h2>
          <img :alt="hand[2].name" v-if="hand[2]" @click="showCard(hand[2].image)" v-on:click.right="playCard(hand[2])"
               class="hand-box__card" :src="hand[2].image">
          <img v-if="hand[2]" v-on:click.right="showCard" v-on:click="playCard(hand[2])" class="hand-box__card"
               :src="hand[2].image">
        </div>
      </section>
      <section class="draw">
        <div class="draw-box box">
          <h2>Draw</h2>
          <img v-on:click="drawCard(1)" v-if="deck && deck.length > 0"
               :class="canDraw ? 'draw-box__card canDraw' : 'draw-box__card'" src="@/assets/img/card-back.png">
        </div>
      </section>
      <div class="cross" v-show="canvas" @click="this.canvas = false"></div>
      <div class="blur" v-show="canvas"></div>
      <canvas class="canvas" ref="canvas" v-show="canvas"></canvas>
    </section>
  </section>
</template>
<script>
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import threeMixin from '../mixins/threeMixin';
import {Socket} from 'socket.io-client';
import {useAuthStore} from '@/store/auth';
import {inject} from 'vue';
import {mapStores} from 'pinia';

export default {
  name: 'HandComponent',
  data() {
    return {
      camera: null,
      container: null,
      controls: null,
      pointLight: null,
      renderer: null,
      scene: null,
      sphere: null,
      viewport: null,
      cardsApi: null,
      deck: null,
      hand: [],
      socket: inject("socket"),
      canvas: false,
      backCard: null
    };
  },
  computed: {
    // note we are not passing an array, just one store after the other
    // each store will be accessible as its id + 'Store'
    ...mapStores(useAuthStore),
    canDraw() {
      return this.hand.length < 3 && this.deck && this.deck.length > 1;
    },
  },
  mixins: [threeMixin],
  mounted() {
    // initialize container, target and viewport
    this.container = this.$refs.canvas;
    this.viewport = this.setViewportSize(this.container);
    this.launchDuel();

    this.socket.on('updateRoom', (payload) => {
      this.updateDuel(payload);
    });

    this.socket.on('pushActions', (payload) => {
      this.updateHistoric(payload);
    });

    this.socket.on('showBoard', (boardArray) => {
      console.log('showboard', boardArray)
      const {card: otherPlayerCard} = boardArray.find(card => card.playerId !== this.authStore.user.id);
      console.log({otherPlayerCard})
      const apiCard = this.cardsApi.find(card => card.key === otherPlayerCard.key);
      console.log({apiCard})
      this.$emit('show-other-card', apiCard);

      setTimeout(() => {
        this.$emit('show-other-card', null);
        this.$emit('play-card', null);
      }, 3000)
    });
  },
  methods: {
    updateHistoric(payload) {
      this.canDraw = true;
    },

    playCard(playedCard) {
      this.hand = this.hand.filter(card => card !== playedCard);
      this.$emit('play-card', playedCard);
      this.$emit('show-other-card', null)

      this.socket.emit('playCard',
          this.authStore.room.roomId,
          this.authStore.user.id,
          playedCard.key,
      );
    },

    updateDuel(payload) {
      console.log(payload);
      this.authStore.room.players = payload.players;
    },
    async constructDeck() {
      if (!this.cardsApi) {
        await this.fetchCards();
      }

      this.deck = this.authStore.user.cards.map((cardName) => {
        const card = this.cardsApi.find(element => element.key === cardName);
        if (!card) console.log('card not found', cardName)
        return card;
      });
    },
    async fetchCards() {
      const myHeaders = new Headers();
      myHeaders.append('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0eXhhdW51c3N2YWFjc2NncG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5ODU5MDksImV4cCI6MTk5MjU2MTkwOX0.uq-mxWGU7ayNeoA0gkGRkWBTEz2hR1bIuReLittF0BI');
      myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0eXhhdW51c3N2YWFjc2NncG9uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3Njk4NTkwOSwiZXhwIjoxOTkyNTYxOTA5fQ.RP5ToLS04asei6AMnzwDgse6LyG0vANaFqM5uzn-SJc');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch('https://ktyxaunussvaacscgpon.supabase.co/rest/v1/Cards?select=*', requestOptions);
      this.cardsApi = await response.json();

      const back = await fetch('https://ktyxaunussvaacscgpon.supabase.co/rest/v1/Cards?name=eq.back', requestOptions);
      this.backCard = await back.json();
    },

    async launchDuel() {
      await this.constructDeck();
      this.drawCard(3);
    },

    drawCard(count) {
      if (this.canDraw && this.deck.length >= count) {
        for (let i = 0; i < count; i++) {
          this.hand.push(this.deck.pop());
        }
      }
      //emit event to update hand and deck with socket.io
    },
    showCard(image) {
      this.canvas = true;

      const frontCard = new Image();
      frontCard.src = image;
      const textureFront = new THREE.Texture();
      textureFront.image = frontCard;
      frontCard.onload = () => {
        textureFront.needsUpdate = true;
      };

      textureFront.wrapS = textureFront.wrapT = THREE.MirroredRepeatWrapping;

      const backCard = new Image();
      backCard.src = this.backCard[0].image;
      const textureBack = new THREE.Texture();
      textureBack.image = backCard;
      backCard.onload = () => {
        textureBack.needsUpdate = true;
      };

      textureBack.wrapS = textureBack.wrapT = THREE.MirroredRepeatWrapping;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.canvas,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const geometry1 = new THREE.PlaneGeometry(0.65, 1);

      const geometry2 = new THREE.PlaneGeometry(0.65, 1);
      geometry2.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));

      const material1 = new THREE.MeshLambertMaterial({map: textureFront});
      const material2 = new THREE.MeshLambertMaterial({map: textureBack});

      const plane1 = new THREE.Mesh(geometry1, material1);
      const plane2 = new THREE.Mesh(geometry2, material2);

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
      // controls.autoRotate = true;
      controls.update();

      function animate() {

        requestAnimationFrame(animate);

        // required if controls.enableDamping or controls.autoRotate are set to true

        controls.update();
        renderer.render(scene, camera);
      }

      animate();
    },
  },
};
</script>
<style scoped lang="scss">
section.container {
  height: 30vh;
  display: flex;
  width: 100%;

  .connexionButton {
    margin: 0 1rem;
  }

  .canvas {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    z-index: 101;
    cursor: grab;
  }

  .draggable-img {
    cursor: grab;
  }

  .draw, .hand, .draft {
    padding: 25px;
  }

  .hand {
    display: flex;
    gap: 10px;
    margin-left: auto;
  }

  .draw {
    margin-left: auto;
    position: relative;
  }

  .box {
    border-radius: 10px;
    width: 150px;
    height: calc(150px * 1.4);
    vertical-align: center;
    position: relative;

    h2 {
      color: rgba(188, 117, 36, 0.5);
    }
  }

  .draft-box {
    border: none;

    h2 {
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    img {
      height: 100%;
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }

  .hand-box {
    border: 1px dashed rgba(188, 117, 36, 0.5);

    h2 {
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &__card {
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
      height: 100%;
      cursor: pointer;
    }
  }

  .draw-box {
    border: 1px dashed rgba(188, 117, 36, 0.5);
    box-shadow: 2px 2px 0px 0px #494949,
    4px 4px 0px 0px #626262,
    6px 6px 0px 0px #797979,
    8px 8px 0px 0px #7a7a7a,
    10px 10px 0px 0px #a9a9a9,
    5px 5px 15px 5px rgba(0, 0, 0, 0);

    & .canDraw {
      animation: canDrawAnimation 1s ease-in-out;
      animation-fill-mode: both;
      @keyframes canDrawAnimation {
        100% {
          -webkit-box-shadow: #ffffff 0 -1px 4px, #ffff00 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0, 0, 0, 0);
          box-shadow: #ffffff 0 -1px 4px, #ffff00 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0, 0, 0, 0);
        }
      }
    }

    h2 {
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &__card {
      height: 100%;
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }

  .viewed {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 450px !important;
    height: calc(450px * 1.4) !important;
    z-index: 1000;
  }

  .blur {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(8px);
    z-index: 100;
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
    z-index: 102;
    cursor: pointer
  }
}

h2 {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.viewed {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 450px !important;
  height: calc(450px * 1.4) !important;
  z-index: 1000;
}

.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}

.active {
  display: block;
}

</style>
