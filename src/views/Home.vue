<template>
  <div class="home">
    <index-header />
    <div class="home">
      <div class="video">
        <video muted :src="homeList.bannerFileAddress" autoplay loop v-if="!homeList.bannerFileAddress"></video>
        <img :src="homeList.bannerFileAddress" alt="" v-if="homeList.bannerFileAddress" />
      </div>
      <!-- 内容区 -->
      <div class="content">
        <div class="home-flex">
          <div class="home-img">
            <img src="@/assets/img/about-img/culture.png" alt="" />
          </div>
          <div class="home-text">
            <h6 class="h6-home-1">愿景</h6>
            <p>成为医疗领域的领导先锋</p>
            <h6 class="h6-home-2">使命</h6>
            <p>我们建设江西本地化医疗企业，为江西医疗的发展提供有力保障，<br />生命不息，勇往直前</p>
            <h6 class="h6-home-3">核心价值观</h6>
            <p>创新，诚信，专业</p>
          </div>
        </div>
        <div class="text">
          <h4> MEDICAL SOLUTIONS</h4>
          <h3>综合解决方案</h3>
        </div>
        <div v-for="(item, index) in medicalList" :key="index">
          <div :class="[{ 'one-box': index == 0 }, { 'two-box': index == 1 }, { 'three-box': index == 2 }, { 'four-box': index == 3 }]">
            <h5>{{ item.solutionName }} </h5>
            <p v-html="item.projectBackground"></p>
            <div class="small-btn" @click="medicalClick(index)"> <span>了解更多</span><i class="el-icon-right"></i> </div>
          </div>
          <div :class="[{ 'two-img': index == 0 }, { 'three-img': index == 1 }, { 'four-img': index == 2 }, { 'five-img': index == 3 }]">
            <img :src="item.fileAddress" alt="" />
          </div>
        </div>
      </div>
      <div class="swiper-top">
        <h4> PRODUCT SERVICE</h4>
        <h3> 产品服务</h3>
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item, index) in cpfwList" :key="index">
            <div class="card-one">
              <div class="img">
                <img :src="item.fileAddress" alt="" />
              </div>
              <h6>{{ item.chineseTitle }}</h6>
              <p v-html="item.productServiceContent"></p>
              <div class="card-btn" @click="serviceClick(index)"> <a href="javascript:;">了解更多</a><i class="el-icon-right"></i> </div>
            </div>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="swiper-bottom"></div>

      <!-- 新闻中心 -->
      <div class="box-content">
        <div class="news">
          <h3>CURRENT EVENTS</h3>
          <h2>新闻中心</h2>
          <div class="flex-content">
            <div class="news-card" v-for="(item, index) in newList" :key="index">
              <div class="imgs">
                <img :src="item.fileAddress" alt="" />
                <h5>{{ item.newI }}</h5>
                <h6>{{ item.createDate }}</h6>
                <p>{{ item.newDescription }}</p>
                <div class="card-btn" @click="newsClick(index)"> <a href="javascript:;">查看详情</a><i class="el-icon-right"></i> </div>
              </div>
            </div>
          </div>
        </div>
        <div class="banner">
          <div class="one-text">
            <h6>{{ homeInfoObj.setupYear }}</h6>
            <span>年</span>
            <p>成立</p>
          </div>
          <div class="two-text">
            <h6>{{ homeInfoObj.joinHospitalQuantity }}</h6
            ><span>年</span>
            <p>合作医院</p>
          </div>
          <div class="three-text">
            <h6>{{ homeInfoObj.scientificHospitalQuantity }}</h6
            ><span>年</span>
            <p>科研医院</p>
          </div>
          <div class="four-text">
            <h6>{{ homeInfoObj.tradeGloryQuantity }}</h6
            ><span>年</span>
            <p>行业荣耀</p>
          </div>
        </div>
        <h4 class="h4-item-1"> MEDICAL SOLUTIONS</h4>
        <h3 class="h3-item-1">服务网点</h3>
        <div class="echarts" ref="echarts"> </div>
      </div>
    </div>
  </div>
