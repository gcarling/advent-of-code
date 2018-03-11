package main

import (
    "fmt"
	// "io/ioutil"
	// "strconv"
	// "strings"
	// "errors"
)

func increment(input []byte) []byte {
	ret := input
	for i := len(input) - 1; i >= 0; i-- {
		cur := input[i]

		if cur != 'z' {
			ret[i] = input[i] + 1
			break
		}
		ret[i] = 'a'
	}
	return ret
}

func isValid(input []byte) bool {
	hasStraight := false
	firstPair := ""
	hasPairs := false

	for i := 0; i < len(input); i++ {
		cur := input[i]

		// check vowel
		if cur == 'i' || cur == 'o' || cur == 'l' {
			return false
		}

		if i == len(input) - 1 {
			continue
		}

		// check for pairs
		next := input[i+1]
		if !hasPairs && cur == next {
			pair := string(cur) + string(next)
			if len(firstPair) == 0 {
				firstPair = pair
			} else if firstPair != pair {
				hasPairs = true
			}
		}

		// check for straight of len 3
		if !hasStraight && i < len(input) - 2 {
			if input[i+1] == cur + 1 && input[i+2] == cur + 2 {
				hasStraight = true
			}
		}
	}

	return hasStraight && hasPairs
}

func main() {
	ret := []byte("hxbxwxba")
	// ret := []byte("abcdefgh")
	for !isValid(ret) {
		ret = increment(ret)
	}
	ret = increment(ret)
	for !isValid(ret) {
		ret = increment(ret)
	}
	fmt.Println("ret:", string(ret))
}
