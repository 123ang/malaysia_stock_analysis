<template>
<div>
    <div class="register container z-depth-1">
        <div style="text-align:center">
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
            <v-checkbox v-model="technical_analysis" label="RSI > 30" value="rsi_above_70"></v-checkbox>
            <v-checkbox v-model="technical_analysis" label="MACD Sell Signal" value="macd_sell"></v-checkbox>
            <v-checkbox v-model="technical_analysis" label="MACD Buy Signal" value="macd_buy"></v-checkbox>
            <v-checkbox v-model="technical_analysis" label="Below Bonlinger Band" value="below_bonlinger_band"></v-checkbox>
            <v-checkbox v-model="technical_analysis" label="Above Bonlinger Band" value="above_bonlinger_band"></v-checkbox>
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
        </div>
        <div style="text-align:center">
            <p v-if="feedback" class="red-text">{{ feedback }}</p>
            <v-btn class="btn blue" dark @click="search">
                <span v-if="Language=='en'">Search</span>
                <span v-if="Language == 'cn'">寻找</span>
            </v-btn>
            <br><br>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: "SearchStock",
    components: {

    },
    data: function () {
        return {
            technical_analysis: [],
            candlestick: [],
            feedback: "",
        };
    },
    methods: {
        search() {
            this.feedback = ""

        },
        changeType() {
            switch (this.code_name) {
                case 'code':
                    if (this.Language == 'cn') {
                        this.input_type = "代号"
                    }
                    if (this.Language == 'en') {
                        this.input_type = "Code"
                    }
                    break;
                case 'name':
                    if (this.Language == 'cn') {
                        this.input_type = "名字"
                    }
                    if (this.Language == 'en') {
                        this.input_type = "Name"
                    }
                    break;
            }
        }
    },
    created() {
        this.changeType()
    },
    computed: {
        UserEmail() {
            return this.$store.state.Email;
        },
        Language() {
            return this.$store.state.language;
        }

    }

}
</script>

<style>
select {
    display: block !important;
}
</style>
