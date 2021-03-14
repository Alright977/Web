<template @scroll="scroll">
  <header>
    <div class="nav">
      <div class="logo">
        <img :src="logoImg" alt="" />
      </div>
      <div class="nav-right">
        <router-link
          :to="{
            path: item.path,
          }"
          class="item-list"
          :class="{ active: index == isActive }"
          v-for="(item, index) in navList"
          @click.native="handClick(index)"
          :key="item.id"
          >{{ item.text }}</router-link
        >
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Header',
  created() {
    this.$axios.get('GetLogo').then((res) => {
      if (res.status) {
        this.logoImg = res.data
      }
    })
  },
  data() {
    return {
      logoImg: '',
      isActive: '',
      navList: [
        {
          id: 0,
          path: '/',
          text: '首页',
        },
        {
          id: 1,
          path: '/solution',
          text: '解决方案',
        },
        {
          id: 2,
          path: '/product',
          text: '产品服务',
        },
        {
          id: 3,
          path: '/center',
          text: '新闻中心',
        },
        {
          id: 4,
          path: '/recruitMent',
          text: '人才招聘',
        },
        {
          id: 5,
          path: '/about',
          text: '关于云慧',
        },
      ],
    }
  },
  watch: {
    '$route.path': {
      handler(e) {
        this.isActive = this.navList.findIndex((item) => e === item.path)
      },
      immediate: true,
    },
  },
  mounted() {
    let header = document.querySelector('header')
    window.addEventListener('scroll', () => {
      let top = document.documentElement.scrollTop
      if (top > 720) {
        header.style.backgroundColor = '#ffffff'
      } else if (top < 720) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0)'
      }
    })
  },
  methods: {
    scroll() {
      console.log('滚动事件执行了')
    },
    handClick(index) {
      this.isActive = index
    },
  },
}
</script>
<style scoped lang="scss">
header {
  width: 1440px;
  height: 72px;
  line-height: 72px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  left: calc(50% - 720px);
  z-index: 99;
}
header .nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
header .logo {
  height: 47px;
  width: 191px;
  margin-left: 142px;
}
header .logo img {
  width: 191px;
  height: 41px;
}
header .nav-right {
  margin-right: 128px;
}
header .nav-right a {
  display: inline-block;
  text-decoration: none;
  color: #333333;
  width: 65px;
  height: 28px;
  line-height: 28px;
  font-size: 16px;
  font-weight: 400;
  margin: 0 22.5px;
}
header .nav-right a:nth-child(1) {
  width: 32px;
}
.nav .nav-right .active {
  color: #50c19a;
}
</style>
