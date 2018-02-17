package main

import (
    "fmt"
    "io/ioutil"
)

func main() {
	file, err := ioutil.ReadFile("1_in.txt")
	if err != nil {
		panic(err)
	}

	input := string(file)

	count := 0
	i := 0
	for i < len(input) {
		if input[i] == '(' {
			count++
		} else if input[i] == ')' {
			count--
		}
		if count < 0 {
			break
		}
		i++
	}
	fmt.Println(i+1)
}
