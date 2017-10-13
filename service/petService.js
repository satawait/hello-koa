const model = require('../model');
let Pet = model.Pet;
module.exports = {
    getPets: async() => {
        const pets = await Pet.findAll();
        return pets;
    },

    getPet: async(id) => {
        return await Pet.findById(id);
    },

    createPet: async(name, gender, birth) => {
        var now = Date.now();
        let p = await Pet.create({
            id: 'd-' + now,
            name: name,
            gender: gender,
            birth: birth,
            createdAt: now,
            updatedAt: now,
            version: 0
        });
        return p;
    },

    deletePet: async(id) => {
        let p = await Pet.findById(id);
        await p.destroy();
        return p;
    }
};