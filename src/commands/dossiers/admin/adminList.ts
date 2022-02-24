import { BaseCommand, Command } from 'ioc:factory/Core/Command';
import { CommandInteraction } from 'discord.js';
import { ErrorEmbed } from 'App/utils/embeds';
import { getDossiersListPageDataFor } from 'App/modules/dossiers/provider';
import { DossiersListEmbed } from 'App/modules/dossiers/embeds';
import permissions from 'App/utils/permissions';

@Command({
  permissions: [
    // @ts-ignore
    permissions.dossiers.admin,
  ],
  scope: 'GUILDS',
  options: {
    name: 'admin-dossiers-list',
    description: 'Lister les dossiers.',
    options: [
      {
        name: 'page',
        description: 'Numéro de la page à afficher.',
        type: 'INTEGER',
      },
      {
        name: 'avec',
        description: 'Afficher uniquement les dossiers exposant la personne.',
        type: 'USER',
      },
    ],
  },
})
export default class AdminListDossiersCommand extends BaseCommand {
  // @ts-ignore
  public async run(interaction: CommandInteraction): Promise<void> {
    const ephemeral = process.env.NODE_ENV != 'development';
    const page = (interaction.options.getInteger('page', false) ?? 1) - 1;
    const exposed = interaction.options.getUser('avec', false)?.id;

    if (page + 1 <= 0) {
      await interaction.reply({
        embeds: [
          new ErrorEmbed('Le numéro de la page doit être un entier strictement positif.'),
        ],
        ephemeral,
      });
      return;
    }
    const { dossiers, maxPage } = await getDossiersListPageDataFor(exposed, page);

    if (!dossiers.length) {
      await interaction.reply({
        ephemeral,
        embeds: [
          new ErrorEmbed('Aucun dossier n\'a pu être trouvé avec les paramètres entrés.'),
        ],
      });
    }
    else {
      await interaction.reply({
        ephemeral,
        embeds: [
          new DossiersListEmbed(dossiers, page + 1, maxPage),
        ],
      });
    }
  }
}
