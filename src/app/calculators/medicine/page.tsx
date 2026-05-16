'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Pill, Calculator, Info, Copy, Check, AlertCircle } from 'lucide-react';

// Common medicines and their dosages
const medicineDatabase = {
  potassium_permanganate: {
    name: 'পটাশিয়াম পারম্যাঙ্গানেট (KMnO₄)',
    usage: 'যান্ত্রিক পরজীবী ও ব্যাকটেরিয়া নাশক',
    dosage: '1-3 গ্রাম/১০০০ লিটার পানি',
    dilution: 1, // g per 1000L
    maxDose: 3,
    unit: 'গ্রাম/১০০০ লিটার',
    precautions: 'মাছের গুরুতর অবস্থা থাকলে ২-৩ দিন পর পুনরায় প্রয়োগ করুন',
  },
  salt: {
    name: 'টেবিল সল্ট (NaCl)',
    usage: 'যান্ত্রিক পরজীবী ও টান্ড ডিজিজ প্রতিরোধ',
    dosage: '১০-৩০ কেজি/বিঘা',
    dilution: 10, // kg per bigha
    maxDose: 30,
    unit: 'কেজি/বিঘা',
    precautions: 'অতিরিক্ত লবণ মাছের জন্য ক্ষতিকর',
  },
  lime: {
    name: 'চুন (CaO)',
    usage: 'pH নিয়ন্ত্রণ ও রোগ প্রতিরোধ',
    dosage: '৫-২০ কেজি/বিঘা',
    dilution: 5, // kg per bigha
    maxDose: 20,
    unit: 'কেজি/বিঘা',
    precautions: 'pH ৮.৫ এর বেশি হলে চুন প্রয়োগ করবেন না',
  },
  zeolite: {
    name: 'জিওলাইট',
    usage: 'পানির গুণমান উন্নতি ও অ্যামোনিয়া নাশ',
    dosage: '৫-১০ কেজি/বিঘা',
    dilution: 5, // kg per bigha
    maxDose: 10,
    unit: 'কেজি/বিঘা',
    precautions: 'সপ্তাহে একবার প্রয়োগ করুন',
  },
  probiotics: {
    name: 'প্রোবায়োটিক্স',
    usage: 'পানির জৈবিক ভারসাম্য রক্ষা',
    dosage: '২-৫ লিটার/বিঘা',
    dilution: 2, // L per bigha
    maxDose: 5,
    unit: 'লিটার/বিঘা',
    precautions: 'এন্টিবায়োটিক প্রয়োগের ৪৮ ঘণ্টা পরে ব্যবহার করুন',
  },
  formalin: {
    name: 'ফর্মালিন (Formalin)',
    usage: 'বাহ্যিক পরজীবী নাশ',
    dosage: '২৫-৫০ মিলিলিটার/১০০০ লিটার পানি',
    dilution: 25, // ml per 1000L
    maxDose: 50,
    unit: 'মিলিলিটার/১০০০ লিটার',
    precautions: 'সতর্কতা: বিষাক্ত, সঠিক ডোজে ব্যবহার করুন',
  },
  copper_sulphate: {
    name: 'কপার সালফেট',
    usage: 'ফাঙ্গাস ও পরজীবী নাশ',
    dosage: '০.৫-১ গ্রাম/১০০০ লিটার পানি',
    dilution: 0.5, // g per 1000L
    maxDose: 1,
    unit: 'গ্রাম/১০০০ লিটার',
    precautions: 'অতিরিক্ত মাত্রা মাছের জন্য মারাত্মক ক্ষতিকর',
  },
  terramycin: {
    name: 'টেরামাইসিন',
    usage: 'ব্যাকটেরিয়া সংক্রমণ চিকিৎসা',
    dosage: '৫০-১০০ মিলিগ্রাম/কেজি মাছ',
    dilution: 50, // mg per kg fish
    maxDose: 100,
    unit: 'মিলিগ্রাম/কেজি মাছ',
    precautions: 'খাদ্যের সাথে মিশিয়ে ৫-৭ দিন খাওয়ান',
  },
};

