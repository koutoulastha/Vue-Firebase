import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import TestComponent from '@/components/TestComponent';
import Login from '@/components/Login';
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'TestComponent',
      component: TestComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    }
  ]
})

//Nav guards
router.beforeEach((to, from, next) => {
  //Check for requiredAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    //Check if NOT logged in
    if(!firebase.auth().currentUser) {
      //Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }
    else {
      //proceed to route
      next();
    }
  }
  else if(to.matched.some(record => record.meta.requiresGuest)) {
    //Check if logged in
    if(firebase.auth().currentUser) {
      //Go to home
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    }
    else {
      //proceed to route
      next();
    }
  }
  else{
    //proceed to route
    next();
  }
});

export default router;