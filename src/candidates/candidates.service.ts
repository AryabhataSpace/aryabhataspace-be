import { Injectable, NotFoundException, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CandidateEntity } from './entities/candidate.entity';
import { ProjectApplicationEntity } from './entities/project-application.entity';
import { Candidate } from './models/candidate.model';
import { ProjectApplication } from './models/project-application.model';
import { RegisterCandidateDto } from '../auth/dto/register.dto';
import { ApplicationStatus } from './utils/candidate.types';

@Injectable()
export class CandidatesService implements OnModuleInit {
  private readonly logger = new Logger(CandidatesService.name);

  private readonly seedCandidates: Candidate[] = [
    new Candidate({
      id: 'cand-101',
      firstName: 'Aarav',
      lastName: 'Sharma',
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@iitd.ac.in',
      pincode: '110016',
      phone: '+91 98765 43210',
      engineeringGraduationCourse: 'Mechanical Engineering',
      engineeringBranch: 'Mechanical Engineering',
      courseStatus: '4th Year',
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
      role: 'candidate',
      status: 'active',
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
    }),
    new Candidate({
      id: 'cand-102',
      firstName: 'Priya',
      lastName: 'Venkatesh',
      fullName: 'Priya Venkatesh',
      email: 'priya.v@rvce.edu.in',
      pincode: '560059',
      phone: '+91 98123 45678',
      engineeringGraduationCourse: 'Electronics & Communication',
      engineeringBranch: 'Electronics & Communication',
      courseStatus: 'Graduated',
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
      role: 'candidate',
      status: 'active',
      documents: [
        { id: 'doc-3', name: 'Priya_V_Avionics_CV.pdf', type: 'Resume', uploadedAt: '2026-07-15T09:15:00Z' },
      ],
      experience: [
        { role: 'Embedded Systems Lead', organization: 'Student Satellite Team', duration: '1 Year', description: 'Designed telemetry modem hardware board.' },
      ],
      education: [
        { degree: 'B.E.', fieldOfStudy: 'Electronics & Communication', institution: 'RV College of Engineering', startYear: 2021, endYear: 2025 },
      ],
    }),
    new Candidate({
      id: 'cand-103',
      firstName: 'Rohan',
      lastName: 'Gupta',
      fullName: 'Rohan Gupta',
      email: 'rohan.g@nitk.edu.in',
      pincode: '575025',
      phone: '+91 97788 99000',
      engineeringGraduationCourse: 'Computer Science & Engineering',
      engineeringBranch: 'Computer Science & Engineering',
      courseStatus: '3rd Year',
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
      role: 'candidate',
      status: 'active',
      documents: [
        { id: 'doc-4', name: 'Rohan_Gupta_Resume.pdf', type: 'Resume', uploadedAt: '2026-07-18T11:20:00Z' },
      ],
      experience: [],
      education: [
        { degree: 'B.Tech', fieldOfStudy: 'Computer Science', institution: 'NIT Surathkal', startYear: 2022, endYear: 2026 },
      ],
    }),
  ];

  private readonly seedApplications: ProjectApplication[] = [
    new ProjectApplication({
      id: 'app-501',
      projectId: 'proj-1',
      projectTitle: 'CubeSat Attitude Determination & Control System (ADCS)',
      candidateId: 'cand-102',
      candidateName: 'Priya Venkatesh',
      candidateBranch: 'Electronics & Communication',
      status: 'shortlisted',
      appliedAt: new Date('2026-07-20T10:00:00Z'),
      coverNote: 'I have hands-on experience programming STM32 microcontrollers and FreeRTOS for satellite telemetry payloads.',
      adminNotes: 'Strong embedded background. Excellent candidate for ADCS firmware task.',
    }),
    new ProjectApplication({
      id: 'app-502',
      projectId: 'proj-2',
      projectTitle: 'Cryogenic Rocket Nozzle Thermal & Structural Analysis',
      candidateId: 'cand-101',
      candidateName: 'Aarav Sharma',
      candidateBranch: 'Mechanical Engineering',
      status: 'under-review',
      appliedAt: new Date('2026-07-22T14:00:00Z'),
      coverNote: 'My undergraduate thesis focuses on finite element thermal stress simulation for high-temperature superalloys.',
    }),
    new ProjectApplication({
      id: 'app-503',
      projectId: 'proj-3',
      projectTitle: 'Lunar Surface Rover Vision & Autonomous Path Planning',
      candidateId: 'cand-103',
      candidateName: 'Rohan Gupta',
      candidateBranch: 'Computer Science & Engineering',
      status: 'submitted',
      appliedAt: new Date('2026-07-25T09:30:00Z'),
      coverNote: 'Built stereo vision depth mapping algorithms using ROS2 and PyTorch for multi-agent terrestrial robots.',
    }),
  ];

