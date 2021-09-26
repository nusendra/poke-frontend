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
    class="elevation-1"
    @update:page="changePage"
    @update:items-per-page="changeRowCount"
  >
    <template #[`item.actions`]="{ item }">
      <v-btn small depressed color="primary" @click="detail(item)">
        Detail
      </v-btn>
    </template>
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
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
      ],
      options: {
        itemsPerPage: 10,
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
    detail(val) {
      this.$router.push({
        path: `/pokemon/${val.id}`,
      });
    },
  },
};
</script>
