<template>
    <section class="container">
        <div ref="canvas"></div>
        <section class="draft">
            <div class="draft-box">
                <h2>Draft</h2>
            </div>
        </section>

        <section class="hand">
            <div class="hand-box">
                <h2>Card 1</h2>
                <img v-if="hand[0]" class="hand-box__card" :src="hand[0].image">
            </div>
            <div class="hand-box">
                <h2>Card 2</h2>
              <img v-if="hand[1]" class="hand-box__card" :src="hand[1].image">
            </div>
            <div class="hand-box">
                <h2>Card 3</h2>
                <img v-if="hand[2]" class="hand-box__card" :src="hand[2].image">
            </div>
        </section>
        <section class="draw">
            <div class="draw-box">
                <h2>Draw</h2>
            </div>
          <img class="draw-box --card" src="@/assets/img/card-back.png">
        </section>
    </section>
</template>
<script>
    import * as THREE from 'three';
    import threeMixin from '../mixins/threeMixin';
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
    import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
    import {lerp} from '../utils/lerp';

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
                loader: null,
                cardsApi: null,
                deck: null,
                hand: [],
            };
        },
        mixins: [threeMixin],
        mounted() {
            // initialize container, target and viewport
            this.container = this.$refs.canvas;
            this.viewport = this.setViewportSize(this.container);
            this.loader = new GLTFLoader();
            this.launchDuel();

            this.createScene();
        },
        methods: {

            async constructDeck() {
              //call api to get cards
              await this.fetchCards();
              console.log(this.cardsApi);
              //get cards from store
              //link cards keys from store with cards api
              //create Deck with cards
              this.deck = this.cardsApi;
            },
            async fetchCards() {
              var myHeaders = new Headers();
              myHeaders.append("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0eXhhdW51c3N2YWFjc2NncG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5ODU5MDksImV4cCI6MTk5MjU2MTkwOX0.uq-mxWGU7ayNeoA0gkGRkWBTEz2hR1bIuReLittF0BI");
              myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0eXhhdW51c3N2YWFjc2NncG9uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3Njk4NTkwOSwiZXhwIjoxOTkyNTYxOTA5fQ.RP5ToLS04asei6AMnzwDgse6LyG0vANaFqM5uzn-SJc");

              var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };

              const response = await fetch("https://ktyxaunussvaacscgpon.supabase.co/rest/v1/Cards?select=*", requestOptions)
              this.cardsApi = await response.json()

            },

            async launchDuel() {
                await this.constructDeck();
                this.drawCard(3);
                console.log(this.hand);
                console.log(this.deck);
            },

            drawCard(nbCards) {
                //draw nbCards from deck
                for(let i = 0; i < nbCards; i++) {
                    this.hand.push(this.deck.pop());
                }
                //emit event to update hand and deck with socket.io


            },

            createScene() {
                window.addEventListener('resize', this.onWindowResize.bind(this));
                this.scene = new THREE.Scene();
                this.loadModels();
                this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
                this.renderer.setSize(this.viewport.width, this.viewport.height);
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.setUpCamera();
                this.createControls();
                this.createLight();
                this.container.appendChild(this.renderer.domElement);
                this.renderer.outputEncoding = THREE.sRGBEncoding;
                this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
                this.renderer.toneMappingExposure = 1.25;
                this.render();
            },
            createControls() {
                this.controls = new OrbitControls(this.camera, this.renderer.domElement);
                this.controls.autoRotate = true;
                this.controls.autoRotateSpeed = 1;
                this.controls.enableDamping = true;
            },
            createLight() {
                const blueLight = new THREE.SpotLight(0x0000ff, .2)
                this.pointLight = new THREE.SpotLight(0xffff00, 1);
                this.pointLight.position.set(200, 200, 200);
                blueLight.position.set(-200, 500, -100);
                this.scene.add(this.pointLight);
                this.scene.add(blueLight);
            },
            onMouseHover(el) {
                el.addEventListener('mouseenter', () => {
                    this.isHover = true;
                });
                el.addEventListener('mouseleave', () => {
                    this.isHover = false;
                });
            },
            onWindowResize() {
                // redefine the viewport
                this.viewport = this.setViewportSize(this.container);
                this.camera.aspect = this.viewport.aspectRatio;
                this.camera.fov = (180 * (2 * Math.atan(this.viewport.height / 2 / this.perspective))) / Math.PI;
                this.renderer.setSize(this.viewport.width, this.viewport.height);
                this.camera.updateProjectionMatrix();
            },
            render() {
                this.controls.update();
                this.renderer.render(this.scene, this.camera);
                requestAnimationFrame(this.render);
            },
            setUpCamera() {
                this.camera = new THREE.PerspectiveCamera(50, this.viewport.width / this.viewport.height, 1, 1000);
                this.camera.position.set(0, 0, 600);
            },
            loadModels() {
                this.loader.load('src/assets/models/card.glb', (model) => {
                    this.scene.add(model.scene)
                });
            }
        },
    };
</script>
<style scoped lang="scss">
    section.container {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 30vh;
        display: flex;
        width: 100%;

    }
    section.container > div {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 30vh;
    }
    .draw, .hand, .draft {
        padding: 25px;
        position: relative;
    }
    .draw-box {
      border: 1px dashed rgba(188, 117, 36, 0.5);
      border-radius: 10px;
      width: 150px;
      height: calc(150px * 1.4);
      bottom: 35px;
      right: 25px;
      vertical-align: center;
      position: absolute;
      -webkit-box-shadow: 5px 5px 0px 0px #289FED, 10px 10px 0px 0px #5FB8FF, 15px 15px 0px 0px #A1D8FF, 20px 20px 0px 0px #CAE6FF, 25px 25px 0px 0px #E1EEFF, 5px 5px 15px 5px rgba(0,0,0,0);
      box-shadow: 2px 2px 0px 0px #494949,
      4px 4px 0px 0px #626262,
      6px 6px 0px 0px #797979,
      8px 8px 0px 0px #7a7a7a,
      10px 10px 0px 0px #a9a9a9,
      5px 5px 15px 5px rgba(0,0,0,0);



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
    .hand-box {
        border: 1px dashed rgba(188, 117, 36, 0.5);
        border-radius: 10px;
        width: 150px;
        height: calc(150px * 1.4);
        text-align: center;
        vertical-align: center;
        position: relative;
        h2 {
            position: absolute;
            top: 50px;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        &__card{
          position: absolute;
          top: -5px;
          left: 0;
          width: 100%;
        }
    }
    .draft-box {
        border: 1px dashed rgba(188, 117, 36, 0.5);
        border-radius: 10px;
        width: 150px;
        height: calc(150px * 1.4);
        text-align: center;
        vertical-align: center;
    }
    .draw-box > h2 {
        color: rgba(188, 117, 36, 0.5);
    }
    .hand-box > h2 {
        color : rgba(188, 117, 36, 0.5)
    }
    .draft-box > h2 {
        color: rgba(188, 117, 36, 0.5)
    }


</style>
