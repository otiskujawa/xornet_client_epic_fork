<template>
  <div class="shadowButton" :class="{ colored }">
    <h1>{{ title }}</h1>
    <Icon v-if="!textonly" :icon="icon" />
  </div>
</template>

<script>
import Icon from "@/components/misc/Icon";
export default {
  name: "ShadowButton",
  props: {
    title: { type: String },
    icon: { type: String },
    textonly: { type: Boolean },
    colored: { type: Boolean }
  },
  components: {
    Icon
  }
};
</script>

<style>
.shadowButton {
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  height: fit-content;
  user-select: none;
  cursor: pointer;
  justify-content: space-between;

  gap: 8px;
  flex-direction: row;
  border-radius: 200px;
  transition: all 100ms;
  background-color: var(--shadowButton-color);
}

.shadowButton:not(.colored):not(.didCopy):hover {
  filter: invert(1);
}

.shadowButton:active {
  transform: translateY(1px);
}

.shadowButton.colored:hover {
  background-color: var(--theme-color);
}

.shadowButton.colored:hover h1 {
  color: white;
}

.shadowButton.colored:hover img {
  filter: invert(1);
}

.shadowButton.didCopy {
  background-color: rgb(51, 255, 0) !important;
}

.shadowButton h1 {
  font-family: Work Sans;
  font-weight: 600;
  font-size: 14px;
  text-transform: capitalize;
  color: var(--black);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-align: center;
}

.shadowButton img {
  width: 20px;
  filter: invert(var(--filter));
}
</style>
