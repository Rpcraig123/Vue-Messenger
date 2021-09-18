<template>
  <div id="app">
    <Welcome
      v-if="!user"
      @handleUsername="handleUsername"
      @submitUsername="submitUsername"
      :username="username"
      :usernameMessage="usernameMessage"
      :isError="isError"
    />
    <Messages v-else :user="user" @clearUser="clearUser" />
  </div>
</template>

<script>
import Welcome from './components/Welcome.vue'
import Messages from './components/Messages.vue'
import { CreateUser, FindUsername, RemoveUser } from './services/users'
export default {
  name: 'App',
  components: {
    Welcome,
    Messages
  },
  data: () => ({
    username: '',
    user: JSON.parse(localStorage.getItem('user')) || null,
    usernameMessage: '',
    isError: false
  }),
  methods: {
    async handleUsername(value, keycode) {
      this.username = value
      if (keycode === 8) {
        this.usernameMessage = ''
        this.isError = false
      }
      if (this.username.length && keycode !== 8) {
        try {
          const res = await FindUsername(this.username)

          this.usernameMessage = res.msg
          this.isError = false
        } catch (error) {
          this.usernameMessage = error.response.data.msg
          this.isError = true
        }
      }
    },
    async submitUsername() {
      const user = await CreateUser(this.username)
      localStorage.setItem('user', JSON.stringify(user))
      this.user = user
      this.usernameMessage = ''
      this.isError = false
      this.$socket.emit('userConnected', { username: user.username })
    },
    async clearUser() {
      await RemoveUser(this.user.id)
      localStorage.clear()
      this.user = null
      this.username = ''
    }
  }
}
</script>

<style>
body,
html,
#app,
* {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans';
}

body {
  background-color: #f5f5f5;
}

#app {
  height: 100vh;
}
</style>
