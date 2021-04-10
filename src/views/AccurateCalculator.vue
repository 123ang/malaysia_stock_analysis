<template>
<div>
    <div class="register container z-depth-1">
        <div style="text-align:center">
            <h2>
                <span> Calculator With Transaction Fee</span>

            </h2>
        </div>
        <div class="field buy_price">
            <label for="buy_price">
                <span v-if="Language == 'en'">Buy Price (RM)</span>
                <span v-if="Language == 'cn'">买价(RM)</span>
            </label>
            <input type="text" v-model="buy_price">
        </div>

        <div class="field lot">
            <label for="lot">
                <span v-if="Language == 'en'">Buy Lot </span>
                <span v-if="Language == 'cn'">买的数量（Lot）</span>
            </label>
            <input type="text" v-model="lot">
        </div>
        <div class="field sell_price">
            <label for="sell_price">
                <span v-if="Language == 'en'">Sell Price (RM)</span>
                <span v-if="Language == 'cn'">卖价(RM)</span>
            </label>
            <input type="text" v-model="sell_price">
        </div>
        <div class="field minimum_transaction_fee">
            <label for="minimum_transaction_fee">
                <span v-if="Language == 'en'">Minimum Transaction Fee (RM)</span>
                <span v-if="Language == 'cn'">最低手续费 (RM)</span>
            </label>
            <input type="text" v-model="minimum_transaction_fee">
        </div>

        <div class="field intra_day_transaction">
            <label for="intra_day_transaction">
                <span v-if="Language == 'en'">Intra Day Transaction Fee (%)</span>
                <span v-if="Language == 'cn'">当天交易手续费 (%)</span>
            </label>
            <input type="text" v-model="intra_day_transaction">
        </div>
        <div class="field minimum_transaction_fee">
            <label for="minimum_transaction_fee">
                <span v-if="Language == 'en'">Minimum Percentage Transaction Fee (%)</span>
                <span v-if="Language == 'cn'">最低手续费 (%)</span>
            </label>
            <input type="text" v-model="minimum_percentage_transaction_fee">
        </div>
        <div class="field maximum_transaction_fee">
            <label for="maximum_transaction_fee">
                <span v-if="Language == 'en'">Maximum Percentage Transaction Fee (%)</span>
                <span v-if="Language == 'cn'">最高手续费 (%)</span>
            </label>
            <input type="text" v-model="maximum_percentage_transaction_fee">
        </div>
        <div class="field maximum_account">
            <label for="maximum_account">
                <span v-if="Language == 'en'">Maximum value in Account (RM)</span>
                <span v-if="Language == 'cn'">户口最高储存切点 (RM)</span>
            </label>
            <input type="text" v-model="maximum_account">
        </div>
        <div style="text-align:center">
            <p v-if="feedback" class="red-text">{{ feedback }}</p>
            <v-btn class="btn blue" dark @click="calculate">
                <span v-if="Language=='en'">Calculate</span>
                <span v-if="Language == 'cn'">计算</span>
            </v-btn>
            <br><br>
        </div>
    </div>

    <br>
    <div class="container">
        <v-simple-table>
            <tr>
                <td>
                    <b> Result</b>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <span v-if="Language == 'en'">Buy Price (RM)</span>
                    <span v-if="Language == 'cn'">买价(RM)</span>
                </td>
                <td>
                    {{ buy_price }}
                </td>
            </tr>

            <tr>
                <td>
                    <span v-if="Language == 'en'">Volume</span>
                    <span v-if="Language == 'cn'">数量</span>
                </td>
                <td>
                    {{ lot }} Lot ({{ unit }} shares)
                </td>
            </tr>
            <tr>
                <td>
                    <span v-if="Language == 'en'">Sell Price (RM)</span>
                    <span v-if="Language == 'cn'">卖价(RM)</span>
                </td>
                <td>
                    {{ sell_price }}
                </td>
            </tr>
            <tr>
                <td>
                    <span v-if="Language == 'en'">Broker Fee</span>
                    <span v-if="Language == 'cn'">中介费</span>
                </td>
                <td>
                    {{ transaction_fee }}
                </td>
            </tr>
            <tr>
                <td>
                    <span v-if="Language == 'en'">Clearing Fee</span>
                    <span v-if="Language == 'cn'">清费</span>
                </td>
                <td>
                    {{ clearing_fee }}
                </td>
            </tr>
            <tr>
                <td>
                    <span v-if="Language == 'en'">Stamp Duties</span>
                    <span v-if="Language == 'cn'">印花税 </span>
                </td>
                <td>
                    {{ stamp_duties }}
                </td>
            </tr>
            <tr>
                <td>
                    <span v-if="Language == 'en'">Service Tax</span>
                    <span v-if="Language == 'cn'">服务税</span>
                </td>
                <td>
                    {{ service_tax }}
                </td>
            </tr>
            <tr>
                <td>
                    <span v-if="Language == 'en'">Profit (RM)</span>
                    <span v-if="Language == 'cn'">利润(RM)</span>
                </td>
                <td>
                    {{ profit }}
                </td>
            </tr>
        </v-simple-table>
    </div>
