const isValidUrl = (urlString: string | undefined) => {
    if (Boolean(new URL(urlString || ''))) {
      return urlString
    }
  else {
    return '';
  }
}

export default isValidUrl