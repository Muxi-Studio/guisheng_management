export default {
category:{'/news':{
                name:'/news',
                url:false,
                description:false,
                images:true
          },
          '/pics':{
                name:'/pics',
                url:false,
                description:false,
                images:true
          },
          '/article/pics/':{
                name:'/article/pics/',
                description:true,
                images:true, 
          },
          '/article/movies/':{
                name:'/article/movies/',
                url:true,
                description:true,
                images:true,
                film_url:true,
                film_img_url:true,
                scores:true
          },
          '/article/music/':{
                name:'/article/music/',
                url:true,
                description:true,
                images:true,
                music_url: true,
                music_title: true,
                music_img_url: true,
                singer:true
          },
          '/interaction/tea/':{
                name:'/interaction/tea',
                url:false,
                description:true,
                images:true        
          },
          '/interaction/topic/':{
                name:'/interaction/topic',
                url:false,
                description:true,
                images:true    
          }
      },
      list:{
        '/news' : 1,
        '/pics' : 2,
        '/article' : 3,
        '/interaction' : 4,
        '/article/list/pics':1,
        '/article/list/movies':2,
        '/article/list/music':3,
        '/article/pics/':1,
        '/article/movies/':2,
        '/article/music/':3,
        '/interaction/tea/':1,
        '/interaction/topic/':2,
        '/interaction/list/tea':1,
        '/interaction/list/topic':2
      }
}