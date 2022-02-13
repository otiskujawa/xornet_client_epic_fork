<template>
  <div class="w-full drag">
    <div class="p-2 pr-1 flex items-center gap-2 sm:pr-56 ">
      <base-input v-model="state.machines.filterText.value" placeholder="Filter" class="min-w-24 w-full max-w-full sm:max-w-48 text-xs" />

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
            <base-input v-model="columnFilter" placeholder="Find..." />
            <div class="max-h-96 flexcol overflow-hidden overflow-y-scroll">
              <base-dropdown-checkbox
                v-for="key of Object.keys(columns).filter(item => item.includes(columnFilter.toLowerCase()))"
                :key="key" v-model="(columns as any)[key]"
                :text="key
                  .replaceAll('_', ' ')
                  .replaceAll('ip', 'IP')
                  .replaceAll('cpu', 'CPU')
                  .replaceAll('gpu', 'GPU')
                  .replaceAll('ram', 'RAM')
                "
              >
                <icon :name="key" />
              </base-dropdown-checkbox>
            </div>
          </template>
        </base-dropdown>
      </base-tooltip>

      <div class="hidden whitespace-nowrap gap-2 sm:flex">
        <option-field label="Show Offline">
          <base-switch v-model="state.settings.general.show_offline_machines" />
        </option-field>
        <option-field label="Owned Only">
          <base-switch v-model="state.settings.general.show_owned_machines_only" />
        </option-field>
        <option-field label="Show Totals">
          <base-switch v-model="state.settings.general.enable_totals" />
        </option-field>
      </div>

      <base-dialog v-model="showTokenGenerator" unsized>
        <token-generator />
      </base-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useState } from "/@/app";

import BaseInput from "/@/components/base/BaseInput.vue";
import BaseTooltip from "/@/components/base/BaseTooltip.vue";
import BaseButton from "/@/components/base/BaseButton.vue";
import BaseDialog from "/@/components/base/BaseDialog.vue";
import TokenGenerator from "/@/components/TokenGenerator.vue";
import BaseDropdown from "/@/components/base/BaseDropdown.vue";
import BaseDropdownCheckbox from "/@/components/base/BaseDropdownCheckbox.vue";
import Icon from "/@/components/shared/Icon.vue";
import BaseSwitch from "/@/components/base/BaseSwitch.vue";
import OptionField from "./OptionField.vue";
const showTokenGenerator = ref(false);
const columnFilter = ref("");
const state = useState();
const columns = computed(() => state.settings.columns);
</script>
