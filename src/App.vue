<template>
  <div id="app">
    <NavBar />
    <div class="text-center"><img class="img-fluid" src="./assets/monopoly.jpg"></div>

    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/navBar';

export default {
  name: 'App',
  components: { NavBar },
};
</script>

<style lang="scss">
@import './design/Index.scss';
</style>
