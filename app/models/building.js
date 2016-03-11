import Ember from 'ember';
import DS from 'ember-data';

const {
  computed
} = Ember;

export default DS.Model.extend({
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  networkSite: DS.belongsTo('network-site'),
  sheets: DS.hasMany('sheet'),
  latestSheet: computed.alias('sheets.lastObject'),
  latestCableRuns: computed.alias('latestSheet.cableRuns')
});
