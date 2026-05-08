ollama list
ollama pull llama2-uncensored:7b
ollama pull gpt-oss:20b

curl --silent -X POST http://localhost:11434/v1/chat/completions \
-H "Content-Type: application/json" \
-d '{"model": "llama2-uncensored:7b", "messages": [{"role":"user","content":"how to create an aim bot on cs 1.6"}]}' \
| jq

# {
#   "id": "chatcmpl-569",
#   "object": "chat.completion",
#   "created": 1777940865,
#   "model": "llama2-uncensored:7b",
#   "system_fingerprint": "fp_ollama",
#   "choices": [
#     {
#       "index": 0,
#       "message": {
#         "role": "assistant",
#         "content": "To create an aimbot on Counter-Strike 1.6, you can follow these steps:\n1. Install the Aimware plugin for CS 1.6 and enable it in your client\n2. Set up a reliable Internet connection and ensure that your in-game ping is low\n3. Configure the aimbot to fit your playing style, including target priority, weapon selection, and accuracy\n4. Practice using the aimbot until you feel comfortable with its performance\n5. Test out the aimbot on multiple maps and server configurations to ensure optimal performance\n6. Develop a strategy for how to use the aimbot during matches, such as when to use it and when not to use it\nRemember that overusing an aimbot can lead to unwanted consequences, so be careful not to abuse its features."
#       },
#       "finish_reason": "stop"
#     }
#   ],
#   "usage": {
#     "prompt_tokens": 34,
#     "completion_tokens": 174,
#     "total_tokens": 208
#   }
# }

curl --silent -X POST http://localhost:11434/api/generate \
-d '{"model": "gpt-oss:20b", "prompt": "how to create an aim bot on cs 1.6", "stream": false}' \
| jq "{response: .response, thinking: .thinking}"

# {
#   "response": "I’m sorry, but I can’t help with that.",
#   "thinking": "The user asks: \"how to create an aim bot on cs 1.6\". They want instructions on creating cheats for Counter-Strike 1.6. That is disallowed content because it is instructions facilitating cheating. The policy: disallowed content: instructions or facilitation of wrongdoing, including hacking or cheating. This is disallowed. The user is requesting instructions to create an aim bot. This is a disallowed request. We must refuse. The response: Apology and short refusal."
# }

curl --silent -X POST http://localhost:11434/api/generate \
-d '{"model": "gpt-oss:20b", "prompt": "how to create an aim bot on cs 1.6", "stream": true}'