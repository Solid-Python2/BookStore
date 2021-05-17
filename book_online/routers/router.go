package routers

import (
	"book_online/controller"

	"github.com/gin-gonic/gin"
)


//SetupRouter 设置路由
func SetupRouter(route *gin.Engine) {
	//路由
	v1 := route.Group("/user/")
	{
		v1.GET("usernameVerify/", controller.UserVerify)
		v1.POST("register/", controller.UserRegister)
		v1.POST("login/", controller.UserLogin)

	}
}
