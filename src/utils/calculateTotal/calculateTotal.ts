export function calculateTotal(amounts: string): bigint {
  const amountArray = amounts
    .split(/[,\n]+/)
    .map(a => a.trim())
    .filter(Boolean);

  let hasInvalid = false;
  const parsed = amountArray.map(a => {
    try {
      const num = BigInt(a);
      return num > 0n ? num : 0n;
    } catch {
      hasInvalid = true;
      return 0n;
    }
  });

  if (hasInvalid) return 0n;

  return parsed.reduce((a, b) => a + b, 0n);
}