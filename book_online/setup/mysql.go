package setup

import (
	"book_online/config"
	"book_online/models/user"
	"fmt"

	"github.com/jinzhu/gorm"
)

//InitMySql 数据库连接
func InitMySql() {
	args := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=%s&parseTime=true",
		config.Config.MysqlConf.Username,
		config.Config.MysqlConf.Password,
		config.Config.MysqlConf.Host,
		config.Config.MysqlConf.Port,
		config.Config.MysqlConf.Database,
		config.Config.MysqlConf.Charset,
	)
	fmt.Printf("driverName:%s\n",config.Config.MysqlConf.DriverName)
	db, err := gorm.Open(config.Config.MysqlConf.DriverName, args)
	if err != nil {
		panic("failed to connect database,err:" + err.Error())
	}
	config.Config.MysqlConf.MysqlConn=db
	//自动创建数据表
	db.AutoMigrate(&user.User{})

}
