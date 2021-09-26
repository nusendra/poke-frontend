export default (context) => {
  const { store } = context;

  try {
    context.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        store.commit('setAuth', user);

        context.$fire.auth.currentUser
          .getIdToken(/* forceRefresh */ true)
          .then((result) => {
            store.commit('setToken', result);
            localStorage.setItem('token', result);
          })
          .catch(function (error) {
            console.log(error);
          });
        return user;
      }
    });
  } catch (e) {
    console.log(e);
  }
};
