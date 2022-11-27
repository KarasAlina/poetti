<template>
  <Modal name="video" @closeModal="closeModal" size="lg">
    <template v-slot:content>
      <div class="modal__iframe">
        <iframe :src="src"> </iframe>
        <div class="modal__popover-text" v-if="text">
          {{ text }}
        </div>
      </div>
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
      text: null,
    };
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen(event) {
      this.src = event.params.src;
      this.text = event.params.text;
    },
  },
};
</script>
