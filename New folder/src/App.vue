<template>
<v-app>
  <div id="app" style="height: 100%;">
  <Navbar />
  <div id="container">
    <router-view />
  </div>

  
  </div>
  <v-footer
        class="justify-center"
        color="#183864"
        style="text-align:center"
      >
        <div style="color:white">
          <br><br>
            <span>&copy; Copyright {{ (new Date()).getFullYear() }} Malaysia Stock Analysis Platform. </span>
        
          <br><br>

        </div>

      </v-footer>
  </v-app>
</template>

<script>
import Navbar from '@/views/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    UserEmail() {
      return this.$store.state.Email;
    },
    Language() {
      return this.$store.state.language;
    },
  }
}
</script>

<style>



</style>

