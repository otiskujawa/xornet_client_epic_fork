<template>
  <div class="machineSpecsPage">
    <h1>Details</h1>
    <div class="specs block md:grid" v-if="specs">
      <!-- we dont talk about this - cimok -->
      <div :class="outerKey" v-for="(category, outerKey) of specs" :key="outerKey">
        <div class="flex gap-1 items-center">
          <Icon color="#8676ff" class="mt-0.5 w-6 min-w-6" :icon="outerKey" />
          <h2 class="title">{{ outerKey }}</h2>
        </div>
        <div class="ml-2" v-if="isObject(category)">
          <div v-if="isObject(category)">
            <div v-if="Array.isArray(value)">
              <div v-for="(item, key) of category" :key="key">
                <SpecProperty v-for="(value, key) of category" :key="key" :prop="key" :value="value" />
              </div>
            </div>
            <div v-else v-for="(value, key) of category" :key="key">
              <div v-if="isObject(value)">
                <h3>{{ key }}</h3>
                <div class="ml-2" v-for="(item, key) of value" :key="key">
                  <div v-if="isObject(item)">
                    <div class="flex items-start gap-1" v-for="(property, key) of item" :key="key">
                      <SpecProperty :prop="key" :value="property" />
                    </div>
                  </div>
                  <SpecProperty v-else :prop="key" :value="item" />
                </div>
              </div>
              <SpecProperty v-else :prop="key" :value="value" />
            </div>
          </div>
          <p v-else>
            <strong>outerKey{{ outerKey }}:</strong> {{ category }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpecProperty from "@/components/misc/SpecProperty";
import Icon from "@/components/misc/Icon";
export default {
  name: "Specs",
  components: {
    SpecProperty,
    Icon
  },
  async created() {
    this.specs = await this.api.machine.getMachineSpecs(this.$route.params.machine);
  },
  data: () => {
    return {
      specs: null
    };
  },
  methods: {
    isObject(prop) {
      return prop instanceof Object;
    }
  }
};
</script>

<style scope>
.machineSpecsPage {
  height: 100%;
  width: 100%;
  padding: 8px;
  overflow: scroll;
  text-align: left;
}
.machineSpecsPage::-webkit-scrollbar {
  display: initial;
}

.machineSpecsPage::-webkit-scrollbar-thumb {
  background: var(--black);
  -webkit-border-radius: 1ex;
  -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
}

.machineSpecsPage::-webkit-scrollbar-corner {
  background: #000;
}

.machineSpecsPage {
  -ms-overflow-style: initial; /* IE and Edge */
  scrollbar-width: initial; /* Firefox */
}

.specs {
  gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
}

.specs > * {
  border-radius: 4px;
  font-size: 12px;
  padding: 0px 16px;
  text-align: left;
}

h1 {
  font-size: 35px;
}

h2 {
  text-transform: uppercase;
  font-size: 25px;
}

h3 {
  font-size: 16px;
  text-transform: capitalize;
}

strong {
  opacity: 35%;
  font-weight: 500;
  text-transform: capitalize;
}

.specs .title {
  background: linear-gradient(90deg, #8676ff 0%, #516dff 33.33%, #32b5ff 69.27%, #4adeff 100%);
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
