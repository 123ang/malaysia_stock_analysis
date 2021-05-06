<template>
<div>
    <div class="container" v-for="(data, index) in datas" :key="index">
        <h2 class="center-align indigo-text">Stock Detail for {{ data.name }} </h2>

        <v-simple-table>

            <tr>
                <td>Stock Code</td>
                <td>{{ data.code }}</td>
            </tr>
            <tr>
                <td>Stock name</td>
                <td>{{ data.name }}</td>
            </tr>
            <tr>
                <td>Sector</td>
                <td>{{ data.sector }}</td>
            </tr>
            <tr>
                <td>Sub Sector</td>
                <td>{{ data.sub_sector }}</td>
            </tr>
            <tr>
                <td>Total Share</td>
                <td>{{ data.total_share }}</td>
            </tr>
            <tr>
                <td>Earning per Share</td>
                <td>{{ data.eps}}</td>
            </tr>
            <tr>
                <td>Book Value per Share</td>
                <td>{{ data.nta }}</td>
            </tr>
            <tr>
                <td>Profit / Loss</td>
                <td>{{ data.pl }}</td>
            </tr>
            <tr>
                <td>Revenue</td>
                <td>{{ data.revenue }}</td>
            </tr>
            <tr>
                <td>Latest Analysis</td>
                <td>{{ data.updated_at }}</td>
            </tr>
            <tr>
                <td>Close Price</td>
                <td>{{ data.close_price }}</td>
            </tr>
            <tr>
                <td>Open Price</td>
                <td>{{ data.open_price }}</td>
            </tr>
            <tr>
                <td>High</td>
                <td>{{ data.high }}</td>
            </tr>
            <tr>
                <td>Low</td>
                <td>{{ data.low }}</td>
            </tr>
            <tr>
                <td>Volume</td>
                <td>{{ data.volume }}</td>
            </tr>
            <tr>
                <td>Moving Average 20 days</td>
                <td>{{ data.sma_20 }}</td>
            </tr>
            <tr>
                <td>Bolinger Band upper limit</td>
                <td>{{ data.bb_up }}</td>
            </tr>
            <tr>
                <td>Bolinger Band lower limit</td>
                <td>{{ data.bb_down }}</td>
            </tr>
            <tr>
                <td>MACD</td>
                <td>{{ data.macd }}</td>
            </tr>
            <tr>
                <td>MACD signal</td>
                <td>{{ data.macd_signal }}</td>
            </tr>
            <tr>
                <td>MACD current signal</td>
                <td>{{ data.macd_current_signal }}</td>
            </tr>
            <tr>
                <td>MACD Crossover signal</td>
                <td>{{ data.crossover_signal }}</td>
            </tr>
             <tr>
                <td>ATR</td>
                <td>{{ data.atr }}</td>
            </tr>
             <tr>
                <td>Volume Moving Average 5 days</td>
                <td>{{ data.vol_5 }}</td>
            </tr>
            <tr>
                <td>RSI</td>
                <td>{{ data.rsi }}</td>
            </tr>
            <tr>
                <td>Candlestick Signal</td>
                <td>
                    <span v-if="data.candlestick_signal == ''"> No signal</span>
                    <span v-else > {{ data.candlestick_signal }}</span>

                </td>
            </tr>

        </v-simple-table>
    </div>
    <br>
    <div style="text-align:center">
        <v-btn depressed dark color="blue" @click="$router.go(-1)">
            <span>Back</span>
        </v-btn>
    </div>
<br>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'stock_detail',
    components: {

    },
    data() {
        return {
            datas: [],
            feedback: null,
            start_date: null,
            end_date: null,
            dataprice: null,
            loaded: false,
        }
    },
    methods: {
        result() {
            var domain = 'https://stocks-my.unihash-ecosystem.com/php_script/'
            var script_name = 'stock_detail.php'
            var web = domain + script_name
            axios.post(web, {
                    stock_code: this.StockCode
                })
                .then(response => {
                    console.log(response.data)

                    this.datas = response.data;

                })
                .catch(function (error) {
                    console.log(JSON.stringify(error));
                    console.log("error response :" + error.response)
                    console.log("error status :" + error.status)
                });

        },

    },
    created() {
        console.log(this.StockCode)
        this.result()
    },
    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },
        StockCode() {
            return this.$store.state.StockCode;
        }
    }
}
</script>

<style>
select {
    display: block !important;
}
</style>
