<template>
  <base-dialog v-model="showConfirmDialog" unsized>
    <div class="bg-black flexcol gap-4 p-4 w-full text-left">
      <div class="text-white max-w-64">
        {{ confirmationText }}
      </div>
      <div class="flex gap-4">
        <base-button class="w-full" @click="$emit('cancel'); showConfirmDialog = false">
          No
        </base-button>
        <base-button transparent class="w-full bg-caution" @click="$emit('confirm'); showConfirmDialog = false">
          Yes
        </base-button>
      </div>
    </div>
  </base-dialog>
  <div v-if="visible" @click="shift ? $emit('confirm') : showConfirmDialog = true">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { useKeyModifier } from "@vueuse/core";
import { ref } from "vue";
import BaseButton from "/@/components/base/BaseButton.vue";
import BaseDialog from "/@/components/base/BaseDialog.vue";
const shift = useKeyModifier("Shift");
const showConfirmDialog = ref(false);
defineProps<{confirmationText: string; visible?: boolean}>();
defineEmits(["confirm", "cancel"]);
</script>
