<template>

    <div class="config">
        <goal-dialog></goal-dialog>
        <router-link :to="{ name: 'Main' }">
            <div class="back"></div>
        </router-link>
        <div class="category">
            <h2 class="head">Milepæler</h2>
            <div class="body goals">
                <div class="goal headers">
                    <div class="empty"></div>
                    <div class="empty"></div>
                    <div class="count">Antall</div>
                    <div class="title">Tittel</div>
                    <div class="description">Beskrivelse</div>
                </div>
                <div class="goal" v-for="goal in sortedGoals" :key="goal.id">
                    <div class="edit" @click="editGoal(goal.id)"></div>
                    <div class="remove" @click="removeGoal(goal.id)"></div>
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
        editGoal(id) {
            this.setEditGoalId(id)
            this.toggleDialog('goal')
        },
        removeGoal(id) {
            this.removeGoalById(id)
        },

        ...mapMutations([
            'toggleDialog',
            'removeGoalById',
            'setEditGoalId'
        ])
    }
}

</script>

<style lang="scss" scoped>

    .config {
        padding: 3em 6em;

        .back {
            position: absolute;
            top: 0.5em;
            left: 0.5em;
            color: white;

            &:before {
                content: '\f359';
                font-family: 'FontAwesome';
                font-size: 2em;
            }
            &:hover {
                color: silver;
            }
            &:active {
                color: #889;
            }
        }
        .category {

            .head {
                margin: 0;
            }
            .body {
                margin-top: 2em;

                &.goals {
                    margin-left: -2.4em;

                    .goal {
                        display: grid;
                        grid-template-columns: 1.3em 1.3em 15% 25% auto;
                        grid-template-rows: 1fr;
                        padding: 0.2em 0;

                        .empty { grid-column: 1; }
                        .edit {
                            grid-column: 1;
                            color: navy;
                            margin-top: -1px;

                            &:before {
                                content: '\f044';
                                font-family: 'FontAwesome';
                            }
                            &:hover {
                                color: blue;
                            }
                        }
                        .remove {
                            grid-column: 2;
                            color: firebrick;

                            &:before {
                                content: '\f146';
                                font-family: 'FontAwesome';
                            }
                            &:hover {
                                color: red;
                            }
                        }
                        .count { grid-column: 3; }
                        .title { grid-column: 4; }
                        .description { grid-column: 5; }
                        .add {
                            grid-column-start: 2;
                            grid-column-end: 6;

                            button {
                                border: none;
                                background-color: inherit;
                                color: white;
                                padding: 0;
                                font-size: 1em;
                                border-radius: 2px;

                                &:before {
                                    content: '\f0fe';
                                    font-family: 'FontAwesome';
                                    color: forestgreen;
                                    padding-right: 0.4em;
                                }
                                &:hover {
                                    color: forestgreen;
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
