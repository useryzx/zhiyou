<template>
    <div>
        <div class="star-root" :style="root">
            <img src="@/assets/star-empty.png" v-for="(i,c) in 5" :key="c" class="star-empty" ondragstart="return false"
                :style="star" />
            <div class="start-full-bar" :style="starFullBarStyleObj">
                <img src="@/assets/star.png" v-for="(i,c) in 5" :key="c" class="star-full" ondragstart="return false"
                    :style="star" />
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: ["score", "width"],
        computed: {
            widthNum() {
                return parseInt(this.width)
            },
            starFullBarStyleObj() {
                let w = this.score * this.widthNum;
                w = w < 0 ? 0 : w;
                w = w > this.widthNum * 5 ? this.widthNum * 5 : w;
                return {
                    width: w + 'px'
                }
            },
            root() {
                if (this.width) {
                    return {
                        height: this.widthNum + "px",
                        width: this.widthNum * 5 + "px"
                    }
                }
                return {
                    height: 50 + "px",
                    width: 250 + "px"
                }
            },
            star() {
                if (this.width) {
                    return {
                        height: this.widthNum + "px",
                        width: this.widthNum + "px"
                    }
                }
                return {
                    height: 50 + "px",
                    width: 50 + "px"
                }
            }
        },

    };
</script>


<style scoped>

    .star-root {
        display: inline-block;
        position: relative;
    }

    .star-empty,
    .star-full {
        user-select: none;
    }

    .start-full-bar {
        position: absolute;
        left: 0;
        top: 0;
        white-space: nowrap;
        overflow: hidden;
    }
</style>