import autogpt.logs
import sys




autogpt.logs.TypingConsoleHandler=autogpt.logs.ConsoleHandler
sys.modules['autogpt.logs'].TypingConsoleHandler=sys.modules['autogpt.logs'].ConsoleHandler


print (autogpt.logs.logger)
autogpt.logs.Logger.typing_console_handler = autogpt.logs.ConsoleHandler()
def setFast(self):
    print(self.typing_console_handler)
    print(self.console_handler)
    self.typing_console_handler = self.console_handler
    print(self.typing_console_handler)
    print(self)
autogpt.logs.Logger.setFast=setFast
logger = autogpt.logs.Logger(1)

logger.setFast()


logger2 = autogpt.logs.Logger(2)
logger3 = autogpt.logs.Logger(3)
print (logger)
print (logger2)
print (logger3)

def print_assistant_thoughts(
    ai_name: object,
    assistant_reply_json_valid: object,
    speak_mode: bool = False,
) -> None:
    return autogpt.logs.print_assistant_thoughts(ai_name, assistant_reply_json_valid, speak_mode)