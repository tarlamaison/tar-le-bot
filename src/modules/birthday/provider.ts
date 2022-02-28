import { User } from 'discord.js';
import { getRepository, MoreThan, Repository } from 'typeorm';
import { Birthday } from 'App/database/entities/Birthday';

const birthdayRepository: Repository<Birthday> = getRepository(Birthday);

export async function getUserBirthday(user: User): Promise<Date | undefined> {
  return (await birthdayRepository.findOne(user.id))?.date;
}

export async function setUserBirthday(user: User, date: Date): Promise<boolean> {
  if (!(await getUserBirthday(user))) {
    await birthdayRepository.insert({ userId: user.id, date });
    return true;
  }
  else {
    return false;
  }
}

export async function getNextBirthdays(limit: number = 5): Promise<Birthday[]> {
  return await birthdayRepository.find({ where: { date: MoreThan(new Date()) }, take: limit });
}