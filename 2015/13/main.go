package main

import (
    "fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func getPermutations(input []string) [][]string {
	output := make([][]string, 0)

	for i,opt := range input {
		new := make([]string, len(input))
		copy(new, input)
		rest := append(new[:i], new[i+1:]...)

		if (len(rest) == 0) {
			output = append(output, []string{opt})
			continue
		}

		subPerms := getPermutations(rest)
		for _,subPerm := range subPerms {
			builtOpt := append(subPerm, opt)
			output = append(output, builtOpt)
		}
	}

	return output
}

func countArrangement(input []string, happinessMap map[string]map[string]int) int {
	total := 0
	for i,person := range input {
		var left string
		if i == 0 {
			left = input[len(input)-1]
		} else {
			left = input[i-1]
		}

		var right string
		if i == len(input)-1 {
			right = input[0]
		} else {
			right = input[i+1]
		}

		myMap := happinessMap[person]
		total = total + myMap[left] + myMap[right]
	}
	return total
}

func main() {
	file, err := ioutil.ReadFile("in.txt")
	if err != nil {
		panic(err)
	}

	input := strings.Split(string(file), "\n")

	happinessMap := make(map[string]map[string]int)

	for _,row := range input {
		if len(string(row)) == 0 {
			continue
		}
		line := strings.Split(string(row), " ")

		toPerson := string(line[0])
		fromPerson := strings.Replace(string(line[10]), ".", "", 1)
		value, err := strconv.Atoi(string(line[3]))

		if err != nil {
			panic(err)
		}

		if string(line[2]) == "lose" {
			value = value * -1
		}

		if len(happinessMap[toPerson]) == 0 {
			happinessMap[toPerson] = make(map[string]int)
		}
		happinessMap[toPerson][fromPerson] = value
	}

	ret := -999999

	allPeople := make([]string, 0)
	for k := range happinessMap {
		allPeople = append(allPeople, k)
	}

	permutations := getPermutations(allPeople)

	for _,permutation := range permutations {
		val := countArrangement(permutation, happinessMap)
		if val > ret {
			ret = val
		}
	}

	fmt.Println("ret:", ret)
}
