package setup

import (
	"book_online/config"
	"fmt"

	"time"

	"github.com/go-redis/redis"
)

//InitRedis redis初始化
func InitRedis(rds *config.RedisConf) {
	client := redis.NewClient(&redis.Options{
		Addr:        rds.IP + ":" + rds.Port,
		Password:    rds.Password,
		DB:          rds.DB,
		PoolSize:    rds.Poolsize,
		PoolTimeout: time.Duration(rds.PoolTimeout) * time.Second,
		IdleTimeout: time.Duration(rds.IdleTimeout) * time.Second,
	})
	_, err := client.Ping().Result()
	if err != nil {
		fmt.Println("Connect redis failed .Error is", err)
		config.SugarLogger.Error("Connect redis failed .Error is", err)
	}
	rds.RedisConn = client
}
