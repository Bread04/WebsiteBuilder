import {
    Shield,
    Briefcase,
    Network,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Info,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import React, { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FactorData {
    score: number;
    status: "Safe" | "Caution" | "Risk";
    details: {
        label: string;
        value: string | number;
        trend?: "up" | "down" | "neutral";
    }[];
    redFlags?: string[];
    greenFlags?: string[];
}

export interface SafeFlexScoreProps {
    overallScore: number;
    companyName: string;
    factors: {
        culture: FactorData;
        shield: FactorData;
        economic: FactorData;
        structural: FactorData;
    };
    variant?: 'safeflex' | 'flexibility';
}

export function SafeFlexScore({
    overallScore,
    companyName,
    factors,
    variant = 'safeflex'
}: SafeFlexScoreProps) {
    const isFlexibilityMode = variant === 'flexibility';
    // ... rest of component
    const [expandedFactors, setExpandedFactors] = useState<Set<string>>(
        new Set(["culture", "shield", "economic", "structural"])
    );

    const toggleFactor = (factor: string) => {
        const newExpanded = new Set(expandedFactors);
        if (newExpanded.has(factor)) {
            newExpanded.delete(factor);
        } else {
            newExpanded.add(factor);
        }
        setExpandedFactors(newExpanded);
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const getBgScoreColor = (score: number) => {
        if (score >= 80) return "bg-green-100";
        if (score >= 60) return "bg-yellow-100";
        return "bg-red-100";
    };


    const renderFactorCard = (
        key: string,
        title: string,
        icon: React.ElementType,
        data: FactorData
    ) => {
        const isExpanded = expandedFactors.has(key);
        const Icon = icon;

        return (
            <div
                className={cn(
                    "bg-white rounded-xl border transition-all duration-300 overflow-hidden",
                    isExpanded ? "ring-2 ring-purple-500 shadow-lg" : "hover:shadow-md border-gray-200"
                )}
            >
                <div
                    className="p-6 cursor-pointer flex items-center justify-between"
                    onClick={() => toggleFactor(key)}
                >
                    <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-lg", getBgScoreColor(data.score))}>
                            <Icon className={cn("w-6 h-6", getScoreColor(data.score))} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
                            <div className="flex items-center gap-2 text-sm">
                                <span className={cn("font-bold", getScoreColor(data.score))}>
                                    {data.score}/100
                                </span>
                                <span className="text-gray-500">• {data.status}</span>
                            </div>
                        </div>
                    </div>
                    {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                </div>

                {isExpanded && (
                    <div className="px-6 pb-6 bg-gray-50/50 pt-2 space-y-4">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            {data.details.map((detail, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{detail.label}</p>
                                    <p className="font-semibold text-gray-900">{detail.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Red Flags */}
                        {data.redFlags && data.redFlags.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-red-700">
                                    <AlertTriangle className="w-4 h-4" />
                                    Risk Indicators
                                </h4>
                                <ul className="space-y-1">
                                    {data.redFlags.map((flag, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                            <span className="text-red-400 mt-1">•</span>
                                            {flag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Green Flags */}
                        {data.greenFlags && data.greenFlags.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-green-700">
                                    <CheckCircle className="w-4 h-4" />
                                    Safety Boosts
                                </h4>
                                <ul className="space-y-1">
                                    {data.greenFlags.map((flag, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                            <span className="text-green-400 mt-1">•</span>
                                            {flag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
                            <Shield className="w-4 h-4 text-purple-300" />
                            <span>Verified by Beyond Binary NLP Engine</span>
                        </div>
                        <h1 className="text-3xl font-bold">{companyName}</h1>
                        <p className="text-purple-200 max-w-md">
                            Safe-Flex Score based on proprietary analysis of cultural sentiment,
                            incident reports, economic data, and network structure.
                        </p>
                    </div>

                    <div className="relative flex items-center justify-center">
                        {/* Circular Score Indicator */}
                        <div className="w-32 h-32 rounded-full border-8 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md">
                            <div className="text-center">
                                <div className="text-4xl font-bold">{overallScore}</div>
                                <div className="text-xs text-purple-200 uppercase tracking-widest">Score</div>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 px-3 py-1 bg-green-500 rounded-full text-xs font-bold shadow-lg">
                            Safe Choice
                        </div>
                    </div>
                </div>
            </div>

            {/* Factors Grid */}
            <div className="grid grid-cols-1 gap-4">
                {renderFactorCard(
                    "culture",
                    isFlexibilityMode ? "Micro-Flexibility (Hours)" : "Gendered Cultural Sentiment",
                    Briefcase,
                    factors.culture
                )}
                {renderFactorCard(
                    "shield",
                    isFlexibilityMode ? "Output-Based Evaluation" : "Shield Protocol Density",
                    Shield,
                    factors.shield
                )}
                {renderFactorCard(
                    "economic",
                    isFlexibilityMode ? "Job-Sharing Maturity" : "Economic Safety & Mobility",
                    TrendingUp,
                    factors.economic
                )}
                {renderFactorCard(
                    "structural",
                    isFlexibilityMode ? "Supportive Benefits" : "Structural Safety (Network)",
                    Network,
                    factors.structural
                )}
            </div>
        </div>
    );
}
