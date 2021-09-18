import Client from './api'

export const GetMessages = async () => {
  const res = await Client.get('/messages')
  return res.data
}

export const CreateMessage = async data => {
  const res = await Client.post('/messages', data)
  return res.data
}
