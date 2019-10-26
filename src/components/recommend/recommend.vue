<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 15:56:00
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-26 14:27:36
 -->
<template>
    <div class="recommend">
        <scroll ref="scroll" class="recommend-content" :data='disclist'>
           <div>    <!-- 需要包括起来 -->
                <div v-if="recommends.length" class="slider-wrapper"> 
                    <!--以下为模块  slider-->
                    <slider>
                        <div v-for="item in recommends">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl" alt="">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li class="item" v-for="item in disclist">
                            <div class="icon">
                                <img @load="loadImage()" width="60" height="60" v-lazy="item.imgurl">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loadingcontainer" v-show="!disclist.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'   //语义化 不使用res.code == 0 
export default {
    data(){
        return {
            recommends:[],
            disclist: []
        }
    }, 
    created(){
        this._getRecommend()
        this._getDiscList()
    },  
    methods:{
        /**此为get数据的异步过程，要在页面上添加一个 v-if="recommends.length"来确保能够在获得数据后再渲染页面 */
        _getRecommend() {   //获得推荐页面数据
            getRecommend().then((res) => {
                if(res.code === ERR_OK) {
                    this.recommends = res.data.slider;  
                    // console.log(this.recommends);
                }
            })
        },
        _getDiscList() {   //获取歌单数据
            getDiscList().then((res) => {
                if(res.code === ERR_OK) {
                    this.disclist = res.data.list
                    // console.log(this.disclist);
                }
            })
        },
        loadImage() {
            if(!this.checkImage) {
                this.$refs.scroll.refresh();
                this.checkImage = true
            }
        }
    },
    components:{
        Slider,
        Scroll,
        Loading
    }
    
};
</script>

<style lang="stylus" scoped rel="stylusheet/stylus">
    @import '~common/stylus/variable'

    .recommend 
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
                .loading-container
                    position: absolute
                    width: 100%
                    top: 50%
                    transform: translateY(-50%)
                    
                        
</style>