export const ROOMS = {
  questions: {
    id: 'questions',
    path: '/brain/questions',
    wing: 'brain',
    title: "Things I can't leave alone",
    whisper: 'questions that have been bothering me lately.',
    connections: ['philosophy', 'learning', 'beliefs', 'books'],
  },
  philosophy: {
    id: 'philosophy',
    path: '/brain/philosophy',
    wing: 'brain',
    title: 'Working theories',
    whisper: 'subject to change without notice.',
    connections: ['questions', 'beliefs', 'books', 'quotes'],
  },
  books: {
    id: 'books',
    path: '/brain/books',
    wing: 'brain',
    title: 'The shelf',
    whisper: 'books that left something behind.',
    connections: ['quotes', 'philosophy', 'learning', 'greenhouse'],
  },
  learning: {
    id: 'learning',
    path: '/brain/learning',
    wing: 'brain',
    title: 'Rabbit holes',
    whisper: "things I'm currently disappearing into.",
    connections: ['questions', 'research', 'books', 'philosophy'],
  },
  experience: {
    id: 'experience',
    path: '/work/experience',
    wing: 'work',
    title: 'Where I’ve worked',
    whisper: 'Things I helped build with other people.',
    connections: ['research', 'playground', 'learning', 'questions'],
  },
  research: {
    id: 'research',
    path: '/work/research',
    wing: 'work',
    title: 'Labs I’ve loved',
    whisper: 'Questions I got to chase seriously.',
    connections: ['learning', 'experience', 'questions', 'playground'],
  },
  playground: {
    id: 'playground',
    path: '/work/playground',
    wing: 'work',
    title: 'Things I built for fun',
    whisper: 'Ideas that escaped containment.',
    connections: ['experience', 'poems', 'quotes', 'greenhouse'],
  },
  greenhouse: {
    id: 'greenhouse',
    path: '/heart/greenhouse',
    wing: 'heart',
    title: 'The greenhouse',
    whisper: 'yes, I really do need more plants.',
    connections: ['moments', 'quotes', 'poems', 'beliefs'],
  },
  quotes: {
    id: 'quotes',
    path: '/heart/quotes',
    wing: 'heart',
    title: 'Quotes that taste fizzy',
    whisper: 'words so good I had to keep them.',
    connections: ['books', 'poems', 'greenhouse', 'philosophy'],
  },
  poems: {
    id: 'poems',
    path: '/heart/poems',
    wing: 'heart',
    title: 'Poems I wrote',
    whisper: 'some feelings are unfortunately poems.',
    connections: ['quotes', 'greenhouse', 'beliefs', 'performance'],
  },
  performance: {
    id: 'performance',
    path: '/heart/performance',
    wing: 'heart',
    title: 'The stage',
    whisper: 'fun stories I wanted someone to hear.',
    connections: ['poems', 'moments', 'quotes'],
  },
  moments: {
    id: 'moments',
    path: '/heart/moments',
    wing: 'heart',
    title: 'Life in frames',
    whisper: "things I didn't want to forget.",
    connections: ['greenhouse', 'performance', 'poems'],
  },
  beliefs: {
    id: 'beliefs',
    path: '/soul/beliefs',
    wing: 'soul',
    title: 'What I believe',
    whisper: 'Even when it is inconvenient',
    connections: ['boundaries', 'philosophy', 'questions', 'quotes'],
  },
  boundaries: {
    id: 'boundaries',
    path: '/soul/boundaries',
    wing: 'soul',
    title: 'What I am protecting',
    whisper: 'Letting go, on purpose',
    connections: ['beliefs', 'philosophy', 'learning'],
  },
}

export const WINGS = {
  brain: {
    id: 'brain',
    path: '/brain',
    title: 'Brain',
    subtitle: 'Where I keep all my unfinished questions.',
    egg: 'questioning → forming opinions → absorbing → learning',
    rooms: ['questions', 'learning', 'philosophy', 'books'],
    sample: 3,
  },
  work: {
    id: 'work',
    path: '/work',
    title: 'Work',
    subtitle: 'Where curiosity becomes something you can hold.',
    egg: 'curiosity → something you can hold → a SNAP form → a tomato',
    rooms: ['research', 'playground', 'experience'],
    sample: 2,
  },
  heart: {
    id: 'heart',
    path: '/heart',
    title: 'Heart',
    subtitle: 'Where I keep the things I love too much.',
    egg: 'too much → still kept → still too much',
    rooms: ['poems', 'quotes', 'greenhouse', 'moments', 'performance'],
    sample: 3,
  },
  soul: {
    id: 'soul',
    path: '/soul',
    title: 'Soul',
    subtitle: 'What remains when no one is watching.',
    egg: 'when no one is watching → smaller than I hoped → more honest than I planned',
    kickerEgg: 'The lights are lower so you can hear yourself think.',
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
