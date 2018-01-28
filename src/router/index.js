import Vue from 'vue';
import Router from 'vue-router';
const Login = r => require.ensure([], () => r(require('@/pages/Login')), 'Login');
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home');
const ILL = r => require.ensure([], () => r(require('@/pages/Ill')), 'ILL');
const IllDtail = r => require.ensure([], () => r(require('@/pages/IllDetail')), 'IllDtail');
const Location = r => require.ensure([], () => r(require('@/pages/Location')), 'Location');
const LocationDetail = r => require.ensure([], () => r(require('@/pages/LocationDetail')), 'LocationDetail');
const Record = r => require.ensure([], () => r(require('@/pages/Record')), 'Record');
const RecordDetail = r => require.ensure([], () => r(require('@/pages/RecordDetail')), 'RecordDetail');


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/ill',
      name: 'ILL',
      component: ILL,
    },
    {
      path: '/ill/detail',
      name: 'IllDtail',
      component: IllDtail,
    },
    {
      path: '/location',
      name: 'Location',
      component: Location,
    },
    {
      path: '/location/detail',
      name: 'LocationDetail',
      component: LocationDetail,
    },
    {
      path: '/record',
      name: 'Record',
      component: Record,
    },
    {
      path: '/record/detail',
      name: 'RecordDetail',
      component: RecordDetail,
    },
  ],
});

export default router;