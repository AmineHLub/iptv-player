const validateUrl = (urlString: string | undefined) => {
  try  {
    if ((Boolean(new URL(urlString || ''))))
    return urlString
    }
  catch (e) {
    return '';
  }
}

export default validateUrl