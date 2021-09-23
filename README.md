<h1 align="center">Welcome to Text SSG 👋</h1>

> Static Site Generator in CLI that convert .txt and .md files into .html files

## Install

```bash
git clone <this repo>
Install the latest node >= 16
npm i
npm i -g .
```

## Features

- Supports stylesheets. By passing a url of stylesheet to `-s` or `--stylesheet`, if not specified it will use a default stylesheet (See usage).
- Supports titles. If the first line is followed by two blank lines, it will populate the `<title>...</title>` and `<h1>...</h1>`.
- Supports specific output. By passing an existing folder to `-o` or `--output`, if not specified it will generate to `dist` folder (See usage).
- Supports deep tree of files and folders. If the user specifies a folder for `--input` or `-i`
- Generate a menu page `index.html` which has relative links to each of the generated HTML files.
- New paragraph is separated by a line.

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

## Example
Input file: `test.txt`
```txt
This is the title


Hello world,
2021

This is a static site

I love programing
```
Command ran
```bash
ssg -i test.txt -s 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css'
```
Output file: 
<br/>`dist/index.html`
```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Home</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
</head>

<body>
    <h1>Home menu</h1>
    <h2>Summary</h2>
    <ul>
        <li><a href='test.html'>test</a></li>
    </ul>
</body>

</html>
```
`dist/test.html`
```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>This is the title</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
</head>

<body>
    <h1>This is the title</h1>
    <p>Hello world,2021</p>
    <p>This is a static site</p>
    <p>I love programing</p>
</body>

</html>
```
## Author

👨‍💻 **Kevan Yang**

- Github: [@Kevan-Y](https://github.com/Kevan-Y)

## Show your support

Give a ⭐️ to this project.
