export function formatDate(dateStr: Date): string {
  if (!dateStr) return '';
  return new Date(dateStr).toISOString().split('T')[0];
}