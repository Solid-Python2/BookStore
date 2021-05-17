package config

import (
	"book_online/models/user"

	"github.com/go-redis/redis"
	"github.com/jinzhu/gorm"
)

//Conf 总配置
type Conf struct {
	Log       `ini:"log"`          //日志
	Host      `ini:"host"`         //主机
	RedisConf `ini:"redis"`          //Redis
	MysqlConf `ini:"mysql"`          //Mysql
	UserMap   map[string]user.User //用户集合
	// BookMap   map[int]Book    //图书集合

}

//Host 主机
type Host struct {
	IP   string `ini:"ip"`   //ip地址
	Port string `ini:"port"` //端口号
}

//Redis Redis
//RedisConf redis配置
type RedisConf struct {
	RedisConn   *redis.Client //链接
	IP          string        `ini:"ip"`          //IP地址
	Port        string        `ini:"port"`        //端口号
	Password    string        `ini:"password"`    //密码
	DB          int           `ini:"db"`          //当前数据库
	Poolsize    int           `ini:"poolsize"`    //连接池数目
	PoolTimeout int64         `ini:"pooltimeout"` //连接池的超时
	MaxIdle     int           `ini:"MaxIdle"`     //最大连接数
	MaxActive   int           `ini:"MaxActive"`
	IdleTimeout int           `ini:"IdleTimeout"` //超时

}

//Mysql配置
type MysqlConf struct {
	MysqlConn  *gorm.DB //连接
	DriverName string   `ini:"driverName"` //数据库
	Host       string   `ini:"host"`       //主机
	Port       string   `ini:"port"`       //端口
	Database   string   `ini:"database"`   //数据库名
	Username   string   `ini:"username"`   //用户名
	Password   string   `ini:"password"`   //密码
	Charset    string   `ini:"charset"`    //编码

}

// Log 配置
type Log struct {
	Path  string `ini:"path"`
	Level string `ini:"level"`
}

//Result response响应
type Result struct {
	Data interface{}
	Msg  string
	Code int
}

//Config 全局配置
var Config = &Conf{}
