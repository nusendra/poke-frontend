<template>
  <div>
    <v-card v-if="!loading" class="mx-auto mb-10" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline">POKEMON INFORMATION TODAY</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ randomPokemon.data.name.toUpperCase() }}
          </v-list-item-title>
        </v-list-item-content>

        <v-img
          max-width="120"
          :src="randomPokemon.data.sprites.front_default"
        />
      </v-list-item>

      <v-card-actions class="d-flex justify-space-between">
        <Stat :items="randomPokemon.data.stats" />
        <div>
          <v-btn medium depressed color="orange" @click="getRandomPokemon">
            Get random pokemon
          </v-btn>
          <v-btn
            medium
            depressed
            color="primary"
            @click="detail(randomPokemon.data)"
          >
            Check the Detail
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
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
  </div>
</template>

<script>
import Stat from '@/components/Stat';

export default {
  components: { Stat },
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
      randomPokemon: {},
    };
  },
  async mounted() {
    await Promise.allSettled([
      this.getTotalPokemon(),
      this.fetch(),
      this.getRandomPokemon(),
    ]);
    this.loading = false;
  },
  methods: {
    async getRandomPokemon() {
      const { data } = await this.$axios.$get(`/pokemon/random`);
      this.randomPokemon = data;
    },
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
