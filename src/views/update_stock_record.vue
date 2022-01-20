<template>
<div class="add-account container z-depth-1">
    <div v-for="(data, index) in datas" :key="index">
        <h2 class="center-align indigo-text">
            <span v-if="Language == 'en'">Update Stock Trade Record</span>
            <span v-if="Language == 'cn'">更新股票交易记录</span>

        </h2>
        <br>
        <div class="field share">
            <label for="share">
                <span v-if="Language == 'en'">Share Code</span>
                <span v-if="Language == 'cn'">股票号</span>

            </label>
            <input type="text" name="share" v-model="data.stock_code">
        </div>
        <div class="field trade_date">
            <label for="trade_date">
                <span v-if="Language == 'en'">Trade Date</span>
                <span v-if="Language == 'cn'">交易日期</span>

            </label>
            <input type="date" name="trade_date" v-model="data.created_at">
        </div>
        <div class="field buy_sell">
            <label for="buy_sell">
                <span v-if="Language == 'en'">Buy or Sell</span>
                <span v-if="Language == 'cn'">买或卖</span>

            </label>
            <select id="buy_sell" v-model="data.buy_sell">
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
            <input type="text" name="price_per_share" v-model="data.single_price">
        </div>
        <div class="field volume">
            <label for="volume">
                <span v-if="Language == 'en'">Volume</span>
                <span v-if="Language == 'cn'">量</span>

            </label>
            <input type="text" name="volume" v-model="data.volume">
        </div>
        <div class="field net_trade_price">
            <label for="net_trade_price">
                <span v-if="Language == 'en'">Net Trade Price</span>
                <span v-if="Language == 'cn'">净交易</span>

            </label>
            <input type="text" name="net_trade_price" v-model="data.net_price">
        </div>

        <div class="field center-align">
            <p v-if="feedback" class="red-text">
                {{ feedback }}
            </p>

            <button class="btn blue" @click="updateRecord(index)">
                <span v-if="Language == 'en'">Update Record</span>
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
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: "update_stock_record",

    data() {
        return {
            share: "",
            feedback: null,
            buy_sell: "buy",
            trade_record_date: "",
            price_per_share: "",
            volume: "",
            net_trade_price: "",
            datas: ""
        };
    },
    methods: {
        updateRecord(index) {
            this.feedback = null;
            var stock_code = this.datas[index].stock_code
            var single_price = this.datas[index].single_price
            var volume = this.datas[index].volume
            var net_price = this.datas[index].net_price
            var buy_sell = this.datas[index].buy_sell
            var created_at = this.datas[index].created_at

            if (this.feedback == null) {
                
                    this.show = true;

                    var domain = this.WebUrl + "php_script/" 
                    var script_name = 'stock_trading_record.php'
                    var web = domain + script_name
                    axios.post(web, {
                            stock_code: stock_code,
                            buy_sell: buy_sell,
                            created_at: created_at,
                            single_price: single_price,
                            volume: volume,
                            net_price: net_price,
                            user: this.UserEmail,
                            id: this.TradeRecord,
                            request: 3
                        })
                        .then(response => {
                            //alert(response.data)
                            console.log(response.data)
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                
            }
        },

    },
    created() {
        var domain = this.WebUrl + "php_script/" 
        var script_name = 'stock_trading_record.php'
        var web = domain + script_name
        axios.post(web, {
                request: 2,
                stock_code: this.TradeRecord,
                user: this.UserEmail

            })
            .then(response => {
                this.datas = response.data;
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
                console.log("error response :" + error.response)
                console.log("error status :" + error.status)
            });
    },
    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },
        Language() {
            return this.$store.state.language;
        },
        TradeRecord() {
            return this.$store.state.TradeRecord;
        },
        WebUrl(){
            return this.$store.state.web_url;
        }
    }

};
</script>

<style>
select {
    display: grid;
}
</style>
