<template>
  <div>
    <div class="about">
      <div class="banner">
        <img :src="aboutList.fileAddress ? aboutList.fileAddress : $store.state.defaultImg" alt="" />
        <h3>关于云慧</h3>
      </div>
      <div class="content">
        <div class="content-about">
          <h5> ABOUT</h5>
          <h4> 关于云慧</h4>
          <div class="p-about" v-html="aboutList.aboutUs"></div>
        </div>
        <div class="company">
          <h5>COMPANY CULTURE</h5>
          <h4>企业文化</h4>
          <div class="company-flex">
            <div class="company-img">
              <img src="@/assets/img/about-img/culture.png" alt="" />
            </div>
            <div class="company-text">
              <h6 class="h6-company-1">愿景</h6>
              <p>成为医疗领域的领导先锋</p>
              <h6 class="h6-company-2">使命</h6>
              <p>我们建设江西本地化医疗企业，为江西医疗的发展提供有力保障，生命不息，勇往直前</p>
              <h6 class="h6-company-3">核心价值观</h6>
              <p>创新，诚信，专业</p>
            </div>
          </div>
        </div>
        <div class="contact">
          <h5> CONTACT US</h5>
          <h4>联系我们</h4>
          <div class="amap-page-container">
            <el-amap class="amap-box" vid="map" :zoom="zoom" :center="center">
              <el-amap-text text="南昌 西湖区 梦想小街 401" :offset="[0, -50]"></el-amap-text>
              <el-amap-marker :position="center"> </el-amap-marker>
            </el-amap>
          </div>
        </div>
        <div class="form-flex">
          <div class="form-text">
            <h6 class="form-h6-1">我们的办公地址:</h6>
            <p>{{ aboutList.workAddress }}</p>
            <h6>我们的工作时间:</h6>
            <p>{{ aboutList.workTime }}</p>
            <h6>我们的服务热线:</h6>
            <p>{{ aboutList.serviceTelephoneText }}</p>
            <h6>我们的电子邮箱:</h6>
            <p>{{ aboutList.electronicEmailText }}</p>
          </div>
          <div class="form-input">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" resetFields>
              <el-form-item prop="name">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item prop="company">
                <el-input type="text" v-model="ruleForm.company" autocomplete="off" placeholder="公司"></el-input>
              </el-form-item>
              <el-form-item prop="phone">
                <el-input v-model.number="ruleForm.phone" placeholder="电话"></el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input v-model.number="ruleForm.email" placeholder="邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" placeholder="描述" class="desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  created() {
    this.$axios.get('GetAboutYunHuiInfo?RequestSource=11').then((res) => {
      if (res.status) {
        let data = res.data.data
        if (data.length > 0) {
          this.aboutList = data[0]
          this.center = [data[0].longitude, data[0].latitude]
        }
      } else {
        this.$message.error(res.message)
      }
    })
  },
  data() {
    return {
      zoom: 16,
      aboutList: {},
      center: [0, 0],
      ruleForm: {
        name: '',
        company: '',
        phone: '',
        emali: '',
        desc: '',
      },

      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        company: [{ required: true, message: '请输入公司', trigger: 'change' }],
        phone: [{ required: true, message: '请输入电话', trigger: 'change' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'change' }],
        desc: [{ required: true, message: '请填写描述', trigger: 'change' }],
      },
    }
  },
  methods: {
    imgError(item) {
      item.img
    },
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('AddContactInfo', { ruleForm: this.ruleForm }).then(() => {
            _this.$message({
              message: '提交成功',
              type: 'success',
            })
            // 提交后表单重置
            _this.$refs[formName].resetFields()
          })
        } else {
          this.$message.error('请填写内容后提交')
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.about {
  width: 1440px;
  margin: 0 auto;
  .banner {
    position: relative;
    height: 327px;
    img {
      width: 100%;
      height: 100%;
    }
    h3 {
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
  }
  .content {
    h5 {
      width: 260px;
      height: 48px;
      font-size: 24px;
      font-weight: 300;
      color: #333333;
      line-height: 48px;
    }
    h4 {
      margin-left: 146px;
      margin-top: 1px;
      width: 200px;
      height: 48px;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 48px;
    }
    .content-about {
      h5 {
        margin-left: 139px;
        margin-top: 81px;
      }
      .p-about {
        margin-left: 139px;
        margin-top: 28px;
        ::v-deep p {
          line-height: 30px;
          margin-top: 20px;
          width: 1166px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
      }
    }
    .company {
      h5 {
        margin-top: 109px;
        margin-left: 149px;
      }
      .company-flex {
        display: flex;
        .company-img {
          img {
            object-fit: cover;
            width: 560px;
            height: 458.4px;
            margin-top: 58px;
            margin-left: 135px;
          }
        }
        .company-text {
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
          .h6-company-1 {
            margin-top: 128px;
          }
          .h6-company-2 {
            margin-top: 40px;
          }
          .h6-company-3 {
            margin-top: 39px;
          }
        }
      }
    }
    .contact {
      .amap-page-container {
        margin-top: 60px;
        width: 1170px;
        height: 500px;
      }
      margin-left: 135px;
      h5 {
        margin-top: 148px;
      }
      h4 {
        margin-left: 7px;
      }
      img {
        object-fit: cover;
        margin-top: 70px;
        width: 1170px;
        height: 500px;
      }
    }
    .form-flex {
      display: flex;
      justify-content: space-between;
      margin: 70px 134px 0 145px;
      .form-text {
        h6 {
          width: 146px;
          height: 28px;
          font-size: 20px;
          font-weight: 500;
          color: #333333;
          line-height: 28px;
          margin-top: 32px;
        }
        p {
          width: 407px;
          height: 22px;
          font-size: 16px;
          font-weight: 400;
          color: #999999;
          line-height: 28px;
          margin-top: 10px;
        }
        .form-h6-1 {
          margin-top: 0;
        }
      }
      .form-input {
        .el-form-item {
          margin-bottom: 25px;
          .el-input {
            width: 590px;
            ::v-deep .el-input__inner {
              height: 52px;
            }
          }
          ::v-deep textarea {
            resize: none;
            height: 180px;
          }
          .el-button {
            width: 164px;
            height: 50px;
            background: #50c19a;
            border-radius: 4px;
            border: none;
            margin-bottom: 70px;
          }
        }
      }
    }
  }
}
</style>
