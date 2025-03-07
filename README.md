# DonateIt Shufersal Crawler

## Development

Run the server:

```sh
npm run dev
```

## First Time Setup

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
```

Then, follow this link to setup the environment: [https://github.com/Schniz/fnm?tab=readme-ov-file#powershell](https://github.com/Schniz/fnm?tab=readme-ov-file#powershell)

### Install and Setup AWS CLI

> Not required

Mac: `brew install awscli`

Windows: `winget install -e --id Amazon.AWSCLI`

TODO(dror): explain how to create Access Keys, setup local profile

## History

This repo was created by following https://sst.dev/docs/start/aws/nuxt#serverless
