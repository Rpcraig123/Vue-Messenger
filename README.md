# Vue Messenger

![](https://images.ctfassets.net/ksc20mvdfixl/1qSMfaxqwkYXj1if3nfAU2/f11e5fa2d078a41a3c6799bf21d45615/cover.png)

## Getting Started

- Fork and clone
- `npm install`
- `npm run serve`

## Overview

In this lab, we'll be building a live messaging system that will allow you to communicate with other SEI students! This lab does use something called `websockets`, this code is provided for you. Your objectives are to implement the CRUD functionality to allow each user to:

- create a username
- send and save messages
- get all messages from all users on initial load
- delete a username

Your additional objective is to deploy this app to a service called `Vercel` which we'll talk about later on.

## Instructions

**DO NOT MODIFY ANY OF THE CODE UNLESS INSTRUCTED TO DO SO**.

### Part 1

We'll start with the functionality needed in `App.vue`.

Start by importing 3 functions from `services/users`

- CreateUser
  - accepts an argument of `username` which is stored and handled in your state for you.
- FindUsername
  - accepts an argument of `username` which is provided for you in state
- RemoveUser
  - accepts an argument of `userId` which will be pulled from the `user` state as `user.id`.

You have been provided with `3` methods:

- handleUsername
- submitUsername
- clearUser

Follow the prompts and pseudo code provided in those methods.

### Part 2

For part 2, you'll be working in `Messages.vue`.

Start by importing two functions from `services/messages`:

- GetMessages
  - accepts no arguments, returns an array of messages and a user object for each message
- CreateMessage
  - accepts an object with the following keys and values:
    - | Key     | Value          |
      | ------- | -------------- |
      | content | messageContent |
      | userId  | userId         |
  - **These values have been set up for you in state**

You'll complete your work in the following methods:

- fetchMessages
- addMessage

Follow the provided prompts and pseudo code in each of the functions to complete this task.

## Submission

Test your code as you go, you should be able to:

- Create a username
- Send a message
- Receive all messages
- Log Out

Once you've finished testing your code, follow the instructions for deploying to Vercel (You'll only be able to deploy the front end).

Grab a few classmates and send each other some messages to test your application!

## Resources

- [SocketIO]
- [Vercel]
- []
