<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
@import './assets/fontpackage/font.css';
#nprogress .bar {
  background: #b69858 !important;
}
.macthtable {
  /* margin: 0rem 0.2rem 0.2rem;
  padding-bottom: 0.2rem;
  height: calc(100vh - 120px);
	overflow: auto; */
  background: white;
  padding-bottom: 0.2rem;
}
.el-upload-list__item-name {
  overflow: auto !important;
  word-wrap: break-word;
  white-space: normal !important;
  word-break: break-all;
}
.itemwidth {
  max-width: 375px;
  width: 375px;
}
</style>
