from argparse import ArgumentParser

def solution(file_name):
    total = 0
    for line in open(file_name):
        all_numbers = line.split(":")[1]
        partioned = all_numbers.split("|")
        winning_numbers = set(partioned[0].strip().replace("  ", " ").split(" "))
        # print("winning_numbers: {}".format(winning_numbers))
        my_numbers = partioned[1].strip().replace("  ", " ").split(" ")
        # print("my_numbers: {}".format(my_numbers))
        pow = -1
        for num in my_numbers:
            if num in winning_numbers:
                pow += 1
        
        if pow >= 0:
            total += 2 ** pow

    print("total: {}".format(total))

if __name__=='__main__':
    print("Running...\n")
    parser = ArgumentParser()
    parser.add_argument("-t", "--test", dest="is_test", help="Run in test mode", default=False, action='store_true')
    args = parser.parse_args()
    solution("test.txt" if args.is_test else "in.txt")