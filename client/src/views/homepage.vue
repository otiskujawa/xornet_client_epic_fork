<template>
  <div class="view homepage">
    <homepageHeader/>
  </div>
</template>

<script>
import homepageHeader from '@/components/homepageHeader';

export default {
  name: 'homepage',
  components: {
    homepageHeader
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

.homepage {
  width: 100%;
  height: 100%;
  background-color: var(--black);
}

</style>

