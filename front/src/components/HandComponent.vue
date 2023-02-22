<template>
    <div class="overlay"></div>
    <section class="container">
        <div class="canvas" ref="canvas"></div>
        <section class="draft">
            <div class="draft-box box">
                <h2>Draft</h2>
                <img src="@/assets/img/draft.png" alt="draft">
            </div>
        </section>
        <section class="hand">
            <div class="hand-box box">
                <h2>Card 1</h2>
                <img v-if="hand[0]" v-on:click="showCard" v-on:click.right="playCard(hand[0])" class="hand-box__card" :src="hand[0].image">
            </div>
            <div class="hand-box box">
                <h2>Card 2</h2>
              <img v-if="hand[1]" v-on:click="showCard" v-on:click.right="playCard(hand[1])" class="hand-box__card" :src="hand[1].image">
            </div>
            <div class="hand-box box">
                <h2>Card 3</h2>
                <img v-if="hand[2]" v-on:click="showCard" v-on:click.right="playCard(hand[2])"  class="hand-box__card" :src="hand[2].image">
            </div>
        </section>
        <section class="draw">
            <div class="draw-box box">
                <h2>Draw</h2>
                <img v-on:click="drawCard(1)" v-if="deck && deck.length > 0" :class="canDraw ? 'draw-box__card canDraw' : 'draw-box__card'" src="@/assets/img/card-back.png">
            </div>
        </section>
    </section>
</template>
<script>
    import * as THREE from 'three';
    import threeMixin from '../mixins/threeMixin';
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
    import {Socket} from "socket.io-client";
    import {useAuthStore} from "@/store/auth";
    import {inject, ref} from "vue";
    import { mapStores } from 'pinia'

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
                socket: inject("socket")

            };
        },
        computed: {
          // note we are not passing an array, just one store after the other
          // each store will be accessible as its id + 'Store'
          ...mapStores(useAuthStore)
        },
        mixins: [threeMixin],
        mounted() {

            // initialize container, target and viewport
            this.container = this.$refs.canvas;
            this.viewport = this.setViewportSize(this.container);
            this.launchDuel();

            this.socket.on("updateRoom", (payload) => {
              this.updateDuel(payload);
            })

            this.socket.on("pushActions", (payload) => {
              this.updateHistoric(payload);
            })

            this.createScene();
        },
        methods: {
           updateHistoric(payload) {
             console.log(payload);
           },

            playCard(playedCard) {
                this.hand = this.hand.filter(card => card !== playedCard);
                this.canDraw = true;

                this.socket.emit("playCard",
                    this.authStore.room.roomId,
                    this.authStore.user.id,
                    playedCard.key
                )
            },

            updateDuel(payload) {
              console.log(payload)
              this.authStore.room.players = payload.players;

            },
            showCard(event) {
               event.target.classList.toggle('viewed');
               document.querySelector('.overlay').classList.toggle('active');
            },

            async constructDeck() {
              if(!this.cardsApi) await this.fetchCards();

              this.deck = this.authStore.user.cards.map((cardName)=>{
                if(this.cardsApi.find(element=> element.key === cardName)){
                  return this.cardsApi.find(element=> element.key === cardName)
                }
              })
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

            },

            drawCard(nbCards) {
                //draw nbCards from deck
              if (this.canDraw && this.deck.length >= nbCards && this.hand.length < 3) {
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
    }
    .viewed {
      position: fixed!important;
      top: 50%!important;
      left: 50%!important;
      transform: translate(-50%, -50%)!important;
      width: 450px!important;
      height: calc(450px * 1.4)!important;
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
