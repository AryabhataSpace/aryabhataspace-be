import { Injectable, NotFoundException } from '@nestjs/common';

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  engineeringBranch: string;
  institution: string;
  graduationYear: number;
  degreeLevel: 'Bachelor' | 'Master' | 'PhD' | 'Diploma';
  skills: string[];
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  location: string;
  profileCompletionPercentage: number;
  documents?: { id: string; name: string; type: string; uploadedAt: string }[];
  experience?: { role: string; organization: string; duration: string; description: string }[];
  education?: { degree: string; fieldOfStudy: string; institution: string; startYear: number; endYear: number }[];
  verified?: boolean;
}

export interface ProjectApplication {
  id: string;
  projectId: string;
  projectTitle: string;
  candidateId: string;
  candidateName?: string;
  candidateBranch?: string;
  status: 'submitted' | 'under-review' | 'shortlisted' | 'accepted' | 'declined';
  appliedAt: string;
  coverNote?: string;
  adminNotes?: string;
}

@Injectable()
export class CandidatesService {
  private candidates: Candidate[] = [
    {
      id: 'cand-101',
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@iitd.ac.in',
      phone: '+91 98765 43210',
      engineeringBranch: 'Mechanical Engineering',
      institution: 'IIT Delhi',
      graduationYear: 2026,
      degreeLevel: 'Bachelor',
      skills: ['SolidWorks', 'ANSYS', 'Thermal Analysis', 'CAD/CAM', 'C++'],
      bio: 'Enthusiastic mechanical engineering student interested in cryogenic rocket propulsion systems and additive manufacturing.',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      portfolioUrl: 'https://aaravsharma.dev',
      location: 'New Delhi, India',
      profileCompletionPercentage: 95,
      verified: true,
      documents: [
        { id: 'doc-1', name: 'Resume_Aarav_Sharma.pdf', type: 'Resume', uploadedAt: '2026-07-10T10:00:00Z' },
        { id: 'doc-2', name: 'Thermal_Analysis_Report.pdf', type: 'Project Report', uploadedAt: '2026-07-12T14:30:00Z' },
      ],
      experience: [
        { role: 'Research Intern', organization: 'Space Propulsion Lab', duration: '6 Months', description: 'Assisted in thermal modeling for nozzle cooling.' },
      ],
      education: [
        { degree: 'B.Tech', fieldOfStudy: 'Mechanical Engineering', institution: 'IIT Delhi', startYear: 2022, endYear: 2026 },
      ],
    },
    {
      id: 'cand-102',
      fullName: 'Priya Venkatesh',
      email: 'priya.v@rvce.edu.in',
      phone: '+91 98123 45678',
      engineeringBranch: 'Electronics & Communication',
      institution: 'RV College of Engineering, Bengaluru',
      graduationYear: 2025,
      degreeLevel: 'Bachelor',
      skills: ['Embedded C', 'C++', 'STM32', 'FreeRTOS', 'FPGA', 'Verilog'],
      bio: 'Avionics enthusiast specializing in embedded systems, RTOS kernel integration, and satellite telemetry protocols.',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      location: 'Bengaluru, India',
      profileCompletionPercentage: 90,
      verified: true,
      documents: [
        { id: 'doc-3', name: 'Priya_V_Avionics_CV.pdf', type: 'Resume', uploadedAt: '2026-07-15T09:15:00Z' },
      ],
      experience: [
        { role: 'Embedded Systems Lead', organization: 'Student Satellite Team', duration: '1 Year', description: 'Designed telemetry modem hardware board.' },
      ],
      education: [
        { degree: 'B.E.', fieldOfStudy: 'Electronics & Communication', institution: 'RV College of Engineering', startYear: 2021, endYear: 2025 },
      ],
    },
    {
      id: 'cand-103',
      fullName: 'Rohan Gupta',
      email: 'rohan.g@nitk.edu.in',
      phone: '+91 97788 99000',
      engineeringBranch: 'Computer Science & Engineering',
      institution: 'NIT Surathkal',
      graduationYear: 2026,
      degreeLevel: 'Bachelor',
      skills: ['Python', 'ROS2', 'OpenCV', 'PyTorch', 'C++', 'CUDA'],
      bio: 'AI & Robotics student focusing on autonomous path planning and 3D SLAM for surface exploration rovers.',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      location: 'Surathkal, Karnataka',
      profileCompletionPercentage: 85,
      verified: false,
      documents: [
        { id: 'doc-4', name: 'Rohan_Gupta_Resume.pdf', type: 'Resume', uploadedAt: '2026-07-18T11:20:00Z' },
      ],
      experience: [],
      education: [
        { degree: 'B.Tech', fieldOfStudy: 'Computer Science', institution: 'NIT Surathkal', startYear: 2022, endYear: 2026 },
      ],
    },
  ];

