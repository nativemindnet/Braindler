from typing import List, Literal, Optional
from autogpt.llm.base import Message

#from autogpt.llm.llm_utils import create_chat_completion as autogpt_create_chat_completion
import threading

def save_to_csv(file_name, data):
    print("SAVING!!!!!!!!\n\n\n")
    thread_id = threading.get_ident()
    with open(f"logs/{thread_id}_{file_name}", 'a', newline='', encoding='utf-8') as csvfile:
        csv_writer = csv.writer(csvfile)
        for row in data:
            csv_writer.writerow(row)

def create_chat_completion(
    messages: List[Message],  # type: ignore
    model: Optional[str] = None,
    temperature: float = None,
    max_tokens: Optional[int] = None,
) -> str:
    print("HERE!!!!!!!!\n\n\n")
    result="TEST"
    #result=autogpt_create_chat_completion(messages,model,temperature,max_tokens)

    data_to_save = []
    data_to_save.append(model,temperature,max_tokens,messages, result)
    save_to_csv('chat.csv', data_to_save)
    return result

