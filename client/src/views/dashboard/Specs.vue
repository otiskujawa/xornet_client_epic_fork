<template>
  <div class="machineSpecsPage">
    <h1>Details</h1>
    <div class="specs" v-if="specs">
      <!-- we dont talk about this - cimok -->
      <div :class="outerKey" v-for="(category, outerKey) of specs" :key="outerKey">
        <h2>{{ outerKey }}</h2>
        <div v-if="isObject(category)">
          <div v-if="isObject(category)">
            <div v-if="Array.isArray(value)">
              <div v-for="(item, key) of category" :key="key">
                <p v-for="(value, key) of category" :key="key">
                  <strong>{{ key }}:</strong> {{ value }}
                </p>
              </div>
            </div>
            <div v-else v-for="(value, key) of category" :key="key">
              <div v-if="isObject(value)">
                <h3>{{key}}</h3>
                <div class="inMost" v-for="(item, key) of value" :key="key">
                  <div v-if="isObject(item)">
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
  name: "Specs",
  async created() {
    this.specs = await this.api.machine.getMachineSpecs(this.$route.params.machine);
  },
  data: () => {
    return {
      specs: null
    };
  },
  methods: {
    isObject(prop){
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
    border: 0.5ex solid var(--white);
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

.machineSpecsPage .specs {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
}

.machineSpecsPage .specs > * {
  border-radius: 4px;
  font-size: 12px;
  background: var(--white);
  padding: 16px;
  text-align: left;
}

.machineSpecsPage .specs > * .inMost{
  margin-left: 16px;
}

.machineSpecsPage h1 {
  font-size: 35px;
}

.machineSpecsPage h2 {
  text-transform: uppercase;
  font-size: 25px;
}

.machineSpecsPage h3 {
  font-size: 16px;
  text-transform: capitalize;
}

.machineSpecsPage strong {
  text-transform: capitalize;
}

</style>
