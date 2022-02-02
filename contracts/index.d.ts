declare module 'ioc:factory/Core' {
  import { Ignitor, Factory, Application } from '@discord-factory/core-next'
  export {
    Ignitor,
    Factory,
    Application,
  }
}

declare module 'ioc:factory/Core/Provider' {
  import { BaseProvider, EntityResolvable, CommandEntity, EventEntity, HookEntity } from '@discord-factory/core-next'
  export {
    BaseProvider,
    EntityResolvable,
    CommandEntity,
    EventEntity,
    HookEntity,
  }
}

declare module 'ioc:factory/Core/Container' {
  import { CommandContainer, EventContainer, HookContainer } from '@discord-factory/core-next'
  export {
    CommandContainer,
    EventContainer,
    HookContainer,
  }
}

declare module 'ioc:factory/Core/Event' {
  import { BaseEvent, Event } from '@discord-factory/core-next'
  export {
    BaseEvent,
    Event,
  }
}

declare module 'ioc:factory/Core/Command' {
  import { BaseCommand, Command } from '@discord-factory/core-next'
  export {
    BaseCommand,
    Command,
  }
}

declare module 'ioc:factory/Core/ContextMenu' {
  import { BaseContextMenu, ContextMenu } from '@discord-factory/core-next'
  export {
    BaseContextMenu,
    ContextMenu,
  }
}

declare module 'ioc:factory/Core/Hook' {
  import { BaseHook, Hook } from '@discord-factory/core-next'
  export {
    BaseHook,
    Hook,
  }
}