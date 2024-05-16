from argparse import ArgumentParser

def solution(file_name):
    sum = 0
    for line in open(file_name):
        nums = []
        for char in line:
            if char.isdigit():
                nums.append(char)
        
        value = int(nums[0] + nums[-1])
        sum = sum + value
        
    print("Sum: {}".format(sum))

if __name__=='__main__':
    print("Running...\n")
    parser = ArgumentParser()
    parser.add_argument("-t", "--test", dest="is_test", help="Run in test mode", default=False, action='store_true')
    args = parser.parse_args()
    solution("test.txt" if args.is_test else "in.txt")