<template>
  <div>
    <v-app-bar>
      <v-toolbar-title> Customer Control Dashboard </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logOut()" v-show="$route.path !== '/login'" icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    logOut() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>