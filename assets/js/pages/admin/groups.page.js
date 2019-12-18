parasails.registerPage('groups', {

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    isAddNew: false,
    editable: [],
    newItemData: {},
    modelName: 'group',
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    onAddNew: function () {
      this.isAddNew = true
    },
    onEdit: function (id) {
      this.editable.push(id)
    },
    onCancel: function (id) {

      if(id) {
        this.editable.splice(this.editable.indexOf(id), 1);
      } else {
        this.isAddNew = false;
      }
    },
    remove: function (id) {
      return fetch(`${location.origin}/api/v1/${this.modelName}/${id}`, {
        method: 'DELETE'
      }).then(data => window.location.reload())
    },
    update: function (id) {
      this.editable.splice(this.editable.indexOf(id), 1);
      return fetch(`${location.origin}/api/v1/${this.modelName}/${id}`, {
        method: 'PUT'
      }).then(data => window.location.reload())
    },
    save: function () {
      this.isAddNew = false;
      return fetch(`${location.origin}/api/v1/${this.modelName}`, {
        method: 'POST',
        body: JSON.stringify(this.newItemData)
      }).then(data => window.location.reload())
    }
  }
});
