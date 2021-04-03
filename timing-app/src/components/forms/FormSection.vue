<template>
<div class="create-container">
  <note-form></note-form>
  <timer-form></timer-form>
</div>
</template>

<script>
import NoteForm from "./NoteForm.vue";
import TimerForm from './TimerForm.vue';

export default {
  components: { NoteForm, TimerForm },
};
</script>

<style scoped></style>
