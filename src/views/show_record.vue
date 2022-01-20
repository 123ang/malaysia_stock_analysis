<template>
<div>
    <h2 class="center-align indigo-text">Stock Record</h2>
    <div class="container z-depth-1">

        <div class="field start_date">
            <label for="date">Start Date: </label>
            <input type="date" id="start_date" name="start_date" v-model="start_date">
        </div>

        <div class="field end_date">
            <label for="date">End Date: </label>
            <input type="date" id="end_date" name="end_date" v-model="end_date">
        </div>

        <div style="text-align:center">
            <p v-if="feedback" class="red-text">{{ feedback }}</p>
            <v-btn class="btn pink" dark @click="Search">
                Search

            </v-btn> <br><br>
            <router-link :to="{ name: 'stock_trade_record' }">
                <v-btn dark depressed color="blue">Back</v-btn>
            </router-link>
            <br><br>
            <v-btn dark depressed color="green" v-on:click="download" v-if="datas.length > 0">Download in Excel</v-btn>
        </div>
    </div>

    <v-simple-table>
        <thead>
            <tr>
                <th>Shares</th>
                <th>Buy in (date)</th>
                <th>Buy Price</th>
                <th>Buy Volume (lot)</th>
                <th>Net Buy Price</th>
                <th>Sell out (date)</th>
                <th>Sell Price</th>
                <th>Sell Volume(lot)</th>
                <th>Net Sell price</th>
                <th>Update</th>
            </tr>
        </thead>
        <tbody>

            <!-- Update/Delete -->
            <tr v-for="(data, index) in datas" :key="index">
                <td>{{ data.stock_code}}</td>
                <td><span v-if="data.buy_sell == 'buy'">{{ data.created_at }} </span></td>
                <td><span v-if="data.buy_sell == 'buy'"> {{ data.single_price }}</span></td>
                <td><span v-if="data.buy_sell == 'buy'"> {{ data.volume }}</span></td>
                <td><span v-if="data.buy_sell == 'buy'"> {{ data.net_price }}</span></td>
                <td><span v-if="data.buy_sell == 'sell'"> {{ data.created_at }}</span></td>
                <td><span v-if="data.buy_sell == 'sell'">{{ data.single_price }}</span></td>
                <td><span v-if="data.buy_sell == 'sell'">{{ data.volume }}</span></td>
                <td><span v-if="data.buy_sell == 'sell'">{{ data.net_price }}</span></td>
                <td>
                    <v-btn depressed dark color="blue" @click="update_record(data.ID)">
                        <span>Update Record</span>
                    </v-btn>
                </td>
            </tr>
        </tbody>
    </v-simple-table>
</div>
</template>

<script>
import axios from 'axios';
import XLSX from 'xlsx';
import store from '../store' 
export default {
    name: 'show_record',
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
        Search() {
            var domain = 'https://stocks-my.unihash-ecosystem.com/php_script/'
            var script_name = 'stock_trading_record.php'
            var web = domain + script_name
            axios.post(web, {
                    request: 1,
                    start_date: this.start_date,
                    end_date: this.end_date,
                    user: this.UserEmail

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
        download() {
            const data = XLSX.utils.json_to_sheet(this.datas)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, data, 'data')
            XLSX.writeFile(wb, 'stock_record.xlsx')
        },
        update_record(trade_record) {
            store.commit("TradeRecord", trade_record)
            this.$router.push("/update-record");
        }

    },
    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },
        TradeRecord() {
            return this.$store.state.TradeRecord;
        }
    }
}
</script>

<style>
select {
    display: block !important;
}
</style>
