<template>
    <div class="city_body">
        <div class="city_list">
            <Loading v-if="isLoading" />
            <Scroller ref="cityList" v-else>
                <div>
                <div class="city_hot">
                    <h2>热门城市</h2>
                    <ul class="clearfix">
                        <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm, item.id)">{{ item.nm }}</li>
                    </ul>
                </div>
                <div class="city_sort" ref="city_sort">
                    <div v-for="item in cityList" :key="item.index">
                        <h2>{{ item.index }}</h2>
                        <ul>
                            <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm, itemList.id)">{{ itemList.nm }}</li>
                        </ul>
                    </div>	
                </div>
                </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{ item.index}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'City',
    data (){
        return {
            cityList: [],
            hotList: [],
            isLoading: true
        }
    },
    created () {
        // 什么时候取本地存储的数据，如果有本地存储就走本地存储，不用再发起新的请求。
        // 取本地存储的数据
        var cityList = window.localStorage.getItem('cityList');
        var hotList = window.localStorage.getItem('hotList');

        if(cityList && hotList){
            this.cityList = JSON.parse(cityList); // 将数据再转回成数组
            this.hotList = JSON.parse(hotList);
            this.isLoading = false;
        } else {
            this.axios.get('/api/cityList').then((res) => {
                // console.log(res.data);
                var msg = res.data.msg;
                if(msg === 'ok'){
                    var cities = res.data.data.cities;
                    // 数据改造成这样
                    // [ { index : 'A' ,  list : [{nm: '安阳' , id : 123 }]  }  ]
                    // 解构赋值
                    var { cityList,hotList } = this.formatCityList(cities);
                    this.cityList = cityList;
                    this.hotList = hotList;
                    this.isLoading = false;
                    // 本地存储 Local Storage
                    // 第一个参数是key值，存的内容是返回的数组cityList (本地存储是字符串类型的，所以将cityList转为字符串，就变成了一个字符串格式的数组)
                    window.localStorage.setItem('cityList', JSON.stringify(cityList)); // Stringify将数据转为字符串
                    window.localStorage.setItem('hotList', JSON.stringify(hotList));
                }
            });
        }
    },
    methods : {
        // 数据格式化
        formatCityList(cities){
            var cityList = []; // 城市分类
            var hotList = []; // 热门城市

            // 检索热门城市
            for (var i=0; i< cities.length; i++){
                if(cities[i].isHot === 1){
                    hotList.push(cities[i]);
                }
            }

            // 改造数据 -》 将传过来的数据改造
            for(var i=0; i<cities.length; i++){
                // 查找第一个字母
                var firstLetter = cities[i].py.substring(0,1).toUpperCase();
                // 如果在结果集中就走else，不在结果集当中走if
                if(toCom(firstLetter)){ // 新添加index
                    cityList.push({ index: firstLetter, list: [{ nm: cities[i].nm, id: cities[i].id}] })
                } else { // 累加到已有index中
                    for(var j=0; j<cityList.length; j++){
                        if(cityList[j].index === firstLetter ){
                            cityList[j].list.push( {nm: cities[i].nm, id: cities[i].id} );
                        }
                    }
                }
            }
            // sort排序
            cityList.sort((n1,n2) => {
                if(n1.index > n2.index ){
                    return 1;
                } else if(n1.index < n2.index ){
                    return -1;
                } else {
                    return 0;
                }
            });
            // 判断cityList中的index是否存在结果集中
            function toCom(firstLetter){
                for(var i=0; i< cityList.length; i++){
                    // 判断cityList的index跟 firstLetter
                    if( cityList[i].index === firstLetter ){
                        // 如果匹配成功，return fasle 说明index已经存在了，所以要往cityList添加
                        return false;
                    }
                }
                // 如果都没有匹配成功，return true
                return true;
            }
            // console.log(cityList);
            // console.log(hotList);
            return {
                cityList,
                hotList
            }
        },
        handleToIndex(index) {
            // 先用原生的写 先获取 h2元素
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            // city_sort的父节点是city_list scrollTop -> 当前元素顶部距离最近的父元素顶部距离，和有无滚动条没关系只读元素
            // 用了better-scroll原生的方法也就是下面这句不能用了。
            // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
            this.$refs.cityList.toScrollTop( -h2[index].offsetTop );
        },
        handleToCity(nm, id){
            // 修改状态管理
            // 不涉及到异步，可以使用commit
            this.$store.commit('city/CITY_INFO',{nm, id});
            // 利用本地存储，将传过来的nm 和 id都保存起来，在初始的状态取数据
            window.localStorage.setItem('nowNm',nm);
            window.localStorage.setItem('nowId',id);
            // 编程式路由跳转
            this.$router.push('/movie/nowPlaying');
        }
    }
}
</script>

<style>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{ background-color:transparent; width:0;}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:top; text-align: center; border-left:1px #e6e6e6 solid;}
</style>