<template>
<div>
    <h2 class="center-align indigo-text">Estimate Price for Quatro Report Summary</h2>
    <div class="container z-depth-1">
        <div class="field report_type">
            <label for="report_type">Report type: </label>
            <input id="report_type" v-model="report_type"/>
               
            <v-divider></v-divider>
        </div>
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
            <router-link :to="{ name: 'QuatroHome' }">
                <v-btn class="btn-1" depressed color="blue">Back</v-btn>
            </router-link>
            <br><br>
            <v-btn class="btn-1" depressed color="green" v-on:click="download" v-if="datas.length > 0">Download in Excel</v-btn>
            <br><br>
            <v-btn class="btn-1" depressed color="yellow" v-on:click="generate_table" v-if="datas.length > 0">Generate Table</v-btn>
        </div>
    </div>
    <v-simple-table v-if="show_table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Estimated Price</th>
            </tr>
        </thead>
        <tbody>

            <!-- Update/Delete -->
            <tr v-for="(data, index) in datas" :key="index">
                <td>{{ data.created_at }}</td>
                <td>{{ data.estimated }}</td>
            </tr>
        </tbody>
    </v-simple-table>

    <div class="chart" v-if="loaded" style="text-align:center">
        <h3>Estimated Price for {{ title }}</h3>
        <line-chart :chart-data="dataprice"></line-chart>
        <br>
        <apexchart width="800" type="candlestick" :options="options" :series="series"></apexchart>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import XLSX from 'xlsx';
import VueApexCharts from 'vue-apexcharts'
export default {
    name: 'PassData',
    components: {
        'apexchart': VueApexCharts
    },
    data() {
        return {
            options: "",
            series: [],
            datas: [],
            feedback: null,
            start_date: null,
            end_date: null,
            dataprice: null,
            datavolume: null,
            loaded: false,
            title: "",
            report_type: "",
            show_table: false,
            report_table: "",
            base: "",
            base_type: "",
        }
    },
    methods: {
        generate_table() {
            this.show_table = true
        },
        Search() {
            
            axios.post('https://stocks-my.unihash-ecosystem.com/php_script/get_candle_stick_volume.php', {
                    report_type: 'my_'+ this.report_type,
                    start_date: this.start_date,
                    end_date: this.end_date,

                })
                .then(response => {

                    var price = [];
                    var date = [];
                    this.datas = response.data;
                    this.datas.forEach(function (data) {
                        price.push(data.estimated);
                        date.push(data.created_at);
                    });
                    this.loaded = true;
                    this.dataprice = {
                        labels: date,
                        datasets: [{
                            label: this.title + ' Price',
                            backgroundColor: '#f87979',
                            // Data for the x-axis of the chart
                            borderColor: '#f87979',
                            fill: false,
                            data: price
                        }]
                    }

                })
                .catch(function (error) {
                    console.log(JSON.stringify(error));
                    console.log("error response :" + error.response)
                    console.log("error status :" + error.status)
                });
            axios.post('https://unihash-ecosystem.com/quatro/get_candle_stick_volume.php', {
                    report_table: this.report_table,
                    start_date: this.start_date,
                    end_date: this.end_date,
                    base: this.base

                })
                .then(response => {
                    //console.log(response.data)
                    this.series = [{
                        data: response.data

                    }]
                    this.options = {
                        title: {
                            text: 'Volume in Pool for ' + this.base_type,
                            align: 'left'
                        },
                        xaxis: {
                            type: 'datetime'
                        },
                        yaxis: {
                            tooltip: {
                                enabled: true
                            }
                        },
                        candlestick: {
                            wick: {
                                useFillColor: true,
                            }
                        }
                    }

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
            XLSX.writeFile(wb, 'quatro_record.xlsx')
        }

    },
    created() {

    },

    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },

    }
}
</script>

<style>
select {
    display: block !important;
}
</style>
