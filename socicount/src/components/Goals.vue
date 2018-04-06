<template>
    <div class="goals">
        <ul id="goallist" class="goallist">
            <li v-for="goal in sortedGoals" :key="goal.id" :id="goal.id" :class="{ 'reached': goalReached(goal.count) }">
                <div><span v-text="goal.count"></span></div>
                <h3 v-text="goal.title"></h3>
                <p v-text="goal.description"></p>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'Goals',

    data() {
        return {
            curGoalIndex: 0,
        }
    },

    mounted() {
        this.scrollToCurrentGoal()

        this.$bus.$on('manualCount', () => {
            this.scrollToCurrentGoal()
        })
    },
    destroyed() {
        this.$bus.$off('manualCount')
    },

    computed: {
        ...mapState([
            'count'
        ]),
        ...mapGetters([
            'sortedGoals',
            'nextGoalId',
            'nextGoalIndex',
            'getGoalIdByIndex'
        ])
    },

    methods: {
        scrollToCurrentGoal() {
            const list = document.getElementById('goallist')
            list.style.marginTop = '0px'

            const nextIndex = this.nextGoalIndex
            if (nextIndex < 4)
                return

            const nextId = this.nextGoalId
            const elmt = document.getElementById(nextId)

            const eTop = elmt.offsetTop
            const cHeight = document.documentElement.clientHeight
            const midHeight = (cHeight - elmt.offsetHeight) / 2
            const scroll = midHeight - eTop

            list.style.marginTop = `${scroll}px`
        },
        goalReached(goalcount) {
            return this.count >= goalcount
        }
    },

    watch: {
        nextGoalIndex(nr) {
            this.scrollToCurrentGoal()
        }
    }
}

</script>

<style lang="scss" scoped>

.goals {
    grid-column: 1;
    grid-row: 2;
    padding: 0 3em;

    .goallist {
        list-style-type: none;
        padding: 0;
        max-height: 100vh;

        &:before {
            content: '';
            width: 65%;
            height: 4em;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 90;
            background-image: linear-gradient(
                black,
                transparent
            );
        }
        &:after {
            content: '';
            width: 65%;
            height: 8em;
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 90;
            background-image: linear-gradient(
                transparent,
                black
            );
        }
        li {
            display: grid;
            grid-template-columns: 20% auto;
            grid-template-rows: 2em 1fr;

            &:not(:first-child) {
                padding-top: 0.5rem;
            }
            &.reached {
                opacity: 0.2;
            }
            div {
                position: relative;
                grid-column: 1;
                grid-row-start: 1;
                grid-row-end: 3;
                font-size: 5em;
                height: 5rem;
                text-align: right;
                padding-right: 1rem;
                box-sizing: border-box;
                color: gold;

                span {
                    position: absolute;
                    right: 1.5rem;
                    top: -1.2rem;
                }
            }
            h3 {
                grid-column: 2;
                grid-row: 1;
                margin: 0;
                box-sizing: border-box;
                font-size: 1.8em;
            }
            p {
                grid-column: 2;
                grid-row: 2;
                margin: 0;
                box-sizing: border-box;
                font-size: 1.2em;
                margin-top: 0.2em;
            }
        }
    }
}

</style>
