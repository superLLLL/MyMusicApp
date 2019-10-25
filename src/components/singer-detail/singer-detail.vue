<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 14:21:19
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-24 15:30:23
 -->
<template>
    <transition name="slide">
            <div class="singer-detail">
            <h1>歌手详情</h1>
        </div>
    </transition>
</template>

<script>
export default {
    
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