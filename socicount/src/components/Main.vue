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

    mounted() {
        // Keyboard bindings
        document.addEventListener('keydown', this.keydown)
    },
    destroyed() {
        document.removeEventListener('keydown', this.keydown)
    },

    computed: {
        ...mapState({
            celebrate: state => state.celebrate,
            celebrations: state => state.celebrations,
            mute: state => state.options.mute
        })
    },

    watch: {
        celebrations(cel) {
            if (cel.length === 0)
                return

            // Get hype
            if (!this.mute) {
                const hype = new Audio('../../static/sounds/airhorn.mp3')
                hype.play()
            }

            this.toggleDialog('celebrate')
        }
    },

    methods: {
        keydown(evt) {
            const key = evt.key.toLowerCase()

            switch (key) {
                case 'arrowleft':
                    this.$bus.$emit('decrease')
                    break
                case 'arrowright':
                    this.$bus.$emit('increase')
                    break
                case 'escape':
                    this.$bus.$emit('exit')
                    break
                case 'enter':
                    this.$bus.$emit('confirm')
                    break
                default:
                    break
            }
        },

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
