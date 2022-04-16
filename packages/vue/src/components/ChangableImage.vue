<template>
  <div class="relative edithover">
    <div
      class="w-full h-full bg-cover bg-center bg-norepeat"
      :style="bannerStyle"
    />
    <button v-if="editable" class="select-none w-full h-full absolute hovershow opacity-0 bg-background-200 bg-opacity-50 top-0 left-0 p-2 items-center cursor-pointer flex duration-100 flexcol justify-center" @click="isShowingDialogue = true">
      <p>change<br>{{ name }}</p>
      <base-dialog v-model="isShowingDialogue">
        <div class="popup">
          Image URL: <base-input
            v-model="newImage"
            :placeholder="inputPlaceholder || 'Image URL...'"
            @change="updateFn(newImage)"
          />
        </div>
      </base-dialog>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import BaseDialog from "./base/BaseDialog.vue";
import BaseInput from "./base/BaseInput.vue";
const props = defineProps<{updateFn: Function; inputPlaceholder?: string; name: string; vignette?: boolean; imageUrl: string | undefined; editable?: boolean}>();
const newImage = ref("");
const isShowingDialogue = ref(false);

const bannerStyle = computed(() => props.vignette
	? `
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.25) 100%),
  url(${newImage.value || props.imageUrl || ""});
`
	: `
  background-image: url(${newImage.value || props.imageUrl || ""});
`);

</script>

<style lang="postcss">
.edithover {
  &:hover .hovershow {
    @apply opacity-100;
  }
}
.hovershow:active {
  @apply bg-primary-400 bg-opacity-25;
}
.popup {
  @apply bg-background-300 p-8 gap-2;
}
</style>
