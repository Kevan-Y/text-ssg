<h1 align="center">Welcome to Text SSG 👋</h1>

> Static Site Generator in CLI that convert a .txt file into a .html file

## Install

```bash
git clone <this repo>
npm i -g .
```

## Features

- Supports stylesheets. By passing a url of stylesheet to `-s` or `--stylesheet`, if not specified it will use a default stylesheet (See usage).
- Supports titles. If the first line is followed by two blank lines, it will populate the `<title>...</title>` and `<h1>...</h1>`.
- Supports specific output. By passing an existing folder to `-o` or `--output`, if not specified it will generate to `dist` folder (See usage).
- Supports deep tree of files and folders. If the user specifies a folder for `--input` or `-i`
- Generate a menu page `index.html` which has relative links to each of the generated HTML files.

## Usage

```bash
ssg --input <path>

ssg --input <path> --output <path>

ssg --input <path> --output <path> --stylesheet <URL>

ssg -i <path> -o <path> -s <URL>
```

## Commands Supported

```none
  _____                 _                 ____    ____     ____
 |_   _|   ___  __  __ | |_              / ___|  / ___|   / ___|
   | |    / _ \ \ \/ / | __|    _____    \___ \  \___ \  | |  _
   | |   |  __/  >  <  | |_    |_____|    ___) |  ___) | | |_| |
   |_|    \___| /_/\_\  \__|             |____/  |____/   \____|

Options:
    -v, --version     Show version number            [boolean]
    -h, --help        Show help                      [boolean]
    -i, --input       Folder/File input location     [string] [required]
    -s, --stylesheet  URL to a CSS stylesheet        [string]
    -o, --output      Folder output location         [string] [default: "./dist"]
```

## Author

👨‍💻 **Kevan Yang**

- Github: [@Kevan-Y](https://github.com/Kevan-Y)

## Show your support

Give a ⭐️ to this project.
