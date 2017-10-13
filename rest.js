function restify(pathPrefix) {
    pathPrefix = pathPrefix || '/api/';
    return async(ctx, next) => {
        if (ctx.request.path.startsWith(pathPrefix)) {
            ctx.rest = (data) => {
                ctx.response.type = 'application/json';
                ctx.response.body = data;
            };
            try {
                await next();
            } catch (error) {
                ctx.response.code = 400;
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    code: reeor.code || 'internal: unknown_error',
                    message: error.message || ''
                };
            }
        } else {
            await next();
        }
    }
};

function APIError(code, message) {
    this.code = code || 'internal:unknown_error';
    this.message = message || '';
}

module.exports = {
    restify: restify,
    APIError: APIError
}