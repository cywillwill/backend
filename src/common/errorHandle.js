export default (ctx, next) => {
    return next().catch((err) => {
        if (401 == err.status) {
          ctx.body = {
              code: 401,
              text: 'Protected resource, use Authorization header to get access\n'
          }
        } else {
          ctx.status = err.status || 500;
          ctx.body = {
            code: 500,
            text: err.message,
            error: err.stack
          }
          throw err
        }
    });
}