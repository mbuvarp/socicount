<template>
    <div class="topbar">
        <transition name="menu-slide">
            <div class="menu" v-if="showMenu">
                <ul>
                    <li @click="showMenu = false">
                        <div class="close-menu">Lukk meny</div>
                    </li>
                    <li @click="localMute = !localMute">
                        <input type="checkbox" v-model="localMute" id="mute-cb" class="mute">
                        <label for="mute-cb" class="mute">
                            <span v-if="localMute">Lydløs</span>
                            <span v-else>Ikke lydløs</span>
                        </label>
                    </li>
                    <li>
                        Sett antall manuelt
                        <div>
                            <div class="set-count">
                                <input type="text" @keypress="isNumber" v-model="localCount">
                            </div>
                            <div class="set-count-confirm">
                                <button type="button" class="save" @click="confirmCount">
                                    OK
                                </button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Config' }">
                            Konfigurer milepæler
                        </router-link>
                    </li>
                </ul>
            </div>
        </transition>
        <div class="right">
            <div class="config" @click="showMenu = true"></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'TopBar',

    data() {
        return {
            showMenu: false,
            localCount: 0,
            localMute: false
        }
    },

    computed: {
        ...mapState({
            count: state => state.count,
            mute: state => state.options.mute
        })
    },

    methods: {
        isNumber(evt) {
            evt = evt || window.event
            const charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                evt.preventDefault()
            return true
        },

        confirmCount() {
            this.setCount(this.localCount)

            this.$bus.$emit('manualCount')
        },

        ...mapMutations([
            'setCount',
            'setOptionMute'
        ])
    },

    watch: {
        showMenu() {
            this.localCount = this.count
            this.localMute = this.mute
        },
        count(c) {
            this.localCount = c
        },
        mute(m) {
            this.localMute = m
        },
        localMute(m) {
            this.setOptionMute(m)
        }
    }
}

</script>

<style lang="scss" scoped>

.topbar {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 1;
    padding: 0.3em;

    button.save {
        width: 4em;
        border: none;
        border-radius: 2px;
        padding: 0.4em;
        margin-top: 0.3em;
        background-color: forestgreen;
        color: white;

        &:hover {
            background-color: limegreen;
        }
    }
    .menu {
        position: absolute;
        top: 0;
        right: 0;
        box-sizing: border-box;
        z-index: 105;
        padding: 0;
        background-color: black;
        box-shadow: 0 0 12px #666;
        border-radius: 2px;

        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;

            li {
                padding: 0.5em 3em;
                background-color: #0a0e16;
                cursor: default;
                text-transform: uppercase;
                font-size: 0.8em;

                &:hover {
                    background-color: #1e2438;
                }
                &:nth-child(even) {
                    background-color: #05070c;

                    &:hover {
                        background-color: #1e2438;
                    }
                }
                &:nth-child(1) {
                    background-color: #4c0200;

                    &:hover {
                        background-color: #990906;
                    }
                }
                a {
                    color: white;
                    text-decoration: none;
                    cursor: default;
                }
                .close-menu {
                    width: 100%;
                    text-align: center;
                }
                .set-count {
                    padding: 0.3em 0;
                    display: inline-block;

                    input {
                        width: 7em;
                    }
                }
                .set-count-confirm {
                    display: inline-block;
                }
                label.mute {

                    &:before {
                        content: '\f1f6';
                        display: inline-block;
                        font-family: 'FontAwesome';
                        width: 1.5em;
                        margin-left: -1.5em;
                        color: forestgreen;
                    }
                }
                input.mute {
                    display: none;

                    &:checked + label:before {
                        content: '\f0f3';
                        color: red;
                    }
                }
            }
        }
    }
    .right {
        display: inline-block;
        float: right;

        .config {
            display: inline-block;
            color: #444;

            &:before {
                content: '\f013';
                font-family: 'FontAwesome';
                font-size: 2.4em;
            }
            &:hover {
                color: #888;
                animation: spin 2s linear infinite;
            }
            &:active {
                color: silver;
            }
        }
    }
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.menu-slide-enter-active, .menu-slide-leave-active {
    transition: all 0.2s ease-out;
}
.menu-slide-enter, .menu-slide-leave-to {
    opacity: 0;
    transform: translateY(-100%);
}

</style>
