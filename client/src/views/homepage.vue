<template>
  <div class="view homepage">
    <homepageHeader/>
    <homepageMain/>
  </div>
</template>

<script>
import homepageHeader from '@/components/homepageHeader';
import homepageMain from '@/components/homepageMain';

export default {
  name: 'homepage',
  components: {
    homepageMain,
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
  min-width: 100%;
  min-height: 100%;
  background-color: var(--black);
  position: relative;
}

</style>

