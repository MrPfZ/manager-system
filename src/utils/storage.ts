export default {
  // 原生的localStorge.setItem存储对象需要进行序列化
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  // 读取时将序列化的value反序列化
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },

  remove(key: string) {
    localStorage.removeItem(key)
  },

  clear() {
    localStorage.clear()
  }
}
