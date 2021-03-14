<template>
  <div class="error">
    <div class="error-img">
      <img src="@/assets/img/404@2x.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  components: {},
}
</script>

<style scoped lang="scss">
.error-img {
  width: 801px;
  height: 453px;
  margin: 0 auto;
  margin-top: 108px;
  margin-bottom: 100px;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
