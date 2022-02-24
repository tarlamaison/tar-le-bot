import { BaseCommand, Command } from 'ioc:factory/Core/Command';
import { CommandInteraction } from 'discord.js';
import { getRepository } from 'typeorm';
import Dossier from 'App/database/entities/Dossier';
import { DossierEmbed } from 'App/modules/dossiers/embeds';

@Command({
  scope: 'GUILDS',
  options: {
    name: 'dossier',
    description: 'Montre un dossier aléatoire avec les mentions des personnes exposées.',
    options: [],
  },
})
export default class ShowRandomDossierCommand extends BaseCommand {
  // @ts-ignore
  public async run(interaction: CommandInteraction): Promise<void> {
    const ephemeral = process.env.NODE_ENV !== 'development';
    const dossiers = await getRepository(Dossier).find();
    const dossier = dossiers[Math.floor(Math.random() * dossiers.length)];

    if (!dossier) {
      await interaction.reply('Désolé, aucun dossier n\'à été trouvé.');
      return;
    }
    else {
      await interaction.reply({
        ephemeral,
        embeds: [
          new DossierEmbed(dossier),
        ],
      });
    }
  }
}