<template>
  <router-link :to="{ name: 'specs', params: { machine: machine.uuid } }" class="button" :class="{ thin: thin, rogue: machine.rogue, disconnected: Date.now() > machine.timestamp + 15000 }">
    <!-- Icons Column -->
    <Icon :icon="type" v-if="!machine.rogue && Date.now() < machine.timestamp + 15000" class="machineType" />
    <Icon icon="warning" v-if="machine.rogue && Date.now() < machine.timestamp + 15000" class="machineType" />
    <Icon icon="disconnected" v-if="Date.now() > machine.timestamp + 15000" class="machineType" />

    <!-- UUID Column -->
    <div class="info">
      <h1 v-if="!machine.rogue" class="hostname">{{ machine.hostname }}</h1>
      <h1 v-if="machine.rogue" class="hostname">{{ machine.hostname }} <strong>(rogue)</strong></h1>
      <h1 class="status">{{ machine.uuid }}</h1>
    </div>

    <!-- CPU Column -->
    <div class="field cpuUsage" v-if="machine.cpu == null"><strong>Unknown</strong></div>
    <div class="field cpuUsage" v-if="machine.cpu != null">{{ machine.cpu }}<strong>%</strong></div>

    <!-- RAM Column -->
    <div class="field ramUsage" v-if="Object.values(machine.ram).some(field => field != null)">{{ machine.ram.used }}/{{ machine.ram.total > 1 ? Math.ceil(machine.ram.total) : machine.ram.total }}<strong>GB</strong></div>
    <div class="field ramUsage" v-if="Object.values(machine.ram).some(field => field == null)"><strong>Unknown</strong></div>

    <!-- Disks Column -->
    <div class="field diskUsage">
      <h1 v-for="disk of showDetails ? machine.disks : [machine.disks[0]]" :key="disk">
        <strong>
          {{ disk?.fs }}
        </strong>
        {{ disk?.size > 1000 ? `${(disk?.used / 1000).toFixed(2)}/${(disk?.size / 1000).toFixed(2)}` : `${disk?.used}/${disk?.size}` }}
        <strong>
          {{ disk?.size > 1000 ? "TB" : "GB" }}
        </strong>
      </h1>
    </div>

    <!-- Network Column -->
    <div class="field networkUsage">{{ machine.network?.TxSec }}<strong>mbps</strong></div>
    <div class="field networkUsage">{{ machine.network?.RxSec }}<strong>mbps</strong></div>

    <!-- Region Column -->
    <div class="field region"><img :src="machine.geolocation?.countryCode ? require(`@/assets/flags/${machine.geolocation.countryCode}.png`) : require('@/assets/flags/__.png')" alt="Country Flag" /></div>

    <!-- Ping Column -->
    <div class="field ping" v-if="machine.ping != null">{{ machine.ping }}<strong>ms</strong></div>
    <div class="field ping" v-if="machine.ping == null"><strong>Unknown</strong></div>

    <!-- Uptime Column -->
    <div class="field uptime">{{ machine.uptime.formatted.d }}:{{ machine.uptime.formatted.h }}:{{ machine.uptime.formatted.m }}:{{ machine.uptime.formatted.s }}</div>

    <!-- Owner Column -->
    <router-link class="field owner" :to="{ name: 'profile', params: { username: machine?.owner?.username } }"
      ><img :src="machine?.owner?.profileImage ?? 'https://cdn.discordapp.com/attachments/816028632269979668/855437868825444372/unknown.png'" :alt="machine?.owner?.username" />{{ machine.owner.username }}</router-link
    >

    <!-- Datacenter Column -->
    <router-link class="field datacenter" :to="{ name: 'datacenters', params: { name: machine.datacenter?.name } }"
      ><img :src="machine.datacenter?.logo ?? require('@/assets/icons/filled/missing.svg')" :alt="machine.datacenter?.name" />{{ machine.datacenter ? machine.datacenter.name : "Unassigned" }}</router-link
    >

    <!-- Platform Column -->
    <div class="platform">
      <img v-if="machine.platform == 'win32'" :src="require('@/assets/icons/filled/windows.svg')" alt="" />
      <img v-if="machine.platform == 'darwin'" :src="require('@/assets/icons/filled/macos.svg')" alt="" />
      <img v-if="machine.platform == 'linux'" :src="require('@/assets/icons/filled/linux.svg')" alt="" />
      <h1 v-if="machine.reporterVersion">v{{ machine.reporterVersion }}</h1>
    </div>
  </router-link>
