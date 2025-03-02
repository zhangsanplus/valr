<template>
  <div class="container">
    <div class="card">
      <Arco />
    </div>
    <div class="card">
      <Element />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Element from './components/Element.vue'
import Arco from './components/Arco.vue'
</script>

<style lang="css">
body {
  background-color: #f2f2f2;
}

.container {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding: 40px 30px;
}

.card {
  flex: 1;
  padding: 5px 20px 20px;
  background-color: #fff;
}
</style>
