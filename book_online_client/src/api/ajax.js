import axios from 'axios'

// 包装的axios ajax请求接口
export default function ajax (url, data={}, method='GET',headers={}) {
  return new Promise(function (resolve, reject) {
    let promise
    if (method === 'GET') {
      // 准备url query参数数据
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }

      promise = axios.get(url)
    } else if (method==='POST') {
      promise = axios.post(url, data,headers)
    }else if(method==='PUT'){
      promise = axios.put(url, data,headers)
    }else if(method=='DELETE'){
      promise = axios.delete(url, {'data':data})
    }

    promise.then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      reject(error)
    })
  })
}


