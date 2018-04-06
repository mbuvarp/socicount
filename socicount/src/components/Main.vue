<template>

    <div class="main">
        <celebration v-if="celebrate" ></celebration>
        <top-bar></top-bar>
        <goals></goals>
        <count></count>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Celebration from './Celebration'
import TopBar from './TopBar'
import Goals from './Goals'
import Count from './Count'

export default {

    name: 'Main',

    components: {
        Celebration,
        TopBar,
        Goals,
        Count,
    },

    data() {
        return {
            celebrate: false
        }
    },

    computed: {
        ...mapState([
            'celebrations'
        ])
    },

    watch: {
        celebrations(cel) {
            if (cel.length === 0)
                return

            // Get hype
            const hype = new Audio('../../static/sounds/airhorn.mp3')
            hype.play()

            this.celebrate = true
        }
    },

}

</script>

<style lang="scss" scoped>

.main {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 65% 35%;
    grid-template-rows: 3em 1fr;
}

</style>
