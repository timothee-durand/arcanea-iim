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
            </div>
            <div class="hand-box">
                <h2>Card 2</h2>
            </div>
            <div class="hand-box">
                <h2>Card 3</h2>
            </div>
        </section>
        <section class="draw">
            <div class="draw-box">
                <h2>Draw</h2>
            </div>
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
            this.loader = new GLTFLoader();

            this.createScene();
        },
        methods: {
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
<style scoped>
    section.container {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border: 1px solid red;
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
        height: 100%;
        text-align: center;
        vertical-align: center;
    }
    .hand {
        display: flex;
        gap: 10px;
        margin-left: auto;
    }
    .draw {
        margin-left: auto;
    }
    .hand-box {
        border: 1px dashed rgba(188, 117, 36, 0.5);
        border-radius: 10px;
        width: 150px;
        height: 100%;
        text-align: center;
        vertical-align: center;
    }
    .draft-box {
        border: 1px dashed rgba(188, 117, 36, 0.5);
        border-radius: 10px;
        width: 150px;
        height: 100%;
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
