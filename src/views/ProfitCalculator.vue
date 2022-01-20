<template>
<div>
    <div class="register container z-depth-1">
        <div style="text-align:center">
            <h2>
                <span>Profit Calculator</span>

            </h2>
        </div>

        <div class="field budget">
            <label for="budget">
                <span v-if="Language == 'en'">Budget (RM)</span>
                <span v-if="Language == 'cn'">投资预算(RM)</span>
            </label>
            <input type="text" v-model="budget">
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
        <div class="field transaction_fee">
            <label for="transaction_fee">
                <span v-if="Language == 'en'">Transaction Fee (RM)</span>
                <span v-if="Language == 'cn'">手续费 (RM)</span>
            </label>
            <input type="text" v-model="transaction_fee">
        </div>
        <div class="field margin_profit">
            <label for="margin_profit">
                <span v-if="Language == 'en'">Margin Profit (RM)</span>
                <span v-if="Language == 'cn'">利润 (RM)</span>
            </label>
            <input type="text" v-model="margin_profit">
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
                    <span v-if="Language == 'en'">Used Budget (RM)</span>
                    <span v-if="Language == 'cn'">用到的预算(RM)</span>
                </td>
                <td>
                    {{ buy_price * unit }}
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
    name: "ProfitCalculator",
    components: {

    },
    data: function () {
        return {
            budget: "",
            buy_price: "",
            transaction_fee: 16,
            margin_profit: "",
            volume: "",
            sell_price: "",
            lot: "",
            unit: "",
            profit: "",
            feedback: ""
        };
    },
    methods: {
        calculate() {
            this.feedback = ""
            this.volume = (parseFloat(this.budget) - parseFloat(this.transaction_fee)) / parseFloat(this.buy_price)
            this.volume = Math.floor(this.volume)
            if (this.lot == "") {
                this.lot = Math.floor(this.volume / 100)
                this.unit = this.lot * 100
                this.sell_price = Math.ceil(((parseFloat(this.budget) + parseFloat(this.margin_profit) + parseFloat(this.transaction_fee)) / this.volume) * 100) / 100
                this.profit = ((this.sell_price * this.unit) - (this.buy_price * this.unit) - this.transaction_fee).toFixed(2)
            } else {
                this.unit = this.lot * 100
                this.sell_price = Math.ceil(((parseFloat(this.buy_price * this.unit) + parseFloat(this.margin_profit) + parseFloat(this.transaction_fee)) / this.unit) * 100) / 100
                this.profit = ((this.sell_price * this.unit) - (this.buy_price * this.unit) - this.transaction_fee).toFixed(2)
            }

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
