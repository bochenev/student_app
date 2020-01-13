module.exports = {


  friendlyName: 'View group',


  description: 'Display "Group" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/group'
    }

  },

  fn: async function () {
    const groupId = Number(this.req.params.groupId);

    const isLocalAdmin = this.req.me.role ? (this.req.me.role.id === 4) : false;
    const isSuperAdmin = Boolean(this.req.me.isSuperAdmin);

    const group = await Group.findOne({id: groupId})
    .populate('users')
    .populate('businessPlace')
    .populate('subjects');

    return {
      group,
      isAllowEdit: isLocalAdmin || isSuperAdmin
    };
  }
};
