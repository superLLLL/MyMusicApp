<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 15:56:00
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-21 20:42:40
 -->
<template>
    <div class="singer">
    </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'

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
                    console.log(this.singer);
                    console.log(this._normalizeSinger(this.singer));
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
                        avator: value.singer_pic    // 放歌手头像/照片
                    })
                }
            });
            console.log(map);
        }
    }
}
</script>

<style lang="stylus" sco ped rel="stylusheet/stylus">
    @import "~common/stylus/variable"
    
    .singer
        position: flex
        top: 88px
        bottom: 0
        width: 100%
</style>