export default function MedicineCalculator() {
  const [medicine, setMedicine] = useState('potassium_permanganate');
  const [pondVolume, setPondVolume] = useState('');
  const [unitType, setUnitType] = useState('liter'); // liter, decimal, bigha
  const [fishWeight, setFishWeight] = useState('');
  const [diseaseSeverity, setDiseaseSeverity] = useState('mild');
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Calculate medicine dosage
  const calculateDosage = () => {
    const med = medicineDatabase[medicine as keyof typeof medicineDatabase];
    if (!med) {
      setResult(null);
      return;
    }

    let volume = parseFloat(pondVolume) || 0;
    let weight = parseFloat(fishWeight) || 0;

    if (volume === 0 && weight === 0) {
      setResult(null);
      return;
    }

    // Severity factor
    const severityFactor = diseaseSeverity === 'mild' ? 1 : diseaseSeverity === 'moderate' ? 1.5 : 2;

    // Calculate based on medicine type
    let dosage = 0;
    let dosageUnit = med.unit;
    let totalAmount = 0;
    let totalUnit = '';

    // Check if it's volume-based or weight-based
    const isVolumeBased = ['potassium_permanganate', 'formalin', 'copper_sulphate'].includes(medicine);
    const isWeightBased = ['terramycin'].includes(medicine);

    if (isVolumeBased && volume > 0) {
      // Convert to 1000L units
      const units = volume / 1000;
      dosage = med.dilution * severityFactor;
      totalAmount = dosage * units;
      totalUnit = medicine === 'formalin' ? 'মিলিলিটার' : 'গ্রাম';
    } else if (isWeightBased && weight > 0) {
      // Convert kg to base unit
      dosage = med.dilution * severityFactor;
      totalAmount = (dosage * weight) / 1000; // mg to g
      totalUnit = 'গ্রাম';
    } else {
      // Default: bigha/decimals based
      if (unitType === 'bigha') {
        dosage = med.dilution * severityFactor;
        totalAmount = dosage * volume;
      } else {
        // decimal to bigha (1 bigha = 33 decimal approximately)
        const bighaConverted = volume / 33;
        dosage = med.dilution * severityFactor;
        totalAmount = dosage * bighaConverted;
      }
      totalUnit = medicine === 'probiotics' ? 'লিটার' : 'কেজি';
    }

    setResult({
      medicine: med,
      dosage,
      dosageUnit,
      totalAmount: Math.round(totalAmount * 100) / 100,
      totalUnit,
      severityFactor,
      volume,
      weight,
    });
  };

  useEffect(() => {
    calculateDosage();
  }, [medicine, pondVolume, unitType, fishWeight, diseaseSeverity]);

  const copyResult = () => {
    if (result) {
      const text = `
ওষুধের ডোজ গণনা:
ওষুধ: ${result.medicine.name}
ডোজ: ${result.dosage} ${result.dosageUnit}
মোট পরিমাণ: ${result.totalAmount} ${result.totalUnit}
ব্যবহার: ${result.medicine.usage}
      `.trim();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ওষুধের ডোজ ক্যালকুলেটর</h1>
              <p className="text-sm text-gray-500">সঠিক ওষুধের পরিমাণ গণনা</p>
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
              <Calculator className="w-5 h-5 text-purple-500" />
              ওষুধ ও পুকুরের তথ্য দিন
            </h2>

            {/* Medicine Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">ওষুধের নাম নির্বাচন করুন</label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {Object.entries(medicineDatabase).map(([key, med]) => (
                  <button
                    key={key}
                    onClick={() => setMedicine(key)}
                    className={`p-2 text-left rounded-lg border text-sm transition-all ${
                      medicine === key
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium block truncate">{med.name.split('(')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Disease Severity */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">রোগের তীব্রতা</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'mild', label: 'হালকা', color: 'emerald' },
                  { value: 'moderate', label: 'মাঝারি', color: 'orange' },
                  { value: 'severe', label: 'গুরুতর', color: 'red' },
                ].map((sev) => (
                  <button
                    key={sev.value}
                    onClick={() => setDiseaseSeverity(sev.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      diseaseSeverity === sev.value
                        ? `border-${sev.color}-500 bg-${sev.color}-50 text-${sev.color}-700`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{sev.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">পুকুরের আকার</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={pondVolume}
                    onChange={(e) => setPondVolume(e.target.value)}
                    placeholder="পরিমাণ"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <select
                    value={unitType}
                    onChange={(e) => setUnitType(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="liter">লিটার</option>
                    <option value="decimal">শতক</option>
                    <option value="bigha">বিঘা</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মাছের মোট ওজন (কেজি)</label>
                <input
                  type="number"
                  value={fishWeight}
                  onChange={(e) => setFishWeight(e.target.value)}
                  placeholder="শুধুমাত্র ওষুধের জন্য যা ওজন-ভিত্তিক"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">টেরামাইসিন ইত্যাদির জন্য প্রয়োজন</p>
              </div>
            </div>

            {/* Medicine Info */}
            {medicineDatabase[medicine as keyof typeof medicineDatabase] && (
              <div className="mt-6 p-4 bg-purple-50 rounded-xl">
                <h3 className="text-sm font-semibold text-purple-800 mb-2">
                  {medicineDatabase[medicine as keyof typeof medicineDatabase].name}
                </h3>
                <p className="text-sm text-purple-700 mb-2">
                  ব্যবহার: {medicineDatabase[medicine as keyof typeof medicineDatabase].usage}
                </p>
                <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{medicineDatabase[medicine as keyof typeof medicineDatabase].precautions}</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Main Dosage Result */}
            {result && (
              <>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">সুপারিশকৃত ডোজ</h3>
                  <div className="text-center">
                    <p className="text-sm text-white/70">মোট প্রয়োজনীয় পরিমাণ</p>
                    <p className="text-5xl font-bold my-2">{result.totalAmount}</p>
                    <p className="text-xl text-white/80">{result.totalUnit}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">ডোজের বিস্তারিত</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">প্রতি একক ডোজ</span>
                      <span className="font-semibold text-purple-600">{result.dosage} {result.dosageUnit}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">তীব্রতা গুণক</span>
                      <span className="font-semibold">{result.severityFactor}x</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">পুকুরের পরিমাণ</span>
                      <span className="font-semibold">{result.volume || 0} {unitType === 'liter' ? 'লিটার' : unitType === 'decimal' ? 'শতক' : 'বিঘা'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">মাছের ওজন</span>
                      <span className="font-semibold">{result.weight || 0} কেজি</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">ব্যবহারের উদ্দেশ্য</span>
                      <span className="font-semibold text-blue-600 text-right max-w-[60%]">{result.medicine.usage}</span>
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

                <div className="bg-amber-50 rounded-2xl p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">প্রয়োগ নির্দেশিকা:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>ওষুধ সকালে বা সন্ধ্যায় প্রয়োগ করুন</li>
                      <li>প্রয়োগের আগে পানির pH ও তাপমাত্রা পরীক্ষা করুন</li>
                      <li>ওষুধ পানিতে ভালোভাবে মিশিয়ে নিন</li>
                      <li>প্রয়োগের পর ২-৩ দিন পর্যবেক্ষণ করুন</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {/* Empty State */}
            {!result && (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">ওষুধ ও পুকুরের তথ্য দিন ফলাফল দেখতে</p>
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