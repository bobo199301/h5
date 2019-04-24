<template>
    <div class='goodList'>
        FrogSearch
    </div>

</template>
<script>
    import axios from 'axios';
    export default ({
        props: [],
        name: "Test",
        data() {
            return {

            }
        },
        async mounted() {
            this.$store.dispatch('getTestList')
        },
        methods: {
        },
        components: {
        }
    })
</script>

<style lang="less" scoped>

</style>
