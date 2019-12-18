module.exports = {


  friendlyName: 'View marks',


  description: 'Display "Marks" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/marks'
    }

  },


  fn: async function () {

    const marks = await Mark.find();
    return {
      marks,
      isSuperAdmin: this.req.me.isSuperAdmin
    };

  }


};
