<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 15:56:00
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-22 13:44:05
 -->
<template>
    <div class="singer">
        <list-view :data="singer"></list-view>
    </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import ListView from 'base/listview/listview'

const HOT_NAME = '热门'      // 固定标题名 热门
const HOT_SINGER_LEN = 10    // 需要数据的长度
export default {
    data() {
        return {
            singer: []
        }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        _getSingerList() {
            getSingerList().then((res) => {
                if(res.code === ERR_OK){
                    this.singer = res.singerList.data.singerlist
                    console.log(res);
                    // console.log(this.singer);
                    // console.log(this._normalizeSinger(this.singer));
                    this.singer = this._normalizeSinger(this.singer);
                    console.log(this.singer);
                    // console.log(res);
                }
            })
        },
        _normalizeSinger(list) { 
            let map = {
                hots: {
                    title: HOT_NAME,   // 固定标题
                    items: []          // 可变内容
                }
            }
            list.forEach((value, index) => {
                if(index < HOT_SINGER_LEN) {
                    map.hots.items.push({
                        id: value.singer_id,        // 放歌手id
                        items: value.singer_name,   // 放歌手名字
                        avatar: value.singer_pic    // 放歌手头像/照片
                    })
                }
            });
            return map.hots.items
        }
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