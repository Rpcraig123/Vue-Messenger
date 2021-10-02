import Client from './api'

export const CreateUser = async username => {
  const res = await Client.post('/users', { username })
  console.log('CreateUsername', res.data)
  return res.data
}

export const FindUsername = async username => {
  const res = await Client.get(`/users/search?username=${username}`)
  console.log('FindUsername', res.data)
  return res.data
}

export const RemoveUser = async userId => {
  const res = await Client.delete(`/users/${userId}`)
  console.log('RemoveUsername', res.data)
  return res.data
}
