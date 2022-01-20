<template>
<div>
    <div class="register container z-depth-1">
        <div style="text-align: center">
            <h2>
                <span v-if="Language == 'en'">Today Stock Suggestion</span>
                <span v-if="Language == 'cn'">今天股票推荐</span>
            </h2>
        </div>
        <div class="field technical_analysis">
            <label for="technical_analysis">
                <span v-if="Language == 'en'">Technical Analysis :</span>
                <span v-if="Language == 'cn'">技术分析</span>
            </label>

            <v-checkbox v-model="technical_analysis" label="RSI < 30" value="rsi_under_30"></v-checkbox>
            <v-checkbox v-model="technical_analysis" label="RSI > 70" value="rsi_above_70"></v-checkbox>
            <v-checkbox v-model="technical_analysis" label="MACD Sell Signal" value="macd_sell"></v-checkbox>
            <v-checkbox v-model="technical_analysis" label="MACD Buy Signal" value="macd_buy"></v-checkbox>
            <v-checkbox v-model="technical_analysis" label="Below Bonlinger Band" value="below_bonlinger_band"></v-checkbox>
            <v-checkbox v-model="technical_analysis" label="Above Bonlinger Band" value="above_bonlinger_band"></v-checkbox>
            <v-checkbox v-model="technical_analysis" label="Current Price below Than MA 20" value="below_ma20"></v-checkbox>
            <v-checkbox v-model="technical_analysis" label="Current Price Above MA 20" value="above_ma20"></v-checkbox>
        </div>
        <div class="field input_field">
            <label for="candlestick_pattern">
                <span v-if="Language == 'en'">Candlestick Patterns:</span>
                <span v-if="Language == 'cn'">烛台模式</span>
            </label>
            <v-checkbox v-model="candlestick_pattern" label="Hammer" value="hammer"></v-checkbox>
            <v-checkbox v-model="candlestick_pattern" label="Inverse Hammer" value="inverse_hammer"></v-checkbox>
            <v-checkbox v-model="candlestick_pattern" label="Bullish Engulfing" value="bullish_engulfing"></v-checkbox>
            <v-checkbox v-model="candlestick_pattern" label="Piercing Line" value="piercing_line"></v-checkbox>
            <v-checkbox v-model="candlestick_pattern" label="Morning Star" value="morning_star"></v-checkbox>
            <v-checkbox v-model="candlestick_pattern" label="Three White Soldiers" value="three_white_soldiers"></v-checkbox>
            <v-checkbox v-model="candlestick_pattern" label="Three Black Soldiers" value="three_black_soldiers"></v-checkbox>
        </div>
        <div style="text-align: center">
            <p v-if="feedback" class="red-text">{{ feedback }}</p>
            <v-btn class="btn blue" dark @click="search">
                <span v-if="Language == 'en'">Search</span>
                <span v-if="Language == 'cn'">寻找</span>
            </v-btn>
            <br /><br />
        </div>
    </div>
    <br />
    <div style="background-color:#1E1E1E">
        <sorted-table :values="datas" ascIcon="<span> ▲</span>" descIcon="<span> ▼</span>" v-if="searched">
            <thead>
                <tr style="text-align: center; vertical-align: middle">
                    <th>
                        <sort-link name="code">
                            <span>Stock</span>
                        </sort-link>
                    </th>
                    <th>
                        <sort-link name="name">
                            <span>Stock Name</span>
                        </sort-link>
                    </th>
                    <th>
                        <sort-link name="trade_record_date">
                            <span>Date Analysis</span>
                        </sort-link>
                    </th>
                    <th>
                        <sort-link name="open_price">
                            <span>Open </span>
                        </sort-link>
                    </th>
                    <th>
                        <sort-link name="close_price">
                            <span> Close</span>
                        </sort-link>
                    </th>
                    <th>
                        <sort-link name="high">
                            <span> High</span>
                        </sort-link>
                    </th>
                    <th>
                        <sort-link name="low">
                            <span> Low</span>
                        </sort-link>
                    </th>
                    <th>
                        <sort-link name="volume">
                            <span> Volume</span>
                        </sort-link>
                    </th>

                    <th>
                        <sort-link name="candlestick_signal">
                            <span> Candlestick Signal</span>
                        </sort-link>
                    </th>
                    <th>Action</th>
                </tr>
            </thead>
            <template #body="sort">
                <tbody>
                    <tr v-for="(value, index) in sort.values" :key="index" :class="textcolor(value.open_price, value.close_price)">
                        <td>{{ value.stock_code }}</td>
                        <td>{{ value.stock_name }}</td>
                        <td>{{ value.trade_record_date }}</td>
                        <td>{{ value.open_price }}</td>
                        <td>{{ value.close_price }}</td>
                        <td>{{ value.high }}</td>
                        <td>{{ value.low }}</td>
                        <td>{{ value.volume }}</td>
                        <td>{{ value.candlestick_signal }}</td>
                        <td>
                            <v-btn dark color="blue" style="margin-right:5px" @click="add_watchlist(value.stock_ID)">
                                Add to my watchlist
                            </v-btn>
                            <v-btn dark color="green" @click="go_detail(value.stock_code)">Details </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </sorted-table>
    </div>
    <br /><br />
</div>
</template>

<script>
import axios from "axios";
import { SortedTable, SortLink } from "vue-sorted-table";
import store from "../store";
export default {
    name: "SearchStock",
    components: {
        SortedTable,
        SortLink,
    },
    data: function () {
        return {
            technical_analysis: [],
            candlestick_pattern: [],
            feedback: "",
            datas: [],
            searched: false,
        };
    },
    methods: {
        textcolor: function (open, close) {
            if (close - open > 0) {
                return "green--text";
            } else if (close - open < 0) {
                return "red--text";
            } else {
                return "white--text";
            }
        },
        search() {
            this.feedback = "";
            this.searched = true;
            let url = this.WebUrl + "php_script/" + "filter_stock.php"
            axios
                .post(
                    url, {
                        technical_analysis: JSON.stringify(this.technical_analysis),
                        candlestick_pattern: JSON.stringify(this.candlestick_pattern),
                    }
                )
                .then((response) => {
                    this.datas = response.data;
                    console.log(response.data)
                    this.datas.forEach(function (data) {
                        data.open_price = parseFloat(data.open_price);
                        data.close_price = parseFloat(data.close_price);
                        data.high = parseFloat(data.high);
                        data.low = parseFloat(data.low);
                        data.volume = parseFloat(data.volume);
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        go_detail(StockCode) {

            store.commit("StockCode", StockCode)

            this.$router.push("/stock-detail");
        },
        add_watchlist(stockid) {
            let url = this.WebUrl + "php_script/" + "watchlist.php"
            axios
                .post(
                    url, {
                        email: this.UserEmail,
                        stockid: stockid,
                        action: "add",
                    }
                )
                .then((response) => {
                    alert(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    created() {},
    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },
        Language() {
            return this.$store.state.language;
        },
        WebUrl(){
            return this.$store.state.web_url;
        }
    },
};
</script>

<style>
select {
    display: block !important;
}
</style>
