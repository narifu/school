import Vue from 'vue';
import Router from 'vue-router';
const Login = r => require.ensure([], () => r(require('@/pages/Login')), 'Login');
const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'Home');
const ILL = r => require.ensure([], () => r(require('@/pages/Ill')), 'ILL');
const ILLList = r => require.ensure([], () => r(require('@/pages/IllList')), 'ILLList');
const IllDtail = r => require.ensure([], () => r(require('@/pages/IllDetail')), 'IllDtail');
const Location = r => require.ensure([], () => r(require('@/pages/Location')), 'Location');
const LocationList = r => require.ensure([], () => r(require('@/pages/LocationList')), 'LocationList');
const LocationDetail = r => require.ensure([], () => r(require('@/pages/LocationDetail')), 'LocationDetail');
const Record = r => require.ensure([], () => r(require('@/pages/Record')), 'Record');
const RecordEvaluate = r => require.ensure([], () => r(require('@/pages/RecordEvaluate')), 'RecordEvaluate');
const RecordList = r => require.ensure([], () => r(require('@/pages/RecordList')), 'RecordList');
const RecordDetail = r => require.ensure([], () => r(require('@/pages/RecordDetail')), 'RecordDetail');
const Company = r => require.ensure([], () => r(require('@/pages/Company')), 'Company');
const CompanyDetail = r => require.ensure([], () => r(require('@/pages/CompanyDetail')), 'CompanyDetail');
const Summary = r => require.ensure([], () => r(require('@/pages/Summary')), 'Summary');
const SummaryList = r => require.ensure([], () => r(require('@/pages/SummaryList')), 'SummaryList');
const SummaryDetail = r => require.ensure([], () => r(require('@/pages/SummaryDetail')), 'SummaryDetail');
const Password = r => require.ensure([], () => r(require('@/pages/Password')), 'Password');
const Performance = r => require.ensure([], () => r(require('@/pages/Performance')), 'Performance');
const PerformanceList = r => require.ensure([], () => r(require('@/pages/PerformanceList')), 'PerformanceList');
const Notes = r => require.ensure([], () => r(require('@/pages/Notes')), 'Notes');
const NotesDetail = r => require.ensure([], () => r(require('@/pages/NotesDetail')), 'NotesDetail');
const Score = r => require.ensure([], () => r(require('@/pages/Score')), 'Score');
const ScoreList = r => require.ensure([], () => r(require('@/pages/ScoreList')), 'ScoreList');
const Personal = r => require.ensure([], () => r(require('@/pages/Personal')), 'Personal');
const Publish = r => require.ensure([], () => r(require('@/pages/Publish')), 'Publish');
const Share = r => require.ensure([], () => r(require('@/pages/Share')), 'Share');
const ShareList = r => require.ensure([], () => r(require('@/pages/ShareList')), 'ShareList');
const PhoneList = r => require.ensure([], () => r(require('@/pages/PhoneList')), 'PhoneList');


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/performance/list',
      name: 'PerformanceList',
      component: PerformanceList,
    },
    {
      path: '/phone/list',
      name: 'PhoneList',
      component: PhoneList,
    },
    {
      path: '/share',
      name: 'Share',
      component: Share,
    },
    {
      path: '/share/list',
      name: 'ShareList',
      component: ShareList,
    },
    {
      path: '/score/list',
      name: 'ScoreList',
      component: ScoreList,
    },
    {
      path: '/ill/list',
      name: 'ILLList',
      component: ILLList,
    },
    {
      path: '/record/evaluate',
      name: 'RecordEvaluate',
      component: RecordEvaluate,
    },
    {
      path: '/summary/detail',
      name: 'SummaryDetail',
      component: SummaryDetail,
    },
    {
      path: '/summary/list',
      name: 'SummaryList',
      component: SummaryList,
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish,
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal,
    },
    {
      path: '/score',
      name: 'Score',
      component: Score,
    },
    {
      path: '/notes/detail',
      name: 'NotesDetail',
      component: NotesDetail,
    },
    {
      path: '/notes',
      name: 'Notes',
      component: Notes,
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
      path: '/location/list',
      name: 'LocationList',
      component: LocationList,
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
      path: '/record/list',
      name: 'RecordList',
      component: RecordList,
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