<template>
  <div class="view home">
    <serverList :vms="vms"/>

    <div class="informatics">
      <infoField title="Total RAM" :value="totalRamUsed + 'GB / ' + totalRam + 'GB'"/>
      <infoField title="Total Upload Throughput" :value="totalUploadThroughput + 'mbps'"/>
      <infoField title="Total Download Throughput" :value="totalDownloadThroughput + 'mbps'"/>
    </div>
    <div class="vms">
      <gaugeField :vm="vm" v-for="vm of vms" :key="vm"/>
    </div>
  </div>
</template>

<script>
import socket from '@/services/socket.js';
import gaugeField from '@/components/gaugeField';
import infoField from '@/components/infoField';
import serverList from '@/components/serverList';

export default {
  name: 'home',
  components: {
    infoField,
    gaugeField,
    serverList,

  },
  data: () => {
    return {
      vms: {},
      totalRam: null,
      totalDownloadThroughput: null,
      totalUploadThroughput: null,
    }
  },
  mounted(){
    socket.on("vms", vms => {
      console.log(vms);
      this.vms = vms;
 
      let totalRam = 0; 
      let totalRamUsed = 0; 
      let totalDownloadThroughput = 0;
      let totalUploadThroughput = 0;
      for(let vm of vms){
        totalRam = totalRam + Math.ceil(vm.ram.total);
        totalRamUsed = totalRamUsed + vm.ram.used;
        totalDownloadThroughput = totalDownloadThroughput + vm.network.RxSec;
        totalUploadThroughput = totalUploadThroughput + vm.network.TxSec;
      }
      this.totalRam = totalRam;
      this.totalRamUsed = totalRamUsed.toFixed(2);
      this.totalDownloadThroughput = totalDownloadThroughput.toFixed(2);
      this.totalUploadThroughput = totalUploadThroughput.toFixed(2);
    });
  },
}
</script>

<style scoped>

.home {
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  height: 100%;
}

.vms, .informatics {
  display: flex;
  flex-direction: column;
}

.informatics {
  margin-top: 8px;
  gap: 8px;
}

</style>

