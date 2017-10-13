const petService = require('../service/petService');
const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/pets': async(ctx, next) => {
        let pets = await petService.getPets();
        ctx.rest({
            pets: pets
        });
    },
    'POST /api/pets': async(ctx, next) => {
        let p = await petService.createPet(ctx.request.body.name, ctx.request.body.gender, ctx.request.body.birth);
        ctx.rest(p);
    },
    'DELETE /api/pets/:id': async(ctx, next) => {
        let p = await petService.deletePet(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    }
};