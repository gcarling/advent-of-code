from argparse import ArgumentParser

def solution(file_name):
    total = 0
    card_counts = {}
        
    for line in open(file_name):
        card_info, all_numbers = line.split(":")
        card_num = int(card_info.split(' ')[-1])
        if card_num not in card_counts:
            card_counts[card_num] = 1
        partioned = all_numbers.split("|")
        winning_numbers = set(partioned[0].strip().replace("  ", " ").split(" "))
        my_numbers = partioned[1].strip().replace("  ", " ").split(" ")
        value = 0
        for num in my_numbers:
            if num in winning_numbers:
                value += 1
        
        for next_card in range(card_num+1, card_num+1+value):
            if next_card not in card_counts:
                card_counts[next_card] = 1

            card_counts[next_card] += card_counts[card_num]

        
    for count in card_counts.values():
        total += count

    print("total: {}".format(total))

if __name__=='__main__':
    print("Running...\n")
    parser = ArgumentParser()
    parser.add_argument("-t", "--test", dest="is_test", help="Run in test mode", default=False, action='store_true')
    args = parser.parse_args()
    solution("test.txt" if args.is_test else "in.txt")