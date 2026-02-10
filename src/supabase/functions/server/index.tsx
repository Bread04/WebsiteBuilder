import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-00525c18/health", (c) => {
  return c.json({ status: "ok" });
});

// ===== JOB BOARD ENDPOINTS =====

// Get all jobs with Safe-Flex scores
app.get("/make-server-00525c18/jobs", async (c) => {
  try {
    const jobs = await kv.getByPrefix("job:");
    return c.json({ jobs: jobs || [] });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return c.json({ error: "Failed to fetch jobs", details: String(error) }, 500);
  }
});

// Get single job by ID
app.get("/make-server-00525c18/jobs/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const job = await kv.get(`job:${id}`);
    if (!job) {
      return c.json({ error: "Job not found" }, 404);
    }
    return c.json({ job });
  } catch (error) {
    console.error(`Error fetching job ${c.req.param("id")}:`, error);
    return c.json({ error: "Failed to fetch job", details: String(error) }, 500);
  }
});

// Initialize jobs with sample data
app.post("/make-server-00525c18/jobs/init", async (c) => {
  try {
    const sampleJobs = [
      {
        id: '1',
        title: 'Senior Product Manager',
        company: 'TechCorp Singapore',
        location: 'CBD, Singapore',
        type: 'Full-time',
        salary: 'S$8,000 - S$12,000',
        safetyScore: 92,
        flexibilityScore: 85,
        description: 'Lead product strategy for our flagship platform serving 1M+ users across Southeast Asia.',
        fairnessWarning: false,
        greenFlags: ['Mentorship for women', 'Flexible hours', 'Inclusive leadership'],
        redFlags: [],
      },
      {
        id: '2',
        title: 'Data Science Lead',
        company: 'FinTech Solutions',
        location: 'Raffles Place',
        type: 'Full-time',
        salary: 'S$6,500 - S$9,000',
        safetyScore: 78,
        flexibilityScore: 72,
        description: 'Drive ML initiatives and build predictive models for financial services.',
        fairnessWarning: true,
        greenFlags: ['Remote work options'],
        redFlags: ['Long hours culture', 'Maternity leave friction'],
      },
      {
        id: '3',
        title: 'UX Design Director',
        company: 'Creative Labs',
        location: 'Paya Lebar',
        type: 'Full-time',
        salary: 'S$9,500 - S$13,000',
        safetyScore: 95,
        flexibilityScore: 90,
        description: 'Shape the design vision for innovative digital products across multiple industries.',
        fairnessWarning: false,
        greenFlags: ['Strong female leadership', 'Micro-flexibility', 'Mentorship programs', 'Work-from-home'],
        redFlags: [],
      },
    ];

    for (const job of sampleJobs) {
      await kv.set(`job:${job.id}`, job);
    }

    return c.json({ message: "Jobs initialized successfully", count: sampleJobs.length });
  } catch (error) {
    console.error("Error initializing jobs:", error);
    return c.json({ error: "Failed to initialize jobs", details: String(error) }, 500);
  }
});

// ===== SHIELD PROTOCOL ENDPOINTS =====

