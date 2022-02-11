import { BaseCommand, Command } from 'ioc:factory/Core/Command';
import { CommandInteraction } from 'discord.js';
import { getRepository } from 'typeorm';
import Dossier from 'App/database/entities/Dossier';
import { ErrorEmbed, SuccessEmbed } from 'App/utils/embeds';
import { DossierEmbed } from 'App/modules/dossiers/embeds';

@Command({
  scope: 'GUILDS',
  options: {
    name: 'admin-dossiers-modify',
    description: 'Modifier des dossiers.',
    options: [
      {
        name: 'identifiant',
        description: 'Identifiant du dossier à modifier.',
        type: 'INTEGER',
        required: true,
      },
      {
        name: 'ajout_exposé',
        description: 'Utilisateur à ajouter au dossier.',
        type: 'USER',
      },
      {
        name: 'suppr_exposé',
        description: 'Utilsateur à supprimer du dossier.',
        type: 'USER',
      },
      {
        name: 'titre',
        description: 'Nouveau titre du dossier.',
        type: 'STRING',
      },
      {
        name: 'lien',
        description: 'Nouveau lien de l\'image du dossier.',
        type: 'STRING',
      },
    ],
  },
})
export default class AdminModifyDossierCommand extends BaseCommand {
  public async run(interaction: CommandInteraction): Promise<void> {
    const ephemeral = process.env.NODE_ENV !== 'development';

    const id = interaction.options.getInteger('identifiant', true);
    let exposedAdd = interaction.options.getUser('ajout_exposé')?.id;
    let exposedRemove = interaction.options.getUser('suppr_exposé')?.id;
    const title = interaction.options.getString('titre');
    const imageUri = interaction.options.getString('lien');

    const dossiersRepository = await getRepository(Dossier);
    const dossier = await dossiersRepository.findOne({ id });

    if (!dossier) {
      await interaction.reply({
        ephemeral,
        embeds: [ new ErrorEmbed('Impossible de trouver le dossier demandé.') ],
      });
      return;
    }
    else {
      if (exposedRemove && !dossier.exposed.some(exposed => exposedRemove === exposed)) {
        await interaction.reply({
          ephemeral,
          embeds: [ new ErrorEmbed(`<@${exposedRemove}> n'est pas présent sur le dossier.`) ],
        });
        return;
      }
      if (exposedAdd && dossier.exposed.some(exposed => exposedAdd === exposed)) {
        await interaction.reply({
          ephemeral,
          embeds: [ new ErrorEmbed(`<@${exposedAdd}> est déjà présent sur le dossier.`) ],
        });
        return;
      }
      if (exposedAdd === exposedRemove) {
        exposedAdd = exposedRemove = undefined;
      }
      else if (exposedRemove && dossier.exposed.length <= 1) {
        await interaction.reply({
          ephemeral,
          embeds: [ new ErrorEmbed(`Impossible de supprimer <@${exposedRemove}> du dossier car c'est la dernière personne exposée.`) ],
        });
      }
      dossier.title = title ?? dossier.title;
      dossier.imageUri = imageUri ?? dossier.imageUri;
      dossier.exposed = dossier.exposed.filter(exposed => exposedRemove !== exposed);
      if (exposedAdd) {
        dossier.exposed.push(exposedAdd);
      }
      await dossiersRepository.update({ id }, dossier);
      await interaction.reply({
        ephemeral,
        embeds: [
          new SuccessEmbed('Vous avez modifié un dossier !'),
          new DossierEmbed(dossier),
        ],
      });
    }
  }
}