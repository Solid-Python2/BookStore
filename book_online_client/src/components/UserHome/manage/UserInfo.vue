<template>
  <div class="content">
    <div class="info">
      <div class="user_card">
        <el-image
          style="width: 160px; height: 160px;vertical-align: middle;border-radius: 50%;float: left;margin: 20px 10px"
          :src="user.imgUrl"
          fit="fill"></el-image>
        <div class="user_card_info">
          <p style="font-size: 22px;color: #616161">{{user.name}}</p>
          <p style="color: #757575">修改头像</p>
        </div>
      </div>
      <div class="user_action">
        <p><span>账号安全:</span><span>普通</span></p>
        <p><span>绑定手机:</span><span>{{user.phone}}</span></p>
        <p><span>绑定邮箱:</span><span>{{user.username}}</span></p>
      </div>
    </div>

    <div class="box_info">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="账号安全" name="first">
          <div class="tab_box">
            <div class="secure_box">
              <div class="secure_logo">
                <i class="el-icon-lock"></i>
              </div>
              <div class="secure_title">
                <h3>账号密码</h3>
                <p class="text_msg">用于保护帐号信息和登录安全</p>
              </div>
              <div class="secure_action">
                <el-button plain @click="ChangePwd">修改</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="个人信息" name="second">
          <div class="tab_box">
            <div class="modify_box">
              <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="80px">
                <el-form-item prop="name" label="昵称">
                  <el-input type="text" v-model="ruleForm.name" autocomplete="off" placeholder="请输入名字"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="gender" label="性别">
                  <el-radio-group v-model="ruleForm.gender">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                  </el-radio-group>

                </el-form-item>
                <el-form-item prop="info" label="简介">
                  <el-input type="textarea" v-model="ruleForm.info" autocomplete="off"
                            placeholder="To introduce myself"></el-input>
                </el-form-item>
                <el-form-item prop="Img" label="头像  ">
                  <el-upload
                    action="#"
                    :limit="1"
                    :on-change="getPhotoFile"
                    list-type="picture-card"
                    :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                      <span class="el-upload-list__item-actions">
                          <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                          >
                            <i class="el-icon-zoom-in"></i>
                          </span>
                    </span>
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="ruleForm.imgUrl" alt="">
                  </el-dialog>

                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="width: 120px;" @click="onSubmit()">确认修改</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  // <!--用户中心-->
  import {reqGetUserInfo, reqUpdateUserInfo, BASE_URL} from "../../../api/user";
  // <!--用户中心-->
  export default {
    name: "UserInfo",
    data() {

      return {
        activeName: 'first',
        currentPage: 1,
        page_size: 5,
        total: 20,
        user: {
          id: null,
          username: "",
          name: "",
          gender: "",
          phone: "",
          enable: false,
          info: "",
          imgUrl: "",
        },
        ruleForm: {
          username: '',
          name: '',
          gender: null,
          info: '',
          imgUrl: null,
        },
        dialogVisible: false,
        disabled: false,
        photo: '',
      }
    },
    created() {
      this.initUserCenter();
    },
    methods: {
      initUserCenter() {
        reqGetUserInfo({'username': this.$store.getters.getUser.username}).then(response => {
          if (response.code == 200) {
            this.user = response.user;
            console.log(this.user)
            this.ruleForm.username = this.user.username
            this.ruleForm.name = this.user.name
            this.ruleForm.info = this.user.info
            this.ruleForm.gender = Number(this.user.gender)

          } else {
            this.$message({
              message: response.message,
              type: "warning"
            })
          }
        }).catch(err => {
          this.$message({
            message: "获取数据错误了，请检查网络是否连接",
            type: "warning"
          })
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getPhotoFile: function (file) {
        this.photo = file.raw
        console.log(this.photo)
      },
      onSubmit() {
        if (this.photo) {
          this.ruleForm.imgUrl = this.photo
        } else {
          delete this.ruleForm['imgUrl']
        }
        console.log(this.ruleForm)
        let form_data = new FormData();
        for (let key in this.ruleForm) {
          form_data.append(key, this.ruleForm[key]);
        }

        var headers = {headers: {'Content-Type': 'multipart/form-data'}}
        reqUpdateUserInfo(form_data, headers).then((response) => {
          location.reload()
        }).catch((error) => {
          console.log(error)
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //操作表格
      ChangePwd() {
        this.$router.push({
          path: "/user/pwdManage",
        })
      },
    },
  }
</script>

<style scoped>

  .content {
    width: 1000px;
    margin: 40px auto;
    background-color: white;
  }

  .info {
    width: 940px;
    height: 200px;
    margin: 0px auto;
    background-color: #ffffff;
    /*border-bottom: 1px solid #d9d9d9;*/
  }

  .user_card {
    width: 540px;
    height: 200px;
    float: left;
  }

  .user_card_info {
    margin: 75px 0px;
    width: 200px;
    height: 100px;
    display: inline-block;
    line-height: 30px;
  }

  .user_action {
    float: left;
    width: 400px;
    height: 200px;
    padding-top: 65px;
  }

  span {
    color: #757575;
    font-size: 15px;
    margin: 0px 5px;
    line-height: 30px;
  }


  h1 {
    color: #757575;
    font-family: 新宋体;
  }

  .box_info {
    width: 960px;
    margin: 10px auto;
  }

  /deep/ .el-tabs__item {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #757575;
  }

  .tab_box {
    width: 100%;

  }

  .noMesInfo {
    text-align: center;
    font-size: 18px;
    color: #757575;
    line-height: 60px
  }

  .secure_box {
    margin: 12px auto 0px;
    width: 960px;
    height: 100px;
    border-top: 1px solid #e5e5e5;
    /*border-bottom: 1px solid #e5e5e5;*/
  }

  .secure_logo {
    display: inline-block;
    width: 60px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 30px;
    color: #ff7f52;
    vertical-align: top;
  }

  .secure_title {
    display: inline-block;
    width: 700px;
    height: 100px;
    vertical-align: top;
    padding-top: 25px;
  }

  .secure_action {
    display: inline-block;
    width: 190px;
    height: 100px;
    text-align: right;
    line-height: 100px;
    vertical-align: top;
  }

  .text_msg {
    color: #757575;
    font-size: 14px;
    line-height: 23px;
  }


  .modify_box {
    margin-top: 30px;
    width: 700px;
    height: 550px;
    /*border: 1px solid #dfdfdf;*/
    padding: 15px;
    overflow: auto;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
</style>

