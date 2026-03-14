export const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  fire:     { bg: '#FF6B35', text: '#fff' },
  water:    { bg: '#4A90D9', text: '#fff' },
  grass:    { bg: '#5DBB63', text: '#fff' },
  electric: { bg: '#F5C518', text: '#333' },
  ice:      { bg: '#74D7D7', text: '#333' },
  fighting: { bg: '#C03028', text: '#fff' },
  poison:   { bg: '#A040A0', text: '#fff' },
  ground:   { bg: '#E0C068', text: '#333' },
  flying:   { bg: '#A890F0', text: '#fff' },
  psychic:  { bg: '#F85888', text: '#fff' },
  bug:      { bg: '#A8B820', text: '#fff' },
  rock:     { bg: '#B8A038', text: '#fff' },
  ghost:    { bg: '#705898', text: '#fff' },
  dragon:   { bg: '#7038F8', text: '#fff' },
  dark:     { bg: '#705848', text: '#fff' },
  steel:    { bg: '#B8B8D0', text: '#333' },
  fairy:    { bg: '#EE99AC', text: '#333' },
  normal:   { bg: '#A8A878', text: '#fff' },
}

export const getTypeColor = (type: string) =>
  TYPE_COLORS[type] ?? { bg: '#888', text: '#fff' }

export const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1)

export const formatId = (id: number) =>
  `#${String(id).padStart(3, '0')}`