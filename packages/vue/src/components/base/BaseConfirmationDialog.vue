<template>
  <base-dialog v-model="showConfirmDialog" unsized>
    <div class="bg-black flex flex-col gap-4 p-4 w-full text-center">
      <div class="text-white">
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
  <div @click="showConfirmDialog = true">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "/@/components/base/BaseButton.vue";
import BaseDialog from "/@/components/base/BaseDialog.vue";
const showConfirmDialog = ref(false);
defineProps<{confirmationText: string}>();
defineEmits(["confirm", "cancel"]);
</script>
