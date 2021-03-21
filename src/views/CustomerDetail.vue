<template>
  <div>
    <v-container>
      <v-row justify="center" align-content="center">
        <v-col cols="3" >
          <v-avatar
              color="accent"
              size="150"
          >
          <span class="display-2">{{avatar}}</span>   
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <v-form v-model="valid">
            <v-text-field label="ID" disabled v-model="id">
              {{ $route.params.id }}
            </v-text-field>

            <v-text-field
              label="Customer"
              v-model="name"
              :rules="nameRules"
              :counter="25"
              required
              @input="changeAvatar"
            />
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="emailRules"
              required
            />

            <v-text-field
              label="Phone"
              v-model="phone"
              :rules="phoneRules"
              :counter="10"
              required
            />
            <v-container>
              <v-row>
                <v-col class="mt-3 ml-0 px-0">
                  <v-btn :disabled="!valid" @click="updateCustomer()"> Update</v-btn>
                  <v-btn class="ml-11 float-right" color="error" @click="cancel()">Cancel</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CustomerDetail",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      id: this.$route.params.id,
      avatar:"",
      customer: [],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 25 || "Name must be less than 25 characters",
      ],
      valid: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) => v.length <= 10 || "Digit Limit is 10",
        (v) => /\d{10}$/.test(v) || "Phone number must be 10 digit",
      ],
    };
  },
  methods: {
    changeAvatar(){
      this.avatar = this.name[0].toUpperCase()
    },
    cancel(){
      this.$router.push("/");
    },
    async fetchCustomer() {
      const res = await fetch(`http://localhost:5000/customers/${this.id}`);
      const data = await res.json();
      return data;
    },
    async updateCustomer() {
      const updatedInfo = {
        ...this.customer,
        name: this.name,
        email: this.email,
        phone: this.phone,
      };
      await fetch(`http://localhost:5000/customers/${this.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      });
      this.$router.push("/");
    },
  },
  async created() {
    this.customer = await this.fetchCustomer();
    this.name = this.customer.name;
    this.email = this.customer.email;
    this.phone = this.customer.phone;
    this.avatar = this.customer.name[0].toUpperCase()
  },
};
</script>

<style>
</style>