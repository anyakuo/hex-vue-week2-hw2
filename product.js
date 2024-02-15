//步驟關鍵字
//vue起手式
//取資料:取出token帶入header, 把資料賦予給products & tempProduct
//回html渲染左側區塊(使用products的區塊)
//回html渲染右側區塊(使用tempProduct的區塊):@click 多圖(使用"可選串聯")
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.15/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'anyakuo';//const都要加; 不然會報錯

const app = createApp({
  data(){
    return {
      tempProduct: {},
      products: {},//products/all這個路徑拉下來的資料 會是物件。照理說只有陣列才能"遍歷"，但vue會幫忙整合，不影響v-for運作。在react就不允許物件這樣操作了，都要將物件轉陣列。
    }
  },
  methods: {
    checkAdmin(){
      const url= `${site}api/user/check`;
      axios.post(url)
        .then(() => {
          //console.log('驗證成功');
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = 'login.html';
        })
    },
    getData() {
      //3.發送請求取資料:建立api路徑, axios發送請求,資料存回products 
    const api = `${site}api/${api_path}/admin/products/all`;
    axios.get(api)
      .then((res) => {
        //console.log(res);
        this.products = res.data.products;
        //console.log(this.products);
        //console.log(this.tempProduct);
        //this.tempProduct = this.products;待確認 此行沒作用。可能在html 51行＠click處理掉了。yes,＠click用運算式處理掉了。延伸:也可以寫opentempProduct(),再綁在@click上。
      })
      .catch((err) => {
        alert(err.res.data.message);
      })
    },
  },
  mounted(){
    //1.從cookie中取出名为 adminToken 的token 
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)adminToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    //2.將token帶入headers做驗證
    axios.defaults.headers.common.Authorization = token;
    //console.log(token);
    this.checkAdmin();
    //this.getData();//此行getData可以不用寫，因為checkAdmin()24行有寫了
    //在這裡測試過，methods裡的函式 要在mounted(){...}裡呼叫，才會有作用。為甚麼login.js裡的mounted是空的，卻有login()的作用?因為login()綁在login.html 35行的@click上
  }
})

app.mount('#app');