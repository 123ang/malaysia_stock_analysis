<template>

  <div class="navbar">
    <nav class="nav-extended" style="background-color:#183864 !important">
      <div class="nav-content">
        <v-row>

          <v-toolbar-title style="text-align:right">
     
          <v-col>
          
      
          <v-btn        
            text
            large
            color="white"
            height="80"
            v-if="isLoggedIn"
            v-on:click="logout"
          >Logout</v-btn>
          </v-col>
          </v-toolbar-title>
        </v-row>
      </div>
    </nav>
  </div>

</template>


<script>
import store from "../store";

export default {
  name: "Navbar",
  data() {
    return {
      
    };
  },

  methods: {
    logout: function() {
      store.commit("IsLoggedIn", false);
   
      this.$router.push("/login");
  

    },
    
   
    
  },
  created() {
   
  },
  computed: {
    UserEmail() {
      return this.$store.state.Email;
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    
  },
  
};
</script>

<style>
.btn {
  font-weight:bold;
}
</style>