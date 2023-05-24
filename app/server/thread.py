from autogpt.main import run_auto_gpt
from autogpt.setup import generate_aiconfig_automatic
from autogpt.config.ai_config import AIConfig

import threading



def startThread(cid,args,queue):
    local_data = threading.local()

    local_data.cid = cid
    local_data.args = args
    local_data.goals = args["goals"]
    #local_data.language = args["language"]    
    local_data.queue = queue


    continuous = False
    continuous_limit = 0
    ai_settings = f"sessions/ai_settings_{cid}.yaml"
    prompt_settings = "settings/prompt_settings_en.yaml"
    skip_reprompt = True
    speak = False
    debug = True
    gpt3only = True
    gpt4only = False
    memory_type = ""
    browser_name = ""
    allow_downloads = False
    skip_news = True
    workspace_directory = f"sessions/workspace_{cid}"
    install_plugin_deps = ""

    # TODO: Load from ai_setttings_{lang}

    #(ai_name, ai_role, ai_goals, api_budget)
    args["goals"][0]=args["goals"][0]+"\n"
    
    config=AIConfig("Braindler", "a large language model trained by NativeMind. I want you to act as an AI for autonomous automatic solving tasks.",args["goals"],0.0) 
    #config=generate_aiconfig_automatic(args["goals"][0])
    config.save(ai_settings) #CFG.ai_settings_file)


    run_auto_gpt(
        continuous,
        continuous_limit,
        ai_settings,
        prompt_settings,
        skip_reprompt,
        speak,
        debug,
        gpt3only,
        gpt4only,
        memory_type,
        browser_name,
        allow_downloads,
        skip_news,
        workspace_directory,
        install_plugin_deps,
    )
