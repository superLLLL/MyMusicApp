<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 15:56:00
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-30 19:41:35
 -->

<!--  singer作为state数据 -->
<template>
    <div class="singer">
        <list-view :data="singers" @select="selectSinger"></list-view>
        <!-- 挂载子路由 -->
        <router-view></router-view>
    </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'   // qq音乐公共接口正常连接返回的参数
import ListView from 'base/listview/listview'
// vuex语法糖：是对mutations做一层封装
import {mapMutations} from 'vuex'

const HOT_NAME = '热门'      // 固定标题名 热门
const HOT_SINGER_LEN = 10    // 需要数据的长度
export default {
    data() {
        return {
            singers: []
        }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        // 获取listview传上来的数据(被点击的歌手的基础信息)，以跳转路由
        selectSinger(singer) {
            // console.log(singer);
            this.$router.push({    // push编程式路由跳转
                path: `/singer/${singer.id}`  
            })
            // 调用之后，即实现了对mutation的提交
            this.setSinger(singer)
        },
        _getSingerList() {     //获取歌手基础信息
            getSingerList().then((res) => {
                if(res.code === ERR_OK){
                    this.singers = res.singerList.data.singerlist
                    // console.log(res);
                    this.singers = this._normalizeSinger(this.singers);
                    // console.log(this.singer);
                    // console.log(res);
                }
            })
        },
        _normalizeSinger(list) {   // 取出真正有用的歌手信息
            let map = {
                hots: {
                    title: HOT_NAME,   // 固定标题
                    items: []          // 可变内容
                }
            }
            list.forEach((value, index) => {
                if(index < HOT_SINGER_LEN) {
                    map.hots.items.push({
                        no: index,                  // 假no用来获取歌手详情
                        id: value.singer_id,        // 放歌手id
                        items: value.singer_name,   // 放歌手名字
                        avatar: value.singer_pic    // 放歌手头像/照片
                    })
                }
            });
            return map.hots.items
        },
        // 通过扩展运算符方式将此对象混入到外部对象中，调用mapMutations
        ...mapMutations({
            // 把对mutation的修改映射成方法,此处为方法  SET_SINGER
            setSinger: 'SET_SINGER'
        })

    },
    components:{
        ListView
    }
}
</script>

<style lang="stylus" scoped rel="stylusheet/stylus">
    @import "~common/stylus/variable"
    
    .singer
        position: flex
        top: 88px
        bottom: 0
        width: 100%
</style>