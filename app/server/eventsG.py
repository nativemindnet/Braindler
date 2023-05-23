import queue
import threading
import time

local_data = threading.local()

threads={}
queues={}

def startWork(command, cid, args):
    queues[cid] = queue.Queue()
    print(queues[cid])
    thread = threading.Thread(target=thread.startThread,args=(cid, args, queues[cid]))
    thread.daemon = True
    threads[cid]=thread
    threads[cid].start()
def other(command, cid, args):
    queues[cid].put({"command":command,"cid":cid,"args":args})

eventsG = {
    'startWork': startWork,
    'other': other
}



