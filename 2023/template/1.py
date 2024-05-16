import sys

def solution(file_name):
    print(file_name)
    for line in open(file_name):
        print(line, end='')

if __name__=='__main__':
    print("Running...")
    print(sys.argv[1:])
    solution("test.txt" if "test" in sys.argv[1] else "in.txt")