  constructor(
    @InjectRepository(CandidateEntity)
    private readonly candidateRepo: Repository<CandidateEntity>,
    @InjectRepository(ProjectApplicationEntity)
    private readonly appRepo: Repository<ProjectApplicationEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      const count = await this.candidateRepo.count();
      if (count === 0) {
        this.logger.log('Seeding initial candidates into PostgreSQL database...');
        for (const c of this.seedCandidates) {
          const entity = CandidateEntity.fromModel(c);
          await this.candidateRepo.save(entity);
        }
      }

      const appCount = await this.appRepo.count();
      if (appCount === 0) {
        this.logger.log('Seeding initial project applications into PostgreSQL database...');
        for (const a of this.seedApplications) {
          const entity = ProjectApplicationEntity.fromModel(a);
          await this.appRepo.save(entity);
        }
      }
      this.logger.log('Candidate repository initialized.');
    } catch (err: any) {
      this.logger.warn(`Could not initialize database seed directly on init: ${err.message}`);
    }
  }

  async registerCandidate(dto: RegisterCandidateDto): Promise<Candidate> {
    const candidateModel = Candidate.createFromRegistration(dto, '');
    const candidateEntity = CandidateEntity.fromModel(candidateModel);
    try {
      const saved = await this.candidateRepo.save(candidateEntity);
      return Candidate.fromEntity(saved);
    } catch (err: any) {
      this.logger.error(`Error saving candidate to database: ${err.message}`);
      return candidateModel;
    }
  }

  async getCandidates(branch?: string, search?: string): Promise<Candidate[]> {
    try {
      const entities = await this.candidateRepo.find({
        order: { createdAt: 'DESC' },
      });

      let list = entities.map((e) => Candidate.fromEntity(e));

      if (branch) {
        list = list.filter((c) => c.engineeringBranch === branch || c.engineeringGraduationCourse === branch);
      }
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(
          (c) =>
            c.fullName.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            (c.pincode && c.pincode.includes(q)) ||
            (c.institution && c.institution.toLowerCase().includes(q)) ||
            (c.courseStatus && c.courseStatus.toLowerCase().includes(q)) ||
            (c.skills && c.skills.some((s) => s.toLowerCase().includes(q))),
        );
      }
      return list;
    } catch (err: any) {
      this.logger.warn(`Database query failed, returning fallback seed data: ${err.message}`);
      return this.seedCandidates;
    }
  }

  async getCandidateById(id: string): Promise<Candidate> {
    try {
      const candidate = await this.candidateRepo.findOne({ where: { id } });
      if (!candidate) throw new NotFoundException(`Candidate '${id}' not found`);
      return Candidate.fromEntity(candidate);
    } catch (err: any) {
      if (err instanceof NotFoundException) throw err;
      const found = this.seedCandidates.find((c) => c.id === id);
      if (!found) throw new NotFoundException(`Candidate '${id}' not found`);
      return found;
    }
  }

  async getApplications(status?: string, projectId?: string): Promise<ProjectApplication[]> {
    try {
      const where: any = {};
      if (status) where.status = status;
      if (projectId) where.projectId = projectId;
      const entities = await this.appRepo.find({
        where,
        order: { appliedAt: 'DESC' },
      });
      return entities.map((e) => ProjectApplication.fromEntity(e));
    } catch (err: any) {
      this.logger.warn(`Database query failed for applications: ${err.message}`);
      return this.seedApplications;
    }
  }

  async updateApplicationStatus(
    id: string,
    status: ApplicationStatus,
    adminNotes?: string,
  ): Promise<ProjectApplication> {
    const app = await this.appRepo.findOne({ where: { id } });
    if (!app) throw new NotFoundException(`Application '${id}' not found`);
    app.status = status;
    if (adminNotes !== undefined) {
      app.adminNotes = adminNotes;
    }
    const saved = await this.appRepo.save(app);
    return ProjectApplication.fromEntity(saved);
  }

  async verifyCandidate(id: string, verified: boolean): Promise<Candidate> {
    const cand = await this.candidateRepo.findOne({ where: { id } });
    if (!cand) throw new NotFoundException(`Candidate '${id}' not found`);
    cand.verified = verified;
    const saved = await this.candidateRepo.save(cand);
    return Candidate.fromEntity(saved);
  }
}
