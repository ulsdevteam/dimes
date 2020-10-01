
export const dateString = dates => {
  return dates && dates.map(d => d.expression).join(", ")
}


/** Boolean indicator for the presence of access and use notes */
export const hasAccessAndUse = notes => {
  const access = notes && notes.filter(n => {return n.title === "Conditions Governing Access"}).length
  const use = notes && notes.filter(n => {return n.title === "Conditions Governing Use"}).length
  return access || use
}


/** Returns text for a specific note by title */
export const noteText = (notes, noteTitle) => {
  let note = notes && notes.filter(n => {return n.title === noteTitle})[0]
  return note ? note.subnotes.map(s => s.content).join("\r\n") : null
}
