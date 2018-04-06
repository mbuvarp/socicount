import Vue from 'vue'
import Vuex from 'vuex'

/* eslint no-unused-vars: 0 */
const DEBUG = process.env.NODE_ENV !== 'production'

function saveToLS(key, obj) {
    const json = JSON.stringify(obj)
    localStorage.setItem(key, json)
}
function loadFromLS(key) {
    const json = localStorage.getItem(key)
    return JSON.parse(json)
}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        goals: [],
        celebrations: [],
        editGoalId: null,

        dialogs: {
            goal: false,
            celebrate: false
        },

        options: {
            mute: false
        }
    },

    mutations: {
        increaseProductCount(state) {
            ++state.count

            saveToLS('count', state.count)
        },
        decreaseProductCount(state) {
            --state.count

            saveToLS('count', state.count)
        },
        setCount(state, count) {
            state.count = count

            saveToLS('count', state.count)
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

            saveToLS('goals', state.goals)
        },
        setEditGoalId(state, id) {
            state.editGoalId = id
        },
        removeGoalById(state, id) {
            state.goals = state.goals.filter(g => g.id !== id)

            saveToLS('goals', state.goals)
        },
        queueCelebrations(state, goals) {
            state.celebrations = state.celebrations.concat(goals)
        },
        removeCelebrationById(state, id) {
            state.celebrations = state.celebrations.filter(c => c.id !== id)
        },

        toggleDialog(state, dialog) {
            switch (dialog) {
                case 'goal':
                    state.dialogs.goal = !state.dialogs.goal
                    break
                case 'celebrate':
                    state.dialogs.celebrate = !state.dialogs.celebrate
                    break
                default:
                    break
            }
        },

        loadConfig(state) {
            state.count = loadFromLS('count') || 0
            state.goals = loadFromLS('goals') || []
        },

        // Options
        setOptionMute(state, mute) {
            state.options.mute = mute
        }
    },

    getters: {
        sortedGoals(state) {
            const compare = (a, b) => a.count - b.count
            return state.goals.sort(compare)
        },
        getGoalById: (state) => (id) => state.goals.find(g => g.id === id),
        getGoalIdByIndex: (state, getters) => (index) => getters.sortedGoals[index].id,
        nextGoalId(state, getters) {
            const sorted = getters.sortedGoals

            let index = 0
            while (sorted[index].count <= state.count) {
                index += 1
                if (index > sorted.length - 1)
                    return null
            }

            return sorted[index].id
        },
        nextGoalIndex(state, getters) {
            const nextId = getters.nextGoalId
            return getters.sortedGoals.findIndex(g => g.id === nextId)
        }
    }
})
