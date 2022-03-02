import { BaseCommand, Command } from 'ioc:factory/Core/Command';
import { CommandInteraction } from 'discord.js';
import { deleteUserBirthday } from 'App/modules/birthday/provider';
import { ErrorEmbed, SuccessEmbed } from 'App/utils/embeds';

@Command({
  scope: 'GUILDS',
  options: {
    name: 'unset-birthday',
    description: 'Supprimer son anniversaire',
    options: [],
  },
})
export default class UnsetMyBirthday extends BaseCommand {
  // @ts-ignore
  public async run(interaction: CommandInteraction): Promise<void> {
    await interaction.reply({
      embeds: [
        await deleteUserBirthday(interaction.user) ?
            new SuccessEmbed('Vous avez supprimé votre anniversaire!') :
            new ErrorEmbed('Vous n\'avez pas entré votre anniversaire.'),
      ],
    });
  }
}