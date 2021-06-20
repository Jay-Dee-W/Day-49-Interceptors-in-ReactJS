import axios from 'axios'

export default function setupInterceptors(history) {
    axios.baseURL = "http://localhost:3300"

    axios.interceptors.request.use(
        function (req) {
            console.log('req:', req)
            let token = localStorage.getItem("token")
            if (!token) {
                console.log("Token not found")
            } else {
                req.headers['authorization'] = "Bearer " + token
            }
            return req
        },
        function (error) {
            
            return Promise.reject(error)
        }
    )

    axios.interceptors.response.use(
        function (res) {
            console.log('res:', res)
            return res
        },
        async function (error) {
            console.log('error:', error)
            const originalRequest = error.config
            console.log('original req', originalRequest)

            let {status} = error.response
            if (status === 403 && localStorage.getItem('access_token') && !originalRequest._retry){
                originalRequest._retry = true
                await createNewToken()
                return axios(originalRequest)
            } else
            if (status === 403 || status === 401) {
                history.push("/login")
            }
            return Promise.reject(error)
            
        }
    )
}

async function createNewToken() {
    let result = await axios.post('/auth/token', {'refesh_token' : localStorage.getItem('refresh_token')})
    console.log(result.data.access_token)
    localStorage.setItem('access_token', result.data.access_token)
}