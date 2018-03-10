package main

import (
    "fmt"
	// "io/ioutil"
	"strconv"
	// "strings"
	// "errors"
)

func lookAndSay(input string) string {
	out := ""

	for i := 0; i < len(input); i++ {
		num := 1
		cur := input[i]
		for ; i < len(input) - 1 && input[i+1] == cur; i++ {
			num++
		}
		out += strconv.Itoa(num) + string(cur)
	}
	return out
}

func main() {
	ret := "1113222113"
	for i := 0; i < 50; i++ {
		ret = lookAndSay(ret)
	}
	fmt.Println("len(ret):", len(ret))
}
