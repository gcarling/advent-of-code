package main

import (
    "fmt"
	"io/ioutil"
	"strings"
)

func isNice1(input string) bool {
	VOWELS := [...]string {"a", "e", "i", "o", "u"}
	BAD_STRINGS := [...]string {"ab", "cd", "pq", "xy"}

	numVowels := 0
	numDoubles := 0
	hasBad := false
	for i := 0; i < len(input); i++ {
		cur := string(input[i])

		for _, vowel := range VOWELS {
			if vowel == cur {
				numVowels++
				break
			}
		}

		if (i == len(input) - 1) {
			break
		}

		next := string(input[i+1])

		if cur == next {
			numDoubles++
		}

		for _,bad := range BAD_STRINGS {
			if bad == cur + next {
				hasBad = true
				break
			}
		}

		if hasBad {
			break
		}
	}

	return numVowels >= 3 && numDoubles >= 1 && !hasBad
}

func isNice2(input string) bool {
	hasDoublePair := false
	hasSandwich := false
	for i := 0; i < len(input); i++ {
		if (i >= len(input) - 2) {
			break
		}

		cur := string(input[i])
		next := string(input[i+1])

		pair := cur + next

		for j := i+2; j < len(input) - 1; j++ {
			cur2 := string(input[j])
			next2 := string(input[j+1])

			pair2 := cur2 + next2

			if pair == pair2 {
				hasDoublePair = true
				break
			}
		}

		next3 := string(input[i+2])
		if cur == next3 {
			hasSandwich = true
		}
	}

	return hasDoublePair && hasSandwich
}

func main() {
	file, err := ioutil.ReadFile("in.txt")
	if err != nil {
		panic(err)
	}

	input := strings.Split(string(file), "\n")


	numNice := 0

	for _, stringToCheck := range input {
		if isNice2(stringToCheck) {
			numNice++
		}
	}

	fmt.Println("numNice:",numNice)
}
