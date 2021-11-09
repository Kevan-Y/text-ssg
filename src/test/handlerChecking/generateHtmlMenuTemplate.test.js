const { generateHtmlMenuTemplate } = require('../../utils/handler/htmlTemplate');

describe('Generate HTML menu template', () => {
  it('Should able to generate HTML with default value', () => {
    const generatedHtml = generateHtmlMenuTemplate({ routeList: [] });
    const expectedHtml = `
    <!doctype html>
    <html lang="en-CA">
    <head>
        <meta charset="UTF-8">
        <title>Home</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&display=swap');

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-thumb {
        background: #36363638;
        border-radius: 0px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #878587;
    }

    ::-webkit-scrollbar-track {
        background: #FFFFFF;
        border-radius: 0px;
        box-shadow: inset 0px 0px 0px 0px #F0F0F0;
    }

    body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif;
        line-height: 2;
        max-width: 800px;
        margin: 1rem auto;
        padding: 0 1rem;
        word-wrap: break-word;
        color: #1F2937;
        background: #F9FAFB;
        text-rendering: optimizeLegibility;
    }

    h1 {
        font-size: 2.2em;
        margin-top: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: #111827;
        font-family: 'Libre Baskerville', serif;
        margin-bottom: 12px;
        margin-top: 24px;
        font-weight: bold;
    }

    a {
        text-decoration: none;
        color: #2563EB;
        transition: ease-in 150ms;
    }

    a:hover {
        text-decoration: underline;
        color: #3B82F6;
    }
</style>
    </head>
    <body>
        <h1>Home menu</h1>
        <h2>Summary</h2>
            <ul>
        
        </ul>
    </body>
    </html>
    `;
    expect(generatedHtml).toEqual(expectedHtml);
  });

  it('Should able to generate HTML with value', () => {
    const generatedHtml = generateHtmlMenuTemplate({
      langCode: 'fr',
      style: 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
      routeList: [
        { url: 'hello/helloworld', name: 'helloworld' },
        { url: 'helloworld2', name: 'helloworld2' },
      ],
    });
    const expectedHtml = `
    <!doctype html>
    <html lang="fr">
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
        <li><a href='hello/helloworld'>helloworld</a></li>
<li><a href='helloworld2'>helloworld2</a></li>
        </ul>
    </body>
    </html>
    `;
    expect(generatedHtml).toEqual(expectedHtml);
  });
});
