import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCard } from "@/components/courses/CourseCard";

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const courses = [
    {
      id: "1",
      title: "React Fundamentals",
      description: "Learn React from scratch",
      status: "to_start",
      progress: 0,
    },
    {
      id: "2",
      title: "Advanced JavaScript",
      description: "Deep dive into JS",
      status: "in_progress",
      progress: 45,
    },
    {
      id: "3",
      title: "UI/UX Design",
      description: "Design principles",
      status: "completed",
      progress: 100,
    },
  ];

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">My Courses</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="to_start">To Start</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-6 sm:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="to_start">
          <div className="grid gap-6 sm:grid-cols-2">
            {courses
              .filter((c) => c.status === "to_start")
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="in_progress">
          <div className="grid gap-6 sm:grid-cols-2">
            {courses
              .filter((c) => c.status === "in_progress")
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid gap-6 sm:grid-cols-2">
            {courses
              .filter((c) => c.status === "completed")
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}