import { BaseCommand, Command } from 'ioc:factory/Core/Command';
import { CommandInteraction } from 'discord.js';
import { getRepository } from 'typeorm';
import Dossier from 'App/database/entities/Dossier';
import fs from 'node:fs/promises';
import path from 'path';

@Command({
  scope: 'GUILDS',
  options: {
    name: 'dossier',
    description: 'Montre un dossier aléatoire avec les mentions des personnes exposées.',
    options: [],
  },
})
export default class ShowRandomDossierCommand extends BaseCommand {
  public async run(interaction: CommandInteraction): Promise<void> {
    const dossiers = await getRepository(Dossier).find();
    const dossier = dossiers[Math.floor(Math.random() * dossiers.length)];

    if (!dossier) {
      await interaction.reply('Désolé, aucun dossier n\'à été trouvé.');
      return;
    }
    const pings = dossier.exposed.map(id => `<@${id}>`).join(' ');
    const image = await fs.readFile(path.join('uploads', 'dossiers', String(dossier.id)));

    await interaction.reply({
      content: pings,
      files: [ image ],
    });
  }
}