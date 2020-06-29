export function saveToLocal (id, key, value) {
  // localStorage存储seller，外部显示__seller__
  let seller = window.localStorage.__seller__
  if (!seller) {
    // 第一次未创建 则创建
    seller = {}
    seller[id] = {}
  } else {
    // JSON.parse来解析
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  // 存储到每个商家下面
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}

// 取
export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}
