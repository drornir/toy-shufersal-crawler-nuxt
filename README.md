# DonateIt Shufersal Crawler

This is a separate project for so we can focus on developing the core functionality
of the crawler without worrying about integrating we th rest of the system for now.

## Development

Run the server locally:

```sh
npm run dev
```

Install dependencies:

```sh
npm install
```

## First Time Local Setup

### Install Node JS

Install Node. If you don't already have your preferred way, use the below:

> Taken from [https://nodejs.org/en/download](https://nodejs.org/en/download)

#### Mac / Linux:

```sh
# Download and install fnm:
curl -o- https://fnm.vercel.app/install | bash -s -- --skip-shell

# Download and install Node.js:
fnm install 22

# Verify node is installed:
node -v

# Verify npm is installed:
npm -v

# install project dependencies
npm install
```

Then setup your shell. For example, if you are using `zsh` (the default on mac),
Copy paste the following to the bottom of your `.zshrc` file:

```sh
eval "$(fnm env --shell zsh --use-on-cd --version-file-strategy=recursive)"
```

#### Windows:

> You should probably use [WSLv2](https://learn.microsoft.com/en-us/windows/wsl/install) instead of powershell

```ps
# In powershell

# Download and install fnm:
winget install Schniz.fnm

# Download and install Node.js:
fnm install 22

# Verify node is installed:
node -v

# Verify npm is installed:
npm -v

# install project dependencies
npm install
```

Then, follow this link to setup the environment: [https://github.com/Schniz/fnm?tab=readme-ov-file#powershell](https://github.com/Schniz/fnm?tab=readme-ov-file#powershell)

### Install and Setup AWS CLI

> Not required

Mac: `brew install awscli`

Windows: `winget install -e --id Amazon.AWSCLI`

TODO(dror): explain how to create Access Keys, setup local profile

## High Level

### Tech Stack

> This repo was created by following https://sst.dev/docs/start/aws/nuxt#serverless

The [exiting app](https://github.com/DonateIT-ORG/DonateIT) is written wuth [Vue.js](https://vuejs.org/).
Therefore, this app also uses Vue.

Vue is a javascript **frontend** framework, like React and Angular.

[Nuxt](https://nuxt.com/) is a **fullstack** framework that uses Vue as its frontend.
In other words, Nuxt is a framework for building **servers** that serve webpages written
in Vue. If you're coming from React, Nuxt is a wrapper for Vue
like [Next.js](https://nextjs.org/) is a warpper for fullstack React apps.

[sst.dev](https://sst.dev/) is used for deploying this server to AWS. It simplifies
a lot of the complexity of working with AWS. Instead of manually managing things on AWS,
we decalre what we want to have on AWS and SST takes care of figuring out how to make it happen.

SST has two types of presets for running Nuxt on AWS: Serverless (AWS Lambda) or
Containers (AWS ECS). For this project Serverless has clear benefits. We expect very low
traffic, but we also want to prepare for unexpected spikes in traffic. The fact that SST
takes care of configuring everything for us eliminates a lot of the friction when using Lambdas.
