import { Injectable, NotFoundException } from '@nestjs/common';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  status: 'open' | 'in-review' | 'active' | 'completed';
  requiredSkills: string[];
  eligibleBranches: string[];
  location: string;
  participationMode: 'remote' | 'hybrid' | 'on-site';
  duration: string;
  applicationDeadline: string;
  mentorName?: string;
  organisationName?: string;
  responsibilities?: string[];
  expectedOutcomes?: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    {
      id: 'proj-1',
      slug: 'cubesat-attitude-control',
      title: 'CubeSat Attitude Determination & Control System (ADCS)',
      category: 'Avionics & Flight Software',
      summary: 'Develop miniature reaction wheel algorithms and magnetorquer control code for 3U CubeSat orientation stability.',
      description: 'This project focuses on designing and testing high-precision attitude control algorithms for small satellite missions.',
      status: 'open',
      requiredSkills: ['C++', 'Embedded Systems', 'Control Theory', 'MATLAB/Simulink'],
      eligibleBranches: ['Electrical Engineering', 'Electronics & Communication', 'Computer Science', 'Robotics', 'Aerospace'],
      location: 'Hybrid (Bengaluru Tech Center)',
      participationMode: 'hybrid',
      duration: '6 Months',
      applicationDeadline: '2026-08-30',
      mentorName: 'Dr. V. Sundaram',
      organisationName: 'Space Embedded Lab',
      responsibilities: ['Implement attitude kinematics', 'Develop HIL simulation interfaces'],
      expectedOutcomes: ['Tested ADCS firmware module'],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'proj-2',
      slug: 'propulsion-nozzle-thermal-analysis',
      title: 'Cryogenic Rocket Nozzle Thermal & Structural Analysis',
      category: 'Propulsion & Materials',
      summary: 'Perform Finite Element Analysis (FEA) and Computational Fluid Dynamics (CFD) for advanced regenerative cooling rocket nozzles.',
      description: 'Engineers on this project will model thermal stress and coolant channel flow rate for rocket thrust chambers.',
      status: 'open',
      requiredSkills: ['ANSYS', 'CFD', 'Thermal Engineering', 'SolidWorks / CAD'],
      eligibleBranches: ['Mechanical Engineering', 'Chemical Engineering', 'Aerospace Engineering', 'Materials Science'],
      location: 'On-site Residency (Sriharikota / Chennai)',
      participationMode: 'on-site',
      duration: '4 Months',
      applicationDeadline: '2026-09-15',
      mentorName: 'Prof. R. Deshmukh',
      organisationName: 'Thermal Mechanics Group',
      responsibilities: ['Model 3D fluid-structure interaction', 'Analyze thermal strain'],
      expectedOutcomes: ['Thermal analysis report'],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'proj-3',
      slug: 'autonomous-rover-path-planning',
      title: 'Lunar Surface Rover Vision & Autonomous Path Planning',
      category: 'Robotics & Artificial Intelligence',
      summary: 'Build ROS2 navigation packages and stereo-vision depth mapping for terrain hazard avoidance on planetary rovers.',
      description: 'Develop computer vision pipelines and path planning (A*, RRT*, SLAM) for planetary rovers.',
      status: 'open',
      requiredSkills: ['Python', 'ROS2', 'OpenCV', 'PyTorch'],
      eligibleBranches: ['Computer Science', 'Artificial Intelligence', 'Data Science', 'Robotics', 'Mechatronics'],
      location: 'Remote',
      participationMode: 'remote',
      duration: '5 Months',
      applicationDeadline: '2026-08-25',
      mentorName: 'Siddharth Nair',
      organisationName: 'Autonomous Planetary Robotics Lab',
      responsibilities: ['Train neural depth estimation', 'Integrate ROS2 Nav2'],
      expectedOutcomes: ['ROS2 hazard avoidance package'],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  findAll(category?: string, branch?: string, search?: string): Project[] {
    let result = [...this.projects];
    if (category) {
      result = result.filter((p) => p.category === category);
    }
    if (branch) {
      result = result.filter((p) => p.eligibleBranches.includes(branch));
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q),
      );
    }
    return result;
  }

  findBySlug(slug: string): Project {
    const project = this.projects.find((p) => p.slug === slug);
    if (!project) throw new NotFoundException(`Project with slug '${slug}' not found`);
    return project;
  }

  findById(id: string): Project {
    const project = this.projects.find((p) => p.id === id);
    if (!project) throw new NotFoundException(`Project with id '${id}' not found`);
    return project;
  }

  create(dto: Partial<Project>): Project {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      slug: dto.slug || dto.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `proj-${Date.now()}`,
      title: dto.title || 'Untitled Project',
      category: dto.category || 'General Space Systems',
      summary: dto.summary || '',
      description: dto.description || '',
      status: dto.status || 'open',
      requiredSkills: dto.requiredSkills || [],
      eligibleBranches: dto.eligibleBranches || ['All Engineering Disciplines'],
      location: dto.location || 'Remote',
      participationMode: dto.participationMode || 'remote',
      duration: dto.duration || '3 Months',
      applicationDeadline: dto.applicationDeadline || '2026-12-31',
      mentorName: dto.mentorName || 'Aryabhata Space Mentor',
      organisationName: dto.organisationName || 'Aryabhata Space',
      responsibilities: dto.responsibilities || [],
      expectedOutcomes: dto.expectedOutcomes || [],
      featured: dto.featured ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.projects.unshift(newProject);
    return newProject;
  }

  update(id: string, dto: Partial<Project>): Project {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Project with id '${id}' not found`);
    this.projects[index] = {
      ...this.projects[index],
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    return this.projects[index];
  }

  remove(id: string): { success: boolean } {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Project with id '${id}' not found`);
    this.projects.splice(index, 1);
    return { success: true };
  }
}
