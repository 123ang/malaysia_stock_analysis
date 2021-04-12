<template>
  <div>
    <div style="text-align: center">
      <h2>
        <span v-if="Language == 'en'">My Watchlist</span>
        <span v-if="Language == 'cn'">我关注的股票</span>
      </h2>
    </div>

    <br />
    <div class="container" style="background-color:black">
      <sorted-table
        :values="datas"
        ascIcon="<span> ▲</span>"
        descIcon="<span> ▼</span>"
      >
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
            <th>Remark</th>
            <th>Action</th>
          </tr>
        </thead>
        <template #body="sort">
          <tbody>
            <tr
              v-for="(value, index) in sort.values"
              :key="index"
              :class="textcolor(value.open_price, value.close_price)"
            >
              <td>{{ value.stock_code }}</td>
              <td>{{ value.stock_name }}</td>
              <td>{{ value.trade_record_date }}</td>
              <td>{{ parseFloat(value.open_price) }}</td>
              <td>{{ parseFloat(value.close_price) }}</td>
              <td>{{ parseFloat(value.high) }}</td>
              <td>{{ parseFloat(value.low) }}</td>
              <td>{{ parseFloat(value.volume) }}</td>
              <td>{{ value.candlestick_signal }}</td>
              <td><input type="text" v-model="value.remark" /></td>
              <td>
                <v-btn
                  color="blue"
                  @click="update(value.stock_ID, value.remark)"
                >
                  Update Remark
                </v-btn>
                <v-btn color="pink" @click="remove(value.stock_ID)">
                  Remove
                </v-btn>
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
export default {
  name: "SearchStock",
  components: {
    SortedTable,
    SortLink,
  },
  data: function () {
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
    watchlist_stocks() {
      this.datas = [];
      axios
        .post(
          "https://stocks-my.unihash-ecosystem.com/php_script/watchlist.php",
          {
            email: this.UserEmail,
            action: "show",
          }
        )
        .then((response) => {
          this.datas = response.data;
          console.log(this.datas);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    update(stockid, remark) {
      axios
        .post(
          "https://stocks-my.unihash-ecosystem.com/php_script/watchlist.php",
          {
            email: this.UserEmail,
            stockid: stockid,
            remark: remark,
            action: "update_remark",
          }
        )
        .then((response) => {
          alert(response.data);
          this.watchlist_stocks();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    remove(stockid) {
      axios
        .post(
          "https://stocks-my.unihash-ecosystem.com/php_script/watchlist.php",
          {
            email: this.UserEmail,
            stockid: stockid,
            action: "remove",
          }
        )
        .then((response) => {
          alert(response.data);
          this.watchlist_stocks();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.watchlist_stocks();
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
