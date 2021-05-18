<template>
  <div class="view home">
    <loadingScreen :isLoaded="!isLoading"/>

    <!-- <harmonyNavigation/> -->

    <serverList :machines="Array.from(machines.values())"/>

    <div class="content">
      <div class="informatics">
        <infoField title="Total RAM" :value="totalRamUsed + 'GB / ' + totalRam + 'GB'"/>
        <infoField title="Total Upload Throughput" :value="totalUploadThroughput + 'mbps'"/>
        <infoField title="Total Download Throughput" :value="totalDownloadThroughput + 'mbps'"/>
      </div>
      <div class="machines">
        <gaugeField v-if="machines.get(selectedMachine)" :machine="machines.get(selectedMachine)"/>
      </div>
      <!-- Disabled temp due to it causing lag when developing --> 
      <!-- <chart :key="totalUpload[totalUpload.length - 2] + 'upload'" :identity="totalUpload[totalUpload.length - 2] + 'upload'" :type="'line'" :data="{
        labels: labels,
        datasets: [
          {
            label: 'Upload',
            data: totalUpload,
            borderColor: '#ff0062',
            backgroundColor: '#ff458caa'
          },
        ]}"//>
      <chart :key="totalDownload[totalDownload.length - 1] + 'download'" :identity="totalDownload[totalDownload.length - 1] + 'download'" :type="'line'" :data="{
        labels: labels,
        datasets: [
          {
            label: 'Download',
            data: totalDownload,
            borderColor: '#00c8ff',
            backgroundColor: '#52daffaa'
          },
        ]}"/> -->
    </div>
  </div>
</template>

<script>
import socket from '@/services/socket.js';
import gaugeField from '@/components/gaugeField';
import infoField from '@/components/infoField';
import serverList from '@/components/serverList';
import loadingScreen from '@/components/loadingScreen';
import harmonyNavigation from '@/components/harmonyNavigation';
import chart from '@/components/chart';

export default {
  name: 'dashboard',
  components: {
    infoField,
    gaugeField,
    chart,
    harmonyNavigation,
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
      machines: new Map(),
      totalRam: null,
      totalDownloadThroughput: null,
      totalUploadThroughput: null,
      totalDownload: [],
      totalUpload: [],
      labels: [],
    }
  },
  mounted(){
    socket.on("machines", machines => {
      // console.log(machines);

      Object.values(machines).forEach(machine => this.machines.set(machine.uuid, machine));
      
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

      this.totalDownload.push(parseFloat(totalDownloadThroughput.toFixed(2)));
      this.totalUpload.push(parseFloat(totalUploadThroughput.toFixed(2)));
      this.labels.push(`${new Date().getHours()}:${new Date().getMinutes()}`);

      if (this.totalDownload.length > 50) {
        this.totalDownload.shift();
        this.totalUpload.shift();
        this.labels.shift();
      }
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

