import Client from './api'

export const CreateUser = async username => {
  const res = await Client.post('/users', { username })
  return res.data
}

export const FindUsername = async username => {
  const res = await Client.get(`/users/search?username=${username}`)
  return res.data
}

export const RemoveUser = async userId => {
  const res = await Client.delete(`/users/${userId}`)
  return res.data
}
