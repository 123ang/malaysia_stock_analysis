<template>
<div>
    <div class="register container z-depth-1">
        <div class="field price">
            <label for="price">
                <span v-if="Language == 'en'">Price:</span>
                <span v-if="Language == 'cn'">价钱:</span>
            </label>
            <br><br><br>
            <VueSimpleRangeSlider style="width: 300px" :min="0.01" :max="500" :logarithmic="true" v-model="range" />
            <p>
                Min Price: <input type="text" v-model="range[0]" />
            </p>
            <p>
                Max Price: <input type="text" v-model="range[1]" />
            </p>
        </div>
        <div class="field volume">
            <label for="volume">
                <span v-if="Language == 'en'">Volume:</span>
                <span v-if="Language == 'cn'">量:</span>
            </label>
            <br><br><br>
            <VueSimpleRangeSlider style="width: 300px" :min="1" :max="1000000000" :logarithmic="true" v-model="volume_range" />
            <p>
                Min Volume: <input type="text" v-model="volume_range[0]" />
            </p>
            <p>
                Max Volume: <input type="text" v-model="volume_range[1]" />
            </p>
        </div>
        <div class="field sector">
            <label for="sector">
                <span v-if="Language == 'en'">Sector:</span>
                <span v-if="Language == 'cn'">行业:</span>
            </label>
            <select id="sector" v-model="sector">
                <option value="">All</option>
                <option v-for="(sector_data, index) in sector_datas" :key="index" v-bind:value="sector_data.name">
                    {{ sector_data.name }}

                </option>
            </select>
            <v-divider></v-divider>
        </div>
        <div class="field trend">
            <label for="trend">
                <span v-if="Language == 'en'">Trend:</span>
                <span v-if="Language == 'cn'">趋势：</span>
            </label>
            <select id="sector" v-model="trend">
                <option value="">All</option>
                <option value="up">Up trend</option>
                <option value="down">Down trend</option>
                <option value="no">No trend</option>
            </select>
            <v-divider></v-divider>
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
    <br>
    <div style="background-color:#1E1E1E">
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
                    <th style="color:white;"> Details </th>
                </tr>
            </thead>
            <template #body="sort">
                <tbody>
                    <tr v-for="(value, index) in sort.values" :key="index" :class="textcolor(value.open_price, value.close_price)">
                        <td>{{ value.stock_code }}</td>
                        <td>{{ value.name }}</td>
                        <td>{{ value.trade_record_date }}</td>
                        <td>{{ value.open_price }}</td>
                        <td>{{ value.close_price }}</td>
                        <td>{{ value.high }}</td>
                        <td>{{ value.low }}</td>
                        <td>{{ value.volume }}</td>
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
import VueSimpleRangeSlider from 'vue-simple-range-slider';
import 'vue-simple-range-slider/dist/vueSimpleRangeSlider.css'
export default {
    name: "Home",
    components: {
        SortedTable,
        SortLink,
        VueSimpleRangeSlider,
    },
    data() {
        return {
            datas: [],
            range: [0.1, 0.5],
            volume_range: [1, 100000000],
            sector_datas: [],
            sector: "",
            trend: "",
            feedback: ""
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
        search() {
            console.log(this.range[0])
            let url = this.WebUrl + "php_script/" + "stock_result.php"
            console.log(url)
            axios.post(
                    url, {
                        min_price: this.range[0],
                        max_price: this.range[1],
                        min_volume: this.volume_range[0],
                        max_volume: this.volume_range[1],
                        //sector: this.sector,
                        trend: this.trend
                    }
                )
                .then((response) => {
                    this.datas = response.data;
                    console.log(response.data);

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
        get_sector() {
            var domain = this.WebUrl + 'php_script/'
            var script_name = 'get_sector.php'
            var web = domain + script_name
            axios.post(web)
                .then(response => {

                    this.sector_datas = response.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    created() {
        this.get_sector()
        this.search()
    },
    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },
        isLoggedIn() {
            return this.$store.state.isLoggedIn;
        },
        StockCode() {
            return this.$store.state.StockCode;
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
    border-bottom: 0.5px white solid !important;
}

table {
    position: relative;
}

th {
    position: sticky;
    top: 0;
    background-color:white;
    color:black;
}
</style>
