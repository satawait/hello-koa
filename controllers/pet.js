module.exports = {
    'GET /pet': async(ctx, next) => {
        ctx.render('pet.html');
    }
};