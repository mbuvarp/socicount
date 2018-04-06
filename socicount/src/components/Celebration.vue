<template>

    <div class="celebration" v-if="celebrate">
        <h1>Milepæl nådd</h1>
        <div class="info">
            <div class="count"><span>{{ celebration.count }}</span> enheter solgt</div>
            <div class="challenge">
                <div class="title" v-text="celebration.title"></div>
                <div class="description" v-text="celebration.description"></div>
            </div>
        </div>
        <div class="finished" @click="close">Lukk</div>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'Celebration',

    data() {
        return {
            celebration: null
        }
    },

    mounted() {
        this.$bus.$on('exit', this.close)
        this.$bus.$on('confirm', this.close)
    },
    destroyed() {
        this.$bus.$off('exit', this.close)
        this.$bus.$off('confirm', this.close)
    },

    computed: {
        ...mapState({
            celebrate: state => state.dialogs.celebrate,
            celebrations: state => state.celebrations
        })
    },

    methods: {
        close() {
            this.removeCelebrationById(this.celebration.id)
            this.toggleDialog('celebrate')
        },

        ...mapMutations([
            'toggleDialog',
            'removeCelebrationById'
        ])
    },

    watch: {
        celebrate(val) {
            if (!val)
                return

            this.celebration = this.celebrations[0]
        }
    }
}

</script>

<style lang="scss" scoped>

    .celebration {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        z-index: 110;
        background-color: rgba(0, 0, 0, 0.99);
        text-align: center;

        h1 {
            text-align: center;
            text-transform: uppercase;
            margin: 1.5rem 0 0 0;
            font-size: 6em;
        }
        .info {
            position: absolute;
            width: 100%;
            left: 0;
            top: 50%;
            transform: translateY(-50%);

            .count {
                text-transform: uppercase;
                font-size: 6em;
                color: gold;
                animation: pulse 1s ease-in-out alternate infinite running;

                span {
                    font-size: 16rem;
                }
            }
            .challenge {
                display: grid;
                grid-template-columns: 20% auto 20%;
                grid-template-rows: 3em 1fr;
                justify-content: center;
                text-align: left;

                .title {
                    grid-column: 2;
                    grid-row: 1;
                    margin-top: -1rem;
                    margin-left: -1px;
                    font-size: 3em;
                    color: silver;
                    white-space: nowrap;
                }
                .description {
                    grid-column: 2;
                    grid-row: 2;
                    font-size: 2em;
                }
            }
        }
        .finished {
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            box-sizing: border-box;
            padding: 1.5rem;
            font-size: 3em;
            text-transform: uppercase;
            user-select: none;
            background-color: inherit;

            &:hover {
                background-color: #050505;
            }
        }
    }
    @keyframes pulse {
        0% {
            text-shadow: 0 0 12px gold;
        }
        100% {
            text-shadow: 0 0 36px gold;
        }
    }

</style>
