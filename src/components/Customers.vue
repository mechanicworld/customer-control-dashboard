<template>
  <v-card>
    <!-- Customer List Start -->
    <v-card-text>
      <v-simple-table height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Customer</th>
              <th class="text-left">E-mail</th>
              <th class="text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customersData" :key="customer.id">
              <td>{{ customer.name }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
              <v-btn
                @click="viewCustomer(customer.id)"
                color="success"
                small
                class="ma-2"
              >
                View
              </v-btn>
              <v-btn
                @click="deleteCustomer(customer.id)"
                color="error"
                small
                class="ma-2"
              >
                Delete
              </v-btn>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-actions>
        <v-container>
          <v-row class="d-flex justify-content-center">
            <v-col cols="5">
              <v-btn @click="openAddPanel">Add customer </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card-text>
    <!-- Customer List End -->

    <!-- Add Customer Panel Start -->
    <v-card-text v-show="showAddMenu">
      <v-container>
        <v-row>
          <v-col> </v-col>
        </v-row>
      </v-container>
      <v-form v-model="valid">
        <v-text-field
          :rules="nameRules"
          :counter="25"
          label="Customer"
          v-model="submitCustomer.name"
          required
        />
        <v-text-field
          :rules="emailRules"
          label="E-mail"
          v-model="submitCustomer.email"
          required
        />
        <v-text-field
          :rules="phoneRules"
          :counter="10"
          label="Phone"
          v-model="submitCustomer.phone"
        />
        <v-btn :disabled="!valid" @click="saveCustomer()"> Save </v-btn>
      </v-form>
    </v-card-text>
    <!-- Add Customer Panel Start -->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      customersData: [],
      showAddMenu: false,
      submitCustomer: {
        name: "",
        email: "",
        phone: "",
      },
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
    openAddPanel() {
      this.showAddMenu = !this.showAddMenu;
    },
    viewCustomer(id) {
      this.$router.push(`/customer/${id}`);
    },
    
    async deleteCustomer(id) {

      if(confirm("Are you sure?")){

        const res = await fetch(`http://localhost:5000/customers/${id}`, {
          method: "DELETE",
        });
        res.status === 200
          ? (this.customersData = this.customersData.filter(
              (each) => each.id !== id
            ))
          : alert("Error occured when deleting customer!");
      }
      },
    async saveCustomer() {
      const res = await fetch("http://localhost:5000/customers", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.submitCustomer),
      });
      const data = await res.json();
      this.customersData = [...this.customersData, data];
      this.showAddMenu = !this.showAddMenu;
    },
    async fetchCustomers() {
      const res = await fetch("http://localhost:5000/customers");
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.customersData = await this.fetchCustomers();
  },
};
</script>

<style>
</style>