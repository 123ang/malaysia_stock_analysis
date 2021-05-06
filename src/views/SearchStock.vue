<template>
<div>
    <div class="register container z-depth-1">
        <div style="text-align: center">
            <h2>
                <span v-if="Language == 'en'">Search A Stock in Bursa Malaysia</span>
                <span v-if="Language == 'cn'">查寻马来西亚股票</span>
            </h2>
        </div>
        <div class="field code_name">
            <label for="code_name">
                <span v-if="Language == 'en'">Search By :</span>
                <span v-if="Language == 'cn'">查寻</span>
            </label>

            <select v-model="code_name" @change="changeType">
                <option disabled value="">
                    <span v-if="Language == 'en'">Please select one </span>
                    <span v-if="Language == 'cn'">请选一个</span>
                </option>

                <option value="code">
                    <span v-if="Language == 'cn'">代号</span>
                    <span v-if="Language == 'en'">Code</span>
                </option>
                <option value="name">
                    <span v-if="Language == 'cn'">名字</span>
                    <span v-if="Language == 'en'">Name</span>
                </option>
            </select>
            <v-divider></v-divider>
        </div>
        <div class="field input_field">
            <label for="input_field">
                {{ input_type }}
            </label>
            <input type="text" v-model="input_field" />
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
    <div class="container" style="background-color:#1E1E1E">
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
                        <td>{{ parseFloat(value.open_price) }}</td>
                        <td>{{ parseFloat(value.close_price) }}</td>
                        <td>{{ parseFloat(value.high) }}</td>
                        <td>{{ parseFloat(value.low) }}</td>
                        <td>{{ parseFloat(value.volume) }}</td>
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
            code_name: "code",
            input_field: "",
            feedback: "",
            input_type: "",
            searched: false,
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
        go_detail(StockCode) {

            store.commit("StockCode", StockCode)

            this.$router.push("/stock-detail");
        },
        search() {
            this.feedback = "";
            this.searched = true;
            // console.log(this.code_name)
            // console.log(this.input_field)
            axios
                .post(
                    "https://stocks-my.unihash-ecosystem.com/php_script/search_stock.php", {
                        code_name: this.code_name,
                        value: this.input_field,
                    }
                )
                .then((response) => {
                    this.datas = response.data;
                    this.datas.forEach(function (data) {
                        data.open_price = parseFloat(data.open_price);
                        data.close_price = parseFloat(data.close_price);
                        data.high = parseFloat(data.high);
                        data.low = parseFloat(data.low);
                        data.volume = parseFloat(data.volume);
                    });
                    //console.log(this.datas)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        add_watchlist(stockid) {
            axios
                .post(
                    "https://stocks-my.unihash-ecosystem.com/php_script/watchlist.php", {
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
        changeType() {
            switch (this.code_name) {
                case "code":
                    if (this.Language == "cn") {
                        this.input_type = "代号";
                    }
                    if (this.Language == "en") {
                        this.input_type = "Code";
                    }
                    break;
                case "name":
                    if (this.Language == "cn") {
                        this.input_type = "名字";
                    }
                    if (this.Language == "en") {
                        this.input_type = "Name";
                    }
                    break;
            }
        },
    },
    created() {
        this.changeType();
    },
    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },
        Language() {
            return this.$store.state.language;
        },
    },
};
</script>

<style>
select {
    display: block !important;
}
</style>
