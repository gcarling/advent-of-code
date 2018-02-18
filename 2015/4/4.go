package main

import (
	"fmt"
	"strconv"
	"crypto/md5"
	"encoding/hex"
)

func main() {
	input := "iwrupvqb"

	i := 1
	for {
		try := input + strconv.Itoa(i)
		rawHash := md5.Sum([]byte(try))
		hash := string(hex.EncodeToString(rawHash[:]))
		valid := true
		// test < 5 for part 1
		for test := 0; test < 6; test++ {
			if hash[test] != '0' {
				valid = false
				break
			}
		}
		if valid {
			fmt.Println("Hash:", hash)
			fmt.Println("Answer:", i)
			break
		}
		i++
	}
}
