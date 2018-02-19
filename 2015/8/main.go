package main

import (
    "fmt"
	"io/ioutil"
	"strings"
)

func valueForString(str string) (value int) {
	numCode := len(str)

	numChar := 0
	for i := 0; i < len(str); i++ {
		char := str[i]
		if char == '"' {
			continue
		}

		if char == '\\' {
			if str[i+1] == 'x' {
				i += 3
			} else {
				i ++
			}
		}

		numChar++
	}
	value = numCode - numChar
	return
}

func compareEncodeLen(str string) (value int) {
	value = 0
	for i := 0; i < len(str); i++ {
		char := str[i]
		if char == '"' {
			value++
		} else if char == '\\' {
			if str[i+1] == 'x' {
				value += 1
			} else {
				value += 2
			}
			i++
		}
	}
	value += 2
	return
}

func main() {
	file, err := ioutil.ReadFile("in.txt")
	if err != nil {
		panic(err)
	}

	input := strings.Split(string(file), "\n")

	total := 0
	for _,str := range input {
		if len(str) > 0 {
			total += compareEncodeLen(str)
		}
	}
	fmt.Println("total:", total)
}
