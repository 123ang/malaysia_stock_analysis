<template>
<div>
    <div class="register container z-depth-1">
        <div style="text-align:center">
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
            <input type="text" v-model="input_field">
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
            code_name: "code",
            input_field: "",
            feedback: "",
            input_type: ""
        };
    },
    methods: {
        search() {
            this.feedback = ""

        },
        changeType() {
            switch(this.code_name) {
                case 'code' :
                    if(this.Language == 'cn') {
                        this.input_type = "代号"
                    }
                    if(this.Language == 'en') {
                        this.input_type = "Code"
                    }
                    break;
                case 'name' :
                     if(this.Language == 'cn') {
                        this.input_type = "名字"
                    }
                    if(this.Language == 'en') {
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
