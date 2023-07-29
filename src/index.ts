type Handle = () => Promise<{
  fullname: string
  name: string
}>
const fullname = 'Tran Bao Anh'
const person: { name: string } = { name: fullname }
const handle: Handle = () =>
  Promise.resolve({
    fullname,
    name: person.name
  })
handle().then(console.log)
