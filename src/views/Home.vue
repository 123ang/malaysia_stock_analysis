<template>
<div style="background-color:black">
    <sorted-table :values="datas" ascIcon="<span> ▲</span>" descIcon="<span> ▼</span>">
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
                    <sort-link name="sma_20">
                        <span> SMA20</span>
                    </sort-link>
                </th>
                <th>
                    <sort-link name="bb_up">
                        <span>BB up</span>
                    </sort-link>
                </th>
                <th>
                    <sort-link name="bb_down">
                        <span> BB down</span>
                    </sort-link>
                </th>
                <th>
                    <sort-link name="macd">
                        <span>MACD</span>
                    </sort-link>
                </th>
                <th>
                    <sort-link name="macd_signal">
                        <span> MACD signal</span>
                    </sort-link>
                </th>
                <th>
                    <sort-link name="rsi">
                        <span> RSI</span>
                    </sort-link>
                </th>
                <th>
                    <sort-link name="signal">
                        <span> Buy or Sell Signal</span>
                    </sort-link>
                </th>
                <th>
                    <sort-link name="reason">
                        <span> Reason </span>
                    </sort-link>
                </th>
                <th>
                    <sort-link name="total_return">
                        <span> Return Rate%</span>
                    </sort-link>
                </th>
                <th>
                    <sort-link name="total_trade">
                        <span> Total Trade</span>
                    </sort-link>
                </th>
                <th>
                    <sort-link name="earn">
                        <span>Number of Wins</span>
                    </sort-link>
                </th>
                <th>
                    <sort-link name="loss">
                        <span> Number of Lose</span>
                    </sort-link>
                </th>
                <th>
                    <sort-link name="win_rate">
                        <span> Win Rate %</span>
                    </sort-link>
                </th>
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
                    <td>{{ value.sma_20 }}</td>
                    <td>{{ value.bb_up }}</td>
                    <td>{{ value.bb_down }}</td>
                    <td>{{ value.macd }}</td>
                    <td>{{ value.macd_signal }}</td>
                    <td>{{ value.rsi }}</td>
                    <td>{{ value.signal }}</td>
                    <td>{{ value.reason }}</td>
                    <td>{{ value.total_return }}</td>
                    <td>{{ value.total_trade }}</td>
                    <td>{{ value.earn }}</td>
                    <td>{{ value.loss }}</td>
                    <td>{{ value.win_rate }}</td>
                </tr>
            </tbody>
        </template>
    </sorted-table>
</div>
</template>

<script>
import axios from "axios";
import { SortedTable, SortLink } from "vue-sorted-table";
import store from "../store";
export default {
    name: "Home",
    components: {
        SortedTable,
        SortLink,
    },
    data() {
        return {
            datas: [],
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
    },
    created() {

        axios.post('https://stocks-my.unihash-ecosystem.com/php_script/getEmail.php', {
                email: this.UserEmail
            })
            .then(response => {
           
                if (response.data == 'success') {
                    axios
                        .get(
                            "https://stocks-my.unihash-ecosystem.com/php_script/stock_result.php"
                        )
                        .then((response) => {
                            this.datas = response.data;
                            console.log(this.datas);
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
                } else {
                    store.commit("IsLoggedIn", false);
                    this.$router.push("/login");
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    
},
computed: {
    UserEmail() {
        return this.$store.state.Email;
    },
    isLoggedIn() {
        return this.$store.state.isLoggedIn;
    },
},
};
</script>

<style>
.button-1 {
    width: 300px;
    height: 300px !important;
    font-size: 20px !important;
}

.div-flex {
    margin-top: 10%;
}

table,
th,
td {
    border-bottom: 1px white solid;
}
</style>
