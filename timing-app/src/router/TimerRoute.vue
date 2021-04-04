<template>
  <transition @enter="enter" appear>
    <item-header-line route="timer-route"></item-header-line>
  </transition>
  <base-spinner v-if="isLoading"></base-spinner>
  <div class="items-section" v-if="!isLoading">
    <p v-if="!hasTimers">No timers found. Start adding some now!</p>
    <timer-item
      v-for="item in timers"
      :key="item.id"
      :title="item.title"
      :id="item.id"
      :time="item.time"
    ></timer-item>
  </div>
</template>

<script>
import BaseSpinner from "../components/ui/BaseSpinner.vue";
import gsap from "gsap";
import TimerItem from "../components/items/TimerItem.vue";
import ItemHeaderLine from "../components/layout/ItemHeaderLine";

export default {
  components: {
    TimerItem,
    ItemHeaderLine,
    BaseSpinner,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    timers() {
      return this.$store.getters["timers/timers"];
    },
    hasTimers() {
      return this.$store.getters["timers/hasTimers"];
    },
  },
  created() {
    this.loadTimers();
  },
  methods: {
    enter(el, done) {
      gsap.from(el, {
        x: 100,
        // opacity: 0,
        duration: 1,
        ease: "elastic.out( 0.7, 0.5)",
      });
      done();
    },
    async loadTimers() {
      this.isLoading = true;
      console.log(this.isLoading);
      try {
        await this.$store.dispatch("timers/loadTimers");
      } catch (error) {
        this.err = error.message || "something went wrong!";
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.items-section {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 60px;
}
</style>
