<template>
  <div id="app">
    <Header v-if="$route.path != '/'" />
    <keep-alive>
      <router-view />
    </keep-alive>
    <Footer />
  </div>
</template>
<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
export default {
  components: { Header, Footer },
  name: 'app',
}
</script>
<style lang="scss"></style>
