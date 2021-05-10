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
  border: 1px solid var(--dark-lighter);
  border-radius: 4px;
  cursor: pointer;
  background-color: var(--dark-light);
}

.machine legend {
  left: 24px;
  color: white;
  text-transform: lowercase;
}

.machine:hover {
  border: 1px solid;
  border-radius: 4px;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #DB00FF 8.32%, #4D9FFF 89.64%);
}

</style>
