<template>

    <div class="main">
        <top-bar></top-bar>
        <goals></goals>
        <count></count>
    </div>

</template>

<script>
import TopBar from './TopBar'
import Goals from './Goals'
import Count from './Count'

export default {

    name: 'Main',

    components: {
        TopBar,
        Goals,
        Count,
    },

    data() {
        return {
        }
    },

}

</script>

<style lang="scss" scoped>

.main {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 65% 35%;
    grid-template-rows: 3em 1fr;
}

</style>
