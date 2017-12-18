import pprint

pp = pprint.PrettyPrinter(indent=4)

class Node:
    name = None
    weight = 0
    parent = None
    children = []


f = open("7_in.txt", "r")

nodes = {}

for line in f:
    # print line
    arrow = ' -> '
    line = line.strip('\n')
    node, children = line.split(' -> ') if arrow in line else [line, None]
    name, weight = node.split(' ')
    weight = int(weight.strip('(').strip(')'))
    node = {
        'name': name,
        'weight': weight,
        'value': 0,
        'children': [],
    }

    if children:
        node['children'] = children.split(', ')
        # print children

    nodes[name] = node

def getValue(childName):
    child = nodes[childName]
    # print child
    return child['value']

for i in range(0, len(nodes)):
    for name in nodes:
        node = nodes[name]
        # print node
        if node['children']:
            childMax = max(map(getValue, node['children']))
            node['value'] = childMax + 1

    # print name

maxValue = 0

for name in nodes:
    node = nodes[name]
    val = node['value']
    if val > maxValue:
        maxValue = val
        maxName = node['name']

deepestProblem = {
    'val': -1,
    'node': None,
    'actual': -1,
    'target': -1,
}
# deepestProblemVal = 0
# deepestProblemNode = None

def getSubtreeWeight(childName, level):
    child = nodes[childName]
    childWeights = map(lambda c : getSubtreeWeight(c, level+1), child['children'])
    # print childWeights
    allSame = len(set(childWeights)) == 1

    if len(childWeights) > 1 and not allSame:
        # print 'EYY'
        # print level
        print childWeights
        print child['children']

        occ = {}

        for i in range(len(child['children'])):
            weight = childWeights[i]
            if weight in occ:
                occ[weight] = occ[weight] + 1
            else:
                occ[weight] = 1

        # print occ

        for weight in occ:
            if occ[weight] == 1:
                actual = weight
                problemNodeName = child['children'][childWeights.index(weight)]
            else:
                target = weight

        print problemNodeName

        if level > deepestProblem['val']:
            deepestProblem['val'] = level
            deepestProblem['node'] = nodes[problemNodeName]
            deepestProblem['actual'] = actual
            deepestProblem['target'] = target

    return child['weight'] + sum(childWeights)



# Part 1
# print 'ANSWER:\n'
# print maxName

getSubtreeWeight(maxName, 0)


print deepestProblem

diff = deepestProblem['target'] - deepestProblem['actual']
ans = deepestProblem['node']['weight'] + diff

print 'ANSWER 2\n'
print ans
