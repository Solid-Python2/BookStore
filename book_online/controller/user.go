package controller

import (
	"book_online/config"
	"book_online/models/user"
	"book_online/utils"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

//判断用户名是否存在
func UserVerify(ctx *gin.Context) {
	var u user.User
	db := config.Config.MysqlConf.MysqlConn
	db.Where("username=?", "").Find(&u)
	fmt.Println(u)
	result := config.Result{
		Code: 200,
		Msg:  "success",
		Data: nil,
	}
	resp := utils.ResultConversionResp(result)
	defer ctx.JSON(http.StatusOK, resp)
}

//用户注册
func UserRegister(ctx *gin.Context) {
	result := config.Result{
		Code: 200,
		Msg:  "success",
		Data: nil,
	}
	resp := utils.ResultConversionResp(result)
	defer ctx.JSON(http.StatusOK, resp)
	var u user.User
	ctx.BindJSON(&u)
	u.Phone = utils.CreatePhone()
	u.Name = u.Username
	u.RegisterTime = time.Now()
	db := config.Config.MysqlConf.MysqlConn
	//创建新用户
	db.Create(&u)
	resp = utils.ResultConversionResp(result)
}

//用户登陆
func UserLogin(ctx *gin.Context) {
	resp:=make(map[string]interface{})
	var u user.User
	ctx.BindJSON(&u)
	password := u.Password
	db := config.Config.MysqlConf.MysqlConn
	db.Where("username=?", u.Username).Find(&u)
	if u.Password == password {
		token,err:=utils.GenToken(u)
		if err!=nil{
			resp["message"]=err.Error()
			resp["code"]=50001
		}else{
			ctx.Header("Authorization",token)
			user_data:=make(map[string]interface{});
			user_data["username"]=u.Username
			user_data["gender"]=u.Gender
			user_data["imgUrl"]=u.ImgUrl
			user_data["info"]=u.Info
			user_data["manage"]=u.Manage
			user_data["enable"]=u.Enable
			resp["user"]=user_data
			resp["code"]=http.StatusOK
			resp["message"]="success"
		}
	}
	defer ctx.JSON(http.StatusOK, resp)
}
