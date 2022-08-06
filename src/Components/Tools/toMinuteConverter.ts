const toMinuteConverter = (time: string): string => {
  const [hour, minute] = time.split(':').map(Number);
  const timeInMinutes = hour * 60 + minute;
  return timeInMinutes.toString();
}

export default toMinuteConverter;