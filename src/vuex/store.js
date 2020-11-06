/**
 * The VUEX store containing all the data this application uses.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import { fetchAllBeers, fetchBeer, fetchRandomBeer } from '../data/data';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    // wrap state in a function so that it does not leak into other server runs
    state: () => ({
      homePageData: {},
      beerInfoPageData: {},
      randomBeerPageData: {},
    }),

    actions: {
      // get the data for the home page
      fetchHomePageData({ commit }) {
        return fetchAllBeers()
          .then((data) => {
            commit('setHomePageData', data);
          });
      },

      // get the data for the Beer Info Page
      fetchBeerInfoPageData({ commit }, id) {
        return fetchBeer(id)
          .then((data) => {
            commit('setBeerInfoPageData', data);
          });
      },

      // get the data for the RandomBeer 
      fetchRandomBeerPageData({ commit }) {
        return fetchRandomBeer()
          .then((data) => {
            commit('setRandomBeerPageData', data);
          });
      },
    },

    // mutations have to be synchronous.
    mutations: {
      setHomePageData(state, data) {
        // Vue.set : permits adding a new property to an already reactive object ensuring that new
        // property is also reactive.
        // Params :
        // - 1 = object/array being modified
        // - 2 = property/key in object/array in param 1 whose value is to be set
        // - 3 = the value to set
        Vue.set(state, 'homePageData', data);
      },

      setBeerInfoPageData(state, data) {
        Vue.set(state, 'beerInfoPageData', data);
      },

      setRandomBeerPageData(state, data) {
        Vue.set(state, 'randomBeerPageData', data);
      },

    },

  });
}
