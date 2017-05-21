export default {
name:['/news','/pics','/article/pics/','/article/movies/','/article/music/','/interaction/tea','/interaction/topic'],
category:[{
        name:'/news',
        url:false,
        description:false,
        images:true
      },{
        name:'/pics',
        url:false,
        description:false,
        images:true
      },{
        name:'/article/pics/',
        description:true,
        images:true, 
      },{
        name:'/article/movies/',
        url:true,
        description:true,
        images:true,
        film_url:true,
        film_img_url:true
      },{
        name:'/article/music/',
        url:true,
        description:true,
        images:true,
        music_url: true,
        music_title: true,
        music_img_url: true,
        singer:true
      },{
        name:'/interaction/tea',
        url:false,
        description:true,
        images:true        
      },{
        name:'/interaction/topic',
        url:false,
        description:true,
        images:true    
      }],
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
  '/article/music/':3
}
}