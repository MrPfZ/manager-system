// 运行时环境
type ENV = 'stg' | 'dev' | 'prd'

let env: ENV = 'dev'

if (location.host.indexOf('localhost') > -1) {
  env = 'dev'
} else if (location.host === 'driver-stg.marsview.cc') {
  env = 'stg'
} else {
  env = 'prd'
}

const config = {
  dev: {
    baseAPI: '/api',
    uploadAPI: 'http://api-driver-dev.marsview.cc',
    mock: false,
    mockAPI: ''
  },
  stg: {
    baseAPI: '/api',
    uploadAPI: 'http://api-driver-dev.marsview.cc',
    mock: true,
    mockAPI: ''
  },
  prd: {
    baseAPI: '/api',
    uploadAPI: 'http://api-driver-dev.marsview.cc',
    mock: false,
    mockAPI: ''
  }
}

export default {
  env,
  ...config[env]
}
