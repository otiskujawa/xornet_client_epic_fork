<template>
  <div class="search" :class="{ focused: searchString.length != 0 && !searchPaused }">
    <div class="bar">
      <input
        v-model="searchString"
        class="inputField"
        :class="{ active: searchString.length != 0 }"
        type="text"
        placeholder="Search "
        @keyup="typingTimer()"
        @keydown="clearTimer()"
        @click="onClickSearchBar()"
        @blur="onBlurSearchBar()"
      />
      <img
        :src="searchString.length != 0 ? require('@/assets/icons/filled/x.svg') : require('@/assets/icons/filled/search.svg')"
        :class="{ activeImg: searchString.length != 0 }"
        @click="clearSearchDrop()"
      />
    </div>
    <div v-if="searchRes !== null">
      <SearchResult v-for="user of searchRes" :key="user" :user="user" @click="clearSearchClicked()" />
      <h1 v-if="searchRes.length == 0 && searchString.length != 0" class="noResult">
        There were no users that match that query
      </h1>
    </div>
  </div>
</template>
<!-- onClickSearchBar() onBlurSearchBar() -->
<script>
import SearchResult from "@/components/dashboard/SearchResult";

export default {
  name: "SearchBar",
  components: {
    SearchResult
  },
  props: {},
  computed: {},
  watch: {
    searchString(to, from) {
      if (to == "") {
        this.clearSearchDrop();
        this.searchRes = null;
      }
    }
  },
  data() {
    return {
      searchRes: null,
      timer: null,
      searchString: "",
      searchPaused: true
    };
  },
  mounted() {},
  methods: {
    async doneTyping() {
      if (this.searchString == "") return;
      this.searchRes = await this.api.user.search(this.searchString.trim());
      console.log(this.searchRes);
    },
    typingTimer() {
      if (this.timer != null) clearTimeout(this.timer);
      return (this.timer = setTimeout(this.doneTyping, 500));
    },
    clearTimer() {
      this.searchPaused = false;
      clearTimeout(this.timer);
    },
    clearSearchDrop() {
      this.searchRes = null;
      this.searchPaused = true;
      this.searchString = "";
    },
    clearSearchClicked() {
      this.searchRes = null;
      this.searchPaused = true;
    },

    onClickSearchBar(event) {
      this.$emit("clicked", "someValue");
    },
    onBlurSearchBar(event) {
      if (this.searchString.length == 0) this.$emit("unClicked", "someValue");
    }
  }
};
</script>

<style lang="postcss" scoped>
.search::-webkit-scrollbar {
  display: none;
}
.search {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

@media only screen and (max-width: 360px) {
  .search {
    width: 84vw;
    margin-right: 8px;
    max-width: 80%;
  }
}

.search {
  @apply z-10 self-start flex w-72 flex-col bg-gray-300 gap-2 overflow-scroll max-h-600px p-2 transition-width duration-200 ease;
}

.search:focus-within,
.search.focused {
  @apply w-400px;
}

.inputField.active {
  width: 500px !important;
}

h1.noResult {
  font-family: Work Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  display: flex;
  align-items: center;
  color: var(--black);
}

.bar {
  @apply flex w-full h-full items-center justify-center gap-2 relative bg-gray-200 rounded-4px;
}

.inputField {
  @apply bg-gray-100 outline-none w-full h-full box-content transition transition-width duration-100 ease rounded-4px font-medium text-12px text-white border-none px-6px py-2;
  font-family: "Work Sans", sans-serif;
}

img {
  @apply w-4 h-4 absolute right-4px top-1/2 filter invert opacity-30 transform -translate-y-1/2;
}

img.activeImg {
  cursor: pointer;
}

.inputField::placeholder {
  @apply text-alpha-60;
}
</style>
