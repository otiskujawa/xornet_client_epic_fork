<template>
  <tag v-if="label" :text="label.name" :color="label.color" class="whitespace-nowrap" :description="noDescription ? undefined : label.description " @mouseenter="isShowingDelete = true" @mouseleave="isShowingDelete = false">
    <base-confirmation-dialog :visible="isShowingDelete && !isDeleting" confirmation-text="Are you sure you want to delete this label?" @confirm="isDeleting = true; state.labels.delete(label).then(() => isDeleting = false)">
      <div
        class="flex items-center justify-center"
        :class="[
          state.settings.general.label_scale == 0 && 'w-3 h-3',
          state.settings.general.label_scale == 1 && 'w-4 h-4',
          state.settings.general.label_scale == 2 && 'w-5 h-4',
        ]"
      >
        <i-fluency-trash
          class="cursor-pointer"
        />
      </div>
    </base-confirmation-dialog>
    <label-icon
      v-if="!isDeleting && !isShowingDelete"
      :icon="label.icon"

      :class="[
        state.settings.general.label_scale == 0 && 'w-3 h-3',
        state.settings.general.label_scale == 1 && 'w-4 h-4',
        state.settings.general.label_scale == 2 && 'w-5 h-4',
      ]"
    />
    <base-loading-spinner
      v-if="isDeleting" :class="[
        state.settings.general.label_scale == 0 && 'w-3 h-3',
        state.settings.general.label_scale == 1 && 'w-4 h-4',
        state.settings.general.label_scale == 2 && 'w-5 h-4',
      ]"
    />
  </tag>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Tag from "../Tag.vue";
import { useState } from "/@/app";
import type { Label } from "/@/types/api/label";
import BaseLoadingSpinner from "../base/BaseLoadingSpinner.vue";
import LabelIcon from "../shared/LabelIcon.vue";
import BaseConfirmationDialog from "../base/BaseConfirmationDialog.vue";
defineProps<{label: Label; noDescription?: boolean}>();
const isShowingDelete = ref(false);
const isDeleting = ref(false);
const state = useState();
</script>