</template>

<script>
import indexHeader from '@/components/indexHeader.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Home',
  components: {
    indexHeader,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOptions: {
        // loop: true,
        slidesPerView: 3,
        // 左右箭头切换
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      homeInfoObj: {},
      homeList: {},
      medicalList: [],
      cpfwList: [],
      newList: [],
      newsId: null,
      serviceId: null,
    }
  },
  created() {
    this.$axios.get('GetHomeInfo?RequestSource=11').then((res) => {
      if (res.status) {
        this.homeList = res.data.data[0]
        this.homeInfoObj = this.homeList.homeInfo
        // 解决问题
        this.medicalList = this.homeInfoObj.jjwtList
        // 产品服务
        this.cpfwList = this.homeInfoObj.cpfwList
        // 新闻中心
        this.newList = this.homeInfoObj.newList
      } else {
        this.$message.error(res.$message)
      }
    })
  },
  mounted() {
    this.echartInit()
  },
  methods: {
    // 新闻中心跳转
    newsClick(index) {
      this.newsId = this.homeInfoObj.newList[index].newId
      this.$router.push({
        path: '/detail',
        query: {
          id: this.newsId,
        },
      })
    },
    // 产品服务跳转
    serviceClick(index) {
      this.$router.push({
        path: '/product',
        query: {
          id: index,
        },
      })
    },
    // 解决方案跳转
    medicalClick(index) {
      this.$router.push({
        path: '/solution',
        query: {
          id: index,
        },
      })
    },
    echartInit() {
      let myChart = this.$echarts.init(this.$refs.echarts)
      let option = {
        backgroundColor: '#ffffff',
        grid: {
          left: '1%', // 与容器左侧的距离
          right: '1%', // 与容器右侧的距离
          top: '1%', // 与容器顶部的距离
          bottom: '1%', // 与容器底部的距离
        },
        geo: {
          map: 'jiangxi',
          aspectScale: 0.75,
          itemStyle: {
            normal: {
              shadowColor: '#182f68',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 0.5,
            },
            emphasis: {
              areaColor: '#20487d',
            },
          },
        },
        series: [
          // 常规地图
          {
            type: 'map',
            mapType: 'jiangxi',

            itemStyle: {
              normal: {
                areaColor: '#F8FEFCFF',
                borderColor: '#49DAAAFF',
                borderWidth: 0.5,
              },
              emphasis: {
                areaColor: '#02102b',
                label: {
                  color: '#fff',
                },
              },
            },
          },
          // 区域散点图
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbolSize: 5,
            rippleEffect: {
              //坐标点动画
              period: 5,
              scale: 2,
              brushType: 'fill',
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: '#b3e2f2',
              },
            },

            data: [
              {
                name: '南昌',
                value: [115.89, 28.68],
              },
              {
                name: '抚州',
                value: [116.34, 28],
              },
              {
                name: '赣州',
                value: [114.92, 25.85],
              },
              {
                name: '吉安',
                value: [114.97, 27.12],
              },
              {
                name: '景德镇',
                value: [117.22, 29.3],
              },
              {
                name: '九江市',
                value: [115.97, 29.71],
              },
              {
                name: '萍乡',
                value: [113.85, 27.6],
              },
              {
                name: '上饶',
                value: [117.97, 28.47],
              },
              {
                name: '新余',
                value: [114.92, 27.81],
              },
              {
                name: '宜春',
                value: [114.38, 27.81],
              },
              {
                name: '鹰潭',
                value: [117.02, 28.23],
              },
            ],
            itemStyle: {
              //坐标点颜色
              normal: {
                show: true,
                color: '#02da9d',
                shadowBlur: 10,
                shadowColor: '#169fca',
              },
              emphasis: {
                areaColor: '#f00',
              },
            },
          },
          // 线 和 点
          {
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 5,
              color: '#02da9d',
            },
            lineStyle: {
              normal: {
                color: '#02da9d',
                width: 1,
                curveness: 0.3,
              },
            },
            data: [
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [116.34, 28],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [114.92, 25.85],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [114.97, 27.12],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [113.85, 27.6],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [115.97, 29.71],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [114.38, 27.81],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [117.02, 28.23],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [117.22, 29.3],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [117.22, 29.3],
                ],
              },
            ],
          },
        ],
      }
      this.$echarts.registerMap('jiangxi', require('@/assets/map/jiangxi.json'))
      // china地图引入
      myChart.setOption(option)
    },
  },
  computed: {
    // 新闻详情path+id
    detailId() {
      let id = this.newsId
      return `/detail/${id}`
    },
  },
  //监听router变化让滚动条置顶
  watch: {
    $route: function() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
  },
}
</script>
<style lang="scss" scoped>
/* index内容区域 */
.video {
  margin: 0 auto;
  width: 1440px;
  height: 720px;
  img {
    width: 100%;
    height: 720px;
  }
}
.video video {
  margin: 0 auto;
  width: 1440px;
  height: 720px;
  object-fit: cover;
  outline: none;
}

