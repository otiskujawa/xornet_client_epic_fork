<template>
  <fieldset class="vm">
    <legend>{{ vm.name }}</legend>
    <gauge
      :icon="require('@/assets/icons/cpu.png')"
      suffix="%"
      :value="parseFloat(vm.cpu)"
    />
    <gauge
      :icon="require('@/assets/icons/ram.png')"
      suffix="GB"
      :value="parseFloat(vm.ram.used)"
      :maxValue="parseFloat(vm.ram.total)"
    />
    <gauge
      :icon="require('@/assets/icons/upload.png')"
      suffix="mbps"
      :value="parseFloat(vm.network.TxSec)"
      :maxValue="1000 * vm.network.totalInterfaces"
    />
    <gauge
      :icon="require('@/assets/icons/download.png')"
      suffix="mbps"
      :value="parseFloat(vm.network.RxSec)"
      :maxValue="1000 * vm.network.totalInterfaces"
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
        vm: { type: Object, required: true},
    }
};
</script>

<style scoped>

.vm {
  display: flex;
  flex-direction: row;
  padding: 0px 16px 20px 16px;

  border: 1px solid var(--dark-lighter);
  border-radius: 4px;
  cursor: pointer;
  background-color: var(--dark-light);
}

.vm legend {
  left: 24px;
  color: white;
  text-transform: lowercase;
}

.vm:hover {
  border: 1px solid;
  border-radius: 4px;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #DB00FF 8.32%, #4D9FFF 89.64%);
}

</style>
