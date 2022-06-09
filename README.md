<h1 align="center">bullet-journal</h1>
<p align="center">
    <img src="https://img.shields.io/badge/made_by-vercel-D75F5B.svg"/>
    <img src="https://img.shields.io/badge/react-18.1.0-yellow.svg"/>
    <img src="https://img.shields.io/badge/next.js-12.1.6-green.svg"/>
    <img src="https://img.shields.io/github/languages/top/mawermeow/bullet-journal?color=0075a2"/>
    <img src="https://badges.frapsoft.com/os/v1/open-source.svg"/>
</p>

## Demo

Live at [bullet-journal.mawer.cc](https://bullet-journal.mawer.cc)


## Description

This project is for my own note-taking needs to quickly jot down short tasks or inspirations, and allow for tagging for
categorization.

**This project is inspired by Ryder Carroll. Go check out his book [Here](https://bulletjournal.com/pages/book).**


## How to use

Every time open it, it only shows the events and tasks I need for the day — I expect myself to live in the present
moment.

![](https://media.giphy.com/media/gGYOOwVbLEXS5aYGdf/giphy.gif)

Quickly add your tasks.

![](https://media.giphy.com/media/Q6IV8sWYVCL41ey5ql/giphy.gif)

Simply click on the legend to complete your task.

![](https://media.giphy.com/media/q9O6xuokfbGhegUc6m/giphy.gif)

If you need to view past or future notes, you can use the five function buttons above, they are: display past or future
notes, only display unfinished tasks, batch editing and date sorting.

![](https://media.giphy.com/media/u8lSlM0CaTSB6DhKcQ/giphy.gif)

Whenever a note is tagged, there will be an additional option on the tag page, and after clicking it, you can browse to
all the notes with the tag added. Notes added on this page will be added with this label by default.

![](https://media.giphy.com/media/tTzCGPRocuu30qy11s/giphy.gif)


## About the project

### Authentication

The authentication function uses two third-party libraries, [next-auth](https://next-auth.js.org/) and [bcryptjs](https://github.com/kelektiv/node.bcrypt.js/).

### CSS

All css is using css module. Each and every icon is 100% css except the SVG.

### Language

Since most of my friends use traditional Chinese, this project is temporarily presented in traditional Chinese. In the
future, I will add the function of multi-language conversion.


## Project setup

Before deployment, you need to add your Mongo DB data to the environment variables. The format I set is as follows:

### next.config.js

```js
const nextConfig = () => {
    return {
        env: {
            mongodb_username: 'your-username',
            mongodb_password: 'your-password',
            mongodb_clustername: 'your-cluster',
            mongodb_database: 'your-database'
        }
    }
}
```