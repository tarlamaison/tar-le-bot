import { BaseCommand, Command } from 'ioc:factory/Core/Command';
import { CommandInteraction } from 'discord.js';
import { getRepository } from 'typeorm';
import Dossier from 'App/database/entities/Dossier';
import { ErrorEmbed, SuccessEmbed } from 'App/utils/embeds';
import { DossierEmbed } from 'App/modules/dossiers/embeds';

@Command({
  scope: 'GUILDS',
  options: {
    name: 'admin-dossiers-delete',
    description: 'Supprimer un dossier.',
    options: [
      {
        name: 'identifiant',
        description: 'Identifiant ',
        type: 'INTEGER',
        required: true,
      },
    ],
  },
})
export default class AdminDelete extends BaseCommand {
  // @ts-ignore
  public async run(interaction: CommandInteraction): Promise<void> {
    const ephemeral = process.env.NODE_ENV !== 'development';
    const dossiersRepository = await getRepository(Dossier);
    const id = interaction.options.getInteger('identifiant', true);
    const toDelete = await dossiersRepository.findOne({ id });

    if (toDelete) {
      await dossiersRepository.delete({ id });
      await interaction.reply({
        ephemeral,
        embeds: [
          new SuccessEmbed('Vous avez supprimé un dossier !'),
          new DossierEmbed(toDelete),
        ],
      });
    }
    else {
      await interaction.reply({
        ephemeral,
        embeds: [ new ErrorEmbed(`Le dossier #${id} n'existe pas.`) ],
      });
    }
  }
}