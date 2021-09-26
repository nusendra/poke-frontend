<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="false"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item to="/" router exact>
          <v-list-item-action>
            <v-icon>mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Pokemon List'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="true" temporary fixed>
      <v-list>
        <v-list-item @click.native="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'Default',
  data() {
    return {
      title: 'POKEMON DATABASE',
      clipped: false,
      drawer: false,
      rightDrawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$fire.auth.signOut();
      this.$store.commit('setAuth', null);
      this.$store.commit('setToken', null);

      this.$router.push({
        path: '/login',
      });
    },
  },
};
</script>
