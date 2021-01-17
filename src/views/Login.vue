<template>
 <div class="login container z-depth-1" style="background-color:white">

  <h2 
    class="center-align black-text" 
    style=" 
    font-weight: bold;
    text-decoration: underline;"
    >
  Login
  </h2>
  
      <div class="field email mx-4">
    
        <label style="" for="email" >Email:</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div class="field password mx-4">
       
        <label style="font-weight:bold" for="password" >Password:</label>
        <input type="password" id="password" v-model="password" v-on:keyup.enter="login(email,password)">
      </div>
      <div class="field center-align">
        <p
          v-if="feedback"
          class="red-text"
        >{{ feedback }}</p>

        <button @click="login(email,password)" class="btn1 btn-large btn-extended grey lighten-4 black-text"  type="submit" >登录</button>
       
      </div>
  
</div>
     
</template>

<script>
import store from "../store";
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      feedback:null,
      datas: [],
 
    };
  },
  methods: {
    
    login: function(email, password) {
      if(email == null) {
       
       
            this.feedback = "Please enter your email"
          
        return;
      }
      axios.post('https://www.stocks-my.unihash-ecosystem.com/php_script/Login.php', {
        email: email
      })
      .then(response => {
        console.log(response.data);
        if(response.data.length == 0) {
          

            this.feedback = "Email does not Exist!"
          
          return;
        }
        if(password == response.data.password) {
          
                store.commit("IsLoggedIn", true);
                store.commit("Email", this.email);
                this.$router.push("/");
                
            
        }
        else{
  
            this.feedback = "Wrong Password"
          
          return;
        }
          
      })
      .catch(function (error) {
          console.log(error);
      });
         
    } ,
   
     
        
  
  },
  computed: {
   
    Status() {
      return this.$store.state.status;
    }

  }
};
</script>

<style>
label{
  font-weight:bold;
  color: black;
}
.btn1 {
  font-weight:bold;
  margin-bottom:20%;
  margin-top:10%;
}

.field {
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 20px;
}

</style>