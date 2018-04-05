<template>

    <div class="config">
        <goal-dialog></goal-dialog>
        <div class="category">
            <h2 class="head">Milepæler</h2>
            <div class="body goals">
                <div class="goal headers">
                    <div class="count">Antall</div>
                    <div class="title">Tittel</div>
                    <div class="description">Beskrivelse</div>
                </div>
                <div class="goal" v-for="goal in sortedGoals" :key="goal.count">
                    <div class="count" v-text="goal.count"></div>
                    <div class="title" v-text="goal.title"></div>
                    <div class="description" v-text="goal.description"></div>
                </div>
                <div class="goal">
                    <div class="add">
                        <button type="button" @click="toggleDialog('goal')">Legg til milepæl</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import GoalDialog from './GoalDialog'

export default {
    name: 'Config',

    components: {
        GoalDialog
    },

    computed: {
        ...mapGetters([
            'sortedGoals'
        ])
    },

    methods: {
        ...mapMutations([
            'toggleDialog'
        ])
    }
}

</script>

<style lang="scss" scoped>

    .config {
        padding: 3em 6em;

        .category {

            .head {
                margin: 0;
            }
            .body {
                margin-top: 2em;

                &.goals {

                    .goal {
                        display: grid;
                        grid-template-columns: 15% 25% 60%;
                        grid-template-rows: 1fr;
                        padding: 0.2em 0;

                        .count { grid-column: 1; }
                        .title { grid-column: 2; }
                        .description { grid-column: 3; }
                        .add {
                            grid-column-start: 1;
                            grid-column-end: 4;
                            margin-top: 1em;

                            button {
                                border: none;
                                background-color: inherit;
                                color: white;
                                padding: 0.2em 0.5em 0.2em 0.2em;
                                font-size: 1.2em;
                                border-radius: 2px;
                                vertical-align: bottom;

                                &:before {
                                    content: '\f0fe';
                                    font-family: 'FontAwesome';
                                    color: forestgreen;
                                    padding-right: 0.4em;
                                    vertical-align: middle;
                                    font-size: 1.4em;
                                }
                                &:hover {
                                    color: black;
                                    background-color: #9a8f9e;
                                }
                            }
                        }

                        &.headers {
                            font-weight: bold;
                        }
                        &:first-child {
                            padding-top: 0;
                        }
                    }
                }
            }
        }
    }

</style>
