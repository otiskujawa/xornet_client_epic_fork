<template>
  <fieldset class="machine">
    <legend>{{ machine.name }}</legend>
    <gauge
      :icon="require('@/assets/icons/cpu.png')"
      suffix="%"
      :value="parseFloat(machine.cpu)"
    />
    <gauge v-if="machine.gpu"
      :icon="require('@/assets/icons/gpu.png')"
      suffix="%"
      :value="parseFloat(machine.gpu.utilizationGpu)"
    />
    <gauge
      :icon="require('@/assets/icons/ram.png')"
      suffix="GB"
      :value="parseFloat(machine.ram.used)"
      :maxValue="parseFloat(machine.ram.total)"
    />
    <gauge
      :icon="require('@/assets/icons/upload.png')"
      suffix="mbps"
      :value="parseFloat(machine.network.TxSec)"
      :maxValue="1000 * machine.network.totalInterfaces"
    />
    <gauge
      :icon="require('@/assets/icons/download.png')"
      suffix="mbps"
      :value="parseFloat(machine.network.RxSec)"
      :maxValue="1000 * machine.network.totalInterfaces"
    />
    <gauge
      :icon="require('@/assets/icons/hdd.png')"
      suffix="GB"
      :value="parseFloat(machine.disks.total)"
      :maxValue="10000"
    />
  </fieldset>
</template>

<script>
import gauge from '@/components/gauge';


export default {
    name: 'gaugeField',
    components: {
        gauge,
    },
    props: {
        machine: { type: Object, required: true},
    }
};
</script>

<style scoped>

.machine {
  display: flex;
  flex-direction: row;
  padding: 0px 16px 20px 16px;
  width: fit-content;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  transition: 100ms ease;
}

.machine legend {
  left: 24px;
  color: black;
  text-transform: lowercase;
}

.machine:hover {
  transform: translateY(-1px);
  box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;
}

</style>