</template>

<script>
import Icon from "@/components/misc/Icon";
export default {
  name: "ServerListButton",
  components: {
    Icon
  },
  computed: {
    type: function() {
      return this.machine.isVirtual ? "slave" : "master";
    }
  },
  props: {
    machine: { type: Object, required: true },
    showDetails: { type: Boolean, required: true },
    thin: { type: Boolean, required: false, default: false }
  }
};
</script>

<style scoped>
.button {
  padding: 2px 8px;
  background-color: var(--background-color);
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid transparent;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
}
.button:hover:not(.rogue) {
  border: 1px solid var(--white);
  background-color: var(--white);
}
.button:active {
  transform: translateY(-0px);
}
.button.router-link-active {
  background-color: var(--white);
}
.button.rogue {
  background-color: var(--rogue-red);
}
.button.rogue:hover {
  border: 1px solid var(--rogue-red-border);
}
.button.rogue.router-link-active {
  background-color: var(--rogue-red-active) !important;
}
.button.thin .info {
  display: flex;
  flex-direction: row;
  min-width: 348px;
}
.button.thin .platform {
  flex-direction: row;
  justify-content: flex-end;
  gap: 4px;
}
.button.thin .info .hostname,
.button.thin .info .hostname strong {
  font-weight: 500;
  font-size: 11px;
  min-width: 100px;
}
.button.thin .info .hostname strong {
  color: var(--rogue-red-border);
  margin-left: 4px;
}
.button.thin .info * {
  text-align: center;
  align-items: center;
  display: flex;
  gap: 2px;
}
.button.thin .info .status {
  min-width: fit-content;
  justify-content: flex-end;
}
.button.disconnected {
  filter: grayscale(1);
  background-color: var(--white);
}
.button img.machineType {
  width: 32px;
  height: 32px;
  filter: invert(var(--filter));
}
.button.thin img.machineType {
  width: 16px;
  height: 16px;
}
.button .infofield {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-align: center;
  gap: 2px;
}
.info {
  min-width: 218px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.hostname,
.hostname strong {
  font-family: Work Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 117.9%;
  text-transform: lowercase;
  color: var(--black);
  text-align: left;
}
.info * {
  width: 100%;
  white-space: nowrap;
}
.status,
.button *,
.platform h1 {
  font-weight: 500;
  font-size: 11px;
  font-family: "Work Sans", sans-serif;
  color: var(--slyColor);
  text-align: left;
}
.field {
  text-align: center;
  white-space: nowrap;
  display: flex;
  align-items: center;
  min-width: 72px;
}
.field strong,
.field.invalid {
  opacity: 0.7;
}
.field.cpuUsage {
  margin-left: 32px;
  min-width: 48px;
}
.field.region {
  min-width: 48px;
}
.field.region img {
  width: 22px;
  height: auto;
}
.field.uptime {
  min-width: 100px;
}
.field.uptime strong {
  margin-right: 2px;
}
.field.owner {
  min-width: 124px;
  gap: 8px;
}
.field.owner img {
  width: 18px;
  height: 18px;
  object-fit: cover;
  border-radius: 100%;
}
.field.diskUsage {
  display: flex;
  flex-direction: column;
  min-width: 138px;
  align-items: flex-start;
}
.field.networkUsage {
  min-width: 86px;
}
.field.region {
  min-width: 66px;
}
.field.datacenter {
  display: flex;
  gap: 8px;
}
.field.datacenter img {
  width: 18px;
  height: 18px;
  filter: invert(var(--filter));
}
.status {
  background: linear-gradient(90deg, #8676ff 0%, #516dff 33.33%, #32b5ff 69.27%, #4adeff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}
.platform {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.platform img {
  width: auto;
  height: 13px;
  filter: invert(var(--filter));
}
</style>
