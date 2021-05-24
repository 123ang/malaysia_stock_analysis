<template>
<div>
    <h2 v-show="showSelect" class="center-align indigo-text">Stock Past Data</h2>
    <div v-show="showSelect" class="container z-depth-1">
        <div class="field stock_code">
            <label for="stock_code">Stock Code: </label>
            <input id="stock_code" v-model="stock_code" />
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
            </v-btn>
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
                <th>Open</th>
                <th>Close</th>
                <th>High</th>
                <th>Low</th>
                <th>Volume</th>
            </tr>
        </thead>
        <tbody>

            <!-- Update/Delete -->
            <tr v-for="(data, index) in datas" :key="index">
                <td>{{ data.created_at  }}</td>
                <td>{{ data.open }}</td>
                <td>{{ data.close }}</td>
                <td>{{ data.high }}</td>
                <td>{{ data.low }}</td>
                <td>{{ data.volume }}</td>
            </tr>
        </tbody>
    </v-simple-table>
    <div class="container">
        <div class="chart" v-if="loaded" style="text-align:center">
            <apexchart width="1200" height="290" type="candlestick" :options="options" :series="series"></apexchart>
        </div>
        <div id="chart-bar" v-if="loaded">
            <apexchart type="bar" height="160" width="1200" :options="chartOptionsBar" :series="seriesBar"></apexchart>
        </div>
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
    props: {showSelect:{
        type:String,
        default:"1"
    }},
    data() {
        return {
            options: "",
            series: [],
            datas: [],
            feedback: null,
            start_date: null,
            end_date: null,
            candlestick_dataset: [],
            loaded: false,
            title: "",
            stock_code: "",
            show_table: false,
            report_table: "",
            base: "",
            base_type: "",
            seriesBar: [],
            chartOptionsBar: {}
        }
    },
    methods: {
        generate_table() {
            if (!this.show_table) {
                this.show_table = true
            } else {
                this.show_table = false
            }

        },
        Search() {
            
            axios.post('https://stocks-my.unihash-ecosystem.com/php_script/get_candle_stick_volume.php', {
                    stock_code: this.stock_code,
                    start_date: this.start_date,
                    end_date: this.end_date,

                })
                .then(response => {
                    this.datas = response.data;
                    this.generate_graph()
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error));
                    console.log("error response :" + error.response)
                    console.log("error status :" + error.status)
                });

        },
         Searchform(code,startDate,EndDate) {
           
            axios.post('https://stocks-my.unihash-ecosystem.com/php_script/get_candle_stick_volume.php', {
                    stock_code: code,
                    start_date: startDate,
                    end_date: EndDate,

                })
                .then(response => {
                    this.datas = response.data;
                    this.generate_graph()
                })
                .catch(function (error) {
                    
                    console.log(JSON.stringify(error));
                    console.log("error response :" + error.response)
                    console.log("error status :" + error.status)
                });

        },
        generate_graph() {

            var full_array = []
            var volume_array = []
            var dt_array = []

            var i
            for (i = 0; i < this.datas.length; i++) {
                full_array[i] /*property name or key of choice*/ = {
                    'x': this.datas[i].created_at,
                    'y': [
                        parseFloat(this.datas[i].open),
                        parseFloat(this.datas[i].high),
                        parseFloat(this.datas[i].low),
                        parseFloat(this.datas[i].close)
                    ]

                };
            }
            for (i = 0; i < this.datas.length; i++) {
                volume_array[i] /*property name or key of choice*/ = {
                    'x': this.datas[i].created_at,
                    'y': parseFloat(this.datas[i].volume)

                };
            }

            this.loaded = true
            this.series = [{
                data: full_array

            }]
            this.options = {
                chart: {
                    type: 'candlestick',
                    height: 290,
                    id: 'candles',
                    toolbar: {
                        autoSelected: 'pan',
                        show: false
                    },
                    zoom: {
                        enabled: false
                    },
                },
                title: {
                    text: 'Past Data for ' + this.stock_code,
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
            this.seriesBar = [{
                name: 'volume',
                data: volume_array
            }]
            this.chartOptionsBar = {
                chart: {
                    height: 160,
                    type: 'bar',
                    brush: {
                        enabled: true,
                        target: 'candles'
                    },
                    selection: {
                        enabled: true,
                        xaxis: {
                            min: dt_array[0],
                            max: dt_array[dt_array.length - 1]
                        },
                        fill: {
                            color: '#ccc',
                            opacity: 0.4
                        },
                        stroke: {
                            color: '#0D47A1',
                        }
                    },
                },
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    bar: {
                        columnWidth: '80%',
                        colors: {
                            ranges: [{
                                from: -1000,
                                to: 0,
                                color: '#F15B46'
                            }, {
                                from: 1,
                                to: 10000,
                                color: '#FEB019'
                            }],

                        },
                    }
                },
                stroke: {
                    width: 0
                },
                xaxis: {
                    type: 'datetime',
                    axisBorder: {
                        offsetX: 13
                    }
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                }
            }

        },

        download() {
            const data = XLSX.utils.json_to_sheet(this.datas)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, data, 'data')
            XLSX.writeFile(wb, 'stock_past_data_record.xlsx')
        }
    },

    created() {
        this.stock_code = this.StockCode
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
