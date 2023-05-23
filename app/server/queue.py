import threading
import queue
from queue import Empty
from server.events import events


def onItem(item):
    command=item["command"]
    cid=item["cid"]
    args=item["args"]
    res=events[command](cid,args)
    return res


def queue_check(queue:queue.Queue):
    print(queue)
    try:
        item = queue.get_nowait()
        # Обработка элемента
        res = onItem(item)
        return False
    except Empty:
        # Если очередь пуста
        pass
    return False


def queue_wait_for_input(queue:queue.Queue):
    print("wait for queue input")
    while True:
        item = queue.get()  # Получить элемент из очереди
        res = onItem(item)
        if res != "":
            return res
        #time.sleep(1)
    