  private applications: ProjectApplication[] = [
    {
      id: 'app-501',
      projectId: 'proj-1',
      projectTitle: 'CubeSat Attitude Determination & Control System (ADCS)',
      candidateId: 'cand-102',
      candidateName: 'Priya Venkatesh',
      candidateBranch: 'Electronics & Communication',
      status: 'shortlisted',
      appliedAt: '2026-07-16T12:00:00Z',
      coverNote: 'I have hands-on experience programming STM32 microcontrollers and FreeRTOS for satellite telemetry payloads.',
      adminNotes: 'Strong embedded background. Excellent candidate for ADCS firmware task.',
    },
    {
      id: 'app-502',
      projectId: 'proj-2',
      projectTitle: 'Cryogenic Rocket Nozzle Thermal & Structural Analysis',
      candidateId: 'cand-101',
      candidateName: 'Aarav Sharma',
      candidateBranch: 'Mechanical Engineering',
      status: 'under-review',
      appliedAt: '2026-07-14T08:45:00Z',
      coverNote: 'My undergraduate thesis focuses on finite element thermal stress simulation for high-temperature superalloys.',
    },
    {
      id: 'app-503',
      projectId: 'proj-3',
      projectTitle: 'Lunar Surface Rover Vision & Autonomous Path Planning',
      candidateId: 'cand-103',
      candidateName: 'Rohan Gupta',
      candidateBranch: 'Computer Science & Engineering',
      status: 'submitted',
      appliedAt: '2026-07-19T16:10:00Z',
      coverNote: 'Built stereo vision depth mapping algorithms using ROS2 and PyTorch for multi-agent terrestrial robots.',
    },
  ];

  getCandidates(branch?: string, search?: string): Candidate[] {
    let list = [...this.candidates];
    if (branch) {
      list = list.filter((c) => c.engineeringBranch === branch);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.fullName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.institution.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q)),
      );
    }
    return list;
  }

  getCandidateById(id: string): Candidate {
    const candidate = this.candidates.find((c) => c.id === id);
    if (!candidate) throw new NotFoundException(`Candidate '${id}' not found`);
    return candidate;
  }

  getApplications(status?: string, projectId?: string): ProjectApplication[] {
    let list = [...this.applications];
    if (status) {
      list = list.filter((a) => a.status === status);
    }
    if (projectId) {
      list = list.filter((a) => a.projectId === projectId);
    }
    return list;
  }

  updateApplicationStatus(
    id: string,
    status: 'submitted' | 'under-review' | 'shortlisted' | 'accepted' | 'declined',
    adminNotes?: string,
  ): ProjectApplication {
    const app = this.applications.find((a) => a.id === id);
    if (!app) throw new NotFoundException(`Application '${id}' not found`);
    app.status = status;
    if (adminNotes !== undefined) {
      app.adminNotes = adminNotes;
    }
    return app;
  }

  verifyCandidate(id: string, verified: boolean): Candidate {
    const cand = this.candidates.find((c) => c.id === id);
    if (!cand) throw new NotFoundException(`Candidate '${id}' not found`);
    cand.verified = verified;
    return cand;
  }
}
