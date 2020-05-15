<template>
    <div class="acti-info">
        <span class="acti-icon" :style="iconStyle">{{activities.icon_name}}</span>
        <span class="acti-desc">{{activities.description}}</span>
    </div>
</template>

<script>
    export default {
        props: ["activities"],
        computed: {
            iconStyle() {
                return {
                    "background-color": "#" + this.activities.icon_color,
                }
            }
        },
    }
</script>


<style scoped>
    .acti-info {
        margin-top: .6vh;
        font-size: 1vw;
        color: #666;
    }
    .acti-desc {
        display: inline-block;
        width: 50vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 1vw;
    }

    .acti-icon {
        color: white;
        border-radius: 2px;
        padding:0 1px;
        vertical-align: top;
    }
</style>