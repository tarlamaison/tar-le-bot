import 'module-alias'
import { Ignitor } from '@discord-factory/core-next'

(async () => {
  const ignitor = new Ignitor()
  await ignitor.exec()
})()
