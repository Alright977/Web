<template>
  <div>
    <div class="center">
      <div class="banner">
        <h3>新闻中心</h3>
        <img :src="centerBanner" alt="" />
      </div>
      <div class="card" v-for="(item, index) in centerList" :key="index">
        <div class="card-flex">
          <div class="card-img">
            <img :src="item.fileAddress ? item.fileAddress : $store.state.defaultImg" alt="" />
          </div>
          <div class="card-text">
            <h6>{{ item.newTitle }}</h6>
            <p>{{ item.newDescription }}</p>
            <span>{{ item.createDate }}</span>
            <div class="card-text-btn" @click="handClick(index)"> <a href="javascript:;">了解更多</a><i class="el-icon-right"></i> </div>
          </div>
        </div>
      </div>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="(count / 3) * 10" @next-click="nextPage" @prev-click="prevPage" @current-change="sizePage"> </el-pagination>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Center',
  created() {
    this.$axios
      .get('GetNewTableInfo', {
        params: {
          PageIndex: this.PageIndex,
          PageSize: this.PageSize,
        },
      })
      .then((res) => {
        if (res.status) {
          this.count = res.data.count
          this.centerList = res.data.data
        } else {
          this.$message.error(res.message)
        }
      })
    this.$axios.get('GetNewInfo?RequestSource=11').then((res) => {
      this.centerBanner = res.message
    })
  },
  data() {
    return {
      id: null,
      PageIndex: 1,
      PageSize: 3,
      count: null,
      pageNum: '',
      centerList: [],
      centerBanner: '',
    }
  },
  methods: {
    // 新闻详情
    handClick(index) {
      this.$router.push({
        path: '/detail',
        query: {
          id: this.centerList[index].newId,
        },
      })
    },
    // 下一页
    nextPage(i) {
      console.log('a')
      this.PageIndex = i
      let _this = this
      this.$axios
        .get('GetNewTableInfo', {
          params: {
            PageIndex: _this.PageIndex,
            PageSize: _this.PageSize,
          },
        })
        .then((res) => {
          this.centerList = res.data.data
        })
    },
    // 上一页
    prevPage(i) {
      console.log('a')
      this.PageIndex = i
      let _this = this
      this.$axios
        .get('GetNewTableInfo', {
          params: {
            PageIndex: _this.PageIndex,
            PageSize: _this.PageSize,
          },
        })
        .then((res) => {
          this.centerList = res.data.data
        })
    },
    // 点击页数
    sizePage(i) {
      this.PageIndex = i
      let _this = this
      this.$axios
        .get('GetNewTableInfo', {
          params: {
            PageIndex: _this.PageIndex,
            PageSize: _this.PageSize,
          },
        })
        .then((res) => {
          this.centerList = res.data.data
        })
    },
  },
}
</script>

<style scoped lang="scss">
.center {
  width: 1440px;
  margin: 0 auto;
  .banner {
    position: relative;
    height: 327px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    h3 {
      position: absolute;
      top: 131px;
      left: 134px;
      width: 144px;
      height: 50px;
      font-size: 36px;
      font-weight: 300;
      color: #ffffff;
      line-height: 50px;
    }
  }
  .card {
    height: 196px;
    margin-top: 60px;
    margin-left: 235px;
    .card-flex {
      display: flex;
      .card-img {
        height: 196px;
        width: 308px;
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
      .card-text {
        h6 {
          margin-left: 75px;
          margin-top: 16px;
          width: 280px;
          height: 28px;
          font-size: 20px;
          font-weight: 400;
          color: #333333;
          line-height: 28px;
        }
        p {
          margin-top: 20px;
          margin-left: 75px;
          width: 577px;
          height: 72px;
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          line-height: 24px;
        }
        span {
          display: inline-block;
          margin-top: 17px;
          margin-left: 75px;
          height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
        }
        .card-text-btn {
          margin-left: 517px;
          margin-top: -45px;
          text-align: center;
          width: 135px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #50c19a;
          a {
            text-decoration: none;
            width: 67px;
            height: 22px;
            font-size: 14px;
            font-weight: 400;
            color: #50c19a;
            line-height: 28px;
          }
        }
      }
    }
  }
  .page {
    width: 274px;
    margin: 0 auto;
    margin-top: 120px;
    margin-bottom: 134px;
  }
}
</style>
