import queue
import threading
import time
import app.server.thread as thread

local_data = threading.local()

threads={}
queues={}

def startWork(command, cid, args):
    queues[cid] = queue.Queue()
    print(queues[cid])
    newThread = threading.Thread(target=thread.startThread,args=(cid, args, queues[cid]))
    newThread.daemon = True
    threads[cid]=newThread
    threads[cid].start()
def other(command, cid, args):
    queues[cid].put({"command":command,"cid":cid,"args":args})

eventsG = {
    'startWork': startWork,
    'other': other
}



