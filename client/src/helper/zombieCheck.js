export const zombieCheck = (movie) => {
  const keywords = ['zombie', 'zombies', 'dead', 'undead']
  const keys = ['title', 'tmdbOverview']
  return !!keys.filter((key) => {
    return keywords.some(keyword => movie[key].toLowerCase().includes(keyword))
  }).length
}