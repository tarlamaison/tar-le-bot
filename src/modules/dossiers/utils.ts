export function getExposedString(exposed: string[]) {
  return exposed.map(exposed => `<@${exposed}>`).join(', ');
}