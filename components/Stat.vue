<template>
  <div>
    <v-progress-circular
      v-for="(item, index) in transformedItems"
      :key="'stat_' + index"
      :rotate="90"
      :size="70"
      :width="5"
      :value="item.baseStat"
      color="primary"
      class="mr-2"
    >
      {{ item.name }}
    </v-progress-circular>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    transformedItems() {
      return this.items.map((item) => {
        console.log(item);
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
};
</script>
