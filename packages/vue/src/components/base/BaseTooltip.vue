<template>
  <slot />
  <div ref="tooltip" class="p-3 fixed tooltip">
    <div ref="arrowElement" class="arrow"></div>
    {{text}}
  </div>
</template>

<script setup lang="ts">
import { computePosition, offset, arrow, shift } from '@floating-ui/dom';
import { computed, onMounted, Ref, ref } from 'vue';

const props = defineProps<{
  text?: string;
}>()

const tooltip = ref() as Ref<HTMLElement>;
const arrowElement = ref() as Ref<HTMLElement>;
const target = computed(() => tooltip.value.previousElementSibling!);

onMounted(async () => {
  target.value.classList.add('target');
  const {x, y, middlewareData, placement} = await computePosition(target.value, tooltip.value, {
    placement: 'right',
    middleware: [offset(8), arrow({element: arrowElement.value})],
  });

  Object.assign(tooltip.value.style, {
    left: `${x}px`,
    top: `${y}px`,
  });

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]];
  const {x: arrowX, y: arrowY} = middlewareData.arrow!;
  Object.assign(arrowElement.value.style, {
    left: arrowX != null ? `${arrowX}px` : '',
    top: arrowY != null ? `${arrowY}px` : '',
    right: '',
    bottom: '',
    [staticSide!]: '-0.25em',
  });
});

</script>

<style scoped lang="postcss">
.tooltip {
  @apply rounded-4px text-sm capitalize p-2 invisible bg-primary-500;

  .arrow {
    @apply absolute w-2 h-2 rotate-45 transform bg-primary-500;
  }
  
}

.target:hover + .tooltip {
  @apply visible;
}

</style>