export const homepage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electro-API-v1</title>
    <style>
        *,
        *::after,
        *::before {
            margin: 0;
            box-sizing: border-box;
            padding: 0;
        }
        body,
        html {
            font-family: Roboto, Helvetica, Arial, sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        body {
            display: flex;
            justify-content: center;align-items: center;
        }
        .container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            border:1px solid #101010;
            padding:20px;
            color:white;
            background-color:#1a1a1a;
            margin:40px;
            border-radius:5px;
            box-shadow:2px 2px 10px -5px #a6a6a6,-2px -2px 10px -5px #a6a6a6;
        }
        p{
            font-size:1rem;
            text-align:center;
        }
        p:nth-child(1){
            border-radius: 5px;
            font-size: 1.2rem;
            letter-spacing:1.2px;
            word-spacing: 2px;
        }
        .header{
            padding:20px;
            background-color:dodgerblue;
        }
        code{
            font-size:12px;
            color:brown;
            color:#000;
        }
    </style>
</head>
<body>
    <div class="container">
        <p class="header">A seamless <code>API</code> built with <code> express JS</code></p>
        <p>You can checkout the Express js docs for more</p>
        <p>Here for greatness</p>
    </div>
</body>
</html>`