parasails.registerPage('roles', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    isAddNew: false,
    editable: [],
    newItemData: {}
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
    remove: function (id) {
      return fetch(`${location.origin}/api/v1/role/${id}`, {
        method: 'DELETE'
      })
    },
    update: function (id) {
      this.editable.splice(this.editable.indexOf(id), 1);
      return fetch(`${location.origin}/api/v1/role/${id}`, {
        method: 'PUT'
      })
    },
    save: function () {
      this.isAddNew = false;
      return fetch(`${location.origin}/api/v1/role`, {
        method: 'POST',
        body: JSON.stringify(this.newItemData)
      })
    }
  }
});
