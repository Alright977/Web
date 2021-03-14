<template>
  <div class="solition">
    <div class="solution-content">
      <div class="banner">
        <img :src="solutionList.fileAddress ? solutionList.fileAddress : $store.state.defaultImg" alt="" />
        <h3>解决方案</h3>
      </div>
      <div class="nav-content">
        <a href="javascript:;" :class="[{ 'a-1': index == 0 }, { active: id == index }]" v-for="(item, index) in solutionList.solutionList" :key="index" @click="handClick(index)">{{ item.solutionName }}</a>
      </div>
      <div class="medical">
        <h5> MEDICAL SOLUTIONS</h5>
        <h4>项目背景</h4>
        <p v-html="medicalList.projectBackground">}</p>
      </div>
      <div class="solve">
        <h5>SOLVE PROBLEM</h5>
        <h4>解决问题</h4>
        <div class="card">
          <div v-for="(item, index) in medicalList.jjwtList" :key="index">
            <img :src="item.image ? item.image : $store.state.defaultImg" alt="" />
            <h6>{{ item.textTitle }}</h6>
            <p>{{ item.textContent }}</p>
          </div>
        </div>
      </div>
      <div class="advantage">
        <h5 class="long-h5">SOLUTION ADVANTAGE</h5>
        <h4>方案优势</h4>
        <div class="card-box">
          <div class="card" v-for="(item, index) in medicalList.faysList" :key="index">
            <div class="img">
              <img :src="item.image" alt="" />
            </div>
            <h6>{{ item.textTitle }}</h6>
            <p>{{ item.textContent }}</p>
          </div>
        </div>
      </div>
      <div class="swiper">
        <h5> PARTNER</h5>
        <h4>合作伙伴</h4>
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item, index) in solutionList.hzhbList" :key="index">
            <div>
              <img :src="item ? item : $store.state.defaultImg" alt="" />
            </div>
          </swiper-slide>
          <!-- <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div> -->
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'solution',
  components: {
    Swiper,
    SwiperSlide,
  },
  activated() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.medicalList = this.solutionList.solutionList[this.id]
    }
  },
  created() {
    this.$axios.get('GetSolutionInfo?RequestSource=11').then((res) => {
      if (res.status) {
        this.solutionList = res.data.data[0]
        // 通过点击导航进去解决方案
        this.id = 0
        this.medicalList = this.solutionList.solutionList[this.id]
        // 通过索引进入
        if (this.$route.query.id) {
          this.id = this.$route.query.id
          this.medicalList = this.solutionList.solutionList[this.id]
        }
      } else {
        this.$message.error(res.message)
      }
    })
  },
  data() {
    return {
      // 控制active
      id: '',
      solutionList: {},
      medicalList: [],
      swiperOptions: {
        autoplay: true,
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 20,
      },
      // 左右箭头切换
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
    }
  },
  methods: {
    handClick(index) {
      this.id = index
      this.medicalList = this.solutionList.solutionList[index]
    },
  },
}
</script>

<style scoped lang="scss">
.swiper-container {
  margin: 0 auto;
  height: 265px;
  width: 908px;
}
.swiper-container .swiper-slide {
  height: 117px;
  background-color: #ffffff;
}
.solution-content {
  width: 1440px;
  margin: 0 auto;
}
.solution-content .banner {
  position: relative;
  height: 327px;
}
.solution-content .banner img {
  width: 100%;
  height: 100%;
}
.solution-content .banner h3 {
  position: absolute;
  top: 130px;
  left: 135px;
  width: 144px;
  height: 50px;
  font-size: 36px;
  font-weight: 300;
  color: #ffffff;
  line-height: 50px;
}
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
.solution-content .medical {
  height: 324px;
}
.solution-content h5 {
  padding-top: 89px;
  margin-left: 142px;
  width: 260px;
  height: 48px;
  font-size: 24px;
  font-weight: 300;
  color: #333333;
  line-height: 48px;
}
.solution-content h4 {
  margin-left: 140px;
  margin-top: 1px;
  width: 200px;
  height: 48px;
  font-size: 32px;
  font-weight: 500;
  color: #333333;
  line-height: 48px;
}
.solution-content .medical p {
  margin-top: 34px;
  margin-left: 140px;
  width: 1165px;
  height: 90px;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
  line-height: 28px;
}
.solution-content .solve {
  background-color: #f3f4f5;
}
.solution-content .solve .card {
  margin-top: 46px;
  margin-left: 103px;
  display: flex;
  flex-wrap: wrap;
}
.solution-content .solve .card div {
  width: 568px;
  height: 147px;
  margin-bottom: 30px;
  margin-left: 32px;
  background: #ffffff;
}
.solution-content .card div img {
  margin-top: 30px;
  margin-left: 30px;
  width: 48px;
  height: 48px;
}
.solution-content .card div h6 {
  margin-top: -50px;
  margin-left: 97px;
  height: 28px;
  font-size: 20px;
  font-weight: 400;
  color: #333333;
  line-height: 28px;
}
.solution-content .card div p {
  margin-left: 97px;
  margin-top: 13px;
  width: 420px;
  height: 48px;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  overflow: hidden;
}
.solution-content .card .long-text {
  width: 160px;
}
.solution-content .advantage .long-h5 {
  width: 310px;
}
.solution-content .advantage .card-box .card {
  margin-top: 50px;
  margin-left: 70px;
  width: 245px;
  height: 230px;
}
.solution-content .advantage .card-box .card .img {
  margin-left: 50px;
  width: 82px;
  height: 82px;
}
.solution-content .advantage .card-box .card .img img {
  margin-top: 0;
  width: 100%;
  height: 100%;
}
.solution-content .advantage .card-box .card h6 {
  width: 90px;
  margin-top: 20px;
  margin-left: 50%;
  transform: translateX(-50%);
  height: 28px;
  font-size: 20px;
  font-weight: 400;
  color: #333333;
  line-height: 28px;
  overflow: hidden;
}
.solution-content .advantage .card-box .card p {
  text-align: center;
  margin-top: 14px;
  width: 242px;
  height: 72px;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  overflow: hidden;
}
.solution-content .advantage .card-box {
  margin-left: 65px;
  display: flex;
}
.solution-content .advantage .img-box {
  display: flex;
  width: 1170px;
  margin: 0 auto;
  margin-top: 61px;
}
.solution-content .advantage .img-box div {
  margin-right: 30px;
  position: relative;
  width: 370px;
  height: 232px;
}
.solution-content .advantage .img-box div img {
  width: 100%;
  height: 100%;
}

.solution-content .advantage .img-box p {
  position: absolute;
  top: 194px;
  left: 119px;
  width: 132px;
  height: 22px;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  line-height: 22px;
}
.solution-content .swiper {
  height: 560px;
  background-color: #f3f4f5;
  img {
    width: 245px;
    height: 63px;
    object-fit: cover;
    margin-top: 27px;
    margin-left: 27px;
  }
}
.solution-content .swiper h5 {
  padding-top: 46px;
}
.solution-content .swiper h4 {
  margin-bottom: 54px;
}
</style>
