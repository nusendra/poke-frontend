export default (context) => {
  const { store } = context;

  try {
    context.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        store.commit('setAuth', user);
        return user;
      }
    });
  } catch (e) {
    console.log(e);
  }
};
