<template>
  <section class="app-main">
    <breadcrumb class="breadcrumb-container" />
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" class="app-container" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  // min-height: calc(100vh - 62px);
  min-height:100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color:#EEF5FD;
}
.fixed-header + .app-main {
  padding-top: 62px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 62 + 34 */
    // min-height: calc(100vh - 96px);
    min-height:100vh;
  }

  .fixed-header + .app-main {
    padding-top: 96px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
