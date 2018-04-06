<template>
    <div class="dialog goal-dialog" v-if="showDialog">
        <div class="fade"></div>
        <div class="body">
            <h2>Legg til milepæl</h2>
            <input type="text" v-model="count" @keypress="isNumber" placeholder="Antall" id="count-input">
            <input type="text" v-model="title" maxlength="64" placeholder="Tittel">
            <textarea v-model="description" placeholder="Beskrivelse"></textarea>
            <button type="button" class="save" @click="saveGoal">Lagre</button>
            <button type="button" class="close" @click="close"></button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name: 'GoalDialog',

    data() {
        return {
            count: 0,
            title: '',
            description: ''
        }
    },

    mounted() {
        this.$bus.$on('exit', this.close)
    },
    destroyed() {
        this.$bus.$off('exit', this.close)
    },


    watch: {
        showDialog(show) {
            if (show) {
                setTimeout(() => {
                    if (this.editGoalId !== null) {
                        const goal = this.getGoalById(this.editGoalId)

                        this.count = goal.count
                        this.title = goal.title
                        this.description = goal.description
                    }

                    document.getElementById('count-input').select()
                }, 50)
            }
        }
    },

    computed: {
        ...mapState({
            editGoalId: state => state.editGoalId,
            showDialog: state => state.dialogs.goal
        }),
        ...mapGetters([
            'getGoalById',
        ])
    },

    methods: {
        isNumber(evt) {
            evt = evt || window.event
            const charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                evt.preventDefault()
            return true
        },

        validateGoal() {
            const count = this.count > 0
            const title = this.title.length > 0 && this.title.length <= 64

            return count && title
        },
        saveGoal() {
            if (this.validateGoal()) {
                if (this.editGoalId !== null)
                    this.removeGoalById(this.editGoalId)

                this.addGoal({
                    count: parseInt(this.count, 10),
                    title: this.title,
                    description: this.description
                })
                this.close()
            }
        },
        close() {
            this.count = 0
            this.title = ''
            this.description = ''
            this.setEditGoalId(null)

            this.toggleDialog('goal')
        },

        ...mapMutations([
            'addGoal',
            'removeGoalById',
            'toggleDialog',
            'setEditGoalId'
        ])
    }
}

</script>

<style lang="scss" scoped>

    .goal-dialog {

        input, textarea {
            display: block;
            width: 18em;
            margin-top: 0.3em;
        }
        textarea {
            height: 8em;
        }
    }

</style>
