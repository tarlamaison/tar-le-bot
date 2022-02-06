import { BaseCommand, Command } from 'ioc:factory/Core/Command';
import { CommandInteraction } from 'discord.js';
import { IMAGE_URI_REGEX } from 'App/modules/dossiers/utils';
import { ErrorEmbed } from 'App/utils/Embeds';
import { getRepository } from 'typeorm';
import Dossier from 'App/database/entities/Dossier';
import { DossierEmbed } from 'App/modules/dossiers/embeds';

@Command({
  scope: 'GUILDS',
  options: {
    name: 'admin-dossiers-add',
    description: 'Ajouter des dossiers.',
    options: [
      {
        name: 'titre',
        description: 'Titre du dossier.',
        type: 'STRING',
        required: true,
      },
      {
        name: 'lien',
        description: 'Lien vers l\'image du dossier.',
        type: 'STRING',
        required: true,
      },
      {
        name: 'exposé1',
        description: 'Personne exposée sur le dossier.',
        type: 'USER',
        required: true,
      },
      {
        name: 'exposé2',
        description: 'Personne exposée sur le dossier.',
        type: 'USER',
      },
      {
        name: 'exposé3',
        description: 'Personne exposée sur le dossier.',
        type: 'USER',
      },
    ],
  },
})
export default class DossiersAdminAdd extends BaseCommand {
  public async run(interaction: CommandInteraction): Promise<void> {
    const ephemeral = process.env.NODE_ENV !== 'development';
    const title = interaction.options.getString('titre', true);
    const imageUri = interaction.options.getString('lien', true);
    let exposed: Array<string> = [
      interaction.options.getUser('exposé1', true).id,
      interaction.options.getUser('exposé2')?.id || '',
      interaction.options.getUser('exposé3')?.id || '',
    ];
    exposed = exposed.filter(exposed => exposed != '');
    // Removing doublons...
    exposed = [ ...new Set(exposed) ];
    if (!imageUri.match(IMAGE_URI_REGEX)) {
      await interaction.reply({
        ephemeral,
        embeds: [
          new ErrorEmbed('Le lien de l\'image du dossier semble ne pas en être une.'),
        ],
      });
    }
    else {
      const dossierRepository = await getRepository(Dossier);
      const dossier = await dossierRepository.create({ title, exposed, imageUri });
      await dossierRepository.insert(dossier);
      await interaction.reply({
        ephemeral,
        embeds: [
          {
            title: 'Vous avez ajouté un nouveau dossier !',
            color: 'GREYPLE',
          },
          new DossierEmbed(dossier),
        ],
      });
    }
  }
}