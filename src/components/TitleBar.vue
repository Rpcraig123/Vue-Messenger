<template>
  <header class="title">
    <h3>{{ username }}</h3>
    <button @click="logOut">Log Out</button>
  </header>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    username: {
      type: String,
      required: true
    }
  },
  methods: {
    logOut() {
      this.$emit('clearUser')
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #02a9f4;
  height: 4em;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 1000;
}

h3 {
  margin-left: 1em;
}

button {
  margin-right: 1em;
  padding: 0.6em 1.2em;
  background-color: #e57373;
  border: 0;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  opacity: 0.8;
}
</style>
