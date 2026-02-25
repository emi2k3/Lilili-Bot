import ollama from 'ollama'

const response = await ollama.chat({
  model: 'dimavz/whisper-tiny',
  messages: [{role: 'user', content: 'Hello!'}],
})
console.log(response.message.content)