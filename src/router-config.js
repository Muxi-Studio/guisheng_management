import Vue from 'vue'
import Home from './components/index'
import Create from './components/create'
import List from './components/list'

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


//list
const Pics_List = Vue.extend({
    name:"Pics",
    mixins: [List]
})
const News_List = Vue.extend({
    name:"News",
    mixins: [List]
})
const Article_List = Vue.extend({
    name:"Article",
    mixins: [List]
})
const Interaction_List = Vue.extend({
    name:"Interaction",
    mixins: [List]
})


//posted
const Pics_posted = Vue.extend({
	  name:"Pics",
  	mixins: [List]
})
const News_posted = Vue.extend({
	  name:"News",
  	mixins: [List]
})
const Article_posted = Vue.extend({
	  name:"Article",
  	mixins: [List]
})
const Interaction_posted = Vue.extend({
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
	  name:"ArticleCre_Muxic",
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
                path: 'posted',
                component: Pics_posted
              }
            ]
        },
        { path: '/news',component:News,
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
  		          path: 'posted',
  		          component: News_posted
          		}
          	]
        },
        { path: '/articles',component:Article,
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
              path: 'list',
              component: Article_List
            },
            {
              path: 'posted',
              component: Article_posted
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
                path: 'posted',
                component: Interaction_posted
              }
            ]
        }
    ]
}
