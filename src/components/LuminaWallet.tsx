import { useState } from 'react';
import { DollarSign, Clock, Shield, TrendingUp, Info, Calculator, Scale, Heart, Zap } from 'lucide-react';

export function LuminaWallet() {
    const [income, setIncome] = useState(65000);
    const [flexibility, setFlexibility] = useState(40); // 40% recovered time

    // Constants
    const WORKING_MOTHER_SUBSIDY = 7200; // Mock annual value
    const GPMB_CAP = 3250; // Mock value
    const UNPAID_LABOR_VALUE_PER_MONTH = 1200;
    const MARKET_MALE_RATE = 71000;

    // Derived Calculations
    const recoveredTimeValue = (flexibility / 100) * (UNPAID_LABOR_VALUE_PER_MONTH * 12);
    const totalProfessionalWorth = income + WORKING_MOTHER_SUBSIDY + GPMB_CAP + recoveredTimeValue;
    const roiPercentage = ((totalProfessionalWorth - income) / income) * 100;

    const parityPercentage = Math.round((income / MARKET_MALE_RATE) * 100);

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-12 font-sans text-gray-900">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-purple-100">
                            <DollarSign className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Beyond Binary Benefits Wallet
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Visualize your Total Professional Worth & Economic Leverage
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Total Worth Valuation</p>
                        <p className="text-4xl font-mono font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ${totalProfessionalWorth.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main Column: Calculators */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Yearly Welfare ROI Calculator */}
                        <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all cursor-default">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                            <Calculator className="w-5 h-5 text-purple-600" />
                                            Annual Professional Worth
                                        </h2>
                                        <p className="text-gray-500 text-sm mt-1 max-w-md">
                                            Your true market value, combining fractional income with specific Singaporean subsidies.
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-block px-3 py-1 bg-green-100/50 text-green-700 rounded-full text-sm font-bold border border-green-200">
                                            ↑ {roiPercentage.toFixed(0)}% ROI
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Base Income</p>
                                        <p className="text-2xl font-bold text-gray-900">${income.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-pink-50/50 p-6 rounded-2xl border border-pink-100">
                                        <p className="text-pink-600/70 text-xs uppercase tracking-wider mb-2">WMS Subsidy</p>
                                        <p className="text-2xl font-bold text-pink-700">+${WORKING_MOTHER_SUBSIDY.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
                                        <p className="text-purple-600/70 text-xs uppercase tracking-wider mb-2">GPMB Benefit</p>
                                        <p className="text-2xl font-bold text-purple-700">+${GPMB_CAP.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Time Recovery Simulator */}
                        <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-purple-600" />
                                        Time Recovery Simulator
                                    </h2>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Assign economic value to your "Unpaid Labor Capacity".
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase">Welfare Multiplier</p>
                                    <p className="text-2xl font-bold text-purple-600">1.{Math.floor(flexibility / 10)}x</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex justify-between text-sm mb-4">
                                    <span className="text-gray-500">Work Capacity: {100 - flexibility}%</span>
                                    <span className="text-purple-600 font-medium">Recovered Time: {flexibility}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="80"
                                    value={flexibility}
                                    onChange={(e) => setFlexibility(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase">Time for Care</p>
                                        <p className="text-xl font-bold text-gray-900">{flexibility}% Gain</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase">Unpaid Labor Val.</p>
                                        <p className="text-xl font-bold text-green-600">+${Math.round(recoveredTimeValue / 12).toLocaleString()}/mo</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leave & Wellness */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Leave & Wellness Card */}
                            <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Leave & Wellness</h3>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Female Lifecycle Support</p>
                                    </div>
                                    <div className="p-2 bg-pink-50 rounded-lg">
                                        <Heart className="w-5 h-5 text-pink-500" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                                        <span className="text-gray-700 font-medium">Maternity Benefit</span>
                                        <span className="text-gray-900 font-bold">12/16 weeks</span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                                        <span className="text-gray-700 font-medium">Childcare Leave</span>
                                        <span className="text-gray-900 font-bold">6/6 days</span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                                        <span className="text-gray-700 font-medium">Health Screening</span>
                                        <span className="text-green-600 font-bold">Claimable</span>
                                    </div>
                                </div>
                            </div>

                            {/* Subsidies & Grants Card */}
                            <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Subsidies & Grants</h3>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Active SG Entitlements</p>
                                    </div>
                                    <div className="p-2 bg-yellow-50 rounded-lg">
                                        <Zap className="w-5 h-5 text-yellow-600" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                        <p className="text-green-700 text-xs font-bold uppercase mb-1">Working Mother's Subsidy</p>
                                        <p className="text-3xl font-bold text-gray-900">$600/mo</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-gray-500 text-xs font-bold uppercase mb-1">Govt-Paid Maternity Benefit</p>
                                        <p className="text-xl font-bold text-gray-900">Active Coverage</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar: Advocacy & Parity */}
                    <div className="space-y-6">

                        {/* Pay Parity Scale */}
                        <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                                <Scale className="w-5 h-5 text-gray-400" />
                                Pay Parity Meter
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Your Rate</span>
                                    <span className="text-gray-900 font-mono font-medium">${income.toLocaleString()}</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden relative">
                                    <div
                                        className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
                                        style={{ width: `${parityPercentage}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Market Male Rate</span>
                                    <span className="text-gray-400 font-mono">${MARKET_MALE_RATE.toLocaleString()}</span>
                                </div>

                                <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-100 text-center">
                                    <p className="text-purple-700 font-bold text-2xl">{parityPercentage}%</p>
                                    <p className="text-purple-600/70 text-xs uppercase tracking-wide">Parity Score</p>
                                </div>
                            </div>
                        </div>

                        {/* Rights Advocate Sidebar */}
                        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 border border-pink-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                                <Shield className="w-5 h-5 text-pink-600" />
                                Rights Advocate
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Based on TAFEP Gender-Fair Guidelines & Singapore Employment Act.
                            </p>

                            <div className="space-y-3">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100 flex items-start gap-3">
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <Info className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">Family Status Privacy</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            You are legally protected from revealing marital status in SG interviews.
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100 flex items-start gap-3">
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <TrendingUp className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">FWA Compliance</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Your partner's firm has a 88% Flexible Work Arrangement (FWA) score.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 bg-white text-gray-900 rounded-xl font-bold shadow-sm border border-gray-200 hover:shadow-md transition-all flex items-center justify-center gap-2 group">
                                <Scale className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                                Negotiate Male Parity
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
