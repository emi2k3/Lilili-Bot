import ollama from 'ollama'

const response = await ollama.chat({
  model: 'qwen2.5:7b-instruct',
  messages: [{role: 'user', content: 'Hello!'}],
})
console.log(response.message.content)