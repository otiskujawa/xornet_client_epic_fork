<template>
  <div class="view home">
    <logo/>
    <gaugeField :vm="vm" v-for="vm of vms" :key="vm"/>
  </div>
</template>

<script>
import socket from '@/services/socket.js';
import logo from '@/components/logo';
import gaugeField from '@/components/gaugeField';

export default {
  name: 'home',
  components: {
    gaugeField,
    logo
  },
  data: () => {
    return {
      vms: {},
    }
  },
  mounted(){
    socket.on("vms", vms => {
      console.log(vms);
      this.vms = vms;
    });
  },
}
</script>

<style scoped>


</style>

