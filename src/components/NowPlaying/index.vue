<template>
    <div class="movie_body" ref="movie_body">
        <Loading v-if="isLoading" />
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <li class="pullDown">{{ pullDownMsg }}</li>
                <li v-for="item in movieList" :key="item.id">
                    <div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2 @tap="handleToDetail(item.id)">{{item.nm}}<img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
                        <p>观众评 <span class="grade" v-text="item.sc"></span></p>
                        <p>主演：{{item.star}}</p>
                        <p v-text="item.showInfo"></p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>
// import BScroll from 'better-scroll';
export default {
    name: 'NowPlaying',
    data () {
        return {
            movieList: [],
            pullDownMsg: '',
            isLoading: true,
            prevCityId: -1 // 上一次的cityId
        }
    },
    // mounted 生命周期，如果有缓存系统keep-alive存在的时候，mounted是不会再次触发 测试console.log(123);
    // 将mounted 换成 activated 当组件被激活时调用
    activated () {
        // console.log(123);
        var cityId = this.$store.state.city.id;
        // console.log(cityId);
        // 当切换城市的时候，是要走生命周期，否则不用走生命周期。
        if ( this.prevCityId === cityId ){ return; } // 如果prevCityId与cityId相同，说明没有切换城市，那么就返回,不用走生命周期。
        this.isLoading = true;
        // console.log(123); // 当城市切换的时候，打印123，没有切换城市的时候，不会打印。
        this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res) => {
            // console.log(res.data.data);
            var msg = res.data.msg;
            if( msg === 'ok'){
                this.movieList = res.data.data.movieList;
                this.isLoading = false; // 请求成功之后将加载设置为false
                this.prevCityId = cityId; // 请求成功之后赋值
                // this.$nextTick(()=>{
                //     var scroll = new BScroll( this.$refs.movie_body , {
                //         tap: true,
                //         probeType: 1
                //     });
                //     scroll.on('scroll',(pos) => {
                //         // console.log('scroll');
                //         if( pos.y > 30){
                //             this.pullDownMsg = '正在更新中...';
                //         }
                //     });
                //     scroll.on('touchEnd',(pos) => {
                //         // console.log('touchEnd');
                //         if( pos.y > 30){
                //             this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
                //                 var msg = res.data.msg;
                //                 if( msg === 'ok'){
                //                     this.pullDownMsg = '更新成功';
                //                     setTimeout(() => {
                //                         this.movieList = res.data.data.movieList;
                //                         this.pullDownMsg = '';
                //                     }, 1000);
                //                 }
                //             });
                //         }
                //     })
                // });
            }
        });
    },
    methods : {
        handleToDetail(moviedId){
            // console.log(moviedId);
            this.$router.push('/movie/detail/1/'+ moviedId);
        },
        handleToScroll(pos){
            if( pos.y > 30){
                this.pullDownMsg = '正在更新中...';
            }
        },
        handleToTouchEnd(pos){
            if( pos.y > 30){
                this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
                    var msg = res.data.msg;
                    if( msg === 'ok'){
                        this.pullDownMsg = '更新成功';
                        setTimeout(() => {
                            this.movieList = res.data.data.movieList;
                            this.pullDownMsg = '';
                        }, 1000);
                    }
                });
            }
        }
    }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall,.movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullDown{padding: 0; margin: 0; border: none;}
</style>