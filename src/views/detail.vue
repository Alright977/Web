<template>
  <div class="detail">
    <div class="detail-center">
      <div class="banner">
        <img :src="detailObj.fileAddress ? detailObj.bannerFileAddress : $store.state.defaultImg" alt="" />
        <h3>新闻中心</h3>
      </div>
      <h4>{{ detailObj.newTitle }}</h4>
      <span class="span-data">{{ detailObj.createDate }}</span>
      <span class="span-count">{{ detailObj.browseCount }} 浏览</span>
      <div class="p-content" v-html="detailObj.newContent"></div>
      <div class="p-flex">
        <p @click="lastClick" class="p-last-news">上一篇: {{ detailObj.lastNewTitle }}</p>
        <p @click="nextClick" class="p-next-news">下一篇: {{ detailObj.nextNewTitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      detailObj: {},
    }
  },
  activated() {
    console.log('a')
    this.$axios
      .get('GetNewDetailsInfo?RequestSource=11', {
        params: {
          NewId: this.$route.query.id,
        },
      })
      .then((res) => {
        if (res.status) {
          this.detailObj = res.data.data[0]
        } else {
          this.$message.error(res.message)
        }
      })
  },
  methods: {
    // 上一篇新闻
    lastClick() {
      this.$axios
        .get('GetNewDetailsInfo?RequestSource=11', {
          params: {
            NewId: this.detailObj.lastNewId,
          },
        })
        .then((res) => {
          if (res.status) {
            this.detailObj = res.data.data[0]
          } else {
            this.$message.error('没有上一篇了')
          }
        })
    },
    // 下一篇新闻
    nextClick() {
      this.$axios
        .get('GetNewDetailsInfo?RequestSource=11', {
          params: {
            NewId: this.detailObj.nextNewId,
          },
        })
        .then((res) => {
          if (res.status) {
            this.detailObj = res.data.data[0]
          } else {
            this.$message.error('没有下一篇了')
          }
        })
    },
  },
}
</script>

<style scoped lang="scss">
.detail {
  width: 1330px;
  margin: 0 auto;
  .detail-center {
    .banner {
      position: relative;
      img {
        width: 100%;
        height: 327px;
        object-fit: cover;
      }
      h3 {
        position: absolute;
        top: 130px;
        left: 134px;
        height: 50px;
        font-size: 36px;
        font-weight: 300;
        // color: #ffffff;
      }
    }
    h4 {
      margin-top: 56px;
      margin-left: 234px;
      height: 33px;
      font-size: 24px;
      font-weight: 500;
      color: #333333;
    }
    span {
      display: inline-block;
      margin-top: 22px;
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
    }
    .span-data {
      margin-left: 235px;
    }
    .span-count {
      margin-left: 10px;
    }
    .p-content {
      margin-top: 42px;
      margin-left: 235px;
      width: 969px;
      height: 20px;
      line-height: 40px;
    }
    .p-flex {
      margin-top: 155px;
      margin-bottom: 110px;
      display: flex;
      justify-content: space-between;
      p {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #333330;
        cursor: pointer;
      }
    }
  }
}
</style>
