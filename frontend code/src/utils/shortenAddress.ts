// Utility to shorten Ethereum addresses for UI display
// Example: 0x1234567890abcdef1234567890abcdef12345678 -> 0x1234...5678

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`;
}
