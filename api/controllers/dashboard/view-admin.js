module.exports = {


  friendlyName: 'View admin',


  description: 'Display "Admin" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/admin'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
