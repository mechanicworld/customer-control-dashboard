<template>
  <div>
    <v-container class="mt-8">
      <v-row>
        <h1>Customers</h1>

        <v-col cols="12">
          <Customers />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Customers from "../components/Customers.vue";
export default {
  name: "Dashboard",
  data() {
    return {};
  },
  components: {
    Customers,
  },
  methods: {},
};
</script>