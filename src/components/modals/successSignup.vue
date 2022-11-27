<template>
  <Modal
    name="success_signup"
    :success="true"
    title="Спасибо!"
    size="md"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <div class="success_modal">
        <div class="modal__subtitle">Вы успешно зарегистрировались!</div>

        <div class="success_modal__footer">
          <div class="success_modal-back">
            Окно закроется через <span id="countdowntimer">5</span> секунд
          </div>
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
    return {};
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    countDown() {
      let timeleft = 5;
      let downloadTimer = setInterval(
        function () {
          if (timeleft <= 0) {
            this.closeModal("success_signup");
            clearInterval(downloadTimer);
          } else {
            document.getElementById("countdowntimer").textContent = timeleft;
          }
          timeleft -= 1;
        }.bind(this),
        1000
      );
    },
    beforeOpen() {
      this.countDown();
    },
  },
};
</script>
