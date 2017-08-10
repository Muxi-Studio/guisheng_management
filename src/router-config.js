import Vue from 'vue'
import Home from './components/index'
import Create from './components/create'
import List from './components/list'
import PicList from './components/pic_list'
import evdPic from './components/evdPic'
import Comment from './components/comment'
import User from './components/userlist'

import SpecialCre from './components/special'
import SpecialList from './components/special_list'
// import ChildContent from './components/child_content'

import RankAuthor from './components/rankauthor'
import RankArticle from './components/rankarticle'

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
const Special = Vue.extend({
    name:"Special",
    mixins: [Home]
})
const Rank = Vue.extend({
    name:"Rank",
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
const Interaction_List_Tea = Vue.extend({
    name:"Interaction",
    mixins: [List]
})
const Interaction_List_Topic = Vue.extend({
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

const ChildSpecial = Vue.extend({
    name:"ChildSpecialList",
    mixins: [SpecialList]
})

const ChildContent = Vue.extend({
    name:"ChildContent",
    mixins: [List]
})

const ChildAddArticle = Vue.extend({
    name:"ChildAddArticle",
    mixins: [Create]
})

const ChildAddPics = Vue.extend({
    name:"ChildAddPics",
    mixins: [Create]
})

const UserList = Vue.extend({
  name:"AdminList",
  mixins: [User]
})

const AdminList = Vue.extend({
  name:"AdminList",
  mixins: [User]
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
              },{
                path:'comments/:id',
                name:'/pics/comment',
                component: Comment
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
              },{
                path:'comments/:id',
                name:'/news/comment',
                component: Comment
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
              },{
                path:'comments/:id',
                name:'/article/comment',
                component: Comment
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
                path:'tea/edit/:aid',
                name:'/interaction/1',
                component:Modify
              },
              {
                path:'topic/edit/:aid',
                name:'/interaction/2',
                component:Modify
              },
              {
                path: 'list/tea',
                component: Interaction_List_Tea
              },
              {
                path: 'list/topic',
                component: Interaction_List_Topic
              },{
                path:'comments/:id',
                name:'/interaction/comment',
                component: Comment
              }
            ]
        },
        { path: '/special',
            component: Home,
            children: [
              {
                path: 'create',
                component: SpecialCre
              },{
                path: 'list',
                component: SpecialList
              },{
                name:'/Special',
                path: 'list/:id',
                component: ChildSpecial
              },{
                name:'childContent',
                path:'list/:id/:cid',
                component: ChildContent
              },{
                name:'childAddArticle',
                path:'child/:id/:cid/article',
                component: ChildAddArticle
              },
              {
                name:'childAddPics',
                path:'child/:id/:cid/picture',
                component: ChildAddPics
              },{
                path:'article/edit/:aid',
                name:'/special/1',
                component:Modify
              },
              {
                path:'pics/edit/:aid',
                name:'/special/2',
                component:Modify
              }
            ]
        },{ 
          path: '/everydaypic',component:evdPic
        },{
          path: '/userlist',component:UserList
        },{
          path: '/adminlist',component:AdminList
        },{ path: '/rank',component: Rank,
            children: [
              {
                path: 'articles',
                component: RankArticle
              },
              {
                path: 'authors',
                component: RankAuthor
              }
            ]
        }
      
    ]
}
