import Vue from 'vue'
import Home from './components/index'
import Create from './components/create'
import List from './components/list'

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


const PicsCre = Vue.extend({
	  name:"Pics_Cre",
  	mixins: [Create]
})
const NewsCre = Vue.extend({
	  name:"News_Cre",
  	mixins: [Create]
})
const ArticleCre = Vue.extend({
	  name:"Article_Cre",
  	mixins: [Create]
})
const InteractionCre = Vue.extend({
	  name:"Interaction_Cre",
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
  		          path: 'posted',
  		          component: News_posted
          		}
          	]
        },
        { path: '/articles',component:Article,
          children: [
            {
              path: 'create',
              component: ArticleCre
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
                path: 'create',
                component: InteractionCre
              },
              {
                path: 'posted',
                component: Interaction_posted
              }
            ]
        }
    ]
}
