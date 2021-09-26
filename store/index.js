export const state = () => ({
  user: null,
  idToken: null,
});

export const mutations = {
  setAuth(state, payload) {
    state.user = JSON.parse(JSON.stringify(payload));
  },
  setToken(state, payload) {
    state.idToken = payload;
  },
};
