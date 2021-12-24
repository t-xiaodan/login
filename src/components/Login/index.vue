<template>
    <form id="uname" @submit.prevent="submitLogin">
        <div class="are">
            <label class="are-title">
                <span>输入账号</span>
            </label>
            <label class="are-input">
                <input type="text" required="required" placeholder="请输入用户名" v-model.trim="user.username" />
            </label>
        </div>
        <div class="are">
            <label class="are-title">
                <span>输入密码</span>
            </label>
            <label class="are-input">
                <input type="password" required="required" placeholder="请输入用户密码" v-model.trim="user.password" />
            </label>
        </div>
        <div class="are">
            <label class="are-answer">
                <div class="answer-image" title="刷新验证码" @click="get()">
                    <img :src="result.captchaUrl" alt="加载验证码">
                </div>
                <div class="auto"></div>
                <input type="text" placeholder="验证码" required="required" v-model.trim="user.answer">
            </label>
        </div>
        <div class="are">
            <button class="are-submit" :disabled="disabled">登录</button>
        </div>
    </form>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            //用户登录数据
            user: {
                username: "",
                password: "",
                requestId: "",
                answer: ""
            },
            //登录验证数据
            result: {
                captchaUrl: "",
                captchaId: "",
                loginCategory: ""
            },
            disabled: false
        }
    },
    created() {
        this.get()
    },
    methods: {
        //刷新验证码请求接口
        get() {
            axios({
                url: "/api/session/startSession/",
                method: "POST",
            }).then(res => {
                if (res.data.success == null || res.data.success == 0) {
                    this.result = res.data.result
                } else if (res.data.error) {
                    console.log("登录错误，请重新登录");
                }
            })
        },
        //表单提交登录请求接口
        submitLogin() {
            this.disabled = true
            this.user.requestId = this.result.captchaId
            axios({
                url: "/api/session/login/",
                method: "POST",
                header: {
                    sessionId: ""
                },
                data: this.user,
            }).then(res => {
                if (res.data.success == 0) {
                    console.log("登录成功", res.data);
                    // location.href = "/";
                    this.$router.push('/')
                } else if (res.data.error) {
                    console.log(res.data.error);
                }
                this.disabled = false
                return
            })

        }

    }
}

</script>

<style scoped>
form#uname {
    display: block;
    height: 100%;
    width: 100%;
}
.are {
    position: relative;
    width: 100%;
    padding: 10px 0;
    text-align: left;
}

label.are-title span {
    color: #5c9aff;
    font-size: 12px;
}
label.are-input {
    display: block;
    height: 36px;
    margin-top: 7px;
}

label.are-input input {
    width: 100%;
    height: 100%;
    border: 1px solid #eae9e9;
    color: rgb(0, 0, 0);
    font-size: 13px;
    border-radius: 6px;
    padding: 5px 10px;
    background-color: #eee;
}
.are-submit {
    border: none;
    color: rgb(255, 255, 255);
    background-color: #5c9aff;
    width: 100%;
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.6rem;
}
.are-submit:hover {
    opacity: 0.8;
}

label.are-answer {
    display: flex;
    flex-wrap: wrap;
    height: 36px;
    margin-top: 7px;
    position: relative;
    cursor: pointer;
}
label.are-answer input {
    flex: 0 0 100%;
    max-width: 100px;
    height: 100%;
    border: 1px solid #eae9e9;
    color: rgb(0, 0, 0);
    font-size: 12px;
    border-radius: 6px;
    padding: 5px 10px;
    background-color: #eee;
}
.answer-image {
    height: 36px;
}
.answer-image img {
    height: 100%;
}
.auto {
    flex: auto;
}
</style>