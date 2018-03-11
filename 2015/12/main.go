package main

import (
	// "reflect"
    "fmt"
	"io/ioutil"
	"encoding/json"
	// "reflect"
	// "strings"
)

func countJSON(input interface{}) int {
	switch input.(type) {
	case map[string]interface {}:
		strMap := input.(map[string]interface {})
		total := 0
		for _, v := range strMap {
			// part 2
			if v == "red" {
				return 0
			}
			total += countJSON(v)
		}
		return total

	case []interface {}:
		arr := input.([]interface {})
		total := 0
		for _,v := range arr {
			total += countJSON(v)
		}
		return total

	case float64:
		num := input.(float64)
		return int(num)

	default:
		return 0
	}
}

func main() {
	file, err := ioutil.ReadFile("in.txt")
	if err != nil {
		panic(err)
	}

	var input interface{}

	if err = json.Unmarshal(file, &input); err != nil { 
		panic(err)
	}

	ret := countJSON(input)

	fmt.Println("ret:", ret)
}
