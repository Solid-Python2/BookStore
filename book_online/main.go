package main

import (
	"book_online/config"
	"book_online/setup"
)

func main() {

	//加载装置
	setup.InitServerConfig()
	addr := config.Config.Host.IP + ":" + config.Config.Host.Port
	setup.InitServer(addr)
}
