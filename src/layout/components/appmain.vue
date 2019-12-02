<template>
    <section class="appmain">
        <transition name="fade-transform"  mode="out-in">
            <router-view :key="varkey" />> 
        </transition>
    </section>
</template>

<script>
    export default {
        computed: {
            varkey: function () {
                // console.log(_this.$route.path)
                return this.$store.state.recommendType
            },
        }
    }
</script>

<style lang="scss" scoped>
    .appmain{
        position: relative;
        min-height: calc(100vh + 60px); //vh
        width: 100%;
        
    }
</style>