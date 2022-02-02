import { Command, BaseCommand } from 'ioc:factory/Core/Command'
import { CommandInteraction } from 'discord.js'
import { MessageEmbed } from 'discord.js'
const dotenv = require('dotenv');
const puppeteer = require('puppeteer');
const moment = require('moment');

dotenv.config();

function get_obj_from_activity(activity, event, link: string) {
  const seats = parseInt(event.seats) - parseInt(event.nb_inscrits);
  const title = activity.title;
  const acti_link = link + activity.codeacti;
  return {seats: seats, title: title, link: acti_link};
}

async function get_activities_from_link(link: string, page) {
  await page.goto(link + '?format=json');
  const innerJSON = await page.evaluate(() =>  {
      return JSON.parse(document.querySelector("body").innerText);
  });

  moment.locale('fr');
  const currentTime = moment().format('YYYY-MM-DD H:mm:ss');
  let result: any = [];
  for (const activity of innerJSON.activites) {
      if (activity.end > currentTime) {
          for (const event of activity.events) {
              if (parseInt(event.nb_inscrits) < parseInt(event.seats)) {
                result.push(get_obj_from_activity(activity, event, link));
              }
          }
      }
  }
  return result;
}

@Command({
  scope: 'GUILDS',
  options: {
    name: 'hub',
    description: 'Affiche les Workshops et Talks avec des places libres.',
    options: [
      {
        type: "STRING",
        name: "ville",
        description: "Obtenir les informations du Hub d'une ville particulière"
      }
    ]
  }
})

export default class Hub extends BaseCommand {
  public async run (interaction: CommandInteraction): Promise<void> {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let city = interaction.options.getString("ville");
    city = (city == null) ? ("PAR") : city;
    await page.goto(`https://intra.epitech.eu/${process.env.INTRA_AUTH}`);
    const activities = await get_activities_from_link(`https://intra.epitech.eu/module/2021/B-INN-000/${city}-0-1/`, page);
    const embed = new MessageEmbed()
        .setColor('#0099ff')

    for (const elem of activities) {
      embed.addField(`${elem.title}`, `[${elem.seats.toString()} places disponibles](${elem.link})`);
    }
    interaction.reply({embeds: [embed]});
    browser.close();
  }
}