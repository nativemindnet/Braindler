import threading

local_data = threading.local()

def startThread(cid,args,queue):
    continuous = False
    continuous_limit = 0
    ai_settings = ""
    skip_reprompt = True
    speak = False
    debug = True
    gpt3only = True
    gpt4only = False
    memory_type = ""
    browser_name = ""
    allow_downloads = False
    skip_news = True

    #goals = args["goals"]

    local_data.cid = cid;
    local_data.goals = args["goals"]
    local_data.queue = queue

    autogpt.cli.main(continuous, continuous_limit, ai_settings,skip_reprompt,speak,debug,gpt3only,gpt4only,memory_type,browser_name,allow_downloads,skip_news)) #,cid,goals, queues[cid]
