import axios from 'axios'
const baseUrl= ''
export default function ajax(url, data={}, type="GET"){
  url = baseUrl+url
  if(type==='GET'){

    // data {username: Tom, password: 123}
    // paramStr: username=Tom&password=123
 
      let paramStr = ''
       Object.keys(data).forEach(key=>{
      paramStr += key+'='+data[key]+'&'
    })
    if(paramStr){
      paramStr =paramStr.substring(0, paramStr.length-1)
    }
    return axios.get(url+'?'+paramStr)
    
  }else{
    return axios.post(url, data)
  }
}