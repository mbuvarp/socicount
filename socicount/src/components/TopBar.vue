<template>
    <div class="topbar">
        <div class="right">
            <router-link :to="{ name: 'Config' }">
                <div class="config"></div>
            </router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: 'TopBar',
}

</script>

<style lang="scss" scoped>

.topbar {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 1;
    padding: 0.3em;

    .right {
        display: inline-block;
        float: right;

        .config {
            display: inline-block;
            color: white;

            &:before {
                content: '\f013';
                font-family: 'FontAwesome';
                font-size: 2.4em;
            }
            &:hover {
                color: silver;
            }
            &:active {
                color: #889;
            }
        }
    }
}

</style>
