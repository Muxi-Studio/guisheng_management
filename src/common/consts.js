export default {
name:['/news','/pics','/articles/pics','/articles/movies','/articles/music','/interaction/tea','/interaction/topic'],
category:[{
        name:'/news',
        url:false,
        description:true,
        images:false
      },{
        name:'/pics',
        url:false,
        description:true,
        images:true
      },{
        name:'/articles/pics',
        url:false,
        description:false,
        images:true    
      },{
        name:'/articles/movies',
        url:true,
        description:true,      
      },{
        name:'/articles/music',
        url:true,
        description:true,
        images:true   
      },{
        name:'/interaction/tea',
        url:false,
        description:false,
        images:true        
      },{
        name:'/interaction/topic',
        url:false,
        description:false,
        images:true    
      }],
list:{
  '/news' : 1,
  '/pics' : 2,
  '/articles' : 3,
  '/interaction' : 4
}
}