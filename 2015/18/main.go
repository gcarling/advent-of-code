package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

func getVal(lights [][]bool, r int, c int) bool {
	if r < 0 || r >= len(lights) || c < 0 || c >= len(lights[r]) {
		return false
	}

	return lights[r][c]
}

func runStep(lights [][]bool) [][]bool {
	ret := make([][]bool, len(lights))

	for i, row := range lights {
		ret[i] = make([]bool, len(row))

		for j, light := range row {
			var total int
			for r := i - 1; r <= i+1; r++ {
				for c := j - 1; c <= j+1; c++ {
					if r == i && c == j {
						continue
					}

					if getVal(lights, r, c) {
						total++
					}
				}
			}

			if light {
				ret[i][j] = total == 2 || total == 3
			} else {
				ret[i][j] = total == 3
			}
		}
	}

	// Part 2 special logic
	ret[0][0] = true
	ret[len(ret)-1][0] = true
	ret[0][len(ret)-1] = true
	ret[len(ret)-1][len(ret)-1] = true

	return ret
}

func main() {
	file, err := ioutil.ReadFile("in.txt")
	if err != nil {
		panic(err)
	}

	input := strings.Split(string(file), "\n")

	lights := make([][]bool, len(input)-1)

	for i, line := range input {
		if len(line) == 0 {
			continue
		}

		lights[i] = make([]bool, len(line))
		for j, char := range line {
			lights[i][j] = char == '#'
		}
	}

	// Part 2 special logic
	lights[0][0] = true
	lights[len(lights)-1][0] = true
	lights[0][len(lights)-1] = true
	lights[len(lights)-1][len(lights)-1] = true

	for i := 0; i < 100; i++ {
		lights = runStep(lights)
	}

	var ret int
	for _, row := range lights {
		for _, light := range row {
			if light {
				ret++
			}
		}
	}

	fmt.Println("ret: ", ret)
}
