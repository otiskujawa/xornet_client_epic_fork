<template>
  <div class="flex items-start gap-1">
    <Icon class="mt-0.5 w-4 min-w-4" default="filetree" :icon="prop" />
    <p>
      <strong>{{ prop }}:</strong> {{ value }}
    </p>
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";

export default {
  name: "SpecProperty",
  components: {
    Icon
  },
  props: {
    prop: { type: String, required: true },
    value: { type: String, required: true }
  }
};
</script>
