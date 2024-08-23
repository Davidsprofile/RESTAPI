package main

import (
	"example.com/backend/db"
	"example.com/backend/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()
	server.Static("/static", "./front")
	server.Use(cors.Default())
	server.GET("/", func(c *gin.Context) {
		c.File("./front/index.html")
	})
	routes.RegisterRoutes(server)
	db.InitDB()
	server.Run(":8080")
}
