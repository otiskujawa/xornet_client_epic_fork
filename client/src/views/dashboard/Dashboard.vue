<template>
  <div class="view dashboard">
    <LoadingScreen :isLoaded="!isLoading"/>
    <Header/>
    <div class="main">
      <Nav/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import socket from        '@/services/socket.js';
import GaugeField from    '@/components/dashboard/GaugeField';
import InfoField from     '@/components/dashboard/InfoField';
import ServerList from    '@/components/dashboard/ServerList';
import LoadingScreen from '@/components/dashboard/LoadingScreen';
import Chart from         '@/components/dashboard/Chart';
import Terminal from      '@/components/dashboard/Terminal';
import Header from        '@/components/dashboard/Header';
import Nav from           '@/components/dashboard/Nav';

export default {
  name: 'Dashboard',
  components: {
    Nav,
    Header,
    LoadingScreen,
  },
  computed: {
    isLoading: function(){
      // return this.machines.size > 0 ? false : true;
      return false
    }
  },
  data: () => {
    return {
    }
  },
  mounted(){
    this.api.user.fetchMe();
  }
}
</script>

<style scoped>

.dashboard {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.dashboard .main {
  align-items: flex-start;
  display: flex;
  width: 100%;
  height: 100%;
}

.content {
  box-sizing: border-box;
  background-color: var(--white);
  padding: 8px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: scroll;
  border-radius: 4px 0px 0px 0px;
}

.machines, .informatics {
  display: flex;
  width: fit-content;
  flex-direction: column;
}

.informatics {
  gap: 8px;
}

</style>

