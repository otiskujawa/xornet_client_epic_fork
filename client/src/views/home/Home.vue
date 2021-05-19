<template>
  <div class="view home">
    <Header/>
    <Main/>
  </div>
</template>

<script>
import Header from '@/components/home/Header';
import Main from   '@/components/home/Main';

export default {
  name: 'Home',
  components: {
    Main,
    Header
  },
  computed: {
  },
  data: () => {
    return {
    }
  },
  created(){
  },
  mounted(){
  },
}
</script>

<style scoped>

.home {
  min-width: 100%;
  min-height: 100%;
  background-color: var(--black);
  position: relative;
  height: 100%;
}

</style>

