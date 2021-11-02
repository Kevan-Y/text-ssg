# Contributing to Text ssg

## Issues

Before creating an issue:

- Check open issues. Someone else may be working on the same thing!
- If they are, reach out and try to help.

## Requirements​​

[Node.js](https://nodejs.dev/) version >= 16 or above (which can be checked by running node -v). You
can use nvm for managing multiple Node versions on a single machine installed

## Installation process

1. First clone the repo

   ```bash
   git clone https://github.com/Kevan-Y/text-ssg
   ```

2. Open the repository
3. Install required packages.

   ```bash
    npm install
   ```

4. Install our packages

   ```bash
   npm install -g .
   ```

5. Install the recommended plugins for VSCode (`./.vscode/extensions.json`)

## Submitting a Pull Request

1. Before commit run `npm run prettier-check` (If there is some error fix it manually or run
   `npm run prettier`).

2. Run `npm run lint` to check any uncaught issue (if there is some error fix it manually)

3. Commit your change
