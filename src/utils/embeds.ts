import { MessageEmbed } from 'discord.js';

export class ErrorEmbed extends MessageEmbed {
  constructor(error: Error | string) {
    const description = error instanceof Error ? error.message : error;

    super({
      title: 'Erreur: ',
      color: 'DARK_RED',
      description,
    });
  }
}

export class SuccessEmbed extends MessageEmbed {
  constructor(message: string) {
    super({
      title: message,
      color: 'GREEN',
    });
  }
}

export class FailureEmbed extends MessageEmbed {
  constructor(message: string) {
    super({
      title: message,
      color: 'RED',
    });
  }
}

export class FineEmbed extends MessageEmbed {
  constructor(message: string) {
    super({
      title: message,
      color: 'GREYPLE',
    });
  }
}