import axios from 'axios'

export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/v1',
    timeout:5000
  });
  //axios拦截器
  instance.interceptors.request.use( config => {
    //用于增删改需要的东西，可以在这里添加动画，就像那种转转球，还可以是某些网络请求
    console.log( config );
    //拦截后需要进行返回
    return config
  },err => {
    // console.log( err );
    return err
  });
  instance.interceptors.response.use(res => {
    // console.log( res );
    //直接返回data其余的都没什么用处
    return res.data
  },error => {
    // console.log( error );
  });
  //发送真正的网络请求
  return instance(config)
}
