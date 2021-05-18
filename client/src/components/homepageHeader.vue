<template>
  <header class="view">
    <router-link :to="{ name: 'home'}"><img :src="require('@/assets/logos/logo.svg')" alt="Xornet"></router-link>
    <div class="buttons">
      <router-link :to="{ name: 'home', params: {page: 'about'}}">About Us</router-link>
      <router-link :to="{ name: 'home', params: {page: 'virtualmachine'}}">I want a VM</router-link>
      <router-link :to="{ name: 'home', params: {page: 'hosting'}}">I want to Host</router-link>
      <a href="https://github.com/Geoxor/Xornet" target="_blank">Repository</a>
      <router-link class="fancy" :to="{ name: 'home', params: {page: 'downloads'}}">Downloads</router-link>
      <router-link class="fancy" :to="{ name: 'dashboard'}">Dashboard</router-link>
    </div>
  </header> 
</template>

<script>
export default {
  name: 'homepageHeader',
  components: {
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


header {

  z-index: 1000;
  position: fixed;
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10vw;
  /* background-color: var(--white); */
}

header .buttons {
  display: flex;
  height: 100%;
  gap: 16px;
}

header .buttons * {
  white-space: nowrap;
  height: fit-content;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
}

header .buttons *:not(.fancy):hover {
  text-decoration: underline;
}


header .buttons *.fancy {
  background: linear-gradient(300.05deg, #DB00FF 8.32%, #4D9FFF 89.64%);
  border-radius: 4px;
  padding: 12px;
}


</style>

