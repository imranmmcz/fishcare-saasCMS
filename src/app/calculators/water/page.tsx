'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Droplets, Calculator, Info, Share2, Copy, Check } from 'lucide-react';

// Calculator parameters (can be edited by admin)
const defaultParams = {
  pondShape: 'rectangle',
  minDepth: 3,
  maxDepth: 5,
  avgDepth: 4,
  waterMargin: 0.15, // 15% for evaporation/safety
  conversionRate: 435.6, // decimal to liters
};

// Fish species data for recommendations
const fishRecommendations = {
  carp: { stockingDensity: 150, feedRate: 2, oxygenNeed: 4 },
  tilapia: { stockingDensity: 200, feedRate: 3, oxygenNeed: 5 },
  catfish: { stockingDensity: 300, feedRate: 2.5, oxygenNeed: 4 },
  pangasius: { stockingDensity: 250, feedRate: 2, oxygenNeed: 3 },
  koi: { stockingDensity: 100, feedRate: 2, oxygenNeed: 4 },
};

export default function WaterCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [pondType, setPondType] = useState('rectangle');
  const [diameter, setDiameter] = useState('');
  const [fishType, setFishType] = useState('carp');
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Calculate water volume
  const calculateVolume = () => {
    let volumeLiters = 0;
    let volumeCubicMeter = 0;
    let areaDecimal = 0;

    if (pondType === 'rectangle') {
      const len = parseFloat(length) || 0;
      const wid = parseFloat(width) || 0;
      const dep = parseFloat(depth) || 0;

      // Convert to decimal (1 decimal ≈ 435.6 sq ft)
      areaDecimal = (len * wid) / 435.6;

      // Volume in cubic feet then to liters (1 cubic foot = 28.317 liters)
      volumeCubicMeter = len * wid * dep * 0.0283; // cubic meter
      volumeLiters = len * wid * dep * 28.317;
    } else if (pondType === 'circular') {
      const dia = parseFloat(diameter) || 0;
      const dep = parseFloat(depth) || 0;

      // Area = πr², convert to decimal
      const radius = dia / 2;
      const areaSqFt = Math.PI * radius * radius;
      areaDecimal = areaSqFt / 435.6;

      volumeCubicMeter = areaSqFt * dep * 0.0283;
      volumeLiters = areaSqFt * dep * 28.317;
    }

    // Apply safety margin
    const netVolume = volumeLiters * (1 - defaultParams.waterMargin);
    const netCubicMeter = volumeCubicMeter * (1 - defaultParams.waterMargin);

    // Get recommendations based on fish type
    const rec = fishRecommendations[fishType as keyof typeof fishRecommendations] || fishRecommendations.carp;
    const recommendedFish = Math.floor((netVolume / 1000) * rec.stockingDensity);
    const dailyFeed = (recommendedFish * rec.feedRate) / 1000; // kg per day

    setResult({
      volumeLiters: Math.round(netVolume),
      volumeCubicMeter: Math.round(netCubicMeter * 100) / 100,
      areaDecimal: Math.round(areaDecimal * 100) / 100,
      recommendedFish,
      dailyFeed: Math.round(dailyFeed * 10) / 10,
      oxygenRequired: Math.round((recommendedFish * rec.oxygenNeed) * 10) / 10,
    });
  };

  useEffect(() => {
    if (length && width && depth) {
      calculateVolume();
    }
  }, [length, width, depth, pondType, diameter, fishType]);

  const copyResult = () => {
    if (result) {
      const text = `
পুকুরের পানির পরিমাণ:
আয়তন: ${result.volumeLiters.toLocaleString('bn-BD')} লিটার
কিউবিক মিটার: ${result.volumeCubicMeter} মি³
পুকুরের এরিয়া: ${result.areaDecimal} শতক
সুপারিশকৃত মাছ: ${result.recommendedFish} টি
দৈনিক খাদ্য: ${result.dailyFeed} কেজি
      `.trim();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">পানির পরিমাণ ক্যালকুলেটর</h1>
              <p className="text-sm text-gray-500">পুকুরের পানির পরিমাণ ও সুপারিশ</p>
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
              <Calculator className="w-5 h-5 text-ocean-500" />
              পুকুরের তথ্য দিন
            </h2>

            {/* Pond Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">পুকুরের ধরন</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPondType('rectangle')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    pondType === 'rectangle'
                      ? 'border-ocean-500 bg-ocean-50 text-ocean-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-12 h-8 border-2 border-current mx-auto mb-2 rounded-sm" />
                  <span className="text-sm font-medium">আয়তক্ষেত্র</span>
                </button>
                <button
                  onClick={() => setPondType('circular')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    pondType === 'circular'
                      ? 'border-ocean-500 bg-ocean-50 text-ocean-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 border-2 border-current rounded-full mx-auto mb-2" />
                  <span className="text-sm font-medium">গোল</span>
                </button>
              </div>
            </div>

            {/* Rectangle Inputs */}
            {pondType === 'rectangle' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">দৈর্ঘ্য (ফুট)</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="যেমন: 150"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">প্রস্থ (ফুট)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="যেমন: 100"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">গড় গভীরতা (ফুট)</label>
                  <input
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    placeholder="যেমন: 6"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  />
                </div>
              </div>
            )}

            {/* Circular Inputs */}
            {pondType === 'circular' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ব্যাস (ফুট)</label>
                  <input
                    type="number"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    placeholder="যেমন: 120"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">গড় গভীরতা (ফুট)</label>
                  <input
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    placeholder="যেমন: 6"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  />
                </div>
              </div>
            )}

            {/* Fish Type */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">মাছের প্রজাতি</label>
              <select
                value={fishType}
                onChange={(e) => setFishType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
              >
                <option value="carp">কার্প মাছ (রুই, কাতলা, মৃগেল)</option>
                <option value="tilapia">তেলাপিয়া</option>
                <option value="catfish">বেলে মাছ (শোল, মাগুর)</option>
                <option value="pangasius">পাঙাশ</option>
                <option value="koi">কই মাছ</option>
              </select>
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
                <div className="bg-gradient-to-br from-ocean-500 to-emerald-500 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">পানির পরিমাণ</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-white/70 text-sm">মোট আয়তন</p>
                      <p className="text-3xl font-bold">{result.volumeLiters.toLocaleString('bn-BD')}</p>
                      <p className="text-sm text-white/70">লিটার</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">কিউবিক মিটার</p>
                      <p className="text-3xl font-bold">{result.volumeCubicMeter}</p>
                      <p className="text-sm text-white/70">মি³</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">পুকুরের বিবরণ</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">পুকুরের এরিয়া</span>
                      <span className="font-semibold">{result.areaDecimal} শতক</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">সুপারিশকৃত মাছের সংখ্যা</span>
                      <span className="font-semibold text-ocean-600">{result.recommendedFish} টি</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">দৈনিক খাদ্য প্রয়োজন</span>
                      <span className="font-semibold text-emerald-600">{result.dailyFeed} কেজি</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">অক্সিজেন প্রয়োজনীয়তা</span>
                      <span className="font-semibold text-blue-600">{result.oxygenRequired} লিটার/ঘণ্টা</span>
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
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium">শেয়ার করুন</span>
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">গুরুত্বপূর্ণ তথ্য:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>এই হিসাবে ১৫% সেফটি মার্জিন যোগ করা হয়েছে</li>
                      <li>স্টকিং ঘনত্ব মাছের প্রজাতি অনুযায়ী পরিবর্তন হতে পারে</li>
                      <li>গ্রীষ্মকালে বেশি পানি প্রয়োজন হতে পারে</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {/* Empty State */}
            {!result && (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <Droplets className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">পুকুরের মাপ দিন ফলাফল দেখতে</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Other Calculators */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">অন্যান্য ক্যালকুলেটর</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/calculators/feed', icon: '🍚', name: 'খাবার পরিমাণ', desc: 'দৈনিক খাদ্য গণনা' },
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