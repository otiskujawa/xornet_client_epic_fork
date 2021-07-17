<template>
  <div class="button">
    <!-- Icons Column -->
    <Icon :icon="machine.type" class="w-4" />

    <!-- UUID Column -->
    <div class="info">
      <h1 v-if="!machine.rogue" class="hostname">{{ machine.hostname }}</h1>
      <h1 v-else class="hostname">{{ machine.hostname }} <strong>(rogue)</strong></h1>
      <h1 class="status">{{ machine.uuid }}</h1>
    </div>

    <!-- RAM Column -->
    <div class="field" v-if="machine.ram.free">{{ (machine.ram.total - machine.ram.free).toFixed(2) }}/{{ machine.ram.total.toFixed(2) }}<strong>MB</strong></div>
    <div class="field" v-else><strong>Unknown</strong></div>

    <!-- Uptime Column -->
    <div class="field">{{ machine.uptime.formatted.d }}:{{ machine.uptime.formatted.h }}:{{ machine.uptime.formatted.m }}:{{machine.uptime.formatted.s}}</div>

    <div class="field" v-if="machine.temperature">{{ machine.temperature }} <strong>°c</strong></div>
    <div class="field" v-else><strong>Unknown</strong></div>

    <div class="field" v-if="machine.fans !== undefined">{{ machine.fans }}</div>
    <div class="field" v-else><strong>Unknown</strong></div>

    <div class="field">
      <Flag class="w-20px" :code="machine.location.countryCode" :name="machine.location.location" />
    </div>

  </div>
</template>

<script lang="ts" setup>
import Icon from "@/components/misc/Icon.vue";
import { defineProps } from "@vue/runtime-core";
import type { MachineObject } from "@/states/types";
import Flag from "@/components/dashboard/Flag.vue";

const props = defineProps<{
  machine: MachineObject;
}>();

</script>

<style lang="postcss" scoped>
.button {
  padding: 2px 8px;
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
  @apply bg-gray-300 border border-gray-500;
}
.button:active {
  transform: translateY(-0px);
}
.button.div-active {
  @apply bg-gray-300;
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
.button .info {
  display: flex;
  flex-direction: row;
  min-width: 348px;
}
.button .platform {
  flex-direction: row;
  justify-content: flex-end;
  gap: 4px;
}
.button .info .hostname,
.button .info .hostname strong {
  font-weight: 500;
  font-size: 11px;
  min-width: 100px;
}
.button .info .hostname strong {
  color: var(--rogue-red-border);
  margin-left: 4px;
}
.button .info * {
  text-align: center;
  align-items: center;
  display: flex;
  gap: 2px;
}
.button .info .status {
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
  min-width: 96px;
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
  background: linear-gradient(90deg, #8676ff 0%, #4221ee 34.9%, #6142ff 100%);
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
