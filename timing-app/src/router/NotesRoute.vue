<template>
  <transition @enter="enter" appear>
    <item-header-line route="note-route"></item-header-line>
  </transition>
  <note-item
    v-for="item in items.notes"
    :key="item.id"
    :id="item.id"
    :title="item.title"
    :content="item.content"
  ></note-item>
</template>

<script>
import gsap from "gsap";
import NoteItem from "../components/items/NoteItem.vue";
import ItemHeaderLine from "../components/layout/ItemHeaderLine";
export default {
  components: {
    NoteItem,
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
        x:-100,
        // opacity:0,
        duration: 1,
        ease:"elastic.out( 0.7, 0.5)"
      });
      done();
    },
  },
};
</script>

<style scoped></style>
