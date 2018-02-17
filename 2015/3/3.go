package main

import (
    "fmt"
	"io/ioutil"
	"strconv"
)

func addToLog(x int, y int, log map[string]int) {
	key := strconv.Itoa(x) + "," + strconv.Itoa(y)
	if val, ok := log[key]; ok {
		log[key] = val + 1
	} else {
		log[key] = 1
	}
}

func main() {
	file, err := ioutil.ReadFile("3_in.txt")
	if err != nil {
		panic(err)
	}

	input := string(file)

	sx := 0
	sy := 0

	rx := 0
	ry := 0
	
	log := make(map[string]int)

	for ind, char := range input {
		// Part 1 this branch always executes
		if ind % 2 == 0 {
			addToLog(sx, sy, log)
			
			switch string(char) {
			case "^":
				sy--
			case ">":
				sx++
			case "v":
				sy++
			case "<":
				sx--
			default:
				break
			}
		} else {
			addToLog(rx, ry, log)
			
			switch string(char) {
			case "^":
				ry--
			case ">":
				rx++
			case "v":
				ry++
			case "<":
				rx--
			default:
				break
			}
		}

	}

	count := len(log)

	fmt.Println(count)
}
