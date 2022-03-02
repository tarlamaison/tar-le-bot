import { User } from 'discord.js';
import { getRepository, MoreThan } from 'typeorm';
import { Birthday } from 'App/database/entities/Birthday';
import moment from 'moment';

export function stringToNextBirthday(dateString: string): moment.Moment {
  let birthday = moment(dateString, 'DD/MM', true).set({ hours: 12 }).local(true);

  if (birthday.isBefore(moment())) {
    birthday = birthday.add(1, 'year');
  }
  return birthday;
}

export function getNextBirthdayFromLast(last: Date): Date {
  return moment(last).add(1, 'year').toDate();
}

export async function setUserBirthday(user: User, date: Date): Promise<boolean> {
  const birthdayRepository = getRepository(Birthday);
  if (!(await birthdayRepository.findOne({ userId: user.id }))) {
    await birthdayRepository.insert({ userId: user.id, date });
    return true;
  }
  else {
    return false;
  }
}

export async function getNextBirthdays(limit: number = 5): Promise<Birthday[]> {
  return await getRepository(Birthday).find({ where: { date: MoreThan(new Date()) }, take: limit });
}

export async function deleteUserBirthday(user: User): Promise<boolean> {
  return !!(await getRepository(Birthday).delete({ userId: user.id })).affected;
}

export function getFrenchNextBirthdayRepresentation(date: moment.Moment): string {
  return date.locale('fr').format('DD MMMM YYYY');
}