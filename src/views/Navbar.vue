<template>
<div class="navbar">
    <nav class="nav-extended" style="background-color:#183864 !important; height:80px;">
        <v-row>
            <v-col>
                <div class="nav-content" style="margin-top:20px;">
                    <v-app-bar-nav-icon x-large @click.stop="drawer = !drawer" color="white">
                    </v-app-bar-nav-icon>
                    <v-navigation-drawer v-model="drawer" temporary fixed left style="background-color: white" hide-overlay>
                        <v-list nav dense>
                            <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
 
                                <v-list-item v-if="!isLoggedIn" @click="login">
                                    <v-list-item-title >Login</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="isLoggedIn" :to="'/'">
                                    <v-list-item-title >Home</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="isLoggedIn" :to="'/today-stock'">
                                    <v-list-item-title >Today Stocks Suggestion</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="isLoggedIn">
                                    <v-list-item-title @click="index">Index</v-list-item-title>
                                </v-list-item>

                                <v-list-item v-if="isLoggedIn" :to="'/search-stock'">
                                    <v-list-item-title>Search A Stock</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="isLoggedIn" :to="'/my-watchlist'"> 
                                    <v-list-item-title>My Watchlist</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="isLoggedIn" :to="'/stock-past-data'">
                                    <v-list-item-title >Stock Past Data</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="isLoggedIn" :to="'/profit-calculator'">
                                    <v-list-item-title>Profit Calculator</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="isLoggedIn" :to="'/more-accurate-calculator'">
                                    <v-list-item-title>Calculator With Transaction Fee</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="isLoggedIn" :to="'/stock-trade-record'">
                                    <v-list-item-title @click="stock_trading_recording">Stock Trading Recording</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-if="isLoggedIn">
                                    <v-list-item-title @click="logout">Logout</v-list-item-title>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-navigation-drawer>
                </div>
            </v-col>
            <v-col>
                <div style="margin-top:15px; margin-right:50px;float: right;">
                    <v-btn v-if="cn === false" text large style="color:white" @click="chinese">中文</v-btn>
                    <v-btn v-if="cn === true" text large style="color:white" @click="english">English</v-btn>
                </div>
            </v-col>
        </v-row>
    </nav>
</div>
</template>

<script>
import store from "../store";

export default {
    name: "Navbar",
    data() {
        return {
            cn: false,
            search: null,
            drawer: false,
            group: null,
            click: 0
        };
    },
    watch: {
        group() {
            this.drawer = false
        }
    },
    methods: {
        logout: function () {
            store.commit("IsLoggedIn", false);
            this.$router.push("/login");
        },
        home: function () {
            this.$router.push("/");
        },
        chinese: function () {
            this.cn = true;
            store.commit("language", "cn");
        },
        english: function () {
            this.cn = false;
            store.commit("language", "en");
        },
        closeNav() {
            this.drawer = false;
        },
        index() {
            this.$router.push("/index");
        },
        stock_trading_recording() {
            this.$router.push("/stock-trade-record");
        },
        login() {
            this.$router.push("/login");
        },
        today_stock() {
            this.$router.push("/today-stock");
        },
        search_stock() {
            this.$router.push("/search-stock");
        },
        my_watchlist() {
            this.$router.push("/my-watchlist");
        },
        stock_past_data() {
            this.$router.push("/stock-past-data");
        },
        profit_calculator() {
            this.$router.push("/profit-calculator");
        },
        my_profile() {
            this.$router.push("/my-profile");
        },
        accurate_calculator() {
            this.$router.push("/more-accurate-calculator");
        }

    },
    created() {
        store.commit("language", "en");
    },
    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },
        isLoggedIn() {
            return this.$store.state.isLoggedIn;
        },
        Language() {
            return this.$store.state.language;
        },

    },

};
</script>

<style>
.btn {
    font-weight: bold;
}
</style>
