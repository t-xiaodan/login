import axios from "axios"

const request = axios.create({
})

/***********************响应拦截**************************/
request.interceptors.response.use(
    res => {   //拦截请求成功响应，做统一处理 
        if (res.data.success == null) {
            res.data.success = 0
        }
        return res;
    },
);
export {
    axios,
    request
}