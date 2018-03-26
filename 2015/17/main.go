package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

// Part 1
func countContainers1(containers []int, total int) int {
	// If we've used it all, this is a valid way
	if total == 0 {
		return 1
	}

	// If we've used too much, this is not valid
	// If we're out of containers, this is not valid
	if total < 0 || len(containers) == 0 {
		return 0
	}

	cur := containers[0]
	rest := containers[1:]

	return countContainers1(rest, total) + countContainers1(rest, total-cur)
}

// Part 2
func countContainers2(containers []int, total int, numUsed int) (int, []int) {
	// If we've used it all, this is a valid way
	if total == 0 {
		return 1, []int{numUsed}
	}

	// If we've used too much, this is not valid
	// If we're out of containers, this is not valid
	if total < 0 || len(containers) == 0 {
		return 0, []int{}
	}

	cur := containers[0]
	rest := containers[1:]

	totalWhenSkipped, numUsed1 := countContainers2(rest, total, numUsed)
	totalWhenUsed, numUsed2 := countContainers2(rest, total-cur, numUsed+1)
	return totalWhenSkipped + totalWhenUsed, append(numUsed1, numUsed2...)
}

func main() {
	file, err := ioutil.ReadFile("in.txt")
	if err != nil {
		panic(err)
	}

	input := strings.Split(string(file), "\n")

	containers := make([]int, len(input)-1)
	for i, line := range input {
		if len(line) == 0 {
			continue
		}

		val, err := strconv.Atoi(line)
		if err != nil {
			panic(err)
		}

		containers[i] = val
	}

	ret, numsUsed := countContainers2(containers, 150, 0)

	minUsed := 99999
	for _, numUsed := range numsUsed {
		if numUsed < minUsed {
			minUsed = numUsed
		}
	}

	var totalNumUsed int
	for _, numUsed := range numsUsed {
		if numUsed == minUsed {
			totalNumUsed++
		}
	}

	fmt.Println("ret: ", ret)
	fmt.Println("totalNumUsed: ", totalNumUsed)

}
