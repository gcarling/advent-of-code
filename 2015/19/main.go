package main

import (
	"fmt"
	"io/ioutil"
	"strings"
)

func contains(arr []string, val string) bool {
	for _, v := range arr {
		if v == val {
			return true
		}
	}
	return false
}

func generateResults(startingMolecule string, moleculeMap map[string][]string) []string {
	res := make([]string, 0)
	for i, char := range startingMolecule {
		swapOpts := moleculeMap[string(char)]
		for _, opt := range swapOpts {
			resultMolecule := startingMolecule[0:i] + opt + startingMolecule[i+1:]
			if !contains(res, resultMolecule) {
				res = append(res, resultMolecule)
			}
		}
	}
	return res
}

func main() {
	file, err := ioutil.ReadFile("sample.txt")
	if err != nil {
		panic(err)
	}

	input := strings.Split(string(file), "\n")

	moleculeMap := make(map[string][]string)

	var startingMolecule string

	for _, line := range input {
		if len(line) == 0 {
			continue
		}

		if strings.Contains(line, "=>") {
			split := strings.Split(line, " => ")
			if moleculeMap[split[0]] != nil {
				moleculeMap[split[0]] = append(moleculeMap[split[0]], split[1])
			} else {
				moleculeMap[split[0]] = []string{split[1]}
			}
		}

		// Otherwise its our start
		startingMolecule = line
	}

	ret := generateResults(startingMolecule, moleculeMap)

	fmt.Println("moleculeMap: ", moleculeMap)
	fmt.Println("startingMolecule: ", startingMolecule)
	fmt.Println("ret: ", ret)

	fmt.Println("ret: ", len(ret))
}
