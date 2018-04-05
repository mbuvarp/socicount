<template>
    <div class="goals">
        <ul class="goallist">
            <li v-for="goal in sortedGoals" :key="goal.count">
                <div v-text="goal.count"></div>
                <h3 v-text="goal.title"></h3>
                <p v-text="goal.description"></p>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Goals',

    computed: {
        ...mapGetters([
            'sortedGoals'
        ])
    }
}

</script>

<style lang="scss" scoped>

.goals {
    grid-column: 1;
    grid-row: 2;
}

</style>
