module.exports = {


  friendlyName: 'Search business place',


  description: '',


  inputs: {
    search: {
      type: 'string',
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    return await BusinessPlace.find({
      where: {
        name: {contains: inputs.search}
      },
      limit: 20,
    });

  }


};
