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
                <td><b>52 week low and high</b></td>
                <td>{{ data.annual_low }} ~ {{ data.annual_high }}</td>
            </tr>
            <tr>
                <td><b>Return on Equuity (ROE)</b></td>
                <td>{{ data.roe }}</td>
            </tr>

            <tr>
                <td><b>Price to Earning Ratio (P/E)</b></td>
                <td>{{ data.pe }}</td>
            </tr>
            <tr>
                <td><b>Earning per Share (EPS) (cents) </b></td>
                <td>{{ data.eps }}</td>
            </tr>
            <tr>
                <td><b>Dividend per per Share (DPS) (cents) </b></td>
                <td>{{ data.dps }}</td>
            </tr>
            <tr>
                <td><b>Net Tangible Assets per share (NTA) </b></td>
                <td>{{ data.nta }}</td>
            </tr>
            <tr>
                <td><b>Price to Book Value (P/B) </b></td>
                <td>{{ data.pb }}</td>
            </tr>
            <tr>
                <td><b> Revenue per Share(RPS) </b></td>
                <td>{{ data.rps }}</td>
            </tr>
            <tr>
                <td><b>Price to Sales ratio (PSR) </b></td>
                <td>{{ data.psr }}</td>
            </tr>
            <tr>
                <td><b>Market Cap </b></td>
                <td>{{ data.marketcap }}</td>
            </tr>
            <tr>
                <td><b>Total Shares (mil) </b></td>
                <td>{{ data.total_share }}</td>
            </tr>
            <tr>
                <td><b>Dividen Last Pay Date</b></td>
                <td>{{ data.dividen_pay_date }}</td>
            </tr>
            <tr>
                <td><b>Dividen Last Quarter Declared</b></td>
                <td>{{ data.dividen_quarterly_declared }}</td>
            </tr>
            <tr>
                <td><b>Dividen 5 years average</b></td>
                <td>{{ data.dividen_5_year}}</td>
            </tr>
        </v-simple-table>
        <br>
        <v-simple-table>
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
        <br/>
        <v-simple-table style="width:100%">
            <tr>
                <th style="border: 1px solid black !important;border-collapse: collapse; width:15%;text-align: center;">Average Score</th>
                <th style="border: 1px solid black !important;border-collapse: collapse; width:15%;text-align: center;">Earnings</th>
                <th style="border: 1px solid black !important;border-collapse: collapse; width:15%;text-align: center;">Fundamental</th>
                <th style="border: 1px solid black !important;border-collapse: collapse; width:15%;text-align: center;">Relative Valuation</th>
                <th style="border: 1px solid black !important;border-collapse: collapse; width:15%;text-align: center;">Risk</th>
                <th style="border: 1px solid black !important;border-collapse: collapse; width:15%;text-align: center;">Price Momentum</th>
            </tr>
            <tr>
                <td style="border: 1px solid black !important;border-collapse: collapse;width:15%;text-align: center;">{{ data.alpha_avg }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;width:15%;text-align: center;">{{ data.alpha_ern }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;width:15%;text-align: center;">{{ data.alpha_fnd }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;width:15%;text-align: center;">{{ data.alpha_val }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;width:15%;text-align: center;">{{ data.alpha_rsk }}</td>
                <td style="border: 1px solid black !important;border-collapse: collapse;width:15%;text-align: center;">{{ data.alpha_mom }}</td>
               
                  
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
    <div class="container" style="text-align:center">
        <v-row>
            <v-col>
                <v-btn @click="showDiagram">1 month</v-btn>
            </v-col>
            <v-col>
                <v-btn @click="showDiagram1">3 month</v-btn>
            </v-col>
            <v-col>
                <v-btn @click="showDiagram2">6 month</v-btn>
            </v-col>
        </v-row>
        <PastData ref="PastData" :showSelect="0" >
        </PastData>
    </div>

</div>
</template>

<script>
import axios from 'axios';
import PastData from './PastData.vue';
export default {
    name: 'stock_detail',
    components: {
        PastData
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
        currentDateTime30() {
            var current = new Date();
            var currentMonth = current.getMonth()
            var prevMonth = parseInt(currentMonth)
            var prevYear = current.getFullYear()
            
            if( parseInt(prevMonth) == 0) {
                prevMonth = 12
                prevYear = current.getFullYear() - 1
            }
            prevMonth = ('0' + prevMonth).slice(-2)
            var date30 = prevYear + '-' + (prevMonth) + '-' + current.getDate();
            
            return date30;
        },
        currentDateTime90() {
            var current = new Date();
            var currentMonth = current.getMonth()
            var prev2Month = parseInt(currentMonth)-2
            var prevYear = current.getFullYear()
             if (parseInt(prev2Month) <= 0) {
                prevYear = current.getFullYear() - 1;
                
                prev2Month = 12 + prev2Month
            }
            
            var date90 = prevYear  + '-' + (prev2Month) + '-' + current.getDate();
            
            return date90;
        },
        currentDateTime180() {
            var current = new Date();
            var currentMonth = current.getMonth()
            var prev2Month = parseInt(currentMonth)-5
            var prevYear = current.getFullYear()
            if (parseInt(prev2Month) <= 0) {
                prevYear = current.getFullYear() - 1;
                prev2Month = 12 + prev2Month
            }
            var date180 = prevYear  + '-' + (prev2Month) + '-' + current.getDate();
            
            return date180;
        },
        currentDateTime() {
            var current = new Date();
            var date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();

            return date;
        },
        showDiagram() {
            var stock_code = ""
            if(this.datas.length >0) {
                stock_code = this.datas[0].code
            }
            this.$refs.PastData.Searchform(stock_code, this.currentDateTime30(), this.currentDateTime());
        },
        showDiagram1() {
            var stock_code = ""

            if(this.datas.length >0) {
                stock_code = this.datas[0].code
            }
            this.$refs.PastData.Searchform(stock_code, this.currentDateTime90(), this.currentDateTime());
        },
        showDiagram2() {
            var stock_code = ""

            if(this.datas.length >0) {
                stock_code = this.datas[0].code
            }
            this.$refs.PastData.Searchform(stock_code, this.currentDateTime180(), this.currentDateTime());
        },
        result() {
            var domain = this.WebUrl + "php_script/" 
   
            var script_name = 'stock_detail.php'
            var web = domain + script_name
            axios.post(web, {
                    stock_code: this.StockCode
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

    },
    created() {

       
        this.result()
    },
    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },
        StockCode() {
            return this.$store.state.StockCode;
        },
        WebUrl(){
            return this.$store.state.web_url;
        }

    },
    updated() {
        this.showDiagram();
    }
}
</script>

<style>
select {
    display: block !important;
}
</style>
