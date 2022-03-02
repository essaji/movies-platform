export const getDateMonthAndYear = (dateString: string) => {
  const releaseDate = new Date(dateString)
  const releaseMonth = releaseDate.toLocaleString('default', { month: 'long' })
  const releaseYear = releaseDate.getFullYear()

  return `${releaseMonth} ${releaseYear}`
}