export const COURSE_STATUS_OPTIONS = [
  '3rd Year',
  '4th Year',
  'Graduated',
  'Below 5 years of graduation'
] as const;

export type CourseStatus = (typeof COURSE_STATUS_OPTIONS)[number];

export const ENGINEERING_GRADUATION_COURSES = [
  'Aerospace Engineering',
  'Mechanical Engineering',
  'Electronics & Communication',
  'Electrical & Electronics',
  'Computer Science & Engineering',
  'Information Technology',
  'Robotics & Automation',
  'Mechatronics',
  'Artificial Intelligence & Data Science',
  'Civil Engineering',
  'Chemical Engineering',
  'Instrumentation Engineering',
  'Other Engineering Discipline'
] as const;

export type EngineeringGraduationCourse = (typeof ENGINEERING_GRADUATION_COURSES)[number];

export class RegisterCandidateDto {
  firstName: string;
  lastName: string;
  email: string;
  pincode: string;
  engineeringGraduationCourse: string;
  courseStatus: CourseStatus;
  password?: string;
}
