package main

import (
    "fmt"
	"io/ioutil"
	"strings"
	"strconv"
)

func main() {
	file, err := ioutil.ReadFile("2_in.txt")
	if err != nil {
		panic(err)
	}

	input := strings.Split(string(file), "\n")

	total := 0
	for i := 0; i < len(input); i++ {
		fmt.Println(input[i])
		dims := strings.Split(input[i], "x")
		if len(dims) < 3 {
			continue
		}
		l, errL := strconv.Atoi(dims[0])
		w, errW := strconv.Atoi(dims[1])
		h, errH := strconv.Atoi(dims[2])

		for _, e := range [3]error{errL, errW, errH} {
			if e != nil {
				panic(e)
			}
		}

		fmt.Println(l, w, h)

		// Pt 1
		// lw := l * w
		// wh := w * h
		// hl := h * l

		// min := lw
		// for _, val := range [3]int{lw, wh, hl} {
		// 	if val < min {
		// 		min = val
		// 	}
		// }

		max := l
		for _, val := range [3]int{l, w, h} {
			if val > max {
				max = val
			}
		}

		// Part 1
		// total += 2 * lw + 2 * wh + 2 * hl + min

		total += w * h * l + 2 * l + 2 * h + 2 * w - 2 * max
	}

	fmt.Println("Total:", total)
}
