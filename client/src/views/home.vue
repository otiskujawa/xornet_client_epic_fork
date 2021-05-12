<template>
  <div class="view home">
    <loadingScreen :isLoaded="!isLoading"/>
    <serverList :vms="Array.from(serverList.vms.values())" :pms="Array.from(serverList.pms.values())"/>

    <div class="content">
      <div class="informatics">
        <infoField title="Total RAM" :value="totalRamUsed + 'GB / ' + totalRam + 'GB'"/>
        <infoField title="Total Upload Throughput" :value="totalUploadThroughput + 'mbps'"/>
        <infoField title="Total Download Throughput" :value="totalDownloadThroughput + 'mbps'"/>
      </div>
      <div class="machines">
        <gaugeField v-if="machines[selectedMachine]" :machine="machines[selectedMachine]"/>
      </div>
    </div>

    <!-- <chart :type="" :data="" :options=""/> -->

  </div>
</template>

<script>
import socket from '@/services/socket.js';
import gaugeField from '@/components/gaugeField';
import infoField from '@/components/infoField';
import serverList from '@/components/serverList';
import loadingScreen from '@/components/loadingScreen';
import chart from '@/components/chart';

export default {
  name: 'home',
  components: {
    infoField,
    gaugeField,
    chart,
    loadingScreen,
    serverList,
  },
  computed: {
    selectedMachine: function(){
      return this.$route.params.machine;
    },
    isLoading: function(){
      return Object.values(this.machines).length > 0 ? false : true;
    }
  },
  data: () => {
    return {
      machines: {},
      serverList: {
        vms: new Map(),
        pms: new Map(),
      },
      totalRam: null,
      totalDownloadThroughput: null,
      totalUploadThroughput: null,
      datacollection: {
          labels: [Math.floor(Math.random() * (50 - 5 + 1)) + 5, Math.floor(Math.random() * (50 - 5 + 1)) + 5],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [Math.floor(Math.random() * (50 - 5 + 1)) + 5, Math.floor(Math.random() * (50 - 5 + 1)) + 5]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [Math.floor(Math.random() * (50 - 5 + 1)) + 5, Math.floor(Math.random() * (50 - 5 + 1)) + 5]
            }
          ]
        }
    }
  },
  mounted(){
    socket.on("machines", machines => {
      console.log(machines);
      
      this.addMachinesToServerList(machines);

      this.machines = machines;
      let totalRam = 0; 
      let totalRamUsed = 0; 
      let totalDownloadThroughput = 0;
      let totalUploadThroughput = 0;
      for(let machine of Object.values(machines)){
        totalRam = totalRam + Math.ceil(machine.ram.total);
        totalRamUsed = totalRamUsed + machine.ram.used;
        totalDownloadThroughput = totalDownloadThroughput + machine.network.RxSec;
        totalUploadThroughput = totalUploadThroughput + machine.network.TxSec;
      }
      this.totalRam = totalRam;
      this.totalRamUsed = totalRamUsed.toFixed(2);
      this.totalDownloadThroughput = totalDownloadThroughput.toFixed(2);
      this.totalUploadThroughput = totalUploadThroughput.toFixed(2);
    });
  },
  methods: {
    addMachinesToServerList(machines){
      Object.values(machines).forEach(machine => {
        if (machine.isVirtual){
          // if(!this.serverList.vms.has(machine.static.uuid.os)) this.serverList.vms.set(machine.static.uuid.os, machine);
          this.serverList.vms.set(machine.uuid, machine);
        } else {
          // if(!this.serverList.pms.has(machine.static.uuid.os)) this.serverList.pms.set(machine.static.uuid.os, machine);
          this.serverList.pms.set(machine.uuid, machine);
        }
      });
    }
  },
  watch:{
    $route (to, from){
      this.isSmall = false;
    }
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

.content {
  box-sizing: border-box;
  background-color: var(--white);
  padding: 8px;
  height: 100%;
  width: 100%;
  display: flex;
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

