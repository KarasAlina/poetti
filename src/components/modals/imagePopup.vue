<template>
  <Modal name="image" @closeModal="closeModal" size="lg">
    <template v-slot:content>
      <div class="modal__image">
        <img :src="src" alt="" />
      </div>
      <button class="btn btn--primary">отдать голос</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Modal,
  },
  data: function () {
    return {
      src: null,
    };
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen(event) {
      this.src = event.params.src;
    },
  },
};
</script>
