<template>
  <v-card width="400" class="mx-auto mt-5">
    
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="username"
          label="Username"
          prepend-icon="mdi-account-circle"
        />
        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="showPassword = !showPassword"
        />
        <v-card-actions>
          <v-btn @click="login()">Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
    <v-alert       
      v-model="errorAlert"
      border="left"
      close-text="Close Alert"
      color="red darken-2"
      dark
      dismissible
    >
      Username or Password Invalid
    </v-alert>
  </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      showPassword: false,
      username: "",
      password: "",
      adminData: [],
      errorAlert:false
    };
  },
  methods: {
    login() {
      const adminList = this.adminData.filter(
        (item) => item.username === this.username
      );
      
      if (
        adminList !== undefined &&
        adminList.length !== 0 &&
        adminList[0].username == this.username &&
        adminList[0].password == this.password
      ) {
        localStorage.setItem("user", "success");
        this.$router.push("/");
      } else {
        this.errorAlert = true
      }
    },
    async fetchUsers() {
      const res = await fetch("http://localhost:5000/admins");
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.adminData = await this.fetchUsers();
  },
};
</script>