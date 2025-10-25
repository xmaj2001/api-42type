export const getCacheTTL = (ttl: string): number => {
  const match = ttl.match(/^(\d+)([smh])$/);
  if (!match) throw new Error('Invalid TTL format');
  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    default:
      throw new Error('Invalid TTL unit');
  }
};