</div>
</template>

<script>
export default {
    name: "AccurateCalculator",
    components: {

    },
    data: function () {
        return {

            buy_price: "",
            minimum_transaction_fee: 8,
            margin_profit: "",
            volume: "",
            sell_price: "",
            lot: "",
            unit: "",
            profit: "",
            feedback: "",
            maximum_account: "50000",
            maximum_percentage_transaction_fee: "0.08",
            minimum_percentage_transaction_fee: "0.05",
            intra_day_transaction: "0.05",
            clearing_fee: "",
            transaction_fee: "",
            total_sell: "",
            total_buy: "",
            buy_transaction_fee: "",
            sell_transaction_fee: "",
            service_tax: "",
            stamp_duties: "",

        };
    },
    methods: {
        calculate() {
            this.feedback = ""
            // var intra_transaction
            var minimum_transaction_buy
            var maximum_transaction_buy
            var minimum_transaction_sell
            var maximum_transaction_sell
            var buy_clearing_fee
            var sell_clearing_fee

            this.total_sell = parseFloat(this.sell_price) * parseFloat(this.lot) * 100
            this.total_buy = parseFloat(this.buy_price) * parseFloat(this.lot) * 100
            this.unit = this.lot * 100
            minimum_transaction_sell = parseFloat(this.total_sell) * (parseFloat(this.minimum_percentage_transaction_fee) / 100)
            minimum_transaction_buy = parseFloat(this.total_buy) * (parseFloat(this.minimum_percentage_transaction_fee) / 100)

            maximum_transaction_sell = parseFloat(this.total_sell) * (parseFloat(this.maximum_percentage_transaction_fee) / 100)
            maximum_transaction_buy = parseFloat(this.total_buy) * (parseFloat(this.maximum_percentage_transaction_fee) / 100)

            if (minimum_transaction_buy < 8 && maximum_transaction_buy < 8) {
                this.buy_transaction_fee = 8
            } else {
                if (this.total_buy > parseFloat(this.maximum_account)) {
                    this.buy_transaction_fee = minimum_transaction_buy
                } else {
                    this.buy_transaction_fee = maximum_transaction_buy
                }

            }
            
            if (minimum_transaction_sell < 8 & maximum_transaction_sell < 8) {
                this.sell_transaction_fee = 8
            } else {
                if (this.total_buy > parseFloat(this.maximum_account)) {
                    this.sell_transaction_fee = minimum_transaction_sell
                } else {
                    this.sell_transaction_fee = maximum_transaction_sell
                }

            }
            this.transaction_fee = parseFloat(this.buy_transaction_fee) + parseFloat(this.sell_transaction_fee)
            buy_clearing_fee = parseFloat(this.total_buy) * (0.03 / 100)
            sell_clearing_fee = parseFloat(this.total_sell) * (0.03 / 100)
            if (buy_clearing_fee >= 1000) {
                buy_clearing_fee = 1000
            }
            if (sell_clearing_fee >= 1000) {
                sell_clearing_fee = 1000
            }
            this.clearing_fee = parseFloat(buy_clearing_fee) + parseFloat(sell_clearing_fee)
            this.stamp_duties = Math.ceil((this.total_sell + this.total_buy) / 1000)
            this.service_tax = (this.transaction_fee) * (6 / 100)
            this.profit = this.total_sell-this.total_buy - this.transaction_fee - this.clearing_fee - this.stamp_duties - this.service_tax
            this.profit = this.profit.toFixed(2)
        }
    },
    created() {

    },
    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },
        Language() {
            return this.$store.state.language;
        }

    }

}
</script>

<style>

</style>
