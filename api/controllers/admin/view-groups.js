module.exports = {


  friendlyName: 'View groups',


  description: 'Display "Groups" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin/groups'
    }

  },


  fn: async function () {
    const groups = await Group.find().pupulate('businessPlace');
    return{
      groups,
      isSuperAdmin: this.req.me.isSuperAdmin
    };
  }
};
