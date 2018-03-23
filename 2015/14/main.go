package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
	"github.com/blendlabs/go-util"
)

type reindeer struct {
	speed int;
	duration int;
	restTime int;
}

type raceData struct {
	distance int;
	durationUsed int;
	restUsed int;
	resting bool;
	// part 2
	points int;
}

func handleStep(deer reindeer, data raceData) raceData {
	if !data.resting {
		data.distance += deer.speed
		data.durationUsed++

		if (data.durationUsed == deer.duration) {
			data.resting = true
			data.durationUsed = 0
		}
	} else {
		data.restUsed++

		if data.restUsed == deer.restTime {
			data.resting = false
			data.restUsed = 0
		}
	}

	return data
}

// for part 1
func calculateDistance(deer reindeer, totalTime int) int {
	var data raceData

	for i := 0; i < totalTime; i++ {
		data = handleStep(deer, data)
	}

	return data.distance
}

func main() {
	file, err := ioutil.ReadFile("in.txt")
	if err != nil {
		panic(err)
	}

	input := strings.Split(string(file), "\n")

	totalTime := 2503

	reindeers := make([]reindeer, len(input) - 1)

	for i,line := range input {
		if len(line) == 0 {
			continue
		}
		split := strings.Split(line, " ")

		speed,e1 := strconv.Atoi(split[3])
		duration,e2 := strconv.Atoi(split[6])
		restTime,e3 := strconv.Atoi(split[13])

		e := util.AnyError(e1,e2,e3)

		if e != nil {
			panic(e)
		}

		reindeers[i] = reindeer {
			speed: speed,
			duration: duration,
			restTime: restTime,
		}
	}

	// Part 1
	// distances := make([]int, len(reindeers))

	// for i,deer := range reindeers {
	// 	distances[i] = calculateDistance(deer, totalTime)
	// }

	// ret := util.Math.MaxOfInt(distances)

	// fmt.Println("ret:", ret)

	// Part 2
	raceData := make([]raceData, len(reindeers))

	for i := 0; i < totalTime; i++ {
		for ind,deer := range reindeers {
			raceData[ind] = handleStep(deer, raceData[ind])
		}

		var curMax int

		for _,data := range raceData {
			if data.distance > curMax {
				curMax = data.distance
			}
		}

		for ind,data := range raceData {
			if data.distance == curMax {
				raceData[ind].points++
			}
		}
	}

	var max int
	for _,data := range raceData {
		if data.points > max {
			max = data.points
		}
	}

	fmt.Println("max: ", max);

}