.content {
  width: 1440px;
  height: 3027px;
  margin: 0 auto;
  background-color: #f3f4f5;
  position: relative;
  .home-flex {
    display: flex;
    .home-img {
      img {
        object-fit: cover;
        width: 560px;
        height: 458.4px;
        margin-top: 58px;
        margin-left: 135px;
      }
    }
    .home-text {
      h6 {
        margin-left: 85px;
        width: 120px;
        height: 33px;
        font-size: 24px;
        font-weight: 500;
        color: #333333;
        line-height: 33px;
      }
      p {
        margin-left: 85px;
        margin-top: 14px;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
        line-height: 22px;
        letter-spacing: 1px;
      }
      .h6-home-1 {
        margin-top: 128px;
      }
      .h6-home-2 {
        margin-top: 40px;
      }
      .h6-home-3 {
        margin-top: 39px;
      }
    }
  }
}

.content .text {
  padding-top: 225px;
  padding-left: 137px;
}
.content .text h4 {
  width: 260px;
  height: 48px;
  font-size: 24px;
  font-weight: 300;
  color: #333333;
  line-height: 48px;
}
.content .text h3 {
  width: 200px;
  height: 48px;
  font-size: 32px;
  font-weight: 500;
  color: #333333;
  line-height: 48px;
}
.content .one-box {
  position: absolute;
  z-index: 2;
  width: 531px;
  height: 315px;
  background-color: #ffffff;
  top: 1028px;
  left: 135px;
}
.content .one-box h5 {
  margin-left: 59px;
  padding-top: 58px;
  height: 28px;
  font-size: 20px;
  font-weight: 500;
  color: #333333;
  line-height: 28px;
}
.content .one-box p {
  padding-top: 24px;
  padding-left: 59px;
  width: 398px;
  height: 72px;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  overflow: hidden;
}
.content .two-img {
  z-index: 1;
  position: absolute;
  top: 970px;
  left: 455px;
  width: 982px;
  height: 433px;
}
.content .two-img img {
  width: 100%;
  height: 100%;
}
.content .two-box {
  z-index: 2;
  position: absolute;
  top: 1531px;
  right: 134px;
  width: 531px;
  height: 315px;
  background-color: #ffffff;
}
.content .two-box h5 {
  padding-top: 58px;
  padding-left: 59px;
  height: 28px;
  font-size: 20px;
  font-weight: 500;
  color: #333333;
  line-height: 28px;
}
.content .two-box p {
  padding-top: 24px;
  padding-left: 59px;
  width: 398px;
  height: 72px;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  overflow: hidden;
}
.content .two-box .small-btn {
  background-color: #50c19a;
}
.content .two-box .small-btn span {
  color: #ffffff;
}
.content .three-img {
  z-index: 1;
  position: absolute;
  top: 1473px;
  left: 0px;
  width: 982px;
  height: 433px;
}
.content .three-img img {
  width: 100%;
  height: 100%;
}
.content .three-box {
  position: absolute;
  z-index: 2;
  width: 531px;
  height: 315px;
  background-color: #ffffff;
  top: 2034px;
  left: 135px;
}
.content .three-box h5 {
  padding-top: 58px;
  padding-left: 59px;
  height: 28px;
  font-size: 20px;
  font-weight: 500;
  color: #333333;
  line-height: 28px;
}
.content .three-box p {
  padding-top: 24px;
  padding-left: 59px;
  width: 398px;
  height: 72px;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  overflow: hidden;
}
.content .four-img {
  z-index: 1;
  position: absolute;
  top: 1976px;
  right: 0;
  width: 982px;
  height: 433px;
}
.content .four-img img {
  width: 100%;
  height: 100%;
}
.content .four-box {
  position: absolute;
  z-index: 2;
  width: 531px;
  height: 315px;
  background-color: #ffffff;
  bottom: 170px;
  right: 134px;
}
.content .four-box h5 {
  padding-top: 58px;
  padding-left: 59px;
  height: 28px;
  font-size: 20px;
  font-weight: 500;
  color: #333333;
  line-height: 28px;
}
.content .four-box p {
  padding-top: 24px;
  padding-left: 59px;
  width: 398px;
  height: 72px;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  overflow: hidden;
}
.content .five-img {
  z-index: 1;
  position: absolute;
  bottom: 110px;
  left: 0;
  width: 982px;
  height: 433px;
}
.content .five-img img {
  width: 100%;
  height: 100%;
}
.icon-icon-jiantou-l {
  margin-left: 10px;
  color: #50c19a;
}
/* 新闻中心 */
.box-content {
  margin: 0 auto;
  height: 1700px;
  width: 1440px;
  background-color: #ffffff;
  .h3-item-1 {
    margin-left: 142px;
  }
  .h4-item-1 {
    margin-top: 75px;
    margin-left: 137px;
  }
}
.box-content .news {
  width: 1440px;
  height: 750px;
  position: relative;
}
.box-content .news h3 {
  position: absolute;
  top: 58px;
  left: 142px;
  width: 260px;
  height: 48px;
  font-size: 24px;
  font-weight: 300;
  color: #333333;
  line-height: 48px;
}
.box-content .news h2 {
  position: absolute;
  top: 107px;
  left: 142px;
  width: 200px;
  height: 48px;
  font-size: 32px;
  font-weight: 500;
  color: #333333;
  line-height: 48px;
}
.box-content .news .news-card {
  position: relative;
  top: 204px;
  left: 135px;
  margin-right: 30px;
}
.box-content .news .news-card .imgs {
  width: 370px;
  height: 232px;
}
.box-content .news .news-card .imgs img {
  width: 100%;
  height: 100%;
}
.box-content .news .news-card h5 {
  position: absolute;
  top: 254px;
  left: 0px;
  width: 128px;
  height: 22px;
  font-size: 16px;
  font-weight: 400;
  color: #333333;
  line-height: 32px;
}
.box-content .news .news-card h6 {
  position: absolute;
  top: 283px;
  height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: #999999;
  line-height: 18px;
}
.box-content .news .news-card p {
  position: absolute;
  top: 309px;
  width: 354px;
  height: 36px;
  font-size: 12px;
  font-weight: 400;
  color: #666666;
  line-height: 18px;
  overflow: hidden;
}
.box-content .news .news-card .card-btn {
  left: 0px;
  top: 368px;
}
.box-content .news .flex-content {
  display: flex;
}
/* banner图 */
.box-content .banner {
  position: relative;
  width: 1440px;
  height: 232px;
  background-image: url('~@/assets/img/home-img/banner.png');
  background-size: cover;
}
.box-content .banner h6 {
  position: absolute;
  width: 96px;
  height: 58px;
  font-size: 40px;
  font-weight: bold;
  color: #ffffff;
  line-height: 58px;
}
.box-content .banner span {
  position: absolute;
  display: inline-block;
  width: 14px;
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
}
.box-content .banner p {
  position: absolute;
  width: 56px;
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
}
.box-content .banner .one-text h6 {
  left: 218px;
  top: 77px;
}
.box-content .banner .one-text span {
  left: 332px;
  top: 109px;
}
.box-content .banner .one-text p {
  left: 253px;
  top: 144px;
}
.box-content .banner .two-text h6 {
  left: 503px;
  top: 77px;
}
.box-content .banner .two-text span {
  left: 617px;
  top: 109px;
}
.box-content .banner .two-text p {
  left: 524px;
  top: 144px;
}
.box-content .banner .three-text h6 {
  left: 804px;
  top: 77px;
}
.box-content .banner .three-text span {
  left: 918px;
  top: 109px;
}
.box-content .banner .three-text p {
  left: 821px;
  top: 144px;
}
.box-content .banner .four-text h6 {
  left: 1101px;
  top: 77px;
}
.box-content .banner .four-text span {
  left: 1215px;
  top: 109px;
}
.box-content .banner .four-text p {
  left: 1124px;
  top: 144px;
}

