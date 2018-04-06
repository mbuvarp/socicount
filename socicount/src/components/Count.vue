<template>
    <div class="count">
        <div class="content">
            <div class="header">Antall enheter solgt:</div>
            <div class="number" v-text="count" @click="increase" @contextmenu="decrease"></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'Count',

    mounted() {
        this.$bus.$on('increase', this.increase)
        this.$bus.$on('decrease', this.decrease)
    },

    computed: {
        ...mapState({
            count: state => state.count,
            goals: state => state.goals,
        })
    },

    methods: {
        increase() {
            this.increaseProductCount()
            this.checkGoal()
        },
        decrease(evt) {
            if (evt)
                evt.preventDefault()
            this.decreaseProductCount()
        },

        checkGoal() {
            const goalsReached = this.goals.filter(g => g.count === this.count)
            if (goalsReached.length > 0)
                this.queueCelebrations(goalsReached)
        },

        ...mapMutations([
            'increaseProductCount',
            'decreaseProductCount',
            'queueCelebrations'
        ])
    }
}

</script>

<style lang="scss" scoped>

.count {
    grid-column: 2;
    grid-row: 2;
    position: relative;
    user-select: none;

    .content {
        position: absolute;
        width: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        .header {
            margin-bottom: -0.5em;
            text-transform: uppercase;
            font-size: 1.8em;
            color: silver;
            text-shadow: 0 0 4px silver;
            white-space: nowrap;
        }
        .number {
            font-size: 12em;
            color: gold;
            text-shadow: 0 0 12px gold;
            // animation: pulse 1.5s ease-in-out alternate infinite running;
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
