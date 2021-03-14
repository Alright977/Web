<template>
  <div class="recruitment">
    <div class="rement">
      <div class="banner">
        <img :src="mentList.fileAddress ? this.mentList.fileAddress : $store.state.defaultImg" alt="" />
        <h3>人才招聘</h3>
      </div>
      <div class="organi">
        <h4>ORGANIZATION</h4>
        <h5>组织架构</h5>
        <img src="@/assets/img/rement-img/organ.png" alt="" />
      </div>
      <div class="careers">
        <h4>CAREERS</h4>
        <h5>人才招聘</h5>
        <div class="careers-content">
          <div class="header-top">
            <li>职位</li>
            <li>薪资</li>
            <li>经验要求</li>
            <li>学历要求</li>
            <li>职位性质</li>
            <li>工作地点</li>
          </div>
          <el-collapse v-model="isColl" accordion>
            <template v-for="(item, index) in mentList.recruitmentList">
              <div class="cr-collapse" :class="{ 'cr-collapse-active': index === isColl }" :key="index">
                <el-collapse-item :name="index">
                  <template slot="title">
                    <div class="table-header">
                      <li class="li-item-1">{{ item.position }}</li>
                      <li class="li-item-2">{{ item.salary }}</li>
                      <li class="li-item-3">{{ item.experienceRequire }}</li>
                      <li class="li-item-4">{{ item.educationRequire }}</li>
                      <li class="li-item-5">{{ item.positionNature }}</li>
                      <li class="li-item-6">{{ item.workSite }}</li>
                    </div>
                  </template>
                  <div class="table-content">
                    <h6 class="h6-1">岗位要求</h6>
                    <p v-html="item.positionRequire"></p>
                    <h6 class="h6-2">岗位职责</h6>
                    <p v-html="item.positionDuties"></p>
                    <h6 class="h6-3">在线申请</h6>
                    <p v-html="item.onlineApply"></p>
                  </div>
                </el-collapse-item>
              </div>
            </template>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecruitMent',
  created() {
    this.$axios.get('GetRecruitmentInfo?RequestSource=11').then((res) => {
      if (res.status) {
        this.mentList = res.data.data[0]
      } else {
        this.$message.error(res.message)
      }
    })
  },
  data() {
    return {
      isColl: null,
      mentList: {},
    }
  },
  methods: {},
}
</script>

<style lang="scss">
.rement {
  width: 1440px;
  margin: 0 auto;
  .banner {
    position: relative;
    height: 327px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  h3 {
    position: absolute;
    top: 131px;
    left: 135px;
    width: 144px;
    height: 50px;
    font-size: 36px;
    font-weight: 300;
    color: #ffffff;
    line-height: 50px;
  }
  .organi {
    padding-top: 71px;
    box-sizing: border-box;
    padding-left: 135px;
    height: 767px;
    background-color: #f3f4f5;
    h4 {
      width: 260px;
      height: 48px;
      font-size: 24px;
      font-weight: 300;
      color: #333333;
      line-height: 48px;
    }
    h5 {
      margin-top: 1px;
      width: 200px;
      height: 48px;
      font-size: 32px;
      font-weight: 500;
      color: #333333;
      line-height: 48px;
    }
    img {
      margin: 30px 0 0 113px;
      width: 938px;
      height: 456px;
      object-fit: cover;
    }
  }
  .careers {
    box-sizing: border-box;
    padding-top: 46px;
    padding-bottom: 170px;
    h4 {
      margin-left: 138px;
      width: 260px;
      height: 48px;
      font-size: 24px;
      font-weight: 300;
      color: #333333;
      line-height: 48px;
    }
    h5 {
      margin-top: 1px;
      margin-left: 138px;
      margin-bottom: 53px;
      width: 200px;
      height: 48px;
      font-size: 32px;
      font-weight: 500;
      color: #333333;
      line-height: 48px;
    }
    .careers-content {
      width: 1139px;
      margin: 0 auto;
      .header-top {
        height: 51px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        li {
          text-align: center;
          list-style: none;
          width: 80px;
          height: 22px;
          font-size: 16px;
          font-weight: 400;
          color: #999999;
          line-height: 22px;
        }
      }
      .table-header {
        height: 51px;
        display: flex;
        align-items: center;
        li {
          text-align: center;
          list-style: none;
          width: 80px;
          height: 22px;
          font-size: 16px;
          font-weight: 400;
          color: #333333;
          line-height: 22px;
        }

        .li-item-1 {
          margin-left: 50px;
        }
        .li-item-2 {
          margin-left: 113px;
        }
        .li-item-3 {
          margin-left: 110px;
        }
        .li-item-4 {
          margin-left: 112px;
        }
        .li-item-5 {
          margin-left: 111px;
        }
        .li-item-6 {
          margin-left: 115px;
        }
      }
      .table-content {
        box-sizing: border-box;
        padding-top: 9px;
        padding-left: 44px;
        padding-bottom: 37px;
        border: 1px solid #50c19a;
        h6 {
          width: 56px;
          height: 24px;
          font-size: 14px;
          font-weight: 500;
          color: #333333;
          line-height: 24px;
        }
        .h6-1 {
          margin-top: 9px;
        }
        .h6-2 {
          margin-top: 20px;
        }
        .h6-3 {
          margin-top: 18px;
        }
        p {
          font-size: 14px;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }
  .cr-collapse {
    .el-collapse-item__header {
      background-color: #f8f9f9;
      .el-collapse-item__arrow {
        transform: rotate(90deg);
        margin-right: 20px;
      }
      .el-collapse-item__arrow.is-active {
        transform: rotate(270deg);
      }
    }
  }
  .cr-collapse-active {
    .el-collapse-item__header {
      background-color: #50c19a;
    }
  }
}
</style>
