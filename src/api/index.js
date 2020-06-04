import ajax from './ajax'


// 获取查询数据用get，提交数据用post（会修改服务器端数据）
export const reqRegister = (user) => ajax('/register',user,'POST')

export const reqLogin = (username, password) => ajax('/login',{username, password},'POST')


export const reqUpdateUser = (user)=> ajax('/update',user,'POST')

export const reqUser = ()=>ajax('/user',{},'GET')

export const reqUserList = (type) =>ajax('/list',{type})

export const reqChatMsgList = () => ajax('/msglist')

export const reqReadMsg = (from) => ajax('/readmsg',{from}, 'POST')
