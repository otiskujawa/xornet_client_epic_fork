<template>
  <base-dialog v-model="showConfirmDialog" unsized>
    <div class="bg-black flex flex-col gap-4 p-4 w-full text-center">
      <div class="flex items-center justify-center">
        <i-fluency-skull v-if="isSkullHappy==0" class="w-24 h-24" />
        <i-fluency-happy-skull v-else-if="isSkullHappy==1" class="w-24 h-24" />
        <i-fluency-pirate-bay v-else class="w-24 h-24" />
      </div>
      <div class="text-white">
        Are you sure you want to delete this machine?
      </div>
      <div class="flex gap-4">
        <base-button class="w-full" @click="showConfirmDialog = false" @mouseover="isSkullHappy = 1" @mouseleave="isSkullHappy = 0">
          <i-fluency-happy-skull class="w-24px h-24px" />
          No
        </base-button>
        <base-button transparent class="w-full bg-caution" @click="deleteMachine" @mouseover="isSkullHappy = 2" @mouseleave="isSkullHappy = 0">
          <i-fluency-pirate-bay class="w-24px h-24px" />
          Yes
        </base-button>
      </div>
    </div>
  </base-dialog>
  <base-button
    transparent
    draggable="false"
    class="p-4 flex items-center justify-center text-69px opacity-25"
    @click="showConfirmDialog = true"
  >
    <i-fluency-skull class="w-24px h-24px" />
  </base-button>
</template>
<script setup lang="ts">
import { useState } from "/@/services/state";
import { ref } from "vue";
import BaseButton from "/@/components/base/BaseButton.vue";
import BaseDialog from "/@/components/base/BaseDialog.vue";
const showConfirmDialog = ref(false);
const isSkullHappy = ref(0);
const props = defineProps<{
	machineId: string
}>();

const deleteMachine = async() => {
	const { machines } = useState();
	await machines.deleteMachine(props.machineId);
	showConfirmDialog.value = false;
};

</script>
