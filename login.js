//步驟關鍵字
//vue起手式
//配合html 將該定義的定好
//登錄:解構取出token & expired, document寫入cookie, 轉址
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.15/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';

const app = createApp({
    data(){
        return {
            user: {
                username: '',
                password: ''
            },
            //text: 'testtest'可以測試一下 看起手式有沒有掛上畫面
        }
    },
    methods: {
        login(){
            const api = `${site}admin/signin`;
            axios.post(api, this.user)
                .then(res => {
                    const { token, expired } = res.data;//解構 取出token expired
                    //console.log(token, expired);
                    document.cookie = `adminToken=${token}; expires=${new Date(expired)};`;//將token寫入cookie裡 儲存起來(儲存5天)
                    window.location = 'product.html';
                }).catch(err => {
                    alert(err.data.error.message);
                })
        },
    },
    mounted(){
        //console.log(this.text);測試一下 看起手式有沒有掛上畫面
    }
})

app.mount('#app');