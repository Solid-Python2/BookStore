package utils

import (
	"book_online/config"
	"book_online/models/user"
	"fmt"
	"math/rand"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func CreatePhone() string {
	rand.Seed(time.Now().UnixNano())
	// 第二位数字
	second := []int{3, 4, 5, 7, 8}[rand.Intn(5)]
	// 第三位数字
	third := map[int]int{
		3: rand.Intn(10),
		4: []int{5, 7, 9}[rand.Intn(3)],
		5: []int{1, 2, 3, 5, 6, 7, 8, 9, 0}[rand.Intn(9)],
		7: []int{1, 2, 3, 5, 6, 7, 8}[rand.Intn(7)],
		8: rand.Intn(10),
	}[second]

	// 最后八位数字
	suffix := 100000 + rand.Intn(100000000-9999999)

	// 拼接手机号
	return fmt.Sprintf("1%d%d%d", second, third, suffix)
}

//result转换
func ResultConversionResp(result config.Result) (resp map[string]interface{}) {
	resp=make(map[string]interface{})
	resp["code"] = result.Code
	resp["message"] = result.Msg
	resp["data"] = result.Data
	return
}

// GenToken 生成JWT
func GenToken(claims user.User) (string, error) {
	const TokenExpireDuration = time.Hour * 24
	var MySecret = []byte("jl#33@sr^=!p(s@46b2&k4kost(@!k-#qtnjo$%ixenxlwb9i2")
	// 创建一个我们自己的声明
	claims.IssuedAt = time.Now().Unix()
    claims.ExpiresAt = time.Now().Add(TokenExpireDuration).Unix()
	claims.Issuer="solid"
	
	// 使用指定的签名方法创建签名对象
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// 使用指定的secret签名并获得完整的编码后的字符串token
	return token.SignedString(MySecret)
}
