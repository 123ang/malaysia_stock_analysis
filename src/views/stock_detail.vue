<template>
<div>
    <div class="container" v-for="(data, index) in datas" :key="index">
        <h2 class="center-align indigo-text">Stock Detail for {{ data.name }} </h2>
        <br>
        <v-row>
            <v-col>
                <v-simple-table style="border: 1px solid black ">
                    <tr>
                        <td><b>Stock Code</b></td>
                        <td>{{ data.code }}</td>
                    </tr>
                    <tr>
                        <td><b>Stock name</b></td>
                        <td>{{ data.name }}</td>
                    </tr>
                    <tr>
                        <td><b>Sector</b></td>
                        <td>{{ data.sector }}</td>
                    </tr>
                    <tr>
                        <td><b>Sub Sector</b></td>
                        <td>{{ data.sub_sector }}</td>
                    </tr>
                    <tr>
                        <td><b>Total Share</b></td>
                        <td>{{ data.total_share }}</td>
                    </tr>
                </v-simple-table>
            </v-col>
            <v-col>
                <v-simple-table style="border: 1px solid black ">
                    <tr>
                        <td><b>Latest Analysis</b></td>
                        <td>{{ data.updated_at }}</td>
                    </tr>
                    <tr>
                        <td><b>Close Price</b></td>
                        <td>{{ data.close_price }}</td>
                    </tr>
                    <tr>
                        <td><b>Open Price</b></td>
                        <td>{{ data.open_price }}</td>
                    </tr>
                    <tr>
                        <td><b>High</b></td>
                        <td>{{ data.high }}</td>
                    </tr>
                    <tr>
                        <td><b>Low</b></td>
                        <td>{{ data.low }}</td>
                    </tr>
                    <tr>
                        <td><b>Volume</b></td>
                        <td>{{ data.volume }}</td>
                    </tr>

                </v-simple-table>
            </v-col>
        </v-row>
        <br>
        <v-simple-table style="border: 1px solid black ">
            <tr>
                <td><b>Earning per Share</b></td>
                <td>{{ data.eps}}</td>
            </tr>
            <tr>
                <td><b>Book Value per Share</b></td>
                <td>{{ data.nta }}</td>
            </tr>

            <tr>
                <td><b>Revenue</b></td>
                <td>{{ data.revenue }}</td>
            </tr>
            <tr>
                <td><b>Profit / Loss</b></td>
                <td>{{ data.pl }}</td>
            </tr>
        </v-simple-table>
        <br>
        <v-simple-table >
            <tr>
                <th style="border: 1px solid black !important;border-collapse: collapse;">Moving Average 20 days</th>
                <th style="border: 1px solid black !important;border-collapse: collapse;">Bolinger Band upper limit</th>
                <th style="border: 1px solid black !important;border-collapse: collapse;">Bolinger Band lower limit</th>
                <th style="border: 1px solid black !important;border-collapse: collapse;">MACD</th>
                <th style="border: 1px solid black !important;border-collapse: collapse;">MACD signal</th>
                <th style="border: 1px solid black !important;border-collapse: collapse;">MACD current signal</th>
                <th style="border: 1px solid black !important;border-collapse: collapse;">MACD Crossover signal</th>
                <th style="border: 1px solid black !important;border-collapse: collapse;">ATR</th>
                <th style="border: 1px solid black !important;border-collapse: collapse;">Volume Moving Average 5 days</th>
                <th style="border: 1px solid black !important;border-collapse: collapse;">RSI</th>
                <th style="border: 1px solid black !important;border-collapse: collapse;">Candlestick Signal</th>
            </tr>
            <tr>
                <td style="border: 1px solid black !important;border-collapse: collapse;">{{ data.sma_20 }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;">{{ data.bb_up }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;">{{ data.bb_down }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;">{{ data.macd }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;">{{ data.macd_signal }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;">{{ data.macd_current_signal }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;">{{ data.crossover_signal }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;">{{ data.atr }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;">{{ data.vol_5 }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;">{{ data.rsi }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;">
                    <span v-if="data.candlestick_signal == ''"> No signal</span>
                    <span v-else> {{ data.candlestick_signal }}</span>

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
