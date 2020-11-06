/**
 * This file defines the factory function used to create the router.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from './HomePage.vue';
import BeerInfo from './BeerInfo.vue';
import RandomBeer from './RandomBeer.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/beer/:id',
    name: 'beer',
    component: BeerInfo,
  },
  {
    path: '/randomBeer',
    name: 'randomBeer',
    component: RandomBeer,
  },
];

export default function createRouter() {
  // Create the router for the routes
  const router = new VueRouter({
    base: process.env.BASE_URL,
    mode: 'history',
    routes,
  });

  // tell Vue we are using a router
  Vue.use(VueRouter);

  return router;
}
