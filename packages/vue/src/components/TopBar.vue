<template>
  <div id="TopBar" class="w-full">
    <div class="p-2 pr-1 flex max-w-96">
      <base-input v-model="filter" placeholder="Filter" class="text-xs" />

      <base-tooltip text="Add machine">
        <base-button transparent @click="showTokenGenerator = true">
          <i-fluency-plus />
        </base-button>
      </base-tooltip>

      <base-tooltip text="Customize Columns">
        <base-dropdown text="Columns" transparent stay-open>
          <template #icon>
            <i-fluency-select-column />
          </template>
          <template #options>
            <base-dropdown-checkbox v-model="columns.hostname" text="Hostname">
              <i-fluency-at-sign />
            </base-dropdown-checkbox>
            <base-dropdown-checkbox v-model="columns.cpu_usage" text="CPU Usage">
              <i-fluency-processor />
            </base-dropdown-checkbox>
            <base-dropdown-checkbox v-model="columns.ram_usage" text="RAM Usage">
              <i-fluency-memory />
            </base-dropdown-checkbox>
            <base-dropdown-checkbox v-model="columns.gpu_usage" text="GPU Usage">
              <i-fluency-video-card />
            </base-dropdown-checkbox>
            <base-dropdown-checkbox v-model="columns.gpu_power_usage" text="GPU Power Usage">
              <i-fluency-lightning-bolt />
            </base-dropdown-checkbox>
            <base-dropdown-checkbox v-model="columns.network_switch" text="Network Switch">
              <i-fluency-switch />
            </base-dropdown-checkbox>
            <base-dropdown-checkbox v-model="columns.download" text="Download">
              <i-fluency-down />
            </base-dropdown-checkbox>
            <base-dropdown-checkbox v-model="columns.upload" text="Upload">
              <i-fluency-up />
            </base-dropdown-checkbox>
            <base-dropdown-checkbox v-model="columns.temperature" text="Temperature">
              <i-fluency-temperature />
            </base-dropdown-checkbox>
            <base-dropdown-checkbox v-model="columns.owner" text="Owner">
              <i-fluency-user />
            </base-dropdown-checkbox>
            <base-dropdown-checkbox v-model="columns.status" text="Status">
              <i-fluency-active-state />
            </base-dropdown-checkbox>
            <base-dropdown-checkbox v-model="columns.action" text="Action">
              <i-fluency-thor-hammer />
            </base-dropdown-checkbox>
          </template>
        </base-dropdown>
      </base-tooltip>

      <base-dialog v-model="showTokenGenerator" unsized>
        <token-generator />
      </base-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useState } from "../services/state";
import BaseInput from "./base/BaseInput.vue";
import BaseTooltip from "./base/BaseTooltip.vue";
import BaseButton from "./base/BaseButton.vue";
import BaseDialog from "./base/BaseDialog.vue";
import TokenGenerator from "./TokenGenerator.vue";
import BaseDropdown from "./base/BaseDropdown.vue";
import BaseDropdownCheckbox from "./base/BaseDropdownCheckbox.vue";
const showTokenGenerator = ref(false);
const filter = ref("");
const state = useState();
const columns = computed(() => state.settings.columns);
</script>
<style lang="postcss" scoped>
#TopBar {
  -webkit-app-region: drag;
}
div {
  -webkit-app-region: no-drag;
}
</style>
