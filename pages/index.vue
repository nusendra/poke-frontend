<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :options="options"
    :server-items-length="totalPokemon"
    :loading="loading"
    :footer-props="{
      'items-per-page-options': [5, 10, 15, 20],
    }"
    loading-text="Loading... Please wait"
    @update:page="changePage"
    @update:items-per-page="changeRowCount"
    class="elevation-1"
  >
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Name', value: 'name' },
      ],
      options: {
        itemsPerPage: 5,
      },
      items: [],
      loading: true,
      totalPokemon: 0,
      page: 1,
    };
  },
  async mounted() {
    await Promise.allSettled([this.getTotalPokemon(), this.fetch()]);
    this.loading = false;
  },
  methods: {
    async getTotalPokemon() {
      const { data } = await this.$axios.$get(`/pokemon/total`);
      this.totalPokemon = data;
    },
    async fetch() {
      const { data } = await this.$axios.$get(
        `/pokemon?page=${this.page}&limit=${this.options.itemsPerPage}`
      );
      this.items = data;
    },
    changePage(val) {
      this.page = val;
      this.fetch();
    },
    changeRowCount(val) {
      this.options.itemsPerPage = val;
      this.fetch();
    },
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
