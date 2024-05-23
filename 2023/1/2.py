from argparse import ArgumentParser

mapping = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
}

def solution(file_name):
    sum = 0
    for line in open(file_name):
        nums = []

        print(line, end='')

        i = 0
        while i < len(line):
            char = line[i]
            if char.isdigit():
                nums.append(char)
            else:
                match = False
                for key in mapping.keys():
                    if line[i:i + len(key)] == key:
                        nums.append(mapping[key])
                        break
            i += 1
        
        print(nums)
        value = int(nums[0] + nums[-1])
        sum = sum + value
        
    print("Sum: {}".format(sum))

if __name__=='__main__':
    print("Running...\n")
    parser = ArgumentParser()
    parser.add_argument("-t", "--test", dest="is_test", help="Run in test mode", default=False, action='store_true')
    args = parser.parse_args()
    solution("test.txt" if args.is_test else "in.txt")