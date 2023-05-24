"""Main script for the autogpt package."""

#BRAINDLER
import queue


def main(
    continuous: bool,
    continuous_limit: int,
    ai_settings: str,
    skip_reprompt: bool,
    speak: bool,
    debug: bool,
    gpt3only: bool,
    gpt4only: bool,
    memory_type: str,
    browser_name: str,
    allow_downloads: bool,
    skip_news: bool,
    #BRAINDLER
    cid: str,
    goals,
    queue: queue.Queue,
) -> None:
    """
    Welcome to AutoGPT an experimental open-source application showcasing the capabilities of the GPT-4 pushing the boundaries of AI.

    Start an Auto-GPT assistant.
    """
    print("OK!!!")
    # Put imports inside function to avoid importing everything when starting the CLI
    import logging

    from colorama import Fore

    from autogpt.agent.agent import Agent
    from autogpt.config import Config, check_openai_api_key
    from autogpt.configurator import create_config
    from autogpt.logs import logger
    from autogpt.memory import get_memory
    from autogpt.prompt import construct_prompt,construct_prompt_goals
    from autogpt.utils import get_latest_bulletin


    if 1==1:
        cfg = Config()
        # TODO: fill in llm values here
        check_openai_api_key()
        create_config(
            continuous,
            continuous_limit,
            ai_settings,
            skip_reprompt,
            speak,
            debug,
            gpt3only,
            gpt4only,
            memory_type,
            browser_name,
            allow_downloads,
            skip_news,
        )
        logger.set_level(logging.DEBUG if cfg.debug_mode else logging.INFO)
        ai_name = ""
        if not cfg.skip_news:
            motd = get_latest_bulletin()
            if motd:
                logger.typewriter_log("NEWS: ", Fore.GREEN, motd)
        system_prompt = construct_prompt()
        system_prompt = construct_prompt_goals(goals)
        # print(prompt)
        # Initialize variables
        full_message_history = []
        next_action_count = 0
        # Make a constant:

        # BRAINDLER Multilanguage
        triggering_prompt = (
            "Determine which next command to use, and respond using the"
            " format specified above:"
        )
        # Initialize memory and make sure it is empty.
        # this is particularly important for indexing and referencing pinecone memory
        
        #BRAINDLER
        cfg.memory_index=f"memory_index_{cid}"

        memory = get_memory(cfg, init=True)
        logger.typewriter_log(
            "Using memory of type:", Fore.GREEN, f"{memory.__class__.__name__}, memory_index={cfg.memory_index}"
        )
        logger.typewriter_log("Using Browser:", Fore.GREEN, cfg.selenium_web_browser)
        print(cid)
        print(queue)
        agent = Agent(
            ai_name=ai_name,
            memory=memory,
            full_message_history=full_message_history,
            next_action_count=next_action_count,
            system_prompt=system_prompt,
            triggering_prompt=triggering_prompt,
            
            #BRAINDLER
            cid=cid,
            goals=goals,
            queue=queue,
        )
        agent.start_interaction_loop()


if __name__ == "__main__":
    main()
