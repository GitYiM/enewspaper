<template>
    <section class="appmain">
        <transition name="fade-transform"  mode="out-in">
            <router-view  />> 
        </transition>
    </section>
</template>

<script>
    export default {
        computed: {
            key: function () {
                console.log(this.$route.name)
                return this.$route.path //page/1 和 page/2的path不同，强制不复用组件,但是这里不行，需要复用第二层menu
            }
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