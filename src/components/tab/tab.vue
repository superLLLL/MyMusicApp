<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 15:56:00
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-15 19:39:41
 -->
<template>
    <div class="tab">
        <router-link tag="div" class="tab-item" to="/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/rank">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/search">
            <span class="tab-link">搜索</span>
        </router-link>
    </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    @import '~common/stylus/variable'
    .tab
        display: flex
        height: 44px
        line-height: 44px
        font-size: $font-size-medium
        .tab-item
            flex: 1
            text-align: center
            .tab-link
                padding-bottom: 5px
                color: $color-text-1
            // 突出当前被访问的link-view
            &.router-link-active
                .tab-link
                    color: $color-theme
                    border-bottom: 2px solid $color-theme
</style>