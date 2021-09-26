<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="800">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-row align="center" justify="center">
      <v-col class="d-flex child-flex" cols="18">
        <v-img
          max-height="82"
          max-width="152"
          :src="pokemonData.sprites.front_default"
        ></v-img>
        <v-img
          max-height="82"
          max-width="152"
          :src="pokemonData.sprites.front_shiny"
        ></v-img>
        <v-img
          max-height="82"
          max-width="152"
          :src="pokemonData.sprites.back_default"
        ></v-img>
        <v-img
          max-height="82"
          max-width="152"
          :src="pokemonData.sprites.back_shiny"
        ></v-img>
      </v-col>
    </v-row>

    <v-card-title>{{ pokemonData.name.toUpperCase() }}</v-card-title>

    <v-card-text>
      <div class="my-2 text-subtitle-1">Abilities</div>
      <v-chip
        v-for="({ ability }, index) in pokemonData.abilities"
        :key="'ability_' + index"
        class="ma-2"
        color="primary"
        label
        outlined
      >
        {{ ability.name }}
      </v-chip>

      <div class="my-2 text-subtitle-1">Game Indices</div>
      <v-chip
        v-for="({ version }, gameIndex) in pokemonData.game_indices"
        :key="'game' + gameIndex"
        class="ma-2"
        color="orange"
        label
        outlined
      >
        {{ version.name }}
      </v-chip>

      <div class="my-2 text-subtitle-1">Stats</div>
      <v-progress-circular
        v-for="(item, index) in statItems"
        :key="'stat_' + index"
        :rotate="90"
        :size="100"
        :width="10"
        :value="item.baseStat"
        color="teal"
        class="mr-2"
      >
        {{ item.name }}
      </v-progress-circular>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-actions class="d-flex flex-row-reverse">
      <v-btn depressed color="primary" @click="back"> Back </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    selection: 1,
    pokemonData: {
      name: '',
      abilities: [],
      game_indices: [],
      sprites: {},
      stats: [],
    },
  }),
  computed: {
    statItems() {
      return this.pokemonData.stats.map((item) => {
        let name = '';
        if (item.stat.name === 'hp') name = 'HP';
        if (item.stat.name === 'attack') name = 'ATK';
        if (item.stat.name === 'defense') name = 'DEF';
        if (item.stat.name === 'special-attack') name = 'SPATK';
        if (item.stat.name === 'special-defense') name = 'SPDEF';
        if (item.stat.name === 'speed') name = 'SPD';

        return {
          baseStat: item.base_stat,
          name,
        };
      });
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const { data } = await this.$axios.$get(
        `/pokemon/${this.$route.params.id}`
      );
      this.pokemonData = data;
      this.loading = false;
    },
    back() {
      this.$router.push({
        path: '/',
      });
    },
  },
};
</script>
