export const state = () => ({
  user: null,
});

export const mutations = {
  setAuth(state, payload) {
    state.user = JSON.parse(JSON.stringify(payload));
  },
};
