'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, UtensilsCrossed, Calculator, Info, Copy, Check } from 'lucide-react';

// Default feed parameters (can be edited by admin)
const defaultFeedParams = {
  feedConversionRatio: 1.5, // FCR for carp
  feedingRate: {
    carp: { min: 2, max: 5, unit: '% of body weight' },
    tilapia: { min: 3, max: 6, unit: '% of body weight' },
    catfish: { min: 2, max: 4, unit: '% of body weight' },
    pangasius: { min: 2, max: 5, unit: '% of body weight' },
    koi: { min: 2, max: 4, unit: '% of body weight' },
  },
  proteinContent: {
    starter: 35, // 30-35% protein for fry
    grower: 28,  // 25-30% protein for fingerlings
    finisher: 22, // 20-25% protein for market size
  },
  feedingSchedule: {
    fry: 4, // times per day
    fingerlings: 3,
    market: 2,
  },
  costPerKg: 45, // BDT per kg average feed cost
};

export default function FeedCalculator() {
  const [fishCount, setFishCount] = useState('');
  const [avgWeight, setAvgWeight] = useState('');
  const [fishType, setFishType] = useState('carp');
  const [growthStage, setGrowthStage] = useState('fingerlings');
  const [waterTemp, setWaterTemp] = useState('28');
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Calculate feed requirements
  const calculateFeed = () => {
    const count = parseInt(fishCount) || 0;
    const avgWt = parseFloat(avgWeight) || 0;

    if (count === 0 || avgWt === 0) {
      setResult(null);
      return;
    }

    // Get feeding rate for fish type
    const feedingRate = defaultFeedParams.feedingRate[fishType as keyof typeof defaultFeedParams.feedingRate];

    // Adjust feeding rate based on growth stage
    let baseRate = feedingRate.max;
    if (growthStage === 'fry') baseRate = feedingRate.max;
    else if (growthStage === 'fingerlings') baseRate = (feedingRate.min + feedingRate.max) / 2;
    else if (growthStage === 'market') baseRate = feedingRate.min;

    // Temperature adjustment (optimal 28-32°C, decrease below 20°C or above 35°C)
    const temp = parseFloat(waterTemp) || 28;
    let tempFactor = 1;
    if (temp < 20) tempFactor = 0.5;
    else if (temp < 25) tempFactor = 0.75;
    else if (temp > 35) tempFactor = 0.6;
    else if (temp > 32) tempFactor = 0.85;

    // Total biomass
    const totalBiomass = (count * avgWt) / 1000; // in kg

    // Daily feed requirement
    const dailyFeed = (totalBiomass * baseRate * tempFactor) / 100; // kg per day

    // Feed distribution per feeding
    const feedingsPerDay = defaultFeedParams.feedingSchedule[growthStage as keyof typeof defaultFeedParams.feedingSchedule];
    const feedPerMeal = dailyFeed / feedingsPerDay;

    // Monthly requirement
    const monthlyFeed = dailyFeed * 30;

    // Cost calculation
    const dailyCost = dailyFeed * defaultFeedParams.costPerKg;
    const monthlyCost = monthlyFeed * defaultFeedParams.costPerKg;

    // Protein content based on stage
    const proteinContent = defaultFeedParams.proteinContent[growthStage as keyof typeof defaultFeedParams.proteinContent];

    // Expected growth
    const expectedGrowth = growthStage === 'fry' ? 2 : growthStage === 'fingerlings' ? 1.5 : 1;
    const daysToMarket = growthStage !== 'market' ? Math.ceil((avgWt < 500 ? 500 - avgWt : 0) / expectedGrowth) : 0;

    setResult({
      totalBiomass: Math.round(totalBiomass * 100) / 100,
      dailyFeed: Math.round(dailyFeed * 100) / 100,
      feedPerMeal: Math.round(feedPerMeal * 1000) / 1000,
      monthlyFeed: Math.round(monthlyFeed * 10) / 10,
      feedingsPerDay,
      dailyCost: Math.round(dailyCost),
      monthlyCost: Math.round(monthlyCost),
      proteinContent,
      expectedGrowth,
      daysToMarket,
      feedCostPerKg: defaultFeedParams.costPerKg,
    });
  };

  useEffect(() => {
    if (fishCount && avgWeight) {
      calculateFeed();
    }
  }, [fishCount, avgWeight, fishType, growthStage, waterTemp]);

  const copyResult = () => {
    if (result) {
      const text = `
খাদ্য গণনার ফলাফল:
মোট বায়োমাস: ${result.totalBiomass} কেজি
দৈনিক খাদ্য: ${result.dailyFeed} কেজি
প্রতি মিলে: ${result.feedPerMeal} কেজি
মাসিক খাদ্য: ${result.monthlyFeed} কেজি
দৈনিক খরচ: ৳${result.dailyCost}
মাসিক খরচ: ৳${result.monthlyCost}
      `.trim();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">খাদ্য ক্যালকুলেটর</h1>
              <p className="text-sm text-gray-500">দৈনিক খাদ্য প্রয়োজনীয়তা গণনা</p>
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
              <Calculator className="w-5 h-5 text-emerald-500" />
              মাছের তথ্য দিন
            </h2>

            {/* Fish Count */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মাছের সংখ্যা</label>
                <input
                  type="number"
                  value={fishCount}
                  onChange={(e) => setFishCount(e.target.value)}
                  placeholder="যেমন: 500"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">গড় ওজন (গ্রাম)</label>
                <input
                  type="number"
                  value={avgWeight}
                  onChange={(e) => setAvgWeight(e.target.value)}
                  placeholder="যেমন: 250"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মাছের প্রজাতি</label>
                <select
                  value={fishType}
                  onChange={(e) => setFishType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="carp">কার্প মাছ (রুই, কাতলা, মৃগেল)</option>
                  <option value="tilapia">তেলাপিয়া</option>
                  <option value="catfish">বেলে মাছ (শোল, মাগুর)</option>
                  <option value="pangasius">পাঙাশ</option>
                  <option value="koi">কই মাছ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">বিকাশের পর্যায়</label>
                <select
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="fry">পোনা (Fry)</option>
                  <option value="fingerlings">বাচ্চা (Fingerlings)</option>
                  <option value="market">বাজারজাতকরণ (Market Size)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পানির তাপমাত্রা (°C)</label>
                <input
                  type="number"
                  value={waterTemp}
                  onChange={(e) => setWaterTemp(e.target.value)}
                  placeholder="যেমন: 28"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Feed Schedule Info */}
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
              <h3 className="text-sm font-semibold text-emerald-800 mb-2">খাদ্য প্রয়োগের সময়সূচি</h3>
              <div className="space-y-2 text-sm text-emerald-700">
                <p><span className="font-medium">পোনা:</span> দিনে ৪ বার (সকাল, দুপুর, বিকাল, সন্ধ্যা)</p>
                <p><span className="font-medium">বাচ্চা:</span> দিনে ৩ বার (সকাল, দুপুর, বিকাল)</p>
                <p><span className="font-medium">বাজারজাত:</span> দিনে ২ বার (সকাল, বিকাল)</p>
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
            {/* Main Results */}
            {result && (
              <>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">খাদ্য প্রয়োজনীয়তা</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-white/70 text-sm">দৈনিক খাদ্য</p>
                      <p className="text-3xl font-bold">{result.dailyFeed}</p>
                      <p className="text-sm text-white/70">কেজি/দিন</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">মাসিক খাদ্য</p>
                      <p className="text-3xl font-bold">{result.monthlyFeed}</p>
                      <p className="text-sm text-white/70">কেজি/মাস</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">বিস্তারিত তথ্য</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">মোট বায়োমাস</span>
                      <span className="font-semibold">{result.totalBiomass} কেজি</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">প্রতি মিলে খাদ্য</span>
                      <span className="font-semibold">{result.feedPerMeal} কেজি</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">দৈনিক খাদ্য প্রয়োগ</span>
                      <span className="font-semibold text-emerald-600">{result.feedingsPerDay} বার</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">প্রোটিন কন্টেন্ট</span>
                      <span className="font-semibold text-blue-600">{result.proteinContent}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">প্রত্যাশিত দৈনিক বৃদ্ধি</span>
                      <span className="font-semibold">{result.expectedGrowth} গ্রাম/দিন</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">দৈনিক খরচ</span>
                      <span className="font-semibold text-orange-600">৳{result.dailyCost}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">মাসিক খরচ</span>
                      <span className="font-semibold text-red-600">৳{result.monthlyCost}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={copyResult}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span className="text-sm font-medium">{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">গুরুত্বপূর্ণ তথ্য:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>খাদ্য প্রয়োগ সকাল ৯-১০ টা এবং বিকাল ৩-৪ টার মধ্যে করুন</li>
                      <li>তাপমাত্রা ২০°C এর নিচে নামলে খাদ্য পরিমাণ ৫০% কমান</li>
                      <li>অতিরিক্ত খাদ্য দিলে পানি দূষিত হয়, সতর্কতা অবলম্বন করুন</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {/* Empty State */}
            {!result && (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">মাছের তথ্য দিন ফলাফল দেখতে</p>
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
              { href: '/calculators/oxygen', icon: '💨', name: 'অক্সিজেন', desc: 'অক্সিজেন প্রয়োজনীয়তা' },
              { href: '/calculators/medicine', icon: '💊', name: 'ওষুধের ডোজ', desc: 'সঠিক ডোজ গণনা' },
              { href: '/calculators/profit', icon: '📊', name: 'লাভ-ক্ষতি', desc: 'আয়-ব্যয় হিসাব' },
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