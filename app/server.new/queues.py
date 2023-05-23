import queue
import threading
import time

from server.main2 import run_auto_gpt

local_data = threading.local()

threads={}
queues={}

def startWork(command, cid, args):
    queues[cid] = queue.Queue()
    print(queues[cid])
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
    workspace_directory = ""
    install_plugin_deps = True

    goals = args["goals"]
    thread = threading.Thread(target=run_auto_gpt,args=(continuous, continuous_limit, ai_settings,skip_reprompt,speak,debug,gpt3only,gpt4only,memory_type,browser_name,allow_downloads,skip_news,workspace_directory, install_plugin_deps,cid,goals,queues[cid]))
    thread.daemon = True
    threads[cid]=thread
    threads[cid].start()

def otherCmd(command, cid, args):
    queues[cid].put({"command":command,"cid":cid,"args":args})




