import { notFound } from "next/navigation";
import { Walkthrough } from "@/components/Walkthrough";
import { getLesson, getTrack, lessons } from "@/lib/courses";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Courses — Prashant Dangi" };
  return {
    title: `${lesson.title} — Prashant Dangi`,
    description: lesson.summary || "A course walkthrough."
  };
}

export default async function CourseLessonPage({ params }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const track = getTrack(lesson.track);
  const year = new Date().getFullYear();
  return <Walkthrough key={lesson.slug} lesson={lesson} track={track} year={year} />;
}
