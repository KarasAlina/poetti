<template>
  <Modal name="buy_garant" :title="title" @closeModal="closeModal">
    <template v-slot:content>
      <div class="success_modal">
        <button class="btn btn--secondary" @click="submit()">отправить</button>
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
      type: null,
      title: "",
    };
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },

    beforeOpen(event) {
      this.type = event.params.type;
      if (event.params.title) {
        this.title = event.params.title;
      }
    },
    submit() {
      this.$store
        .dispatch("BuyGarant", {
          prize_id: this.type,
        })
        .then((r) => {
          console.log(r);
          if (!r.result) {
            if (r.error) {
              this.$modal.hide("buy_garant");
              this.$modal.show("common_error", {
                text: r.error,
              });
            }
          } else {
            this.$store.dispatch("GetGarant", { page: 1 });
            this.$store.dispatch("GetProfile");
            this.$modal.hide("buy_garant");
            this.$modal.show("common_success", {
              text: "Подарок успешно отправлен",
            });
          }
        })
        .catch((e) => {
          this.$modal.show("common_error", {
            text: "Что-то пошло не так! " + e,
          });
        });
    },
  },
};
</script>
