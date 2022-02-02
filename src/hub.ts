import { Command, BaseCommand } from 'ioc:factory/Core/Command'
import { CommandInteraction } from 'discord.js'
import { MessageEmbed } from 'discord.js'
const dotenv = require('dotenv');
const puppeteer = require('puppeteer');
const moment = require('moment');
dotenv.config();

@Command({
  scope: 'GUILDS',
  options: {
    name: 'hub',
    description: 'Affiche les Workshops et Talks avec des places libres.',
    options: []
  }
})

export default class Hub extends BaseCommand {
  public async run (interaction: CommandInteraction): Promise<void> {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://intra.epitech.eu/${process.env.INTRA_AUTH}`);
    await page.goto('https://intra.epitech.eu/module/2021/B-INN-000/PAR-0-1/?format=json');
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
                  let obj = {seats: parseInt(event.seats) - parseInt(event.nb_inscrits), title: activity.title, link: "https://intra.epitech.eu/module/2021/B-INN-000/PAR-0-1/"+ activity.codeacti};
                    result.push(obj);
                }
            }
        }
    }

  const embed = new MessageEmbed()
      .setColor('#0099ff')

  for (const elem of result) {
    embed.addField(`${elem.title}`, `[${elem.seats.toString()} places disponibles](${elem.link})`);
  }
  interaction.reply({embeds: [embed]});
  browser.close();
  }
}