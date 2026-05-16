'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Thermometer, Calculator, Info, Copy, Check, AlertTriangle } from 'lucide-react';

// Temperature thresholds and recommendations
const temperatureThresholds = {
  critical: { min: 10, max: 35, color: 'red' },
  stress: { min: 20, max: 32, color: 'orange' },
  optimal: { min: 25, max: 30, color: 'green' },
};

const fishTemperatureRanges = {
  carp: { min: 18, max: 30, optimal: 25, tolerance: 'moderate' },
  tilapia: { min: 20, max: 35, optimal: 28, tolerance: 'high' },
  catfish: { min: 15, max: 32, optimal: 26, tolerance: 'high' },
  pangasius: { min: 22, max: 32, optimal: 28, tolerance: 'low' },
  koi: { min: 10, max: 30, optimal: 22, tolerance: 'high' },
};

export default function TemperatureCalculator() {
  const [currentTemp, setCurrentTemp] = useState('28');
  const [fishType, setFishType] = useState('carp');
  const [pondDepth, setPondDepth] = useState('4');
  const [timeOfDay, setTimeOfDay] = useState('morning'); // morning, noon, evening, night
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Calculate temperature impact
  const calculateTemperature = () => {
    const temp = parseFloat(currentTemp) || 28;
    const depth = parseFloat(pondDepth) || 4;
    const fish = fishTemperatureRanges[fishType as keyof typeof fishTemperatureRanges];

    // Determine temperature status
    let status: 'critical' | 'stress' | 'optimal' | 'good';
    let statusText: string;
    let statusColor: string;
    let recommendations: string[] = [];
    let warnings: string[] = [];

    if (temp < temperatureThresholds.critical.min || temp > temperatureThresholds.critical.max) {
      status = 'critical';
      statusText = 'বিপজ্জনক!';
      statusColor = 'red';
      warnings.push('তাপমাত্রা মাছের জন্য মারাত্মক পর্যায়ে');
      warnings.push('জরুরি পদক্ষেপ নিন');
      recommendations.push('পানির সাপ্লাই বাড়ান');
      recommendations.push('ছায়াযুক্ত এলাকা তৈরি করুন');
      recommendations.push('এয়ারেশন বাড়ান');
    } else if (temp < fish.min || temp > fish.max) {
      status = 'stress';
      statusText = 'চাপের মধ্যে!';
      statusColor = 'orange';
      warnings.push('মাছ অতিরিক্ত তাপমাত্রার চাপে আছে');
      warnings.push('খাওয়া ও বৃদ্ধি কমে যাবে');
      recommendations.push('এয়ারেশন চালু রাখুন');
      recommendations.push('সন্ধ্যায় পানি পরিবর্তন করুন');
    } else if (temp >= fish.optimal - 2 && temp <= fish.optimal + 2) {
      status = 'optimal';
      statusText = 'অতুলনীয়!';
      statusColor = 'green';
      recommendations.push('স্বাভাবিক পরিচর্যা অব্যাহত রাখুন');
      recommendations.push('নিয়মিত খাদ্য প্রয়োগ করুন');
      recommendations.push('সেরা বৃদ্ধির জন্য আদর্শ তাপমাত্রা');
    } else {
      status = 'good';
      statusText = 'গ্রহণযোগ্য';
      statusColor = 'blue';
      recommendations.push('তাপমাত্রা মাছের জন্য উপযুক্ত');
      recommendations.push('নিয়মিত পর্যবেক্ষণ করুন');
    }

    // Time of day factor
    const timeFactors: Record<string, number> = {
      morning: 0.9,
      noon: 1.2,
      evening: 1.0,
      night: 0.85,
    };
    const timeFactor = timeFactors[timeOfDay];

    // Calculate expected temperature at different depths
    // Surface to bottom temperature difference (approx 1-2°C per foot)
    const tempGradient = depth * 0.3;
    const bottomTemp = Math.max(temp - tempGradient, 10);

    // Calculate DO level based on temperature
    // DO saturation decreases with increasing temperature
    const baseDO = 8.0; // mg/L at 25°C
    const doAdjust = (25 - temp) * 0.1;
    const expectedDO = Math.max(baseDO + doAdjust, 3);

    // Impact scores
    const growthImpact = temp < fish.optimal ? (fish.optimal - temp) * 2 : (temp - fish.optimal) * 2;
    const feedImpact = temp < fish.optimal ? Math.min(100, 100 - (fish.optimal - temp) * 3) : Math.min(100, 100 - (temp - fish.optimal) * 3);

    setResult({
      currentTemp: temp,
      fishType: fishType,
      fishRange: fish,
      status,
      statusText,
      statusColor,
      recommendations,
      warnings,
      bottomTemp: Math.round(bottomTemp * 10) / 10,
      tempGradient: Math.round(tempGradient * 10) / 10,
      expectedDO: Math.round(expectedDO * 10) / 10,
      growthImpact: Math.round(growthImpact),
      feedEfficiency: Math.round(feedImpact),
      timeOfDay,
      timeFactor,
      pondDepth: depth,
    });
  };

  useEffect(() => {
    calculateTemperature();
  }, [currentTemp, fishType, pondDepth, timeOfDay]);

  const copyResult = () => {
    if (result) {
      const text = `
তাপমাত্রা বিশ্লেষণ:
পানির তাপমাত্রা: ${result.currentTemp}°C
অবস্থা: ${result.statusText}
নিচের তাপমাত্রা: ${result.bottomTemp}°C
প্রত্যাশিত DO: ${result.expectedDO} মিলিগ্রাম/লিটার
      `.trim();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">তাপমাত্রা ক্যালকুলেটর</h1>
              <p className="text-sm text-gray-500">পানির তাপমাত্রা বিশ্লেষণ ও সুপারিশ</p>
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
              <Calculator className="w-5 h-5 text-cyan-500" />
              তাপমাত্রার তথ্য দিন
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পানির তাপমাত্রা (°C)</label>
                <input
                  type="number"
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(e.target.value)}
                  placeholder="যেমন: 28"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মাছের প্রজাতি</label>
                <select
                  value={fishType}
                  onChange={(e) => setFishType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="carp">কার্প মাছ (রুই, কাতলা, মৃগেল)</option>
                  <option value="tilapia">তেলাপিয়া</option>
                  <option value="catfish">বেলে মাছ (শোল, মাগুর)</option>
                  <option value="pangasius">পাঙাশ</option>
                  <option value="koi">কই মাছ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পুকুরের গড় গভীরতা (ফুট)</label>
                <input
                  type="number"
                  value={pondDepth}
                  onChange={(e) => setPondDepth(e.target.value)}
                  placeholder="যেমন: ৪"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">সময়</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: 'morning', label: 'সকাল', icon: '🌅' },
                    { value: 'noon', label: 'দুপুর', icon: '☀️' },
                    { value: 'evening', label: 'সন্ধ্যা', icon: '🌆' },
                    { value: 'night', label: 'রাত', icon: '🌙' },
                  ].map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTimeOfDay(t.value)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        timeOfDay === t.value
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-xl block mb-1">{t.icon}</span>
                      <span className="text-xs font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Temperature Range Info */}
            <div className="mt-6 p-4 bg-cyan-50 rounded-xl">
              <h3 className="text-sm font-semibold text-cyan-800 mb-2">
                {fishTemperatureRanges[fishType as keyof typeof fishTemperatureRanges].tolerance === 'high' ? '🌡️ উচ্চ সহনশীলতা' : fishTemperatureRanges[fishType as keyof typeof fishTemperatureRanges].tolerance === 'moderate' ? '🌡️ মাঝারি সহনশীলতা' : '🌡️ কম সহনশীলতা'}
              </h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-gray-500 text-xs">সর্বনিম্ন</p>
                  <p className="font-bold text-blue-600">{fishTemperatureRanges[fishType as keyof typeof fishTemperatureRanges].min}°C</p>
                </div>
                <div className="bg-white rounded-lg p-2 text-center border-2 border-emerald-300">
                  <p className="text-gray-500 text-xs">আদর্শ</p>
                  <p className="font-bold text-emerald-600">{fishTemperatureRanges[fishType as keyof typeof fishTemperatureRanges].optimal}°C</p>
                </div>
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-gray-500 text-xs">সর্বোচ্চ</p>
                  <p className="font-bold text-blue-600">{fishTemperatureRanges[fishType as keyof typeof fishTemperatureRanges].max}°C</p>
                </div>
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
            {/* Temperature Status */}
            {result && (
              <>
                <div className={`rounded-2xl p-6 bg-gradient-to-br ${
                  result.statusColor === 'red' ? 'from-red-500 to-rose-600' :
                  result.statusColor === 'orange' ? 'from-orange-500 to-amber-500' :
                  result.statusColor === 'green' ? 'from-emerald-500 to-green-500' :
                  'from-cyan-500 to-blue-500'
                } text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">পানির অবস্থা</h3>
                    {result.status === 'critical' && <AlertTriangle className="w-6 h-6" />}
                  </div>
                  <div className="text-center">
                    <Thermometer className="w-16 h-16 mx-auto mb-2 opacity-80" />
                    <p className="text-4xl font-bold mb-1">{result.currentTemp}°C</p>
                    <p className="text-2xl font-semibold">{result.statusText}</p>
                  </div>
                </div>

                {/* Impact Metrics */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">প্রভাব বিশ্লেষণ</h3>
                  <div className="space-y-4">
                    {/* Growth Impact */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">বৃদ্ধির হার</span>
                        <span className={`text-sm font-semibold ${result.growthImpact > 20 ? 'text-red-600' : result.growthImpact > 10 ? 'text-orange-600' : 'text-emerald-600'}`}>
                          -{result.growthImpact}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${result.growthImpact > 20 ? 'bg-red-500' : result.growthImpact > 10 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                          style={{ width: `${100 - result.growthImpact}%` }}
                        />
                      </div>
                    </div>

                    {/* Feed Efficiency */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">খাদ্য দক্ষতা</span>
                        <span className="text-sm font-semibold text-blue-600">{result.feedEfficiency}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${result.feedEfficiency}%` }}
                        />
                      </div>
                    </div>

                    {/* DO Level */}
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">অক্সিজেন দ্রবণীয়তা (DO)</span>
                      <span className={`font-semibold ${result.expectedDO < 4 ? 'text-red-600' : result.expectedDO < 5 ? 'text-orange-600' : 'text-emerald-600'}`}>
                        {result.expectedDO} মিলিগ্রাম/লিটার
                      </span>
                    </div>

                    {/* Depth Temperature */}
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">নিচের তাপমাত্রা</span>
                      <span className="font-semibold text-blue-600">{result.bottomTemp}°C</span>
                    </div>

                    {/* Time Factor */}
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">সময় ফ্যাক্টর</span>
                      <span className="font-semibold">{result.timeFactor}x</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                  <div className="bg-emerald-50 rounded-2xl p-4">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-3">সুপারিশসমূহ</h3>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-emerald-700">
                          <Check className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warnings */}
                {result.warnings.length > 0 && (
                  <div className="bg-red-50 rounded-2xl p-4">
                    <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      সতর্কতা
                    </h3>
                    <ul className="space-y-2">
                      {result.warnings.map((warn, i) => (
                        <li key={i} className="flex items-start gap-2 text-red-700">
                          <span className="text-red-600">•</span>
                          <span className="text-sm">{warn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={copyResult}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span className="text-sm font-medium">{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                  </button>
                </div>
              </>
            )}

            {/* Empty State */}
            {!result && (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <Thermometer className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">তাপমাত্রার তথ্য দিন ফলাফল দেখতে</p>
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