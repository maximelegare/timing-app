<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition v-on:enter="enter" v-on:leave="leave" v-bind:css="false" appear>
      <dialog open v-if="show">
        <header>
            <h2>{{ title }}</h2>
        </header>
        <section>
          <slot name="section"></slot>
        </section>
        <!-- <menu v-if="!fixed">
          <slot name="actions"></slot>
        </menu> -->
      </dialog>
    </transition>
  </teleport>
</template>

<script>
import gsap from "gsap";
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
    enter: function(el, done) {
      gsap.from(el, {
        opacity: 0,
        duration: 0.7,
        y: -150,
      }),
        done();
    },
    leave: function(el, done) {
      gsap.from(el, {
        opacity: 0,
        duration: 0.5,
        y: 15,
      });
      done();
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.644);
  z-index: 10;
}

dialog {
  transform: translate(-50%, -50%);
  position: fixed;
  top: 40vh;
  left: 50%;
  /* width: 10vh; */
  z-index: 100;
  border-radius: 7px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: rgb(240, 239, 232);
}

header {
  background-color: rgb(114, 218, 204);
  color: white;
  width: 100%;
  padding:  1rem 0;
}

header h2 {
  text-align: left;
  color: white;
  text-align: center;
}

section {
  /* padding: 1rem; */
}


@media (min-width: 768px) {
  dialog {
    /* left: calc(50% - 20rem); */
    width: 40rem;
  }
}
</style>
