package setup

import (
	"book_online/config"
	"book_online/middleware"
	"book_online/routers"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/go-ini/ini"
)

func InitServer(host string) {
	//创建默认服务器
	app := gin.Default()
	app.Use(middleware.Cors())
	//创建路由
	routers.SetupRouter(app)
	//启动服务器
	err := app.Run(host)
	if err != nil {
		config.SugarLogger.Error("Http not connect--------->", err)
	}
}

//InitServerConfig 初始化服务器配置
func InitServerConfig() {
	fmt.Println("=================从配置文件中加载所有配置================")
	err := ini.MapTo(config.Config, "config.ini")

	if err != nil {
		fmt.Println("加载配置err -------->", err)
		return
	}
	fmt.Println("------------------加载配置成功----------------")
	fmt.Println(config.Config)
	//生成日志
	config.InitLog()
	//初始化redis
	InitRedis(&config.Config.RedisConf)
	//初始化mysql
	InitMySql()
}
