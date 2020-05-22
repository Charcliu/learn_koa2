const login = async (ctx) => {
  ctx.response.body = `
        <h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>
    `;
};

const signin = async (ctx) => {
  ctx.response.body = `<h1>${JSON.stringify(ctx.request.body)}</h1>`;
};

export {
  login,
  signin,
};
