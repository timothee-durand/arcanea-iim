<template>
    <section class="container">
        <div class="canvas" ref="canvas"></div>
        <section class="draft">
            <div class="box">
                <img src="src/assets/img/draft.png" alt="draft">
            </div>
        </section>
        <section class="hand">
            <div class="box">
                <h2>Card 1</h2>
                <img v-if="hand[0]" class="hand-box__card" :src="hand[0].image">
            </div>
            <div class="box">
                <h2>Card 2</h2>
              <img v-if="hand[1]" class="hand-box__card" :src="hand[1].image">
            </div>
            <div class="box">
                <h2>Card 3</h2>
                <img v-if="hand[2]" class="hand-box__card" :src="hand[2].image">
            </div>
        </section>
        <section class="draw">
            <div class="draw-box box">
                <h2>Draw</h2>
                <img v-on:click="drawCard(1)" v-if="deck && deck.length > 0" :class="canDraw ? 'draw-box__card canDraw' : 'draw-box__card'" src="@/assets/img/card-back.png">
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
                canDraw: true,
            };
        },
        mixins: [threeMixin],
        mounted() {
            // initialize container, target and viewport
            this.container = this.$refs.canvas;
            this.viewport = this.setViewportSize(this.container);
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
                this.drawCard(2);
                this.canDraw = true;
                console.log(this.hand);
                console.log(this.deck);
            },

            drawCard(nbCards) {
                //draw nbCards from deck
              if (this.canDraw && this.deck.length > 0 && this.hand.length < 3) {
                for (let i = 0; i < nbCards; i++) {
                  this.hand.push(this.deck.pop());
                }
                this.canDraw = false;
              }

                //emit event to update hand and deck with socket.io


            },

            createScene() {
                window.addEventListener('resize', this.onWindowResize.bind(this));
                this.scene = new THREE.Scene();
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
        .canvas {
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
        .hand {
            display: flex;
            gap: 10px;
            margin-left: auto;
        }
        .draw {
            margin-left: auto;
        }
        .box {
            border: 1px dashed rgba(188, 117, 36, 0.5);
            border-radius: 10px;
            width: 150px;
            height: calc(150px * 1.4);
            text-align: center;
            vertical-align: center;
            -webkit-box-shadow: 5px 5px 0px 0px #289fed, 10px 10px 0px 0px #5fb8ff, 15px 15px 0px 0px #a1d8ff, 20px 20px 0px 0px #cae6ff, 25px 25px 0px 0px #e1eeff, 5px 5px 15px 5px rgba(0, 0, 0, 0);
            box-shadow: 2px 2px 0px 0px #494949,
            4px 4px 0px 0px #626262,
            6px 6px 0px 0px #797979,
            8px 8px 0px 0px #7a7a7a,
            10px 10px 0px 0px #a9a9a9,
            5px 5px 15px 5px rgba(0, 0, 0, 0);
            img {
                max-width: 100%;
            }
        }
        .draw-box {
            & .canDraw {
                -webkit-box-shadow: #ffffff 0 -1px 4px, #ffff00 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0, 0, 0, 0);
                box-shadow: #ffffff 0 -1px 4px, #ffff00 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0, 0, 0, 0);
            }
            &__card {
                position: absolute;
                top: -5px;
                left: 0;
                width: 100%;
            }
        }
        h2 {
            color: rgba(188, 117, 36, 0.5)
        }
    }
</style>