// Submit incident report
app.post("/make-server-00525c18/shield/report", async (c) => {
  try {
    const body = await c.req.json();
    const { reportType, description, isAnonymous, company, department } = body;

    if (!reportType || !description) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const reportId = `report:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    const report = {
      id: reportId,
      reportType,
      description,
      isAnonymous,
      company,
      department,
      timestamp: new Date().toISOString(),
      status: "submitted",
    };

    await kv.set(reportId, report);

    // Check for collective action threshold (≥3 reports for same company/department)
    if (company && department) {
      const allReports = await kv.getByPrefix("report:");
      const relatedReports = allReports.filter((r: any) => 
        r.company === company && r.department === department
      );

      if (relatedReports.length >= 3) {
        // Trigger collective action
        const collectiveId = `collective:${company}:${department}:${Date.now()}`;
        await kv.set(collectiveId, {
          company,
          department,
          reportCount: relatedReports.length,
          triggeredAt: new Date().toISOString(),
        });
      }
    }

    return c.json({ 
      success: true, 
      message: "Report submitted successfully",
      reportId 
    });
  } catch (error) {
    console.error("Error submitting shield report:", error);
    return c.json({ error: "Failed to submit report", details: String(error) }, 500);
  }
});

// Get shield statistics
app.get("/make-server-00525c18/shield/stats", async (c) => {
  try {
    const reports = await kv.getByPrefix("report:");
    const collectiveActions = await kv.getByPrefix("collective:");

    const uniqueCompanies = new Set(reports.map((r: any) => r.company).filter(Boolean));

    return c.json({
      totalReports: reports.length,
      collectiveActions: collectiveActions.length,
      companiesFlagged: uniqueCompanies.size,
    });
  } catch (error) {
    console.error("Error fetching shield stats:", error);
    return c.json({ error: "Failed to fetch stats", details: String(error) }, 500);
  }
});

// ===== FLEX-MATCH ENDPOINTS =====

// Get job-share partners
app.get("/make-server-00525c18/flex-match/partners", async (c) => {
  try {
    const partners = await kv.getByPrefix("partner:");
    return c.json({ partners: partners || [] });
  } catch (error) {
    console.error("Error fetching partners:", error);
    return c.json({ error: "Failed to fetch partners", details: String(error) }, 500);
  }
});

// Initialize partners with sample data
app.post("/make-server-00525c18/flex-match/init", async (c) => {
  try {
    const samplePartners = [
      {
        id: '1',
        name: 'Sarah Chen',
        role: 'Product Manager',
        skills: ['Product Strategy', 'Stakeholder Management', 'Data Analysis', 'Agile'],
        availability: 'Mon-Wed (Morning)',
        matchScore: 95,
        experience: '8 years in tech',
        timezone: 'SGT',
      },
      {
        id: '2',
        name: 'Maya Patel',
        role: 'UX Designer',
        skills: ['User Research', 'Prototyping', 'Design Systems', 'Figma'],
        availability: 'Tue-Thu (Afternoon)',
        matchScore: 88,
        experience: '6 years in design',
        timezone: 'SGT',
      },
    ];

    for (const partner of samplePartners) {
      await kv.set(`partner:${partner.id}`, partner);
    }

    return c.json({ message: "Partners initialized successfully", count: samplePartners.length });
  } catch (error) {
    console.error("Error initializing partners:", error);
    return c.json({ error: "Failed to initialize partners", details: String(error) }, 500);
  }
});

// ===== AMPLIFY PORTFOLIO ENDPOINTS =====

// Get user experiences
app.get("/make-server-00525c18/amplify/experiences", async (c) => {
  try {
    const experiences = await kv.getByPrefix("experience:");
    return c.json({ experiences: experiences || [] });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return c.json({ error: "Failed to fetch experiences", details: String(error) }, 500);
  }
});

// Transform experience with AI
app.post("/make-server-00525c18/amplify/transform", async (c) => {
  try {
    const body = await c.req.json();
    const { original } = body;

    if (!original) {
      return c.json({ error: "Original experience text required" }, 400);
    }

    // Simple transformation logic (in production, this would use actual NLP/AI)
    const transformations: { [key: string]: { transformed: string; skills: string[] } } = {
      'household': {
        transformed: 'Complex Operations & Stakeholder Management: Coordinated multi-party schedules, optimized resource allocation, and managed competing priorities',
        skills: ['Operations Management', 'Resource Optimization', 'Stakeholder Coordination', 'Time Management'],
      },
      'fundraiser': {
        transformed: 'Event Strategy & Execution: Led end-to-end planning and execution of community engagement initiative',
        skills: ['Project Management', 'Community Engagement', 'Partnership Development', 'Budget Management'],
      },
      'healthcare': {
        transformed: 'Healthcare Navigation & Advocacy: Managed complex healthcare workflows and advocated for optimal patient outcomes',
        skills: ['Healthcare Systems', 'Advocacy', 'Communication', 'Decision-Making'],
      },
    };

    // Match keywords to find transformation
    let result = {
      transformed: 'Professional Experience: Successfully managed complex projects with multiple stakeholders and deliverables',
      skills: ['Project Management', 'Leadership', 'Communication', 'Problem Solving'],
    };

    for (const [keyword, transformation] of Object.entries(transformations)) {
      if (original.toLowerCase().includes(keyword)) {
        result = transformation;
        break;
      }
    }

    const experienceId = `experience:${Date.now()}`;
    const experience = {
      id: experienceId,
      original,
      transformed: result.transformed,
      skills: result.skills,
      createdAt: new Date().toISOString(),
    };

    await kv.set(experienceId, experience);

    return c.json({ experience });
  } catch (error) {
    console.error("Error transforming experience:", error);
    return c.json({ error: "Failed to transform experience", details: String(error) }, 500);
  }
});

// ===== USER PROFILE ENDPOINTS =====

// Get user profile
app.get("/make-server-00525c18/profile/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const profile = await kv.get(`profile:${userId}`);
    
    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }
    
    return c.json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return c.json({ error: "Failed to fetch profile", details: String(error) }, 500);
  }
});

// Update user profile
app.put("/make-server-00525c18/profile/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const body = await c.req.json();
    
    const profile = {
      userId,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(`profile:${userId}`, profile);
    
    return c.json({ profile, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return c.json({ error: "Failed to update profile", details: String(error) }, 500);
  }
});

// ===== NETWORK GRAPH ENDPOINTS =====

// Get network data
app.get("/make-server-00525c18/nexus/network", async (c) => {
  try {
    const network = await kv.get("network:default");
    
    if (!network) {
      // Return default network structure
      const defaultNetwork = {
        userNode: {
          id: 'user',
          name: 'You',
          role: 'Senior Analyst',
          influence: 42,
          isBridge: false,
          connections: 8,
        },
        nodes: [
          {
            id: '1',
            name: 'Lisa Tan',
            role: 'VP of Engineering',
            influence: 95,
            isBridge: true,
            connections: 24,
          },
          {
            id: '2',
            name: 'Michael Chen',
            role: 'Product Director',
            influence: 88,
            isBridge: true,
            connections: 19,
          },
        ],
      };
      
      return c.json({ network: defaultNetwork });
    }
    
    return c.json({ network });
  } catch (error) {
    console.error("Error fetching network:", error);
    return c.json({ error: "Failed to fetch network", details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);