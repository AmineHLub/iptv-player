const epgTimeConverter = (start: string, end: string): string => {
  const startTime = new Date(start).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = new Date(end).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  if(startTime !== 'Invalid Date') {
    return `${startTime} - ${endTime} :`;
  } else return '';
}

export default epgTimeConverter;