<template>
  <div id="TopBar" class="w-full">
    <div class="p-2 pr-1 flex gap-4 max-w-64">
      <base-input v-model="filter" placeholder="Filter" class="text-xs" />

      <base-tooltip text="Add machine">
        <base-button transparent class="w-12 flex items-center justify-center" @click="showTokenGenerator = true">
          <i-fluency-plus class="w-4 h-4" />
        </base-button>
      </base-tooltip>

      <base-dialog v-model="showTokenGenerator" unsized>
        <token-generator />
      </base-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "./base/BaseInput.vue";
import BaseTooltip from "./base/BaseTooltip.vue";
import BaseButton from "./base/BaseButton.vue";
import BaseDialog from "./base/BaseDialog.vue";
import TokenGenerator from "./TokenGenerator.vue";
const showTokenGenerator = ref(false);
const filter = ref("");
</script>
<style lang="postcss" scoped>
#TopBar {
  -webkit-app-region: drag;
}
div {
  -webkit-app-region: no-drag;
}
</style>
