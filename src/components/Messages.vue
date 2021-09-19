<template>
  <main>
    <div class="message-wrapper">
      <TitleBar :username="user.username" @clearUser="clearUser" />
      <section class="message-container">
        <div class="message-grid">
          <div
            :class="message.userId == userId ? 'bubble user' : 'bubble none'"
            v-for="(message, index) in messages"
            :key="message.id"
            :ref="`message-${index}`"
          >
            <h5 class="user-title">{{ message.user.username }}</h5>
            <p>
              {{ message.content }}
            </p>
            <p class="date">Sent On {{ transformDate(message.createdAt) }}</p>
          </div>
        </div>
      </section>
      <div v-if="userEntered" class="ghost-center">
        <p>{{ userEntered }} has entered the chat</p>
      </div>
      <div v-if="userLeft" class="ghost-center">
        <p>{{ userLeft }} has left the chat</p>
      </div>
      <div class="message-box">
        <form @submit.prevent="addMessage">
          <input
            placeholder="Message"
            @input="handleMessage"
            :value="messageContent"
          />
          <button type="submit" :disabled="!messageContent">Send</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import TitleBar from './TitleBar.vue'
import { GetMessages, CreateMessage } from '../services/messages'

export default {
  name: 'Messages',
  components: {
    TitleBar
  },
  props: ['user'],
  data: () => ({
    messages: [],
    userId: '',
    messageContent: '',
    userEntered: '',
    userLeft: ''
  }),
  mounted() {
    this.fetchMessages()
    this.userId = this.user.id
    this.$socket.emit('userEntered', { username: this.user.username })
  },
  watch: {
    messages: function() {
      this.handlePageScroll()
    }
  },
  updated() {
    this.handlePageScroll()
  },
  sockets: {
    connect() {
      this.$socket.emit('userConnected', { username: this.user.username })
      this.handlePageScroll()
    },
    chatRoom(data) {
      this.messages.push(data)
      this.handlePageScroll()
    },
    userEntered(data) {
      this.userEntered = data.username
      setTimeout(() => (this.userEntered = ''), 2000)
    },
    userLeft(data) {
      console.log(data)
      this.userLeft = data.username
      setTimeout(() => (this.userLeft = ''), 2000)
    },
    disconnect() {
      this.handleUserLeave()
    }
  },
  methods: {
    async addMessage() {
      // Create a variable called message and store the response from CreateMessage
      // Provide CreateMessage an object for the request body that contains content and the userId by utilizing the provided table in the README
      /**Insert Code Here */
      // Uncomment the next line of code
      // this.$socket.emit('userMessage', message)
      // Add the message to the messages state using .push or the spread operator
      // Reset the messageContent state back to an empty string
      const message = await CreateMessage({
        content: this.messageContent,
        userId: this.userId
      })
      this.$socket.emit('userMessage', message)
      this.messages.push(message)
      this.messageContent = ''
    },
    async fetchMessages() {
      // Utilize GetMessages here and store the response as a variable called messages
      // Update the messages state with the messages variable
      const messages = await GetMessages()
      this.messages = messages
      this.handlePageScroll()
    },
    clearUser() {
      this.$socket.emit('userLeft', { username: this.user.username })
      this.$emit('clearUser')
    },
    handlePageScroll() {
      const el = this.$el.querySelectorAll('.bubble')[this.messages.length - 1]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    handleMessage(e) {
      this.messageContent = e.target.value
    },

    transformDate(value) {
      return `${new Date(value).toDateString()} ${new Date(
        value
      ).toLocaleTimeString()}`
    }
  }
}
</script>

<style scoped>
.message-wrapper {
  height: 100vh;
}

.message-container {
  padding: 6em 0em;
}
.message-grid {
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}
.bubble {
  list-style: none;
  padding: 0.5em 1em;
  max-width: 400px;
  min-width: 400px;
  margin: 1em;
  border-radius: 1em;
}

.bubble.none {
  background-color: #dcedc8;
  align-self: flex-start;
}

.bubble.user {
  background-color: #81d4fa;
  align-self: flex-end;
}

.message-box {
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #81d4fa;
  padding: 0.5em;
}

.message-box form {
  display: flex;
  width: 90%;
  margin: auto;
}

input,
button {
  border-radius: 4em;
  border: 0;
  outline: none;
}

form input {
  width: 80%;
  border: 1px solid transparent;
  padding: 1em;
}

button {
  margin-left: 1em;
  padding: 0.2em 1em;
  cursor: pointer;
}

input:focus {
  border: 1px solid black;
}

.user-title {
  opacity: 0.6;
}

.date,
p {
  margin-top: 0.6em;
}

.date {
  text-align: right;
  font-size: 0.8rem;
  opacity: 0.6;
}

.ghost-center {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 10vh;
  opacity: 0.5;
}
</style>
