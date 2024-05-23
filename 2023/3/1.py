from argparse import ArgumentParser

def solution(file_name):
    grid = []

    for line in open(file_name):
        grid.append(line.rstrip("\n"))

    height = len(grid)
    width = len(grid[0])

    total = 0

    for i in range(height):
        current_num = ''
        for j in range(width):
            if grid[i][j].isdigit():
                current_num += grid[i][j]
                if j == width - 1 or not grid[i][j + 1].isdigit():
                    # scan around the number for a symbol to see if we count it
                    num = int(current_num)
                    print("num: {}".format(num))

                    found_symbol = False

                    # j represents the right side of the number
                    for r in range(i-1, i+2):
                        if found_symbol:
                            break

                        if r < 0 or r >= height:
                            continue

                        for c in range(j-len(current_num), j+2):
                            if c < 0 or c >= width:
                                continue

                            test_value = grid[r][c]
                            if not test_value.isdigit() and test_value != '.':
                                print("Found symbol {} for {}".format(test_value, num))
                                found_symbol = True
                                break

                    if found_symbol:
                        total += num

                    current_num = ''

    print("total: {}".format(total))



if __name__=='__main__':
    print("Running...\n")
    parser = ArgumentParser()
    parser.add_argument("-t", "--test", dest="is_test", help="Run in test mode", default=False, action='store_true')
    args = parser.parse_args()
    solution("test.txt" if args.is_test else "in.txt")