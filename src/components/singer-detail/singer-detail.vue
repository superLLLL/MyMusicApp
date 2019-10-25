<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 14:21:19
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-25 16:34:28
 -->
<template>
    <transition name="slide">
            <div class="singer-detail">
            <h1>歌手详情</h1>
        </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
export default {
    computed: {
        ...mapGetters([
            'singer'
        ])
    },
    created() {
        this._getDeatil()
        
    },
    methods: {
        _getDeatil() {
            getSingerDetail(this.singer.no).then((res) => {
                if(res.code === ERR_OK){
                    console.log(res.singerSongList.data.songList);
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"

    .singer-detail
        position: fixed
        z-index: 100
        top: 0
        left: 0
        right: 0
        bottom: 0
        background: $color-background
// 转场
    .slide-enter-active,.slide-leave-active
        transition: all .3s
    .slide-enter,.slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>