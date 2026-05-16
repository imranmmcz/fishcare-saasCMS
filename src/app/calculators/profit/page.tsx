'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Calculator, Info, Copy, Check, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

// Default profit calculation parameters
const defaultParams = {
  fishMortalityRate: 5, // 5% typical mortality
  harvestSize: 500, // grams average market size
  marketPrices: {
    carp: { min: 180, max: 250, unit: 'কেজি' },
    tilapia: { min: 120, max: 160, unit: 'কেজি' },
    catfish: { min: 150, max: 200, unit: 'কেজি' },
    pangasius: { min: 80, max: 120, unit: 'কেজি' },
    koi: { min: 200, max: 300, unit: 'কেজি' },
  },
  feedCostPerKg: 45, // BDT
  fingerlingCost: {
    carp: 8,    // per piece
    tilapia: 5,
    catfish: 10,
    pangasius: 3,
    koi: 12,
  },
  additionalCosts: {
    labor: 5000, // per month
    electricity: 2000, // per month
    medicine: 3000, // per cycle
    rent: 10000, // per month (if applicable)
  },
};

export default function ProfitCalculator() {
  const [fishCount, setFishCount] = useState('');
  const [fishType, setFishType] = useState('carp');
  const [fingerlingCost, setFingerlingCost] = useState('');
  const [feedCost, setFeedCost] = useState('');
  const [growthMonths, setGrowthMonths] = useState('6');
  const [sellingPrice, setSellingPrice] = useState('');
  const [avgWeight, setAvgWeight] = useState('500');
  const [expandedSection, setExpandedSection] = useState<string | null>('costs');
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Calculate profit/loss
  const calculateProfit = () => {
    const count = parseInt(fishCount) || 0;
    const months = parseInt(growthMonths) || 1;
    const weight = parseFloat(avgWeight) || 500;
    const fingerling = parseFloat(fingerlingCost) || defaultParams.fingerlingCost[fishType as keyof typeof defaultParams.fingerlingCost] * count;
    const feed = parseFloat(feedCost) || 0;
    const price = parseFloat(sellingPrice) || defaultParams.marketPrices[fishType as keyof typeof defaultParams.marketPrices].max;

    if (count === 0) {
      setResult(null);
      return;
    }

    // Mortality adjustment
    const survivalCount = Math.floor(count * (1 - defaultParams.fishMortalityRate / 100));
    const mortalityLoss = count - survivalCount;

    // Calculate biomass
    const totalBiomass = (survivalCount * weight) / 1000; // in kg

    // Revenue
    const revenue = totalBiomass * price;

    // Costs breakdown
    const fingerlingCostTotal = fingerling;
    const feedCostTotal = feed;
    const laborCost = defaultParams.additionalCosts.labor * months;
    const electricityCost = defaultParams.additionalCosts.electricity * months;
    const medicineCost = defaultParams.additionalCosts.medicine;
    const otherCosts = (defaultParams.additionalCosts.labor * 0.1 + defaultParams.additionalCosts.electricity * 0.2) * months;

    const totalCost = fingerlingCostTotal + feedCostTotal + laborCost + electricityCost + medicineCost + otherCosts;
    const profit = revenue - totalCost;
    const profitMargin = (profit / revenue) * 100;
    const roi = (profit / totalCost) * 100;

    // Per fish analysis
    const avgCostPerFish = totalCost / survivalCount;
    const avgRevenuePerFish = revenue / survivalCount;
    const netProfitPerFish = profit / survivalCount;

    // Break-even analysis
    const breakEvenPrice = totalCost / totalBiomass;
    const breakEvenCount = Math.ceil(totalCost / (weight * price / 1000));

    setResult({
      survivalCount,
      mortalityLoss,
      mortalityRate: defaultParams.fishMortalityRate,
      totalBiomass: Math.round(totalBiomass * 10) / 10,
      revenue: Math.round(revenue),
      costs: {
        fingerling: Math.round(fingerlingCostTotal),
        feed: Math.round(feedCostTotal),
        labor: Math.round(laborCost),
        electricity: Math.round(electricityCost),
        medicine: Math.round(medicineCost),
        other: Math.round(otherCosts),
        total: Math.round(totalCost),
      },
      profit: Math.round(profit),
      profitMargin: Math.round(profitMargin * 10) / 10,
      roi: Math.round(roi * 10) / 10,
      avgCostPerFish: Math.round(avgCostPerFish * 10) / 10,
      avgRevenuePerFish: Math.round(avgRevenuePerFish * 10) / 10,
      netProfitPerFish: Math.round(netProfitPerFish * 10) / 10,
      breakEvenPrice: Math.round(breakEvenPrice),
      breakEvenCount,
      sellingPrice: price,
      growthMonths: months,
    });
  };

  useEffect(() => {
    calculateProfit();
  }, [fishCount, fishType, fingerlingCost, feedCost, growthMonths, sellingPrice, avgWeight]);

  const copyResult = () => {
    if (result) {
      const text = `
লাভ-ক্ষতি হিসাব:
বিক্রয় মূল্য: ৳${result.revenue}
মোট খরচ: ৳${result.costs.total}
বিশুদ্ধ লাভ: ৳${result.profit}
লাভের হার: ${result.profitMargin}%
ROI: ${result.roi}%
      `.trim();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">লাভ-ক্ষতি ক্যালকুলেটর</h1>
              <p className="text-sm text-gray-500">আয়-ব্যয় হিসাব ও বিনিয়োগ বিশ্লেষণ</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-500" />
              আপনার খামারের তথ্য দিন
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পোনা সংখ্যা</label>
                <input
                  type="number"
                  value={fishCount}
                  onChange={(e) => setFishCount(e.target.value)}
                  placeholder="যেমন: 1000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মাছের প্রজাতি</label>
                <select
                  value={fishType}
                  onChange={(e) => setFishType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="carp">কার্প মাছ (রুই, কাতলা, মৃগেল)</option>
                  <option value="tilapia">তেলাপিয়া</option>
                  <option value="catfish">বেলে মাছ (শোল, মাগুর)</option>
                  <option value="pangasius">পাঙাশ</option>
                  <option value="koi">কই মাছ</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">পোনার দাম (৳)</label>
                  <input
                    type="number"
                    value={fingerlingCost}
                    onChange={(e) => setFingerlingCost(e.target.value)}
                    placeholder={`৳${defaultParams.fingerlingCost[fishType as keyof typeof defaultParams.fingerlingCost]}/টি`}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">খাদ্য খরচ (৳)</label>
                  <input
                    type="number"
                    value={feedCost}
                    onChange={(e) => setFeedCost(e.target.value)}
                    placeholder="মোট খাদ্য খরচ"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">বিক্রয় মূল্য (৳/কেজি)</label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    placeholder={`৳${defaultParams.marketPrices[fishType as keyof typeof defaultParams.marketPrices].max}`}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">চাষের মাস</label>
                  <input
                    type="number"
                    value={growthMonths}
                    onChange={(e) => setGrowthMonths(e.target.value)}
                    placeholder="৬"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">বিক্রয়যোগ্য গড় ওজন (গ্রাম)</label>
                <input
                  type="number"
                  value={avgWeight}
                  onChange={(e) => setAvgWeight(e.target.value)}
                  placeholder="৫০০"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            {/* Market Price Reference */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl">
              <h3 className="text-sm font-semibold text-amber-800 mb-2">বর্তমান বাজার মূল্য (সম্প্রতি)</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(defaultParams.marketPrices).map(([key, price]) => (
                  <div key={key} className="flex justify-between text-amber-700">
                    <span>{key === 'carp' ? 'কার্প' : key === 'tilapia' ? 'তেলাপিয়া' : key === 'catfish' ? 'বেলে' : key === 'pangasius' ? 'পাঙাশ' : 'কই'}</span>
                    <span className="font-medium">৳{price.min}-{price.max}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Main Profit Result */}
            {result && (
              <>
                <div className={`rounded-2xl p-6 ${result.profit >= 0 ? 'bg-gradient-to-br from-emerald-500 to-green-500' : 'bg-gradient-to-br from-red-500 to-rose-500'}`}>
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    {result.profit >= 0 ? 'আপনার লাভ' : 'আপনার ক্ষতি'}
                  </h3>
                  <div className="text-center">
                    <p className={`text-5xl font-bold my-2 ${result.profit >= 0 ? 'text-white' : 'text-white'}`}>
                      ৳{Math.abs(result.profit).toLocaleString('bn-BD')}
                    </p>
                    <p className="text-white/80 text-lg">
                      {result.profit >= 0 ? `লাভের হার: ${result.profitMargin}%` : `ক্ষতির হার: ${Math.abs(result.profitMargin)}%`}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <p className="text-white/70 text-sm">বিক্রয় আয়</p>
                      <p className="text-xl font-bold text-white">৳{result.revenue.toLocaleString('bn-BD')}</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <p className="text-white/70 text-sm">মোট খরচ</p>
                      <p className="text-xl font-bold text-white">৳{result.costs.total.toLocaleString('bn-BD')}</p>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-white rounded-2xl shadow-sm">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'costs' ? null : 'costs')}
                    className="w-full flex items-center justify-between p-4 border-b"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">খরচের বিবরণ</h3>
                    {expandedSection === 'costs' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {expandedSection === 'costs' && (
                    <div className="p-4 pt-0 space-y-2">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">পোনা ক্রয়</span>
                        <span className="font-semibold">৳{result.costs.fingerling.toLocaleString('bn-BD')}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">খাদ্য ক্রয়</span>
                        <span className="font-semibold">৳{result.costs.feed.toLocaleString('bn-BD')}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">শ্রমিক খরচ</span>
                        <span className="font-semibold">৳{result.costs.labor.toLocaleString('bn-BD')}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">বিদ্যুৎ খরচ</span>
                        <span className="font-semibold">৳{result.costs.electricity.toLocaleString('bn-BD')}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">ওষুধ খরচ</span>
                        <span className="font-semibold">৳{result.costs.medicine.toLocaleString('bn-BD')}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">অন্যান্য খরচ</span>
                        <span className="font-semibold">৳{result.costs.other.toLocaleString('bn-BD')}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Survival & Metrics */}
                <div className="bg-white rounded-2xl shadow-sm">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'metrics' ? null : 'metrics')}
                    className="w-full flex items-center justify-between p-4 border-b"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">মূল সূচক</h3>
                    {expandedSection === 'metrics' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {expandedSection === 'metrics' && (
                    <div className="p-4 pt-0 space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">বেঁচে থাকা মাছ</span>
                        <span className="font-semibold text-emerald-600">{result.survivalCount} টি</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">মৃত মাছ</span>
                        <span className="font-semibold text-red-600">{result.mortalityLoss} টি ({result.mortalityRate}%)</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">মোট বায়োমাস</span>
                        <span className="font-semibold">{result.totalBiomass} কেজি</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">গড় ব্যয়/মাছ</span>
                        <span className="font-semibold">৳{result.avgCostPerFish}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">গড় আয়/মাছ</span>
                        <span className="font-semibold">৳{result.avgRevenuePerFish}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">নিট লাভ/মাছ</span>
                        <span className="font-semibold text-emerald-600">৳{result.netProfitPerFish}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Break Even Analysis */}
                <div className="bg-white rounded-2xl shadow-sm p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">ব্রেক-ইভেন বিশ্লেষণ</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-amber-50 rounded-xl p-4">
                      <p className="text-sm text-amber-700">ন্যূনতম বিক্রয় মূল্য</p>
                      <p className="text-2xl font-bold text-amber-800">৳{result.breakEvenPrice}/কেজি</p>
                      <p className="text-xs text-amber-600 mt-1">এর নিচে বিক্রি করলে ক্ষতি হবে</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-sm text-blue-700">ন্যূনতম পোনা সংখ্যা</p>
                      <p className="text-2xl font-bold text-blue-800">{result.breakEvenCount} টি</p>
                      <p className="text-xs text-blue-600 mt-1">এর কম পোনা দিলে ক্ষতি হবে</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={copyResult}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm font-medium">{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                  </button>
                </div>

                {/* Warning/Info */}
                {result.profit < 0 && (
                  <div className="bg-red-50 rounded-2xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div className="text-sm text-red-800">
                      <p className="font-medium mb-1">সতর্কতা!</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>বর্তমান হিসাবে আপনার মাছ চাষে ক্ষতি হচ্ছে</li>
                        <li>বিক্রয় মূল্য বাড়ানো বা খরচ কমানোর চেষ্টা করুন</li>
                        <li>আরও মাছ স্টক করে আয় বাড়াতে পারেন</li>
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Empty State */}
            {!result && (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">আপনার খামারের তথ্য দিন ফলাফল দেখতে</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Other Calculators */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">অন্যান্য ক্যালকুলেটর</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/calculators/water', icon: '💧', name: 'পানির পরিমাণ', desc: 'পুকুরের পানি গণনা' },
              { href: '/calculators/feed', icon: '🍚', name: 'খাবার পরিমাণ', desc: 'দৈনিক খাদ্য গণনা' },
              { href: '/calculators/oxygen', icon: '💨', name: 'অক্সিজেন', desc: 'অক্সিজেন প্রয়োজনীয়তা' },
              { href: '/calculators/medicine', icon: '💊', name: 'ওষুধের ডোজ', desc: 'সঠিক ডোজ গণনা' },
            ].map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <span className="text-3xl mb-2 block">{calc.icon}</span>
                <h3 className="font-semibold text-gray-900">{calc.name}</h3>
                <p className="text-sm text-gray-500">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}