from argparse import ArgumentParser

max_values = {
    'red': 12,
    'green': 13,
    'blue': 14
}

def solution(file_name):
    total = 0
    for game in open(file_name):
        id_info, data = game.rstrip("\n").split(': ')
        game_id = int(id_info.split(' ')[1])
        rounds = data.split('; ')
        possible = True
        for round in rounds:
            draws = round.split(', ')
            for draw in draws:
                count, type = draw.split(' ')
                if int(count) > max_values[type]:
                    print("Game {} not possible due to {} of {}".format(game_id, count, type))
                    possible = False
                    break
            
            if not possible:
                break


        if possible:
            total += game_id

    print("Total: {}".format(total))

if __name__=='__main__':
    print("Running...")
    print('')
    parser = ArgumentParser()
    parser.add_argument("-t", "--test", dest="is_test", help="Run in test mode", default=False, action='store_true')
    args = parser.parse_args()
    solution("test.txt" if args.is_test else "in.txt")