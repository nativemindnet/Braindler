def sendText(cid, args):
    text = args["text"]
    print(text)
    return text

def setGoals(cid, args):
    goals = args["goals"]
    print(goals)
    #Set new goals if need!!!
    #config.ai_goals = args["goals"]
    return ""

events = {
    'sendText': sendText,
    'setGoals': setGoals,
}