<template>
  <Tooltip :text="name">
    <img
      :src="
        code
          ? require(`@/assets/flags/${code}.png`)
          : require('@/assets/flags/__.png')
      "
      :alt="name"
    />
  </Tooltip>
</template>

<script>
import Tooltip from "@/components/dashboard/Tooltip";
export default {
  name: "Flag",
  props: {
    code: {type: String, required: true},
    name: {type: String, required: true},
  },
  components: {
    Tooltip
  },
}
</script>