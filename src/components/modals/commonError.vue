<template>
  <Modal
    name="common_error"
    :size="size"
    :title="title"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <div class="success_modal">
        <div v-if="text" class="modal__text" v-html="text"></div>
        <ul v-if="list" class="common-error-list">
          <li v-for="(li, i) in list" :key="i" class="modal__text">{{ li }}</li>
        </ul>
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
      text: "",
      title: "Ошибка",
      list: null,
      size: "md",
    };
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },

    beforeOpen(event) {
      this.text = event.params.text;
      this.list = event.params.list;
      if (event.params.title) {
        this.title = event.params.title || "Ошибка!";
      }
      if (event.params.size) {
        this.size = event.params.size || "md!";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.common-error-list {
  list-style: auto;
  list-style-position: inside;
}
</style>
