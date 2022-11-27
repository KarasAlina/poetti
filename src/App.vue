<template>
  <div id="app">
    <Header v-if="showHeader" :headerModified="headerModified" />
    <div class="app-content">
      <router-view />
    </div>
    <Footer />
    <Feedback />
    <Authorization />
    <Signup />
    <Recover />
    <EnterCode />
    <SuccessSignup />
    <SuccessRecover />
    <SuccessProfile />
    <SuccessCheck />
    <CommonError />
    <CommonSuccess />
    <TemporarilyUnavailable />
    <ImagePopup />
    <VideoPopup />
    <Soc_signup />
    <Soc_signupFinish />
    <DocumentPopup />
    <ChangePassword />
    <CodeRegistration />
    <BuyGarant />
    <ErrorCode />
    <UpdateInfo />
  </div>
</template>
<script>
import CommonSuccess from "./components/modals/commonSuccess.vue";
import Header from "@/components/AppHeader.vue";
import Footer from "@/components/AppFooter.vue";
import Feedback from "@/components/modals/feedback.vue";
import TemporarilyUnavailable from "@/components/modals/temporarilyUnavailable.vue";

import SuccessCheck from "@/components/modals/successCheck.vue";
import SuccessSignup from "@/components/modals/successSignup.vue";
import SuccessRecover from "@/components/modals/successRecover.vue";
import SuccessProfile from "@/components/modals/successProfile.vue";

//import UploadCheck from "@/components/modals/uploadCheck.vue";
import CommonError from "@/components/modals/commonError.vue";

import store from "./store";
import Authorization from "./components/modals/authorization.vue";
import Signup from "./components/modals/signup.vue";
import Recover from "./components/modals/recover.vue";
import ImagePopup from "./components/modals/imagePopup.vue";
import Soc_signup from "./components/modals/soc_signup.vue";
import DocumentPopup from "./components/modals/documentPopup.vue";
import Soc_signupFinish from "./components/modals/soc_signup-finish.vue";
import ChangePassword from "./components/modals/changePassword.vue";
import CodeRegistration from "./components/modals/codeRegistration.vue";
import BuyGarant from "./components/modals/buyGarant.vue";
import ErrorCode from "./components/modals/errorCode.vue";
import EnterCode from "./components/modals/enterCode.vue";
import VideoPopup from "./components/modals/videoPopup.vue";
import UpdateInfo from "./components/modals/updateInfo.vue";
export default {
  components: {
    Header,
    Footer,
    Feedback,
    SuccessCheck,
    SuccessSignup,
    SuccessRecover,
    SuccessProfile,
    CommonError,
    TemporarilyUnavailable,
    CommonSuccess,
    Authorization,
    Signup,
    Recover,
    ImagePopup,
    Soc_signup,
    DocumentPopup,
    Soc_signupFinish,
    ChangePassword,
    CodeRegistration,
    BuyGarant,
    ErrorCode,
    EnterCode,
    VideoPopup,
    UpdateInfo,
  },
  data: function () {
    return {
      showHeader: true,
      showFooter: true,
      headerModified: true,
      path: window.location.pathname,
      hash: window.location.hash,
    };
  },
  methods: {
    setHeight() {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
    showModal(name) {
      this.$modal.show(name);
    },
    checkAuth(t) {
      if (this.$store.getters.token) {
        if (!this.$store.getters.user) {
          this.$store.dispatch("GetProfile").then((response) => {
            if (response.result) {
              console.log(response);
              if (
                !response.data.profile.name || response.data.profile.name === null ||
                !response.data.profile.city || response.data.profile.city === null
              ) {
                this.$modal.show("update_info", {
                  user: response.data.profile,
                });
              }
            }
          });
        }
      } else {
        this.$router.push({ name: "Home" });
      }
    },
    /* eslint-enable */
  },
  mounted() {
    // this.$store.dispatch("LogOut");
    const t = this;
    this.setHeight();

    window.addEventListener("resize", this.setHeight);
    this.$root.$on("onLogined", function () {});
    this.checkAuth(t);
    // localStorage.clear();
  },

  watch: {
    $route: {
      handler: (to, from) => {
        document.title = to.meta.title || "";
      },
      immediate: true,
    },

    "$route.path"(value) {
      let navs = document.querySelectorAll(".header__nav-link");
      if (value != "/") {
        navs.forEach((nav) => {
          nav.classList.remove("active");
        });
      }
    },
  },
};
</script>

<style lang="scss">
.app-content {
  flex: 1;
  z-index: 1;
  @media (min-width: 640px) {
    display: flex;

    & > div {
      flex: 1;
      max-width: 100%;
    }
  }
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  position: relative;
  min-width: 320px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
