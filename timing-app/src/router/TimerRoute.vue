<template>
  <transition @enter="enter" appear>
    <item-header-line route="timer-route"></item-header-line>
  </transition>
  <timer-item
    v-for="item in items.timers"
    :key="item.id"
    :title="item.title"
    :id="item.id"
    :time="item.time"
  ></timer-item>
</template>

<script>
import gsap from "gsap";
import TimerItem from "../components/items/TimerItem.vue";
import ItemHeaderLine from "../components/layout/ItemHeaderLine";
export default {
  components: {
    TimerItem,
    ItemHeaderLine,
  },
  computed: {
    items() {
      return this.$store.getters["items/items"][0];
    },
  },
   methods: {
      enter(el, done) {
        gsap.from(el, {
          x:100,
          // opacity: 0,
          duration: 1,
          ease:"elastic.out( 0.7, 0.5)"
        });
        done();
      },
    },
};
</script>
