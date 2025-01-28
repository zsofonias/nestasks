import { generateRandomCryptoString } from 'src/common/utils/string.utils';

export function generateUsername(names: string[]): string | undefined {
  if (!names || !names.length) return `u${generateRandomCryptoString(8)}`;

  const validNames = names.filter(
    (name) => typeof name === 'string' && name.trim() !== '',
  );

  if (!validNames.length) return undefined;

  const username = validNames.map((name) => name.trim()).join('_');
  const randomString = generateRandomCryptoString(4);

  return `${username}_${randomString}`;
}
