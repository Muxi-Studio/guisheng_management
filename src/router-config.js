import Vue from 'vue'
import Home from './components/index'
import Create from './components/create'
import List from './components/list'
import PicList from './components/pic_list'

//home
const Pics = Vue.extend({
    name:"Pics",
    mixins: [Home]
})
const News = Vue.extend({
    name:"News",
    mixins: [Home]
})
const Article = Vue.extend({
    name:"Article",
    mixins: [Home]
})
const Interaction = Vue.extend({
    name:"Interaction",
    mixins: [Home]
})
const Edit = Vue.extend({
    name:"Edit",
    mixins: [Home]
})

//list
const Pics_List = Vue.extend({
    name:"Pics",
    mixins: [List]
})
const News_List = Vue.extend({
    name:"News",
    mixins: [List]
})
const Article_List_Pics = Vue.extend({
    name:"ArticlePics",
    mixins: [List]
})
const Article_List_Movies = Vue.extend({
    name:"ArticleMovies",
    mixins: [List]
})
const Article_List_Music = Vue.extend({
    name:"ArticleMusic",
    mixins: [List]
})
const Interaction_List = Vue.extend({
    name:"Interaction",
    mixins: [List]
})

//create
const PicsCre = Vue.extend({
	  name:"Pics_Cre",
  	mixins: [Create]
})
const NewsCre = Vue.extend({
	  name:"News_Cre",
  	mixins: [Create]
})
const ArticleCre_Music = Vue.extend({
	  name:"ArticleCre_Music",
  	mixins: [Create]
})
const ArticleCre_Pics = Vue.extend({
    name:"ArticleCre_Pics",
    mixins: [Create]
})
const ArticleCre_Movies = Vue.extend({
    name:"ArticleCre_Movies",
    mixins: [Create]
})
const InteractionCre_Tea = Vue.extend({
	  name:"InteractionCre_Tea",
  	mixins: [Create]
})
const InteractionCre_Topic = Vue.extend({
    name:"InteractionCre_Topic",
    mixins: [Create]
})

//modify
const Modify = Vue.extend({
    name:"Modify",
    mixins: [Create]
})

const Pics_Modify = Vue.extend({
    name:"Pics_Modify",
    mixins: [PicList]
})

export default {
    routes: [
        { path: '/', component: Home },
        { path: '/pics',component:Pics,
            children: [
              {
                path: 'create',
                component: PicsCre
              },
              {
                path: 'list',
                component: Pics_List
              },
              {
                path:'edit/:aid',
                name:'/pics',
                component:Modify
              },{
                path:'editor/:id',
                name:'/pics/editor/',
                component: Pics_Modify
              }
            ]
        },
        { path: '/news',
            component:News,
            children: [
  		        {
  		          path: 'create',
  		          component: NewsCre
  		        },
              {
                path: 'list',
                component: News_List
              },
              {
                path:'edit/:aid',
                name:'/news',
                component:Modify
              }
          	]
        },
        { path: '/article',component:Article,
          children: [
            {
              path: 'movies',
              component: ArticleCre_Movies
            },
            {
              path: 'pics',
              component: ArticleCre_Pics
            },
            {
              path: 'music',
              component: ArticleCre_Music
            },
            {
              path: 'list/pics',
              component: Article_List_Pics
            },
            {
              path: 'list/movies',
              component: Article_List_Movies
            },
            {
              path: 'list/music',
              component: Article_List_Music
            },
              {
                path:'pics/edit/:aid',
                name:'/article/1',
                component:Modify
              },
              {
                path:'movies/edit/:aid',
                name:'/article/2',
                component:Modify
              },
              {
                path:'music/edit/:aid',
                name:'/article/3',
                component:Modify
              }
          ]
        },
        { path: '/interaction',component:Interaction,
            children: [
              {
                path: 'tea',
                component: InteractionCre_Tea
              },
              {
                path: 'topic',
                component: InteractionCre_Topic
              },
              {
                path: 'list',
                component: Interaction_List
              },
              {
                path:'edit/:aid',
                name:'/interaction',
                component:Modify
              }
            ]
        }
    ]
}
