export default function ({ store, redirect, route, $fire }) {
  // initial load
  if (store.state.user === null) {
    try {
      $fire.auth.onAuthStateChanged((user) => {
        if (user && route.name === 'login') {
          store.commit('setAuth', user);
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
