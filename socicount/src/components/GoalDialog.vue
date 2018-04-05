<template>
    <div class="dialog goal-dialog" v-if="showGoalDialog">
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
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'GoalDialog',

    data() {
        return {
            count: 0,
            title: '',
            description: ''
        }
    },

    watch: {
        showGoalDialog(show) {
            if (show) {
                setTimeout(() => {
                    document.getElementById('count-input').select()
                }, 50)
            }
        }
    },

    computed: {
        ...mapGetters([
            'showGoalDialog'
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
                this.addGoal({
                    count: this.count,
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

            this.toggleDialog('goal')
        },

        ...mapMutations([
            'addGoal',
            'toggleDialog'
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
