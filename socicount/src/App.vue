<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'App',

    mounted() {
        this.loadConfig()
    },

    methods: {
        ...mapMutations([
            'loadConfig'
        ])
    }
}

</script>

<style lang="scss">

@font-face {
    font-family: 'OpenSans';
    src: url('../static/fonts/OpenSans/OpenSans-Regular.ttf');
}
@font-face {
    font-family: 'FontAwesome';
    src: url('../static/fonts/FontAwesome/fa-solid-900.ttf');
}

#app {
    width: 100%;
    height: 100vh;
    background-color: black;
    box-sizing: border-box;
    overflow: hidden;
    color: white;
    font-family: 'OpenSans', arial, sans-serif;

    input, textarea {
        box-sizing: border-box;
        border: none;
        border-radius: 2px;
        padding: 0.4em;
    }

    .dialog {
        width: 100%;
        height: 100vh;
        position: fixed;

        .fade {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
            background-color: rgba(0, 0, 0, 0.8);
        }
        .body {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 101;
            padding: 1.5em;
            background-color: black;
            box-shadow: 0px 0px 12px 2px #6d6d6d;
            border-radius: 2px;

            h2 {
                margin: 0 0 0.5em 0;
            }
            button.close {
                position: absolute;
                top: 0em;
                right: 0em;
                width: 2.5em;
                height: 1.5em;
                border: none;
                background-color: darkred;
                border-top-right-radius: 1px;
                border-bottom-left-radius: 2px;

                &:hover {
                    background-color: firebrick;
                }
            }
            button.save {
                width: 100%;
                border: none;
                border-radius: 2px;
                padding: 0.5em;
                margin-top: 0.3em;
                background-color: forestgreen;

                &:hover {
                    background-color: limegreen;
                }
            }
        }
    }
}

</style>
