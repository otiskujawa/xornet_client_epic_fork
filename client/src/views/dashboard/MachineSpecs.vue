<template>
  <div class="machineSpecsPage">
    <h1>Details</h1>
    <div class="specs" v-if="specs">
      <div :class="outerKey" v-for="(category, outerKey) of specs" :key="outerKey">
        <h2>{{ outerKey }}</h2>
        <div v-if="category instanceof Object">
          <div v-if="category instanceof Object">
            <div v-if="Array.isArray(value)">
              <div v-for="(item, key) of category" :key="key">
                <p v-for="(value, key) of category" :key="key">
                  <strong>{{ key }}:</strong> {{ value }}
                </p>
              </div>
            </div>
            <div v-else v-for="(value, key) of category" :key="key">
              <div v-if="value instanceof Object">
                <div v-for="(item, key) of value" :key="key">
                  <div v-if="item instanceof Object">
                    <p v-for="(property, key) of item" :key="key">
                      <strong>{{ key }}:</strong> {{ property }}
                    </p>
                  </div>
                  <p v-else>
                    <strong>{{ key }}:</strong> {{ item }}
                  </p>
                </div>
              </div>
              <p v-else>
                <strong>{{ key }}:</strong> {{ value }}
              </p>
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
export default {
  name: "MachineSpecs",
  async created() {
    this.specs = await this.api.machine.getMachineSpecs(this.$route.params.machine);
  },
  data: () => {
    return {
      specs: null
    };
  },
};
</script>

<style scope>
.machineSpecsPage {
  height: 100%;
  overflow: scroll;
}

.machineSpecsPage h1 {
  font-size: 35px;
}

.machineSpecsPage .specs strong {
  text-transform: capitalize;
}

.machineSpecsPage .specs h2 {
  text-transform: capitalize;
  font-size: 25px;
}
</style>
