parasails.registerPage('groups', {

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    isAddNew: false,
    editableItemsMap: {},
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
    checkIsEditable: function (id) {
      return Boolean(this.editableItemsMap[id]);
    },
    onAddNew: function () {
      this.isAddNew = true
    },
    onEdit: function (itemData) {
      delete itemData.createdAt;
      delete itemData.updatedAt;
      this.editableItemsMap = Object.assign({}, this.editableItemsMap, {[itemData.id]: itemData});
    },
    onCancel: function (id) {
      if (id) {
        delete this.editableItemsMap[id];
        this.editableItemsMap = Object.assign({}, this.editableItemsMap);
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
      const item = this.editableItemsMap[id];
      item.businessPlace = item.businessPlace ? item.businessPlace.id : null;

      return fetch(`${location.origin}/api/v1/${this.modelName}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(this.editableItemsMap[id]),
      }).then(data => {
        delete this.editableItemsMap[id];
        window.location.reload();
      })
    },
    save: function () {
      this.isAddNew = false;
      this.newItemData.businessPlace = this.newItemData.businessPlace ? this.newItemData.businessPlace.id : null;
      return fetch(`${location.origin}/api/v1/${this.modelName}`, {
        method: 'POST',
        body: JSON.stringify(this.newItemData)
      }).then(data => window.location.reload())
    }
  }
});
