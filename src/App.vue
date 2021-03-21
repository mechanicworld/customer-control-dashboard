<template>
  <v-app>    

    <Header/>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>        
      </v-container>
    </v-main>

    
    <Footer/>
    
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';


export default {
  name: 'App',
  components: {
    Footer,
    Header,
    
  },

  data: () => ({
    
  }),
};
</script>
