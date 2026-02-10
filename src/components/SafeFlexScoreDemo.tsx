import { SafeFlexScore } from "./SafeFlexScore";

export function SafeFlexScoreDemo() {
    const mockData = {
        overallScore: 78,
        companyName: "Acme Corp (Singapore HQ)",
        factors: {
            culture: {
                score: 65,
                status: "Caution" as const,
                details: [
                    { label: "Sentiment Analysis", value: "Mixed" },
                    { label: "Review Volume", value: "1,204" }
                ],
                redFlags: [
                    "\"Boys' Club\" language detected in 15% of reviews (e.g., \"golf-course decisions\")",
                    "Recurring mentions of \"after-hours drinking culture\"",
                    "Signals of \"maternity friction\" in exit interviews"
                ],
                greenFlags: [
                    "Strong mentorship program for junior female staff",
                    "High sentiment for \"school-run flexibility\""
                ],
            },
            shield: {
                score: 92,
                status: "Safe" as const,
                details: [
                    { label: "Active Reports (6mo)", value: "2" },
                    { label: "Resolution Rate", value: "100%" }
                ],
                greenFlags: [
                    "Zero \"Safety Warnings\" in last 6 months",
                    "Proactive engagement with Fairness Auditors",
                    "Clear anti-harassment enforcement verified"
                ],
            },
            economic: {
                score: 74,
                status: "Caution" as const,
                details: [
                    { label: "Pay Gap (vs Industry)", value: "-4.2%" },
                    { label: "Promotion Velocity", value: "14mo" }
                ],
                redFlags: [
                    "Slightly higher time-to-promotion for women vs men (14mo vs 11mo)",
                    "Entry-level offers 4% below market parity for female candidates"
                ],
                greenFlags: [
                    "Transparent salary bands published"
                ]
            },
            structural: {
                score: 85,
                status: "Safe" as const,
                details: [
                    { label: "Female Bridge Nodes", value: "High" },
                    { label: "Network Centrality", value: "Top 20%" }
                ],
                greenFlags: [
                    "Women occupy key \"Bridge Node\" positions connecting departments",
                    "High influence accessibility scores in Engineering and Sales"
                ],
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <SafeFlexScore {...mockData} />
        </div>
    );
}
