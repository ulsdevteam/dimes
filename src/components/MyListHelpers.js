
/** Fetches My List */
export const fetchMyList = () => {
  var existing = localStorage.getItem(`${process.env.REACT_APP_LOCALSTORAGE_KEY}`);
  return existing ? JSON.parse(existing) : {};
}

/** Saves My List */
export const saveMyList = updated => {
  localStorage.setItem(`${process.env.REACT_APP_LOCALSTORAGE_KEY}`, JSON.stringify(updated));
}

/** Removes an item from My List */
export const removeItem = item => {
  var list = fetchMyList();
  delete list[item.group.identifier][item.uri]
  if (Object.entries(list[item.group.identifier]).length === 0) {
    delete list[item.group.identifier]
  }
  saveMyList(list);
}

/** Saves item to MyList
* Items are saved within an object corresponding to a top-level collection
*/
export const saveItem = item => {
  var list = fetchMyList()
  if (!list[item.group.identifier]) {
    list[item.group.identifier] = {}
  }
  if (!list[item.group.identifier][item.uri]) {
    list[item.group.identifier][item.uri] = {"saved": Date.now()}
    saveMyList(list)
  }
}

/** Indicates whether or not an item is present in My List */
export const isItemSaved = (item, list) => {
  console.log(item, list)
  console.log(list[item.group.identifier] && list[item.group.identifier][item.uri] ? true : false)
  return list[item.group.identifier] && list[item.group.identifier][item.uri] ? true : false
}
