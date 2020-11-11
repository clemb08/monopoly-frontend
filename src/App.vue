<template>
  <div id="app">
    <NavBar />
    <img src="./assets/logo.png">
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
