import Ember from 'ember';

const {
  inject,
  get,
  RSVP,
} = Ember;

export default Ember.Route.extend({
  ajax: inject.service(),
  model() {
    return RSVP.hash({
      companies: this.store.findAll('company'),
    });
  },

  actions: {
    createUser(attrs) {
      let ajax = get(this, 'ajax') ;

      let data = {
        data: {
          type: 'users',
          attributes: {
            email: attrs.email,
            role: attrs.role,
            password: attrs.password,
            "password-confirmation": attrs.passwordConfirmation
          },
          relationships: {
            company: {
              data: {
                type: 'companies',
                id: get(attrs.company, 'id')
              }
            }
          }
        }
      };

      return ajax.post('/users', {
        contentType: 'application/vnd.api+json',
        data: JSON.stringify(data)
      })
      .then(() => this.transitionTo('admin.users.index'))
      .catch(({ errors }) => this.controller.set('errors', errors));
    }
  }
});
