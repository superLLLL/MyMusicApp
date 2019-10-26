<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 14:21:19
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-25 19:05:16
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
import {createSong} from 'common/js/song'
export default {
    data() {
        return {
            songs: []
        }
    },
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
            // 如果需要获取的歌手信息没有拿到（比如直接在singer_detail页面加载），则跳回去
            if(typeof this.singer.no != 'number') {
                this.$router.push('/singer')
                return  // router是异步路由，怕浏览器会报错，所以直接return出去
            }
            getSingerDetail(this.singer.no).then((res) => { // 获取歌手详细信息
                if(res.code === ERR_OK){
                    // 调用_normalizeSongs方法获取歌曲信息
                    console.log(res.singerSongList.data.songList);
                    this.songs = this._normalizeSongs(res.singerSongList.data.songList)
                    console.log(this.songs);
                }
            })
        },
        _normalizeSongs(list) {  // 创建Song对象，获取歌曲的信息
            let ret = []
            list.forEach(element => {
                console.log(element);
                let musicData = element
                // 保证必须的参数都存在，才会创建对象
                console.log(musicData);
                if(musicData.songInfo.ksong.id && musicData.songInfo.album.id) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
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