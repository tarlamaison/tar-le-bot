import CoreCommands from '@discord-factory/core-commands'

export default class Kernel {
  public registerAddons () {
    return [CoreCommands]
  }
}