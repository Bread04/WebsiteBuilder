import { SafeFlexScoreProps } from "../components/SafeFlexScore";

export function generateSafeFlexScoreData(job: any): SafeFlexScoreProps["factors"] {
    // Deterministic generation based on job ID or name to keep it consistent but varied
    const seed = job.title.length + job.company.length;

    return {
        culture: {
            score: Math.min(100, Math.max(40, job.safetyScore - 10 + (seed % 20))),
            status: job.safetyScore > 80 ? "Safe" : "Caution",
            details: [
                { label: "Sentiment", value: job.safetyScore > 80 ? "Positive" : "Mixed" },
                { label: "Reviews", value: (seed * 12).toString() }
            ],
            redFlags: job.redFlags,
            greenFlags: job.greenFlags
        },
        shield: {
            score: Math.min(100, Math.max(40, job.safetyScore + 5 - (seed % 10))),
            status: "Safe",
            details: [
                { label: "Reports", value: "0" },
                { label: "Resolved", value: "100%" }
            ],
            greenFlags: ["Clear anti-harassment policy"]
        },
        economic: {
            score: Math.min(100, Math.max(40, job.safetyScore - 5 + (seed % 15))),
            status: job.fairnessWarning ? "Risk" : "Safe",
            details: [
                { label: "Pay Gap", value: job.fairnessWarning ? "-15%" : "-2%" },
                { label: "Promotion", value: "12mo" }
            ],
            redFlags: job.fairnessWarning ? ["Significant pay gap detected"] : []
        },
        structural: {
            score: Math.min(100, Math.max(40, job.flexibilityScore)),
            status: "Safe",
            details: [
                { label: "Network", value: "Strong" },
                { label: "Influence", value: "High" }
            ],
            greenFlags: ["Female leadership present"]
        }
    };
}

export function generateFlexibilityBreakdown(job: any): SafeFlexScoreProps["factors"] {
    const seed = job.title.length + job.company.length;
    const baseScore = job.flexibilityScore;

    // SG Context Multiplier Logic
    // Hub-and-Spoke bonus for specific locations
    const sgLocations = ["Tampines", "Jurong", "Woodlands", "Punggol", "Remote"];
    const isHubSpoke = sgLocations.some(loc => job.location.includes(loc));
    const sgBonus = isHubSpoke ? 10 : 0;

    return {
        culture: { // Repurposed for "Micro-Flexibility" (35%)
            score: Math.min(100, Math.max(40, baseScore + (seed % 10))),
            status: baseScore > 75 ? "Safe" : "Caution",
            details: [
                { label: "Core Hours", value: baseScore > 80 ? "Fluid" : "10am-4pm" },
                { label: "Ad-hoc", value: "Approved" }
            ],
            greenFlags: ["No-questions-asked emergency leave", "School-run friendly windows"],
            redFlags: baseScore < 70 ? ["Fixed 9-6 desk policy detected", "Requires 24hr notice for time off"] : []
        },
        shield: { // Repurposed for "Output-Based Evaluation" (30%)
            score: Math.min(100, Math.max(40, baseScore - 5 + (seed % 15))),
            status: "Safe",
            details: [
                { label: "Async Maturity", value: "High" },
                { label: "Presenteeism", value: "Low" }
            ],
            greenFlags: ["Promotion-on-Leave track record"],
            redFlags: baseScore < 75 ? ["'First-in, Last-out' culture reviews", "High volume of 7pm+ meetings"] : []
        },
        economic: { // Repurposed for "Job-Sharing Maturity" (20%)
            score: Math.min(100, Math.max(30, baseScore - 15 + (seed % 20))),
            status: baseScore > 70 ? "Safe" : "Risk",
            details: [
                { label: "Fractional", value: "Available" },
                { label: "Returnship", value: "Supported" }
            ],
            greenFlags: ["Gig-to-Career bridge program"],
            redFlags: baseScore < 65 ? ["No formal job-sharing policy", "Full-time availability mandatory"] : []
        },
        structural: { // Repurposed for "Supportive Benefits" (15%)
            score: Math.min(100, Math.max(50, baseScore + 5 + sgBonus)),
            status: "Safe",
            details: [
                { label: "Leave Ping", value: "Blocked" },
                { label: "Care Subsidy", value: "Yes" }
            ],
            greenFlags: isHubSpoke
                ? ["SG Context: Hub-and-Spoke Bonus (+10%)", "Back-up childcare"]
                : ["Back-up childcare"],
            redFlags: baseScore < 80 ? ["Occasional leave interruptions reported"] : []
        }
    };
}
