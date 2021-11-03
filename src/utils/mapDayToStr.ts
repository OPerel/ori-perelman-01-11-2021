export default function mapDayToStr(date: number): string {
  const day = new Date(date).getDay();
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day];
}
