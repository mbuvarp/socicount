<template>
    <div class="count">
        <div class="content">
            <div class="header">Antall enheter solgt:</div>
            <div class="number" v-text="productCount"></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Count',

    data() {
        return {
            count: 1000,
        }
    },
    computed: {
        ...mapState([
            'productCount',
        ])
    }
}

</script>

<style lang="scss" scoped>

.count {
    grid-column: 2;
    grid-row: 2;
    position: relative;
    user-select: none;

    .content {
        position: absolute;
        width: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        .header {
            margin-bottom: -0.5em;
            text-transform: uppercase;
            font-size: 1.8em;
            color: silver;
            text-shadow: 0 0 4px silver;
            white-space: nowrap;
        }
        .number {
            font-size: 12em;
            color: gold;
            text-shadow: 0 0 12px gold;
            // animation: pulse 1.5s ease-in-out alternate infinite running;
        }
    }
}

@keyframes pulse {
    0% {
        text-shadow: 0 0 12px gold;
    }
    100% {
        text-shadow: 0 0 36px gold;
    }
}

</style>
