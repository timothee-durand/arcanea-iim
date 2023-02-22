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
            </div>
            <div class="box">
                <h2>Card 2</h2>
            </div>
            <div class="box">
                <h2>Card 3</h2>
            </div>
        </section>
        <section class="draw">
            <div class="box">
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
            };
        },
        mixins: [threeMixin],
        mounted() {
            // initialize container, target and viewport
            this.container = this.$refs.canvas;
            this.viewport = this.setViewportSize(this.container);

            this.createScene();
        },
        methods: {
            createScene() {
                window.addEventListener('resize', this.onWindowResize.bind(this));
                this.scene = new THREE.Scene();

                this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
                this.renderer.setSize(this.viewport.width, this.viewport.height);
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.setUpCamera();
                this.createControls();
                this.createLight();
                this.loadModels();
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
                // this.loader.load('src/assets/models/card.glb', (model) => {
                //     this.scene.add(model.scene)
                // });
                const geometry = new THREE.PlaneGeometry(10, 10);
                const material = new THREE.MeshBasicMaterial({color: 0xff00ff, side: THREE.DoubleSide});
                const plane = new THREE.Mesh(geometry, material);
                this.scene.add(plane);
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
        border: 1px solid red;
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
        h2 {
            color: rgba(188, 117, 36, 0.5)
        }
    }
</style>
