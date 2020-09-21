<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/fontpackage/font.css';
#nprogress .bar {
  background: #fd7715 !important;
}
.macthtable {
  margin: 0rem 0.2rem 0.2rem;
  padding-bottom: 0.2rem;
  height: calc(100vh - 120px);
  overflow: auto;
}
</style>
