<template>
    <canvas ref="canvas"></canvas>
</template>

<script>


export default {

    data() {
        return {
            result: '',
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
            this.Cards();
            document.querySelector('.BACK').style.display = 'none'


        },

        Cards() {

            for (let i = 0; i < 4; i++) {
                let image = this.result[i].image
                var imageFront = new Image();
                imageFront[i].src = image[i]
                var textureFront = new THREE.Texture();
                textureFront[i].image[i] = imageFront[i];
                imageFront[i].onload = function () {
                    textureFront[i].needsUpdate = true;
                };

                textureFront[i].wrapS = textureFront[i].wrapT = THREE.MirroredRepeatWrapping;


                var scene = new THREE.Scene();
                var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                var renderer = new THREE.WebGLRenderer({
                    canvas: this.$refs.canvas,
                    alpha: true
                });
                renderer.setSize(window.innerWidth, window.innerHeight);


                const geometry = new THREE.PlaneGeometry(0.65, 1);

                var material1 = new THREE.MeshLambertMaterial({ map: textureFront });


                const plane1 = new THREE.Mesh(geometry1, material1);


                const group = new THREE.Group();
                group.add(plane1);


                scene.add(group);
            }

        }
    }
}
</script>

<style scoped lang="scss"></style>