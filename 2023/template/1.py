from argparse import ArgumentParser

def solution(file_name):
    for line in open(file_name):
        print(line, end='')

if __name__=='__main__':
    print("Running...")
    print('')
    parser = ArgumentParser()
    parser.add_argument("-t", "--test", dest="is_test", help="Run in test mode", default=False, action='store_true')
    args = parser.parse_args()
    solution("test.txt" if args.is_test else "in.txt")