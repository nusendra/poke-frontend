export default function ({ store, redirect, route, $fire }) {
  // initial load
  if (store.state.user === null) {
    try {
      $fire.auth.onAuthStateChanged((user) => {
        if (user && route.name === 'login') {
          store.commit('setAuth', user);

          $fire.auth.currentUser
            .getIdToken(/* forceRefresh */ true)
            .then((result) => {
              store.commit('setToken', result);
              localStorage.setItem('token', result);
            })
            .catch(function (error) {
              console.log(error);
            });
          redirect('/');
        }

        if (!user && isAdminRoute(route)) {
          redirect('/login');
        }
      });
      return;
    } catch (e) {
      console.log(e);
    }
  }

  if (store.state.user !== null && route.name === 'login') {
    redirect('/');
  }

  if (store.state.user === null && isAdminRoute(route)) {
    redirect('/login');
  }
}

function isAdminRoute(route) {
  if (
    route.matched.some((record) => record.path === '/' || record.path === '')
  ) {
    return true;
  }
}
