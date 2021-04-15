<template>
  <div>
    <transition @enter="enter" appear>
      <item-header-line route="note-route"></item-header-line>
    </transition>
    <base-spinner v-if="isLoading"></base-spinner>
    <div v-if="!isLoading && isAuth" class="items-section">
      <p v-if="!hasNotes">No note were found. Start adding some now!</p>
      <note-item
        @loadNotes="loadNotes"
        v-for="item in notes"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :content="item.content"
      ></note-item>
    </div>
  </div>
</template>

<script>
import BaseSpinner from "../components/ui/BaseSpinner.vue";
import gsap from "gsap";
import NoteItem from "../components/items/NoteItem.vue";
import ItemHeaderLine from "../components/layout/ItemHeaderLine";
export default {
  components: {
    NoteItem,
    ItemHeaderLine,
    BaseSpinner,
  },
  data() {
    return {
      isLoading: false,
    };
  },

  computed: {
    notes() {
      return this.$store.getters["notes/notes"];
    },
    hasNotes() {
      return this.$store.getters["notes/hasNotes"];
    },
    isAuth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  created() {
    this.loadNotes();
  },
  methods: {
    enter(el, done) {
      gsap.from(el, {
        x: -100,
        // opacity:0,
        duration: 1,
        ease: "elastic.out( 0.7, 0.5)",
      });
      done();
    },
    async loadNotes() {
      this.isLoading = true;
      if (this.isAuth) {
        try {
          await this.$store.dispatch("notes/loadNotes");
        } catch (error) {
          this.error = error.message || "something went wrong!";
        }
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.items-section {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 60px;
}
</style>
