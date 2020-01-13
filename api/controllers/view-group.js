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

    const subjectIds = group.subjects.map(item => item.id);

    const businessPlace = await BusinessPlace.findOne({id: group.businessPlace.id})
    .populate('subjects');

    const availableSubjects = businessPlace.subjects
    .filter(item => !group.subjects.find(existItem => existItem.id === item.id));

    return {
      group,
      availableSubjects,
      isAllowEdit: isLocalAdmin || isSuperAdmin
    };
  }
};
