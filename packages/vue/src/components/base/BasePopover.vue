<template>
  <slot />
  <div ref="tooltip" class="p-3 fixed tooltip" :class="{openOnHover, open}">
    <div ref="arrowElement" class="arrow" v-if="props.arrow"></div>
    <slot name="content" />
  </div>
</template>

<script setup lang="ts">
import { computePosition, offset, arrow, shift } from '@floating-ui/dom';
import { computed, onMounted, Ref, ref } from 'vue';

const props = defineProps<{
  open?: boolean,
  openOnHover?: boolean,
  arrow?: boolean
}>()

const tooltip = ref() as Ref<HTMLElement>;
const arrowElement = ref() as Ref<HTMLElement>;
const target = computed(() => tooltip.value.previousElementSibling!);

const middleware = computed(() => {
 const enabled = [offset(8)]
 if (props.arrow) enabled.push(arrow({element: arrowElement.value}))
 return enabled
});

async function updatePosition() {
  const {x, y, middlewareData, placement} = await computePosition(target.value, tooltip.value, {
    placement: 'right',
    middleware: middleware.value,
  });

  Object.assign(tooltip.value.style, {
    left: `${x}px`,
    top: `${y}px`,
  });

  if (props.arrow) {
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
  }
}

onMounted(async () => {
  target.value.classList.add('target');
  updatePosition();
});

</script>

<style scoped lang="postcss">

.tooltip {
  @apply rounded-4px text-sm capitalize p-2 bg-primary-500;

  &.openOnHover, &:not(.open) {
    @apply invisible;
  }

  .arrow {
    @apply absolute w-2 h-2 rotate-45 transform bg-primary-500;
  }
}

.target:hover + .tooltip.openOnHover {
  @apply visible;
}
</style>