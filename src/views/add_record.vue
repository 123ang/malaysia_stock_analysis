<template>
<div class="add-account container z-depth-1">
    <h2 class="center-align indigo-text">
        <span v-if="Language == 'en'">Stock Trade Record</span>
        <span v-if="Language == 'cn'">股票交易记录</span>

    </h2>
    <br>
    <div class="field share">
        <label for="share">
            <span v-if="Language == 'en'">Share Code</span>
            <span v-if="Language == 'cn'">股票号</span>

        </label>
        <input type="text" name="share" v-model="share">
    </div>
    <div class="field trade_date">
        <label for="trade_date">
            <span v-if="Language == 'en'">Trade Date</span>
            <span v-if="Language == 'cn'">交易日期</span>

        </label>
        <input type="date" name="trade_date" v-model="trade_record_date">
    </div>
    <div class="field buy_sell">
        <label for="buy_sell">
            <span v-if="Language == 'en'">Buy or Sell</span>
            <span v-if="Language == 'cn'">买或卖</span>

        </label>
        <select id="buy_sell" v-model="buy_sell">
            <option disabled value="">
                <span v-if="Language == 'en'">Please select one:</span>
                <span v-if="Language == 'cn'">请选一个</span>
            </option>
            <option value="buy">
                <span v-if="Language == 'en'">Buy</span>
                <span v-if="Language == 'cn'">买</span>

            </option>
            <option value="sell">
                <span v-if="Language == 'en'">Sell</span>
                <span v-if="Language == 'cn'">卖</span>

            </option>

        </select>
    </div>
    <div class="field price_per_share">
        <label for="price_per_share">
            <span v-if="Language == 'en'">Price Per Share</span>
            <span v-if="Language == 'cn'">每股价钱</span>

        </label>
        <input type="text" name="price_per_share" v-model="price_per_share">
    </div>
    <div class="field volume">
        <label for="volume">
            <span v-if="Language == 'en'">Volume</span>
            <span v-if="Language == 'cn'">量</span>

        </label>
        <input type="text" name="volume" v-model="volume">
    </div>
    <div class="field net_trade_price">
        <label for="net_trade_price">
            <span v-if="Language == 'en'">Net Trade Price</span>
            <span v-if="Language == 'cn'">净交易</span>

        </label>
        <input type="text" name="net_trade_price" v-model="net_trade_price">
    </div>

    <div class="field center-align">
        <p v-if="feedback" class="red-text">
            {{ feedback }}
        </p>

        <button class="btn blue" @click="addRecord">
            <span v-if="Language == 'en'">Add Record</span>
            <span v-if="Language == 'cn'">添加记录</span>

        </button>
        <br><br>
        <router-link :to="{ name: 'stock_trade_record' }">
            <button class="btn pink">
                <span v-if="Language == 'en'">Back to Stock Record Page</span>
                <span v-if="Language == 'cn'">回到主页</span>

            </button>
        </router-link>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: "add_record",

    data() {
        return {
            share: "",
            feedback: null,
            buy_sell: "buy",
            trade_record_date: "",
            price_per_share: "",
            volume: "",
            net_trade_price: "",
        };
    },
    methods: {
        addRecord() {
            this.feedback = null;

            if (this.feedback == null) {
                if (this.share != '') {
                    this.show = true;

                    var domain = 'https://stocks-my.unihash-ecosystem.com/php_script/'
                    var script_name = 'add_account.php'
                    var web = domain + script_name
                    axios.post(web, {
                            share_code: this.share,
                            buy_sell: this.buy_sell,
                            trade_record_date: this.trade_record_date,
                            price_per_share: this.price_per_share,
                            volume: this.volume,
                            net_trade_price: this.net_trade_price,
                            user: this.UserEmail
                        })
                        .then(response => {
                            console.log(response.data)
                            this.share = ""
                            this.trade_record_date = ""
                            this.price_per_share = ""
                            this.volume = ""
                            this.net_trade_price = ""

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        },

    },
    created() {

    },
    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },
        Language() {
            return this.$store.state.language;
        },
    }

};
</script>

<style>
select {
    display: grid;
}
</style>
