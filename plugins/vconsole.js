import VConsole from 'vconsole'

let vConsole = null
if (process.env.NODE_ENV !== 'production') {
  vConsole = new VConsole()
}

export default vConsole
