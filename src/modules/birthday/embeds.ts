import { MessageEmbed } from 'discord.js';
import { Birthday } from 'App/database/entities/Birthday';

export class BirthdayEmbed extends MessageEmbed {
  constructor(birthday: Birthday) {
    super({
      title: `Joyeux anniversaire <@${birthday.userId}> !`,
      description: `Clique sur le bouton en dessous pour souhaiter un bon anniversaire à <@${birthday.userId}>`,
      color: 'PURPLE',
    });
  }
}