h3 {
  width: 200px;
  height: 48px;
  font-size: 32px;
  font-weight: 500;
  color: #333333;
  line-height: 48px;
}
h4 {
  width: 260px;
  height: 48px;
  font-size: 24px;
  font-weight: 300;
  color: #333333;
  line-height: 48px;
}
.box-content .echarts {
  height: 406px;
  width: 1103px;
}
/* 产品服务 */
.swiper-top {
  width: 1439px;
  height: 511px;
  margin: 0 auto;
  background-image: url('~@/assets/img/home-img/service-bg.png');
  background-size: cover;
  position: relative;
}
.swiper-bottom {
  width: 1439px;
  height: 311px;
  margin: 0 auto;
  background: #f3f4f5;
}
.swiper-top h4 {
  position: absolute;
  top: 79px;
  left: 130px;
  width: 260px;
  height: 48px;
  font-size: 24px;
  font-weight: 300;
  color: #ffffff;
  line-height: 48px;
}
.swiper-top h3 {
  position: absolute;
  left: 137px;
  top: 128px;
  width: 200px;
  height: 48px;
  font-size: 32px;
  font-weight: 500;
  color: #ffffff;
  line-height: 48px;
}

.swiper-top .card-one {
  position: relative;
  width: 370px;
  height: 462px;
  background: #ffffff;
}
.swiper-top .card-one .img {
  position: absolute;
  top: 69px;
  left: 157px;
  width: 56px;
  height: 52px;
}
.swiper-top .card-one .img img {
  width: 100%;
  height: 100%;
}
.swiper-top .card-one h6 {
  position: absolute;
  top: 150px;
  left: 136px;
  width: 98px;
  height: 22px;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  line-height: 22px;
}
.swiper-top .card-one p {
  position: absolute;
  top: 190px;
  left: 35px;
  width: 298px;
  height: 72px;
  font-size: 12px;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  overflow: hidden;
}

.swiper-container {
  margin: 0 auto;
  left: 50px;
  top: 227px;
  width: 1339px;
  height: 662px;
}
.swiper-container .swiper-button-prev {
  outline: none;
  border: 1px solid rgba(203, 203, 203, 0.9);
  width: 44px;
  height: 44px;
  top: 530px;
  left: 0px;
}
.swiper-container .swiper-button-next {
  outline: none;
  border: 1px solid rgba(203, 203, 203, 0.9);
  width: 44px;
  height: 44px;
  top: 530px;
  left: 45px;
}
.el-icon-right {
  color: #50c19a;
  margin-left: 10px;
}
.two-box {
  .el-icon-right {
    color: #ffffff;
  }
}
</style>
