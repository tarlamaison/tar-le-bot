export function getExposedString(exposed: string[]) {
  return exposed.map(exposed => `<@${exposed}>`).join(', ');
}

export const IMAGE_URI_REGEX = /(https?:\/\/.*\.(?:png|jpg|svg|jpeg))/i;
export const DOSSIERS_PER_PAGE = 5;