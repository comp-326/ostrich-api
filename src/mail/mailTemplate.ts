function mailVerificationTemplate(link: string) {
  const temp = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
    <style>
      *,
      *::before,
      *::after {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      body,
      html {
        font-family: Roboto, Helvetica, Arial, sans-serif;
      }
      .container {
        display:grid;
        place-content: center;
        padding: 20px;
        gap: 20px;
      }
      .container button {
        text-decoration: none;
        padding: 10px 20px;
        color: white;
        background: dodgerblue;
        border-radius: 10px;
        border:none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Welcome to your new account</h2>
      <p>
        Please confirm your email account before proceeding with the login
        process

        <a href="http://${link}"><button>Confirm email</button></a>
      </p>
    </div>
  </body>
</html>
    `;

  return temp;
}

export default mailVerificationTemplate