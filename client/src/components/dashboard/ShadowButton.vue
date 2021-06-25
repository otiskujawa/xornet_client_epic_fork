<template>
  <div
    class="shadowButton py-2 px-3 flex items-center h-min border border-bg-alpha-0 select-none cursor-pointer justify-between gap-2 flex-row rounded-full duration-100 bg-gray-400"
    :id="allowCopy ? 'shadowButton' : null"
    :class="{ colored, didCopy, iconOnly: !title, tiny }"
    @click="allowCopy ? copyText() : null"
  >
    <h1 v-if="title">{{ copyMessage || title }}</h1>
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
    colored: { type: Boolean },
    allowCopy: { type: Boolean },
    tiny: { type: Boolean }
  },
  components: {
    Icon
  },
  data() {
    return {
      didCopy: false,
      copyMessage: null
    };
  },
  methods: {
    copyText() {
      let toCopy = document.querySelector("#shadowButton");
      var temp = document.createElement("textarea");
      document.body.appendChild(temp);
      temp.value = toCopy.innerText.toLowerCase();
      temp.select();
      try {
        var successful = document.execCommand("copy");
        document.body.removeChild(temp);
        var msg = successful ? "successful" : "unsuccessful";
        this.didCopy = true;
        this.copyMessage = "UUID Copied!";
        setTimeout(() => {
          this.didCopy = false;
          this.copyMessage = null;
        }, 3000);
      } catch {
        console.log("Oops, unable to copy");
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.shadowButton:not(.tiny) {
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
}

.shadowButton:not(.colored):not(.didCopy):not(.primary):not(.delete):hover {
  filter: invert(1);
}

.shadowButton:active {
  transform: translateY(2px);
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
  font-family: Roboto Mono, monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  color: var(--black);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
}

.shadowButton img {
  width: 20px;
  filter: invert(var(--filter));
}

.shadowButton.iconOnly {
  padding: 8px;
}

.shadowButton.tiny {
  padding: 2px;
}

.shadowButton.tiny img {
  width: 16px;
}

.shadowButton.primary {
  color: var(--blue);
  border: 1px solid var(--blue);
  background-color: var(--blue-transparent);
  cursor: not-allowed;
}

.shadowButton.delete {
  color: #d00000;
  border: 1px solid #d00000;
  background-color: #d0000044;
}

</style>
