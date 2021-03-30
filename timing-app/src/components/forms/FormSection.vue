<template>
<div class="create-container">
  <list-form></list-form>
  <timer-form></timer-form>
</div>
</template>

<script>
import ListForm from "./ListForm.vue";
import TimerForm from './TimerForm.vue';

export default {
  components: { ListForm, TimerForm },
};
</script>

<style scoped></style>
