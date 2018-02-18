package main

import (
    "fmt"
	"io/ioutil"
	"strings"
	"strconv"
)


func main() {
	file, err := ioutil.ReadFile("in.txt")
	if err != nil {
		panic(err)
	}

	const (
		TOGGLE = 0
		TURN_ON = 1
		TURN_OFF = 2
	)

	input := strings.Split(string(file), "\n")

	grid := [1000][1000]int{}

	for _,instruction := range input {
		if len(instruction) == 0 {
			continue
		}
		pieces := strings.Split(instruction, " ")

		var startInd int
		var endInd int
		var inst int

		if pieces[0] == "toggle" {
			startInd = 1
			endInd = 3
			inst = TOGGLE
		} else {
			startInd = 2
			endInd = 4
			if pieces[1] == "on" {
				inst = TURN_ON
			} else {
				inst = TURN_OFF
			}
		}

		startCoords := strings.Split(pieces[startInd], ",")
		endCoords := strings.Split(pieces[endInd], ",")

		startX, e1 := strconv.Atoi(startCoords[0])
		startY, e2 := strconv.Atoi(startCoords[1])

		endX, e3 := strconv.Atoi(endCoords[0])
		endY, e4 := strconv.Atoi(endCoords[1])

		for _,e := range [4]error{e1, e2, e3, e4} {
			if e != nil {
				panic(e)
			}
		}

		for x := startX; x <= endX; x++ {
			for y := startY; y <= endY; y++ {
				if inst == TOGGLE {
					grid[x][y] = grid[x][y] + 2
				} else if inst == TURN_ON {
					grid[x][y] = grid[x][y] + 1
				} else if grid[x][y] > 0 {
					grid[x][y] = grid[x][y] - 1
				}
			}
		}
	}

	totalOn := 0
	for i := 0; i < 1000; i++ {
		for j := 0; j < 1000; j++ {
			totalOn+= grid[i][j]
		}
	}

	fmt.Println("totalOn:", totalOn)
}
