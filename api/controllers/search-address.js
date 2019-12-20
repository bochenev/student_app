module.exports = {


  friendlyName: 'Search address',


  description: '',


  inputs: {
    addressString: {
      type: 'string',
    }
  },


  exits: {},


  fn: async function (inputs) {
    const addrList = await Address.find({
      where: {
        or:
          [
            {address1: {contains: inputs.addressString}},
            {address2: {contains: inputs.addressString}}
          ],
      },
      limit: 20,
    });

    // All done.
    return addrList;

  }


};
