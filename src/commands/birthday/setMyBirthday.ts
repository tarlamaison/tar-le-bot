import { BaseCommand, Command } from 'ioc:factory/Core/Command';
import { CommandInteraction } from 'discord.js';
import {
  getFrenchNextBirthdayRepresentation,
  setUserBirthday,
  stringToNextBirthday,
} from 'App/modules/birthday/provider';
import { ErrorEmbed, SuccessEmbed } from 'App/utils/embeds';

@Command({
  scope: 'GUILDS',
  options: {
    name: 'set-birthday',
    description: 'Ajouter son anniversaire.',
    options: [
      {
        name: 'date',
        description: 'Date de ton anniversaire (DD/MM)',
        type: 'STRING',
        required: true,
      },
    ],
  },
})
export default class SetMyBirthday extends BaseCommand {
  // @ts-ignore
  public async run(interaction: CommandInteraction): Promise<void> {
    const dateString = interaction.options.getString('date', true);
    const date = stringToNextBirthday(dateString);

    if (!date.isValid()) {
      await interaction.reply({
        ephemeral: true,
        embeds: [
          new ErrorEmbed('Le formatage de la date est invalide! (DD/MM)'),
        ],
      });
    }
    else if (await setUserBirthday(interaction.user, date.toDate())) {
      await interaction.reply({
        embeds: [
          new SuccessEmbed(`Vous avez ajouté votre anniversaire, nous vous le souhaiterons le ${getFrenchNextBirthdayRepresentation(date)}.`),
        ],
      });
    }
    else {
      await interaction.reply({
        ephemeral: true,
        embeds: [
          new ErrorEmbed('Vous avez déjà entré votre anniversaire!'),
        ],
      });
    }
  }
}