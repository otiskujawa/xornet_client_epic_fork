<template>
  <slot />
  <div
    ref="popover"
    class="p-3 fixed popover z-1"
    :class="{ openOnHover, open, [placement || 'bottom']: !open || openOnHover  }"
  >
    <div ref="arrowElement" class="arrow" v-if="props.arrow"></div>
    <slot name="content" />
  </div>
</template>

<script setup lang="ts">
import { computePosition, offset, arrow, shift } from '@floating-ui/dom';
import { BasePlacement } from '@floating-ui/core';
import { computed, onMounted, Ref, ref } from 'vue';
const props = defineProps<{
  open?: boolean,
  openOnHover?: boolean,
  arrow?: boolean,
  placement?: BasePlacement,
}>()

const popover = ref() as Ref<HTMLElement>;
const arrowElement = ref() as Ref<HTMLElement>;
const target = computed(() => popover.value.previousElementSibling!);

const middleware = computed(() => {
  const enabled = [offset(8), shift()]
  if (props.arrow) enabled.push(arrow({ element: arrowElement.value }))
  return enabled
});

async function updatePosition() {
  const { x, y, middlewareData, placement } = await computePosition(target.value, popover.value, {
    placement: props.placement,
    middleware: middleware.value,
  });

  Object.assign(popover.value.style, {
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
    const { x: arrowX, y: arrowY } = middlewareData.arrow!;
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

.popover {
  @apply rounded-4px transform text-sm text-white capitalize p-2 bg-primary-500 transition-all duration-200 ease-in-out;

  &.openOnHover,
  &:not(.open) {
    @apply invisible opacity-0;
    &.bottom {
      @apply translate-y-2;
    }
    &.top {
      @apply -translate-y-2;
    }
    &.left {
      @apply -translate-x-2;
    }
    &.right {
      @apply translate-x-2;
    }
  }

  .arrow {
    @apply absolute w-2 h-2 rotate-45 transform bg-primary-500;
  }
}

.target:hover + .popover.openOnHover {
  @apply visible translate-x-0 translate-y-0 opacity-100;
}
</style>