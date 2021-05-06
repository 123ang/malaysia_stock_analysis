<template>
<div style="text-align: center">
    <br><br>
    <v-btn depressed dark color="blue" @click="add_record">
        <span>Add Record</span>
    </v-btn>
    <br><br>
    <v-btn depressed dark color="blue" @click="show_record">
        <span>Show Record</span>
    </v-btn>
    <br><br>
    
</div>
</template>

<script>
export default {

    name: "Home",
    data() {
        return {}
    },
    methods: {
        add_record() {
            this.$router.push("/add-record");
        },
        show_record() {
            this.$router.push("/show-record");
        },
        

    },
    created: function () {

    },
    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },

    }

};
</script>

<style>

</style>
