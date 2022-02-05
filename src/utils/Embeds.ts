import { MessageEmbed } from 'discord.js';

export class ErrorEmbed extends MessageEmbed {
  constructor(error: Error | string) {
    const description = error instanceof Error ? error.message : error;

    super({
      title: 'Erreur: ',
      timestamp: new Date(),
      color: 'DARK_RED',
      description,
    });
  }
}