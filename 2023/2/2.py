from argparse import ArgumentParser

def solution(file_name):
    total = 0
    for game in open(file_name):
        id_info, data = game.rstrip("\n").split(': ')
        game_id = int(id_info.split(' ')[1])
        rounds = data.split('; ')
        needed = {
            'red': 0,
            'blue': 0,
            'green': 0
        }

        for round in rounds:
            draws = round.split(', ')
            for draw in draws:
                count, type = draw.split(' ')
                count = int(count)
                if count > needed[type]:
                    needed[type] = count
            
        power = needed['red'] * needed['blue'] * needed['green']
        total += power

    print("Total: {}".format(total))

if __name__=='__main__':
    print("Running...")
    print('')
    parser = ArgumentParser()
    parser.add_argument("-t", "--test", dest="is_test", help="Run in test mode", default=False, action='store_true')
    args = parser.parse_args()
    solution("test.txt" if args.is_test else "in.txt")