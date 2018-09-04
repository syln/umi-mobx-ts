const MENU = [{
    title:'首页',
    key:'index',
    url:'/'
},{
    title:'列表',
    key:'list',
    url:'/list',
    children:[{
        title:'列表1',
        key:'list1',
        url:'/list/list1',
    },{
        title:'列表12',
        key:'list12',
        url:'/list/list12',
    }]
},{
    title:'列表2',
    key:'list2',
    url:'/list2',
    children:[{
        title:'列表22',
        key:'list22',
        url:'/list2/list22',
    }]
}]

export{
    MENU
}