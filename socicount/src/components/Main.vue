<template>

    <div class="main">
        <celebration></celebration>
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

    computed: {
        ...mapState([
            'celebrate',
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

            this.toggleDialog('celebrate')
        }
    },

    methods: {
        ...mapMutations([
            'toggleDialog'
        ])
    }

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
