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
const Company = r => require.ensure([], () => r(require('@/pages/Company')), 'Company');
const CompanyDetail = r => require.ensure([], () => r(require('@/pages/CompanyDetail')), 'CompanyDetail');
const Summary = r => require.ensure([], () => r(require('@/pages/Summary')), 'Summary');
const Password = r => require.ensure([], () => r(require('@/pages/Password')), 'Password');
const Performance = r => require.ensure([], () => r(require('@/pages/Performance')), 'Performance');



Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/performance',
      name: 'Performance',
      component: Performance,
    },
    {
      path: '/password',
      name: 'Password',
      component: Password,
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
      path: '/summary',
      name: 'Summary',
      component: Summary,
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
    {
      path: '/company',
      name: 'Company',
      component: Company,
    },
    {
      path: '/company/detail',
      name: 'CompanyDetail',
      component: CompanyDetail,
    },
  ],
});

export default router;