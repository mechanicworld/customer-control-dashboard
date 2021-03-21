<template>
  <v-footer app color="indigo lighten-2" padless>
    <v-row justify="center" no-gutters>
      <v-col class="py-4 text-center white--text" cols="12">
        Copyright {{ new Date().getFullYear() }} —
        <strong>Customer Control Dashboard</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
};
</script>