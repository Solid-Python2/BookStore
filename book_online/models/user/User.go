package user

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Username     string `gorm:"type:varchar(30);unique" json:"username"`
	Phone        string `gorm:"type:varchar(11);max_lenght=11" json:"phone"`
	Password     string `gorm:"type:varchar(255)" json:"password"`
	Name         string `gorm:"type:varchar(30);default:''" json:"name"`
	ImgUrl       string `gorm:"type:varchar(255);default:''" json:"imgurl"`
	Info         string `gorm:"type:varchar(255);default:''" json:"info"`
	Gender       bool   `gorm:"type:bool;default:false" json:"gender"`
	Manage       bool   `gorm:"type:bool;default:false" json:"manage"`
	Enable       bool   `gorm:"type:bool;default:false" json:"enable"`
	RegisterTime time.Time
	jwt.StandardClaims
}
