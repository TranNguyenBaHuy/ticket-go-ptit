export const getDisplayPrice = (tickets: { price: number }[]) => {
  if (!tickets || tickets.length === 0) return null;
  return Math.min(...tickets.map((t) => t.price));
};
