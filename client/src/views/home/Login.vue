<template>
  <div class="view loginpage">
  <Header/>
  </div>
</template>

<script>
import Header from '@/components/home/Header';

export default {
    name: 'Login',
    components: {
      Header
    }
}
</script>

<style scoped>
.loginpage {
  min-width: 100%;
  min-height: 100%;
  background-color: var(--black);
  position: relative;
  height: 100%;
}
</style>