from argparse import ArgumentParser

def solution(file_name):
    grid = []

    for line in open(file_name):
        grid.append(line.rstrip("\n"))

    height = len(grid)
    width = len(grid[0])

    total = 0

    gears = {

    }

    for i in range(height):
        current_num = ''
        for j in range(width):
            if grid[i][j].isdigit():
                current_num += grid[i][j]
                if j == width - 1 or not grid[i][j + 1].isdigit():
                    # scan around the number for a symbol to see if we count it
                    num = int(current_num)

                    found_symbol = False

                    # j represents the right side of the number
                    # we need to check i-1 from j-len(current_num)-1 to j+1
                    # i on left and right
                    # i+1 on whole row
                    for r in range(i-1, i+2):
                        if found_symbol:
                            break

                        if r < 0 or r >= height:
                            continue

                        for c in range(j-len(current_num), j+2):
                            if c < 0 or c >= width:
                                continue

                            test_value = grid[r][c]
                            if test_value == '*':
                                if (r, c) in gears:
                                    gears[(r, c)].append(num)
                                else:
                                    gears[(r, c)] = [num]

                                found_symbol = True
                                break

                    current_num = ''

    for key, value in gears.items():
        if len(value) == 2:
            total += value[0] * value[1]

    print("total: {}".format(total))



if __name__=='__main__':
    print("Running...\n")
    parser = ArgumentParser()
    parser.add_argument("-t", "--test", dest="is_test", help="Run in test mode", default=False, action='store_true')
    args = parser.parse_args()
    solution("test.txt" if args.is_test else "in.txt")