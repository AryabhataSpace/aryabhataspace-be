export const COURSE_STATUS_OPTIONS = [
  '3rd Year',
  '4th Year',
  'Graduated',
  'Below 5 years of graduation',
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
  'Other Engineering Discipline',
] as const;

export type EngineeringGraduationCourse = (typeof ENGINEERING_GRADUATION_COURSES)[number];

export const CANDIDATE_STATUS_OPTIONS = [
  'pending',
  'active',
  'suspended',
  'lifetime',
] as const;

export type CandidateStatus = (typeof CANDIDATE_STATUS_OPTIONS)[number];

export const CANDIDATE_ROLE_OPTIONS = [
  'candidate',
  'admin',
  'mentor',
  'partner',
] as const;

export type CandidateRole = (typeof CANDIDATE_ROLE_OPTIONS)[number];

export const DEGREE_LEVEL_OPTIONS = [
  'Bachelor',
  'Master',
  'PhD',
  'Diploma',
] as const;

export type DegreeLevel = (typeof DEGREE_LEVEL_OPTIONS)[number];

export const APPLICATION_STATUS_OPTIONS = [
  'submitted',
  'under-review',
  'shortlisted',
  'accepted',
  'declined',
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUS_OPTIONS)[number];
