import {
  signUp,
  signIn,
  recover,
  checkRegisterByEmail,
  sendSms,
  sendCode,
  registerByEmailSoc,
  resetPassword,
} from "../../api/login";
import {
  getProfile,
  updateProfile,
  logOut,
  deleteProfile,
  getChecks,
  getWinners,
  searchWinners,
  getPrizes,
  sendFeedback,
  prizeData,
  prizeReceive,
  uploadImage,
  getGarant,
  buyGarant,
  registerCode,
  getVideo,
} from "../../api/user";
import { getToken, setToken, removeToken } from "../../utils/auth";
import router from "../../router";

/* eslint-disable */

const account = {
  state: {
    token: getToken(),
    user: null,
    guid: null,
    login: null,
    vkStatus: null,
    checks: null,
    garant: null,
    agree: false,
  },
  mutations: {
    SET_LOGIN: (state, o) => {
      state.login = o;
    },

    SET_USER: (state, user) => {
      state.user = user;
    },

    SET_AGREE: (state, agree) => {
      state.agree = agree;
    },

    SET_CHECKS: (state, checks) => {
      state.checks = checks;
    },

    SET_GARANT: (state, garant) => {
      state.garant = garant;
    },

    SET_TOKEN: (state, token) => {
      state.token = token;

      setToken(token);
    },

    REMOVE_TOKEN: (state) => {
      state.token = null;

      removeToken();
    },
  },

  actions: {
    
    CheckRegisterByEmail({
      commit
    }, data) {
      return (async () => checkRegisterByEmail(data))();
    },

    SendSms({
      commit
    }, data) {
      return (async () => sendSms(data))();
    },

    SendCode({
      commit
    }, data) {
      return (async () => sendCode(data))();
    },

    RegisterByEmailSoc({
      commit
    }, data) {
      return (async () => registerByEmailSoc(data))();
    },

    UpdateProfile({
      commit
    }, data) {
      return (async () => updateProfile(data))();
    },

    ResetPassword({
      commit
    }, data) {
      return (async () => resetPassword(data))();
    },

    Recover({
      commit
    }, data) {
      return (async () => recover(data))();
    },

    SendFeedback({
      commit
    }, data) {
      return (async () => sendFeedback(data))();
    },
    BuyGarant({
      commit
    }, data) {
      return (async () => buyGarant(data))();
    },
    RegisterCode({
      commit
    }, data) {
      return (async () => registerCode(data))();
    },
    PrizeData({
      commit
    }, data) {
      return (async () => prizeData(data))();
    },
    PrizeReceive({
      commit
    }, data) {
      return (async () => prizeReceive(data))();
    },

    UploadImage({
      commit
    }, data) {
      return (async () => uploadImage(data))();
    },

    GetProfile({commit}) {
      return new Promise((resolve, reject) => {
        getProfile()
          .then((response) => {

            if (response.result) {
              commit('SET_USER', response.data);
              const rules1 = response.data.profile.rules1 === 1 ? true : false;
              commit("SET_AGREE", rules1);

            }

            resolve(response);
          });
         
      });
      
    },

    async GetChecks({ commit }, data) {
      try {
        const r = await getChecks(data);
        commit('SET_CHECKS', r.data);
      } catch (e) {
        console.log('--- ', e);
      }
    },

    async GetGarant({ commit }, data) {
      try {
        const r = await getGarant(data);
        commit('SET_GARANT', r.data);
      } catch (e) {
        console.log('--- ', e);
      }
    },

    // GetChecks({ commit }, data) {
    //   return (async () => getChecks(data))();
    // },

    GetPrizes({
      commit
    }, data) {
      return (async () => getPrizes(data))();
    },

    GetWinners({
      commit
    }, data) {
      return (async () => getWinners(data))();
    },

    GetVideo({
      commit
    }, data) {
      return (async () => getVideo(data))();
    },

    SearchWinners({
      commit
    }, data) {
      return (async () => searchWinners(data))();
    },

    SignUp({
      commit
    }, data) {
      return (async () => signUp(data))();
    },

    SignIn({
      commit
    }, data) {
      return (async () => signIn(data))();
    },

    LogOut({
      commit
    }, data) {
      console.log('---', 'LogOut');

      if (data) {
        (document.getElementById('spinner')).classList.remove('-hide');

        logOut()
          .then(() => {
            commit('REMOVE_TOKEN');

            router.push({
              name: 'Home'
            });

            (document.getElementById('spinner')).classList.add('-hide');
          });
      } else {
        commit('REMOVE_TOKEN');

        commit('SET_USER', null);

        router.push({
          name: 'Home'
        });
      }
    },

    DeleteProfile({
      commit
    }, data) {
      return (async () => deleteProfile(data))();
    },
  },
};

export default account;