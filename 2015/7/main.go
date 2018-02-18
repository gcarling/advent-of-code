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

	registers := make(map[string]int)

	firstRunDone := false

	input := strings.Split(string(file), "\n")
	for {
		for _,instruction := range input {
			if len(instruction) == 0 {
				continue
			}
			
			pieces := strings.Split(instruction, " ")
			dest := pieces[len(pieces) - 1]
	
			// already got it
			if _, ok := registers[dest]; ok {
				continue
			}
	
			if pieces[0] == "NOT" {
				val, err := strconv.Atoi(pieces[1])
				if err != nil {
					var ok bool
					val,ok = registers[pieces[1]]
					if !ok {
						continue
					}
				}
				registers[dest] = ^val
			} else if pieces[1] == "AND" || pieces[1] == "OR" || pieces[1] == "RSHIFT" || pieces[1] == "LSHIFT" {
				val1,err1 := strconv.Atoi(pieces[0])
				if err1 != nil {
					var ok bool
					val1,ok = registers[pieces[0]]
					if !ok {
						continue
					}
				}
				val2,err2 := strconv.Atoi(pieces[2])
				if err2 != nil {
					var ok bool
					val2,ok = registers[pieces[2]]
					if !ok {
						continue
					}
				}
				switch pieces[1] {
				case "AND":
					registers[dest] = val1 & val2
				case "OR":
					registers[dest] = val1 | val2
				case "RSHIFT":
					registers[dest] = val1 >> uint(val2)
				case "LSHIFT":
					registers[dest] = val1 << uint(val2)
				}
			} else {
				val, err := strconv.Atoi(pieces[0])
				if err != nil {
					var ok bool
					val,ok = registers[pieces[0]]
					if !ok {
						continue
					}
				}
				registers[dest] = val
			}
		}

		if ans, ok := registers["a"]; ok {
			if firstRunDone {
				fmt.Println("Ans:", ans)
				break
			} else {
				registers = make(map[string]int)
				registers["b"] = ans
				firstRunDone = true
			}
		}
	}
}
