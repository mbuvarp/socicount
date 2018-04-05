import Vue from 'vue'
import Vuex from 'vuex'

/* eslint no-unused-vars: 0 */
const DEBUG = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        productCount: 0,
        goals: [],

        dialogs: {
            goal: false,
        }
    },

    mutations: {
        increaseProductCount(state) {
            ++state.productCount
        },
        decreaseProductCount(state) {
            --state.productCount
        },

        /* Goal should ba an object with keys 'count', 'title', 'description' */
        addGoal(state, goal) {
            const createId = () => {
                let r = ''
                for (let i = 0; i < 32; i++)
                    r += String.fromCharCode(97 + Math.floor(Math.random() * Math.floor(26)))
                return r
            }
            const g = {
                id: createId(),
                ...goal
            }

            state.goals.push(g)

            // Update localStorage
        },
        removeGoalById(state, id) {
            state.goals = state.goals.filter(g => g.id !== id)
        },

        toggleDialog(state, dialog) {
            switch (dialog) {
                case 'goal':
                    state.dialogs.goal = !state.dialogs.goal
                    break
                default:
                    break
            }
        }
    },

    getters: {
        sortedGoals(state) {
            const compare = (a, b) => a.count - b.count
            return state.goals.sort(compare)
        },

        showGoalDialog(state) {
            return state.dialogs.goal
        }
    }
})
