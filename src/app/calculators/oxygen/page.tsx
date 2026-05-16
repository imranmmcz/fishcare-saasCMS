'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Wind, Calculator, Info, Copy, Check, AlertTriangle } from 'lucide-react';

// Default oxygen parameters (can be edited by admin)
const defaultOxygenParams = {
  oxygenRequirement: {
    carp: 4,      // mg/L - carp require moderate oxygen
    tilapia: 5,   // mg/L - tilapia require more oxygen
    catfish: 3,   // mg/L - catfish can survive in lower oxygen
    pangasius: 3, // mg/L - pangasius are hardy
    koi: 4,       // mg/L - koi require moderate oxygen
  },
  aerationEfficiency: {
    paddle_wheel: 1.5,  // kg O2/kW/h
    blower: 1.2,        // kg O2/kW/h
    fountain: 0.8,      // kg O2/kW/h
    diffuser: 0.6,      // kg O2/kW/h
  },
  criticalDO: 3,    // mg/L - critical level
  optimalDO: 5,     // mg/L - optimal level
  nightFactor: 1.5, // oxygen demand increases at night
  temperatureFactor: {
    low: 0.7,   // < 20°C
    optimal: 1.0, // 20-30°C
    high: 1.3,   // > 30°C
  },
};

export default function OxygenCalculator() {
  const [fishCount, setFishCount] = useState('');
  const [fishType, setFishType] = useState('carp');
  const [avgWeight, setAvgWeight] = useState('');
  const [pondVolume, setPondVolume] = useState('');
  const [waterTemp, setWaterTemp] = useState('28');
  const [hasAeration, setHasAeration] = useState(true);
  const [aerationType, setAerationType] = useState('paddle_wheel');
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Calculate oxygen requirements
  const calculateOxygen = () => {
    const count = parseInt(fishCount) || 0;
    const weight = parseFloat(avgWeight) || 0;
    const volume = parseFloat(pondVolume) || 0;

    if (count === 0 || weight === 0 || volume === 0) {
      setResult(null);
      return;
    }

    // Get oxygen requirement for fish type
    const oxygenNeed = defaultOxygenParams.oxygenRequirement[fishType as keyof typeof defaultOxygenParams.oxygenRequirement];

    // Temperature factor
    const temp = parseFloat(waterTemp) || 28;
    let tempFactor = defaultOxygenParams.temperatureFactor.optimal;
    if (temp < 20) tempFactor = defaultOxygenParams.temperatureFactor.low;
    else if (temp > 30) tempFactor = defaultOxygenParams.temperatureFactor.high;

    // Total biomass in kg
    const totalBiomass = (count * weight) / 1000;

    // Hourly oxygen demand (mg/kg fish/hour)
    const hourlyDO = (totalBiomass * oxygenNeed * tempFactor * defaultOxygenParams.nightFactor);

    // Daily oxygen requirement (kg)
    const dailyO2 = (hourlyDO * 24) / 1000;

    // Critical oxygen level check
    const doSaturation = (oxygenNeed / defaultOxygenParams.optimalDO) * 100;
    const isCritical = doSaturation > 80;

    // Required aeration if no aeration system
    let requiredAerators = 1;
    if (!hasAeration) {
      const aerationCap = defaultOxygenParams.aerationEfficiency[aerationType as keyof typeof defaultOxygenParams.aerationEfficiency];
      requiredAerators = Math.ceil(dailyO2 / (aerationCap * 8)); // 8 hours operation
    }

    // Oxygen deficit calculation
    const currentDO = defaultOxygenParams.optimalDO - (oxygenNeed * tempFactor);
    const deficitStatus = currentDO < defaultOxygenParams.criticalDO ? 'danger' : currentDO < oxygenNeed ? 'warning' : 'good';

    setResult({
      totalBiomass: Math.round(totalBiomass * 100) / 100,
      hourlyO2: Math.round(hourlyDO * 10) / 10,
      dailyO2: Math.round(dailyO2 * 100) / 100,
      oxygenNeed,
      doSaturation: Math.round(doSaturation),
      requiredAerators,
      aerationCap: defaultOxygenParams.aerationEfficiency[aerationType as keyof typeof defaultOxygenParams.aerationEfficiency],
      currentDO: Math.round(currentDO * 10) / 10,
      deficitStatus,
      isCritical,
      waterVolume: volume,
      fishCount: count,
    });
  };

  useEffect(() => {
    if (fishCount && avgWeight && pondVolume) {
      calculateOxygen();
    }
  }, [fishCount, avgWeight, pondVolume, waterTemp, fishType, hasAeration, aerationType]);

  const copyResult = () => {
    if (result) {
      const text = `
অক্সিজেন গণনার ফলাফল:
মোট বায়োমাস: ${result.totalBiomass} কেজি
প্রতি ঘণ্টায় অক্সিজেন: ${result.hourlyO2} গ্রাম
দৈনিক অক্সিজেন: ${result.dailyO2} কেজি
প্রয়োজনীয় এয়ারেটর: ${result.requiredAerators} টি
      `.trim();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Wind className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">অক্সিজেন ক্যালকুলেটর</h1>
              <p className="text-sm text-gray-500">অক্সিজেন প্রয়োজনীয়তা ও এয়ারেশন</p>
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
              <Calculator className="w-5 h-5 text-sky-500" />
              পুকুরের তথ্য দিন
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মাছের সংখ্যা</label>
                <input
                  type="number"
                  value={fishCount}
                  onChange={(e) => setFishCount(e.target.value)}
                  placeholder="যেমন: 500"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">গড় ওজন (গ্রাম)</label>
                <input
                  type="number"
                  value={avgWeight}
                  onChange={(e) => setAvgWeight(e.target.value)}
                  placeholder="যেমন: 250"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পানির পরিমাণ (লিটার)</label>
                <input
                  type="number"
                  value={pondVolume}
                  onChange={(e) => setPondVolume(e.target.value)}
                  placeholder="যেমন: 50000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মাছের প্রজাতি</label>
                <select
                  value={fishType}
                  onChange={(e) => setFishType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                >
                  <option value="carp">কার্প মাছ (রুই, কাতলা, মৃগেল)</option>
                  <option value="tilapia">তেলাপিয়া</option>
                  <option value="catfish">বেলে মাছ (শোল, মাগুর)</option>
                  <option value="pangasius">পাঙাশ</option>
                  <option value="koi">কই মাছ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">পানির তাপমাত্রা (°C)</label>
                <input
                  type="number"
                  value={waterTemp}
                  onChange={(e) => setWaterTemp(e.target.value)}
                  placeholder="যেমন: 28"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              {/* Aeration Toggle */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">এয়ারেশন সিস্টেম আছে?</span>
                  <button
                    onClick={() => setHasAeration(!hasAeration)}
                    className={`w-12 h-6 rounded-full transition-colors ${hasAeration ? 'bg-sky-500' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${hasAeration ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>

                {hasAeration && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">এয়ারেটরের ধরন</label>
                    <select
                      value={aerationType}
                      onChange={(e) => setAerationType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    >
                      <option value="paddle_wheel">প্যাডেল হুইল (Paddle Wheel)</option>
                      <option value="blower">ব্লোয়ার (Blower)</option>
                      <option value="fountain">ফাউন্টেন (Fountain)</option>
                      <option value="diffuser">ডিফিউজার (Diffuser)</option>
                    </select>
                  </div>
                )}
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
            {/* DO Status Indicator */}
            {result && (
              <>
                <div className={`rounded-2xl p-6 ${result.deficitStatus === 'danger' ? 'bg-gradient-to-br from-red-500 to-orange-500' : result.deficitStatus === 'warning' ? 'bg-gradient-to-br from-orange-500 to-amber-500' : 'bg-gradient-to-br from-sky-500 to-blue-500'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">D.O. স্যাচুরেশন</h3>
                    {result.isCritical && <AlertTriangle className="w-6 h-6 text-white" />}
                  </div>
                  <div className="flex items-end gap-4">
                    <div>
                      <p className="text-white/70 text-sm">বর্তমান D.O.</p>
                      <p className="text-4xl font-bold text-white">{result.currentDO}</p>
                      <p className="text-sm text-white/70">মিলিগ্রাম/লিটার</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-white/70 text-sm">স্যাচুরেশন</p>
                      <p className="text-3xl font-bold text-white">{result.doSaturation}%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">অক্সিজেন প্রয়োজনীয়তা</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">মোট বায়োমাস</span>
                      <span className="font-semibold">{result.totalBiomass} কেজি</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">প্রতি ঘণ্টায় অক্সিজেন</span>
                      <span className="font-semibold text-sky-600">{result.hourlyO2} গ্রাম</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">দৈনিক অক্সিজেন</span>
                      <span className="font-semibold text-blue-600">{result.dailyO2} কেজি</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">মাছের অক্সিজেন চাহিদা</span>
                      <span className="font-semibold">{result.oxygenNeed} মিলিগ্রাম/লিটার</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">এয়ারেটরের ধরন</span>
                      <span className="font-semibold">{hasAeration ? aerationType.replace('_', ' ').toUpperCase() : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">প্রয়োজনীয় এয়ারেটর</span>
                      <span className="font-semibold text-emerald-600">{result.requiredAerators} টি</span>
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

                <div className={`rounded-2xl p-4 flex items-start gap-3 ${result.deficitStatus === 'danger' ? 'bg-red-50' : result.deficitStatus === 'warning' ? 'bg-orange-50' : 'bg-green-50'}`}>
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${result.deficitStatus === 'danger' ? 'text-red-600' : result.deficitStatus === 'warning' ? 'text-orange-600' : 'text-green-600'}`} />
                  <div className={`text-sm ${result.deficitStatus === 'danger' ? 'text-red-800' : result.deficitStatus === 'warning' ? 'text-orange-800' : 'text-green-800'}`}>
                    <p className="font-medium mb-1">
                      {result.deficitStatus === 'danger' ? 'জরুরি সতর্কতা!' : result.deficitStatus === 'warning' ? 'সতর্কতা!' : 'অবস্থা ভালো'}
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      {result.deficitStatus === 'danger' ? (
                        <>
                          <li>অক্সিজেনের মাত্রা বিপজ্জনক স্তরে নেমে গেছে</li>
                          <li>অবিলম্বে এয়ারেশন চালু করুন</li>
                          <li>খাদ্য প্রয়োগ বন্ধ করুন</li>
                        </>
                      ) : result.deficitStatus === 'warning' ? (
                        <>
                          <li>অক্সিজেনের মাত্রা কমে যাচ্ছে</li>
                          <li>এয়ারেশন বাড়ান</li>
                          <li>রাতে বেশি সতর্ক থাকুন</li>
                        </>
                      ) : (
                        <>
                          <li>অক্সিজেনের মাত্রা সন্তোষজনক</li>
                          <li>বর্তমান এয়ারেশন যথেষ্ট</li>
                          <li>স্বাভাবিক পরিচালনা অব্যাহত রাখুন</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {/* Empty State */}
            {!result && (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <Wind className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">পুকুরের তথ্য দিন ফলাফল দেখতে</p>
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