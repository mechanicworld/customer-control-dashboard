<template>
  <v-container>
    <v-row>
      <v-col>
        <LoginForm />        
      </v-col>
    </v-row>    
  </v-container>
  
</template>

<script>
import LoginForm from '../components/LoginForm.vue';


export default {
  name: 'Login',
  components: {
    LoginForm      
  },
  data() {
    return{
    
    }
  },
}
</script>
