package main

import (
    "fmt"
	"io/ioutil"
	"strconv"
	"strings"
	"errors"
)

type Pair struct {
	To string
	Dist int
}

type Node struct {
	Name string
	Others []Pair
}

func findNode(nodes []Node, name string) (int, bool) {
	for i,n := range nodes {
		if n.Name == name {
			return i,true
		}
	}
	return 0,false
}

func findRecurse(nodes []Node, path []Pair, cur string) int {
	// check if we done
	if len(path) == len(nodes) {
		sum := 0
		// fmt.Println("path:", path)
		for _,pair := range path {
			sum += pair.Dist
		}
		return sum
	}

	nodeInd,found := findNode(nodes, cur)
	if !found {
		panic(errors.New("Lategame node not found"))
	}
	node := nodes[nodeInd]

	max := 0
	for _,other := range node.Others {
		exists := false
		for _,n := range path {
			if n.To == other.To {
				exists = true
				break
			}
		}
		if exists {
			continue
		}

		val := findRecurse(nodes, append(path, other), other.To)

		if val > max {
			max = val
		}
	}

	return max
}

func main() {
	file, err := ioutil.ReadFile("in.txt")
	if err != nil {
		panic(err)
	}

	input := strings.Split(string(file), "\n")
	var nodes []Node

	for _,line := range input {
		if len(line) == 0 {
			continue
		}
		split := strings.Split(line, " ")
		node1Name := split[0]
		node2Name := split[2]
		dist,err := strconv.Atoi(split[4])
		if err != nil {
			panic(err)
		}

		_,exists1 := findNode(nodes, node1Name)
		if !exists1 {
			newNode := Node {
				Name: node1Name,
			}
			nodes = append(nodes, newNode)
		}
		_,exists2 := findNode(nodes, node2Name)
		if !exists2 {
			newNode := Node {
				Name: node2Name,
			}
			nodes = append(nodes, newNode)
		}

		ni1,e1 := findNode(nodes, node1Name)
		ni2,e2 := findNode(nodes, node2Name)
		if !e1 || !e2 {
			panic(errors.New("all of my wat"))
		}

		n1 := &nodes[ni1]
		n2 := &nodes[ni2]

		pair1 := Pair {
			Dist: dist,
			To: node2Name,
		}

		pair2 := Pair {
			Dist: dist,
			To: node1Name,
		}

		n1.Others = append(n1.Others, pair1)
		n2.Others = append(n2.Others, pair2)
	}

	max := 0
	for _,n := range nodes {
		startPair := Pair {
			To: n.Name,
			Dist: 0,
		}
		val := findRecurse(nodes, append(make([]Pair, 0), startPair), n.Name)
		if val > max {
			max = val
		}
	}
	fmt.Println("max:", max)
}
