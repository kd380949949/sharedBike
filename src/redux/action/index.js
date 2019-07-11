/*
*action类型
*/

export const type = {  //这是一个技巧
    SWITCH_MENU:'SWITCH_MENU'
}
//点击菜单需要修改面包屑名称，action生成函数中带有变量
export function switchMenu(menuName){
    return{
        type:type.SWITCH_MENU, //上面导出的type对象
        menuName  //action中存在的变量
    }
}