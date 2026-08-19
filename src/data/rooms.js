export const ROOMS = {
  questions: {
    id: 'questions',
    path: '/curiosity/questions',
    wing: 'brain',
    title: "Things I can't leave alone",
    whisper: 'questions that have been bothering me lately.',
    connections: ['philosophy', 'learning', 'beliefs', 'books'],
  },
  philosophy: {
    id: 'philosophy',
    path: '/curiosity/philosophy',
    wing: 'brain',
    title: 'Working theories',
    whisper: 'subject to change without notice.',
    connections: ['questions', 'beliefs', 'books', 'quotes'],
  },
  books: {
    id: 'books',
    path: '/curiosity/books',
    wing: 'brain',
    title: 'The shelf',
    whisper: 'books that left something behind.',
    connections: ['quotes', 'philosophy', 'learning', 'greenhouse'],
  },
  learning: {
    id: 'learning',
    path: '/curiosity/learning',
    wing: 'brain',
    title: 'Rabbit holes',
    whisper: "things I'm currently disappearing into.",
    connections: ['questions', 'research', 'books', 'philosophy'],
  },
  experience: {
    id: 'experience',
    path: '/projects/experience',
    wing: 'work',
    title: 'Where I have worked',
    whisper: 'A timeline of roles, not a résumé dump',
    connections: ['research', 'playground', 'learning', 'questions'],
  },
  research: {
    id: 'research',
    path: '/projects/research',
    wing: 'work',
    title: 'Labs I have loved',
    whisper: 'Academic curiosity, applied',
    connections: ['learning', 'experience', 'questions', 'playground'],
  },
  playground: {
    id: 'playground',
    path: '/projects/playground',
    wing: 'work',
    title: 'Things I built for the fun of it',
    whisper: 'Pick a cabinet. Insert a coin.',
    connections: ['experience', 'poems', 'quotes', 'greenhouse'],
  },
  greenhouse: {
    id: 'greenhouse',
    path: '/creative/greenhouse',
    wing: 'heart',
    title: 'The greenhouse',
    whisper: 'yes, I really do need more plants.',
    connections: ['moments', 'quotes', 'poems', 'beliefs'],
  },
  quotes: {
    id: 'quotes',
    path: '/creative/quotes',
    wing: 'heart',
    title: 'Quotes that taste fizzy',
    whisper: 'words so good I had to keep them.',
    connections: ['books', 'poems', 'greenhouse', 'philosophy'],
  },
  poems: {
    id: 'poems',
    path: '/creative/poems',
    wing: 'heart',
    title: 'Poems I wrote',
    whisper: 'some feelings are unfortunately poems.',
    connections: ['quotes', 'greenhouse', 'beliefs', 'performance'],
  },
  performance: {
    id: 'performance',
    path: '/creative/performance',
    wing: 'heart',
    title: 'The stage',
    whisper: 'I miss the microphone sometimes.',
    connections: ['poems', 'moments', 'quotes'],
  },
  moments: {
    id: 'moments',
    path: '/creative/moments',
    wing: 'heart',
    title: 'Life in frames',
    whisper: "things I didn't want to forget.",
    connections: ['greenhouse', 'performance', 'poems'],
  },
  beliefs: {
    id: 'beliefs',
    path: '/about/beliefs',
    wing: 'soul',
    title: 'What I believe',
    whisper: 'Even when it is inconvenient',
    connections: ['boundaries', 'philosophy', 'questions', 'quotes'],
  },
  boundaries: {
    id: 'boundaries',
    path: '/about/boundaries',
    wing: 'soul',
    title: 'What I am protecting',
    whisper: 'Letting go, on purpose',
    connections: ['beliefs', 'philosophy', 'learning'],
  },
}

export const WINGS = {
  brain: {
    id: 'brain',
    path: '/curiosity',
    title: 'Brain',
    subtitle: 'Where I keep all my unfinished questions.',
    egg: 'questioning → forming opinions → absorbing → learning',
    rooms: ['questions', 'philosophy', 'books', 'learning'],
    sample: 3,
  },
  work: {
    id: 'work',
    path: '/projects',
    title: 'Work',
    subtitle: 'Where curiosity becomes something you can hold.',
    rooms: ['experience', 'research', 'playground'],
    sample: 2,
  },
  heart: {
    id: 'heart',
    path: '/creative',
    title: 'Heart',
    subtitle: 'Where I keep the things I love too much.',
    rooms: ['greenhouse', 'quotes', 'poems', 'performance', 'moments'],
    sample: 3,
  },
  soul: {
    id: 'soul',
    path: '/about',
    title: 'Soul',
    subtitle: 'What remains when no one is watching.',
    rooms: ['beliefs', 'boundaries'],
    sample: 2,
  },
}

export const ATRIUM_POOL = [
  'brain',
  'work',
  'heart',
  'soul',
  'greenhouse',
  'questions',
  'books',
  'quotes',
  'playground',
  'beliefs',
]

export const ALL_ROOM_IDS = Object.keys(ROOMS)
export const ALL_WING_IDS = Object.keys(WINGS)

export function isWing(id) {
  return Boolean(WINGS[id])
}

export function getPlace(id) {
  return ROOMS[id] || WINGS[id] || null
}
