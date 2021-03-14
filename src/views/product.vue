<template>
  <div>
    <div class="product-content">
      <div class="banner">
        <img :src="productObj.bannerFileAddress ? productObj.bannerFileAddress : $store.state.defaultImg" alt="" />
        <h3>产品服务</h3>
      </div>
      <div class="nav-content">
        <a href="javascript:;" :class="[{ 'a-1': index == 0 }, { active: id == index }]" v-for="(item, index) in productObj.productServiceInfoList" :key="index" @click="handClick(index)">{{ item.chineseTitle }}</a>
      </div>
      <div class="image-content">
        <h5>{{ activeObj.englishTitle }}</h5>
        <h4>{{ activeObj.chineseTitle }}</h4>
        <div class="tag">
          <div v-for="(item, index) in activeObj.productServiceTagList" :key="index">
            <span>{{ item }}</span>
          </div>
        </div>
        <div class="text">
          <p>{{ activeObj.productServiceContent }}</p>
        </div>
        <div class="img">
          <img :src="activeObj.fileAddress ? activeObj.fileAddress : $store.state.defaultImg" alt="" />
        </div>
        <h5 style="margin-top: 98px;">SOLVE PROBLEM</h5>
        <h4>解决问题</h4>
        <div class="col">
          <div v-for="(item, index) in activeObj.jjwtList" :key="index">
            <img :src="item.image ? item.image : $store.state.defaultImg" alt="" />
            <span>{{ item.textTitle }}</span>
          </div>
        </div>
        <h5 style="margin-top: 74px;"> PRODUCT BENEFITS</h5>
        <h4>产品效益</h4>
        <div class="text" style="margin-top: 52px;">
          <p>{{ activeObj.productBenefit }}</p>
        </div>
      </div>
      <div class="benefits">
        <h5> PRODUCT BENEFITS</h5>
        <h4>应用场景</h4>
        <div class="benefits-flex">
          <div class="flex-card" v-for="(item, index) in activeObj.yycjList" :key="index">
            <div class="img">
              <img :src="item.image ? item.image : $store.state.defaultImg" alt="" />
            </div>
            <p>{{ item.textTitle }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  activated() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.activeObj = this.productObj.productServiceInfoList[this.id] || {}
    } else {
      console.log('通过导航第二次进入')
    }
  },
  created() {
    this.$axios.get('GetProductService?RequestSource=11').then((res) => {
      if (res.status) {
        // 用户点击导航进入
        this.productObj = res.data.data[0]
        this.id = 0
        this.activeObj = this.productObj.productServiceInfoList[0]
        // 用户通过列表索引进入
        if (this.$route.query.id) {
          this.id = this.$route.query.id
          this.activeObj = this.productObj.productServiceInfoList[this.id]
        }
      } else {
        this.$message.error(res.message)
      }
    })
  },
  data() {
    return {
      // 通过id对比index判断active
      id: '',
      productObj: {},
      activeObj: {},
    }
  },
  computed: {},
  methods: {
    // 点击切换下标切换数组
    handClick(index) {
      this.id = index
      this.activeObj = this.productObj.productServiceInfoList[index]
    },
  },
}
</script>

<style scoped lang="scss">
.nav-content {
  height: 60px;
  line-height: 60px;
  background-color: #f3f4f5;
}
.nav-content .active {
  padding-bottom: 18px;
  color: #50c19a;
  border-bottom: 2px solid #50c19a;
}
.nav-content a {
  margin-left: 82px;
  width: 64px;
  height: 22px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
  line-height: 22px;
}
.nav-content .a-1 {
  margin-left: 135px;
}
.product-content {
  width: 1440px;
  margin: 0 auto;
}
.product-content .banner {
  width: 1440px;
  height: 327px;
  position: relative;
}
.product-content .banner img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.product-content .banner h3 {
  position: absolute;
  left: 135px;
  top: 131px;
  width: 144px;
  height: 50px;
  font-size: 36px;
  font-weight: 300;
  color: #ffffff;
  line-height: 50px;
}
.product-content .image-content {
  box-sizing: border-box;
  position: relative;
  background-color: #ffffff;
  padding-left: 141px;
  padding-top: 29px;
}
.product-content h5 {
  width: 281px;
  height: 48px;
  font-size: 24px;
  font-weight: 300;
  color: #333333;
  line-height: 48px;
}
.product-content h4 {
  margin-top: 1px;
  width: 200px;
  height: 48px;
  font-size: 32px;
  font-weight: 500;
  color: #333333;
  line-height: 48px;
}
.product-content .tag {
  display: flex;
  margin-top: 35px;
  margin-bottom: 26px;
}
.product-content .tag div {
  width: 107px;
  height: 26px;
  margin-right: 10px;
  line-height: 26px;
  text-align: center;
  border: 1px dashed #50c19a;
}
.product-content .tag div span {
  width: 84px;
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: #50c19a;
  line-height: 17px;
}
.product-content .text {
  width: 1170px;
}
.product-content .text p {
  font-size: 16px;
  font-weight: 400;
  color: #999999;
  line-height: 22px;
}
.product-content .img {
  margin-top: 40px;
  width: 969px;
  height: 389px;
}
.product-content .img img {
  width: 100%;
  height: 100%;
}
.product-content .col {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
}
.product-content .col div {
  margin-top: 30px;
  width: 500px;
}
.product-content .col div img {
  width: 38px;
  height: 38px;
}
.product-content .col div span {
  margin-left: 50px;
  margin-top: -60px;
  vertical-align: middle;
  display: inline-block;
  width: 470px;
  height: 22px;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
  line-height: 22px;
}
.product-content .core-flex {
  display: flex;
}
.product-content .core {
  position: relative;
  margin-right: 30px;
  box-sizing: border-box;
  margin-top: 61px;
  width: 370px;
  height: 232px;
  border: 1px dashed black;
  p {
    position: absolute;
    top: 194px;
    left: 50%;
    transform: translateX(-50%);
    width: 132px;
    height: 22px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    line-height: 22px;
  }
}
.product-content img {
  width: 370px;
  height: 232px;
}
.benefits {
  margin-top: 104px;
  box-sizing: border-box;
  padding-top: 40px;
  padding-left: 135px;
  // height: 925px;
  background-color: #f3f4f5;
}
.benefits-flex {
  width: 1170px;
  // height: 602px;
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  margin-top: 53px;
  flex-wrap: wrap;
  .flex-card {
    height: 286px;
    width: 370px;
    background-color: #ffffff;
    .img {
      position: relative;
      margin-top: 0px;
      width: 370px;
      height: 206px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    p {
      margin-top: 29px;
      text-align: center;
      height: 19px;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      line-height: 19px;
    }
  }
}
</style>
