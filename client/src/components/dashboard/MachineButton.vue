<template>
  <router-link :to="{ name: 'machine', params: { machine: machine.uuid } }" class="machineButton" :class="{ rogue: machine.rogue, disconnected: Date.now() > machine.timestamp + 15000 }">
    <div class="heading">
      <div class="left">
        <!-- Icons Column -->
        <img v-if="!machine.rogue && Date.now() < machine.timestamp + 15000" class="machineType" :src="require(`@/assets/icons/filled/${type}.svg`)" alt="" />
        <img v-if="machine.rogue && Date.now() < machine.timestamp + 15000" class="machineType" :src="require(`@/assets/icons/filled/warning.svg`)" alt="" />
        <img v-if="Date.now() > machine.timestamp + 15000" class="machineType" :src="require(`@/assets/icons/filled/disconnected.svg`)" alt="" />

        <h1 v-if="!machine.rogue" class="hostname">{{ machine.hostname }}</h1>
      </div>

      <div class="coloredText">
        <h1 id="cpu">{{ machine.cpu }}%</h1>
        -
        <h1 id="ram">{{ machine.ram.used }}/{{ machine.ram.total > 1 ? Math.ceil(machine.ram.total) : machine.ram.total }}GB</h1>
        -
        <h1 id="trx">{{ (machine.network?.TxSec + machine.network?.RxSec).toFixed(2) }}Mbps</h1>
      </div>
    </div>
    <!-- <div class="bars">
      <div id="cpu"><div class="progress" :style="{ width: `${machine.cpu}%` }"></div></div>
      <div id="ram"><div class="progress" :style="{ width: `${100 * (machine.ram.used / machine.ram.total)}%` }"></div></div>
      <div id="trx"><div class="progress" :style="{ width: `${100 * ((machine.network?.TxSec + machine.network?.RxSec).toFixed(2) / 1000)}%` }"></div></div>
    </div> -->
  </router-link>
</template>

<script>
export default {
  name: "MachineButton",
  computed: {
    type: function() {
      return this.machine.isVirtual ? "slave" : "master";
    }
  },
  props: {
    machine: { type: Object, required: true }
  }
};
</script>

<style scoped>
.machineButton {
  padding: 2px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;
}

.machineButton:hover {
  background-color: var(--white);
}

.machineButton:hover .bars * {
  background-color: #14142a;
}

.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  white-space: nowrap;
}

.left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.left img {
  filter: invert(var(--filter));
  height: 24px;
}

.left h1 {
  font-family: Work Sans;
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
}

.coloredText {
  align-items: center;
  display: flex;
  gap: 4px;
}
.coloredText h1 {
  font-size: 12px;
  font-weight: 500;
}
.coloredText {
  color: var(--white);
}
.coloredText #cpu {
  color: #8676ff;
}
.coloredText #ram {
  color: #516dff;
}
.coloredText #trx {
  color: #32b5ff;
}

.bars {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2px;
}

.bars * {
  height: 6px;
  background-color: var(--white);
  overflow: hidden;
  border-radius: 64px;
}

.progress {
  transition: 500ms ease;
  height: 6px;
}

#cpu .progress {
  background-color: #8676ff;
}
#ram .progress {
  background-color: #516dff;
}
#trx .progress {
  background-color: #32b5ff;
}
</style>
