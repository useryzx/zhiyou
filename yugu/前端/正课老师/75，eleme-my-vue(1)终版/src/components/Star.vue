<template>

    <div class="star-root">
        <img src="@/assets/star-empty.png" v-for="i in 5" class="star-empty" ondragstart="return false"
            @click="starClick(i)">
        <div class="start-full-bar" :style="starFullBarStyleObj">
            <img src="@/assets/star.png" v-for="i in 5" class="star-full" ondragstart="return false"
                @click="starClick(i)">
        </div>
    </div>

</template>

<script>
    export default {
        props: ["value"],
        computed: {
            starFullBarStyleObj() {
                let w = this.value * 3;
                w = w < 0 ? 0 : w;
                w = w > 3 * 5 ? 3 * 5 : w;
                return {
                    width: w + 'vw'
                }
            }
        },
    }

</script>

<style scoped>
    .star-root {
        height: 3vw;
        width: 15vw;
        position: relative;
    }

    .star-empty,
    .star-full {
        width: 3vw;
        height: 3vw;
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