package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
	"reflect"
	"github.com/blendlabs/go-util"
)

type ingredient struct {
	capacity int;
	durability int;
	flavor int;
	texture int;
	calories int;
}

func generatePossibleAmounts(max int, num int) [][]int {
	
	if num == 1 {
		return [][]int{{max}}
	}
	
	ret := make([][]int, 0)

	for i := 0; i <= max; i++ {
		otherPossible := generatePossibleAmounts(max - i, num - 1)
		start := []int{i}

		for _,other := range otherPossible {
			value := append(start, other...)

			ret = append(ret, value)
		}
	}

	return ret
}

func getField(v *ingredient, field string) int {
	r := reflect.ValueOf(v)
	f := reflect.Indirect(r).FieldByName(field)
	return int(f.Int())
}

func getPropertyValue(ingredients []ingredient, amounts []int, property string) int {
	total := 0
	for i,amount := range amounts {
		val := getField(&ingredients[i], property)
		total += val * amount
	}
	return total
}

func getRecipeValue(ingredients []ingredient, amounts []int) int {
	// Part 2 check
	calories := getPropertyValue(ingredients, amounts, "calories")
	if calories != 500 {
		return 0
	}
	
	total := 1
	for _,property := range []string{"capacity", "durability", "flavor", "texture"} {
		val := getPropertyValue(ingredients, amounts, property)
		if val < 0 {
			val = 0
		}
		total *= val
	}
	return total
}

func main() {
	file, err := ioutil.ReadFile("in.txt")
	if err != nil {
		panic(err)
	}

	input := strings.Split(string(file), "\n")

	ingredients := make([]ingredient, len(input) - 1)

	for i,line := range input {
		if len(line) == 0 {
			continue
		}

		split := strings.Split(line, " ")

		capacity,e1 := strconv.Atoi(strings.Replace(split[2], ",", "", 1))
		durability,e2 := strconv.Atoi(strings.Replace(split[4], ",", "", 1))
		flavor,e3 := strconv.Atoi(strings.Replace(split[6], ",", "", 1))
		texture,e4 := strconv.Atoi(strings.Replace(split[8], ",", "", 1))
		calories,e5 := strconv.Atoi(strings.Replace(split[10], ",", "", 1))

		e := util.AnyError(e1, e2, e3, e4, e5)
		if e != nil {
			panic(e)
		}

		ingredients[i] = ingredient {
			capacity: capacity,
			durability: durability,
			flavor: flavor,
			texture: texture,
			calories: calories,
		}
	}

	possibleAmounts := generatePossibleAmounts(100, len(ingredients))

	var ret int
	for _,amounts := range possibleAmounts {
		val := getRecipeValue(ingredients, amounts)
		if val > ret {
			ret = val
		}
	}

	fmt.Println("ret: ", ret);

}
