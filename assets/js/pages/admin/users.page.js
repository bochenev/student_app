

parasails.registerPage('users', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    modelName: 'user',
    modal: '',
    formData: {},
    formErrors: {},
    cloudError: '',
    modalTitle: '',
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
    onEdit: function (itemData) {
      this.formData = itemData;
      this.modal = 'edit-modal';
      this.modalTitle = itemData.fullName;
      this.formErrors = {};
    },
    onCancel: function () {
      this.formData = {};
      this.closeExampleModal();
    },
    remove: function (id) {
      return fetch(`${location.origin}/api/v1/${this.modelName}/${id}`, {
        method: 'DELETE'
      }).then(data => window.location.reload())
    },

    formSubmit: function (e) {
      e.preventDefault();
      this.handleParsingForm();

      if(Object.keys(this.formErrors).length > 0) return false;
      else {
         fetch(`${location.origin}/api/v1/${this.modelName}/${this.formData.id}`, {
           method: 'PATCH',
           body: JSON.stringify(this.formData),
         }).then(data => {
           window.location.reload();
         }).catch(err => {

         })
      }
    },

    closeExampleModal: async function() {
      this.modal = '';
    },

    handleParsingForm: function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      // Validate password:
      if(!this.formData.fullName) {
        this.formErrors.fullName = true;
      }

     /* // Validate password confirmation:
      if(argins.password && argins.password !== this.formData.confirmPassword) {
        this.formErrors.confirmPassword = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }*/

    },

  }
});
