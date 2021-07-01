<template>
  <div class="machineDetailsPage">
    <div class="details block md:grid" v-if="details">
      <!-- we dont talk about this - cimok -->
      <div :class="outerKey" v-for="(category, outerKey) of details" :key="outerKey">
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
  name: "Details",
  props: {
    machine: { type: String, required: true},
  },
  components: {
    SpecProperty,
    Icon
  },
  async created() {
    this.details = await this.api.machine.getMachineSpecs(this.machine);
  },
  data: () => {
    return {
      details: null
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
.machineDetailsPage {
  height: 100%;
  width: 100%;
  overflow: scroll;
  text-align: left;
}
.machineDetailsPage::-webkit-scrollbar {
  display: initial;
}

.machineDetailsPage::-webkit-scrollbar-thumb {
  background: var(--black);
  -webkit-border-radius: 1ex;
  -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
}

.machineDetailsPage::-webkit-scrollbar-corner {
  background: #000;
}

.machineDetailsPage {
  -ms-overflow-style: initial; /* IE and Edge */
  scrollbar-width: initial; /* Firefox */
}

.details {
  gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
}

.details > * {
  border-radius: 4px;
  font-size: 12px;
  text-align: left;
}

.details h1 {
  font-size: 35px;
}

.details h2 {
  text-transform: uppercase;
  font-size: 25px;
}

.details h3 {
  font-size: 16px;
  text-transform: capitalize;
}

.details strong {
  opacity: 35%;
  font-weight: 500;
  text-transform: capitalize;
}

.details .title {
  background: linear-gradient(90deg, #8676ff 0%, #4221ee 34.9%, #6142ff 100%);
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
