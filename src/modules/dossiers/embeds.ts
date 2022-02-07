import { MessageEmbed } from 'discord.js';
import Dossier from 'App/database/entities/Dossier';
import { getExposedString } from 'App/modules/dossiers/utils';

export class DossierEmbed extends MessageEmbed {
  constructor(dossier: Dossier) {
    super({
      title: `*${dossier.title}*`,
      image: {
        url: dossier.imageUri,
      },
      description: `${getExposedString(dossier.exposed)}.`,
      footer: {
        text: `Dossier #${dossier.id}`,
      },
    });
  }
}

export class DossiersListEmbed extends MessageEmbed {
  constructor(dossiers: Dossier[], page: number, maxPage: number) {
    super({
      title: 'Liste des dossiers de TAR.',
      fields: dossiers.map(dossier => ({
        name: `Dossier #${dossier.id}: ${dossier.title}`,
        value:
            `Exposé${dossier.exposed.length > 1 ? 's' : ''}: ${getExposedString(dossier.exposed)}\n` +
            `Lien de l'image: ${dossier.imageUri}`,
        inline: false,
      })),
      color: 'BLURPLE',
      footer: {
        text: `Page ${page}/${maxPage}`,
      },
    });
  }
}