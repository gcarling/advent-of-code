package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	file, err := ioutil.ReadFile("in.txt")
	if err != nil {
		panic(err)
	}

	trueSue := map[string]int{
		"children":    3,
		"cats":        7,
		"samoyeds":    2,
		"pomeranians": 3,
		"akitas":      0,
		"vizslas":     0,
		"goldfish":    5,
		"trees":       3,
		"cars":        2,
		"perfumes":    1,
	}

	input := strings.Split(string(file), "\n")

	var ret int
	for i, line := range input {
		if len(line) == 0 {
			continue
		}

		sueNum := i + 1

		splitStr := strconv.Itoa(sueNum) + ": "

		traitStr := strings.Split(line, splitStr)[1]

		traits := strings.Split(traitStr, ", ")

		match := true
		for _, trait := range traits {
			traitSplit := strings.Split(trait, ": ")
			traitName := traitSplit[0]
			traitValue, err := strconv.Atoi(traitSplit[1])
			if err != nil {
				panic(err)
			}

			// part 2 checks
			if traitName == "cats" || traitName == "trees" {
				if trueSue[traitName] < traitValue {
					continue
				}
			} else if traitName == "pomeranians" || traitName == "goldfish" {
				if trueSue[traitName] > traitValue {
					continue
				}
			} else if trueSue[traitName] == traitValue {
				continue
			}

			match = false
			break
		}

		if match {
			fmt.Println("Match found!!!")
			ret = sueNum
		}
	}

	fmt.Println("ret: ", ret)

}
