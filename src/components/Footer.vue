<template>
  <footer>
    <div class="bottom-nav">
      <div class="nav">
        <router-link to="/">首页</router-link><span></span> <router-link to="/about">关于云慧</router-link><span></span> <router-link :to="{ path: '/solution', query: { id: 0 } }">解决方案</router-link><span></span><router-link :to="{ path: '/product', query: { id: 0 } }">产品服务</router-link><span></span> <router-link to="recruitMent">人才招聘</router-link><span></span>
        <a href="javascript:;">联系我们</a>
      </div>
      <p class="hr"></p>
      <div class="msg">
        <span>客服电话:{{ footerObj.serviceTelephone }}</span
        ><span>邮箱:company@yunhuiyilian.com</span>
        <p class="ads">联系地址:{{ footerObj.contactAddress }}</p>
        <img :src="footerObj.fileAddress ? footerObj.fileAddress : $store.state.defaultImg" alt="" />
        <p class="text">扫一扫关注我们</p>
      </div>
    </div>
    <div class="bottom-msg">
      <span>江西云慧医联服务有限公司</span>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'foote',
  created() {
    this.$axios.get('GetPageFloorInfo').then((res) => {
      if (res.status) {
        this.footerObj = res.data.data[0]
      } else {
        this.$message.error(res.message)
      }
    })
  },
  data() {
    return {
      footerObj: {},
    }
  },
}
</script>
<style scoped lang="scss">
.bottom-nav {
  box-sizing: border-box;
  margin: 0 auto;
  padding-top: 39px;
  padding-left: 135px;
  width: 1440px;
  height: 275px;
  background: #181c1e;
  .nav {
    a {
      text-decoration: none;
      width: 56px;
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      line-height: 20px;
    }
    span {
      display: inline-block;
      width: 1px;
      height: 11px;
      margin: 0 18px;
      background-color: #ffffff;
    }
  }
  .hr {
    width: 1170px;
    height: 1px;
    margin-top: 20px;
    margin-bottom: 52px;
    background: rgba(255, 255, 255, 0.2);
  }
  .msg {
    span {
      margin-right: 63px;
      width: 172px;
      height: 17px;
      font-size: 12px;
      font-weight: 400;
      color: #ffffff;
      line-height: 17px;
    }
    .ads {
      margin-top: 14px;
      width: 360px;
      height: 17px;
      font-size: 12px;
      font-weight: 400;
      color: #ffffff;
      line-height: 17px;
    }
    img {
      margin-top: -80px;
      margin-left: 1070px;
      width: 100px;
      height: 100px;
    }
    .text {
      margin-left: 1072px;
      margin-top: 9px;
      width: 98px;
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      line-height: 20px;
    }
  }
}
.bottom-msg {
  box-sizing: border-box;
  padding-top: 16px;
  margin: 0 auto;
  width: 1440px;
  height: 56px;
  background: #1b1f23;
  span {
    display: block;
    margin-left: 622px;
    margin: 0 auto;
    width: 196px;
    height: 24px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    line-height: 24px;
  }
}
</style>
