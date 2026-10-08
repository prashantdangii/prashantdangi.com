import data from "./curriculum.json";

export const tracks = data.tracks;
export const lessons = data.lessons;

export function getTrack(id) {
  return tracks.find((track) => track.id === id) || tracks[0];
}

export function lessonsFor(trackId) {
  return lessons.filter((lesson) => lesson.track === trackId);
}

export function getLesson(slug) {
  return lessons.find((lesson) => lesson.slug === slug) || null;
}
