'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Droplets, Scale, Wind, Activity, TrendingUp, Thermometer, Calculator } from 'lucide-react';

const calculators = [
  {
    id: 'water',
    name: 'পানির পরিমাণ',
    icon: Droplets,
    desc: 'পুকুরের পানির পরিমাণ, শতক এবং স্টকিং গণনা',
    color: 'ocean',
    features: ['লিটার ও কিউবিক মিটার', 'শতক হিসাব', 'মাছের সংখ্যা সুপারিশ', 'খাদ্য প্রয়োজনীয়তা'],
  },
  {
    id: 'feed',
    name: 'খাবার পরিমাণ',
    icon: Scale,
    desc: 'দৈনিক খাদ্য প্রয়োজনীয়তা ও খরচ গণনা',
    color: 'emerald',
    features: ['দৈনিক খাদ্য পরিমাণ', 'মাসিক খরচ', 'প্রোটিন কন্টেন্ট', 'তাপমাত্রা অ্যাডজাস্টমেন্ট'],
  },
  {
    id: 'oxygen',
    name: 'অক্সিজেন',
    icon: Wind,
    desc: 'অক্সিজেন প্রয়োজনীয়তা ও এয়ারেশন',
    color: 'sky',
    features: ['D.O. স্যাচুরেশন', 'এয়ারেটর প্রয়োজন', 'তাপমাত্রা প্রভাব', 'রাতের চাপ'],
  },
  {
    id: 'medicine',
    name: 'ওষুধের ডোজ',
    icon: Activity,
    desc: 'সঠিক ওষুধের পরিমাণ গণনা',
    color: 'purple',
    features: ['৮+ প্রচলিত ওষুধ', 'রোগের তীব্রতা', 'পুকুরের আকার', 'সতর্কতা নির্দেশিকা'],
  },
  {
    id: 'profit',
    name: 'লাভ-ক্ষতি',
    icon: TrendingUp,
    desc: 'আয়-ব্যয় হিসাব ও বিনিয়োগ বিশ্লেষণ',
    color: 'amber',
    features: ['বিস্তারিত খরচ', 'ব্রেক-ইভেন', 'ROI গণনা', 'বাজার মূল্য'],
  },
  {
    id: 'temperature',
    name: 'তাপমাত্রা',
    icon: Thermometer,
    desc: 'পানির তাপমাত্রা বিশ্লেষণ ও সুপারিশ',
    color: 'cyan',
    features: ['অবস্থা বিশ্লেষণ', 'বৃদ্ধির প্রভাব', 'খাদ্য দক্ষতা', 'D.O. প্রভাব'],
  },
];

const colorClasses: Record<string, { bg: string; gradient: string; text: string; icon: string }> = {
  ocean: { bg: 'bg-ocean-50', gradient: 'from-ocean-500 to-blue-500', text: 'text-ocean-600', icon: 'bg-ocean-100' },
  emerald: { bg: 'bg-emerald-50', gradient: 'from-emerald-500 to-teal-500', text: 'text-emerald-600', icon: 'bg-emerald-100' },
  sky: { bg: 'bg-sky-50', gradient: 'from-sky-500 to-blue-500', text: 'text-sky-600', icon: 'bg-sky-100' },
  purple: { bg: 'bg-purple-50', gradient: 'from-purple-500 to-pink-500', text: 'text-purple-600', icon: 'bg-purple-100' },
  amber: { bg: 'bg-amber-50', gradient: 'from-amber-500 to-orange-500', text: 'text-amber-600', icon: 'bg-amber-100' },
  cyan: { bg: 'bg-cyan-50', gradient: 'from-cyan-500 to-blue-500', text: 'text-cyan-600', icon: 'bg-cyan-100' },
};

export default function CalculatorsPage() {
  const [selectedCalc, setSelectedCalc] = useState<string | null>(null);

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
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ক্যালকুলেটর</h1>
              <p className="text-sm text-gray-500">ইউটিলিটি ক্যালকুলেটর সমূহ</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            ইউটিলিটি ক্যালকুলেটর
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            পুকুর পরিচালনা ও মাছ চাষের জন্য প্রয়োজনীয় সকল হিসাব-নিকাশ সহজে করুন
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc, index) => {
            const colors = colorClasses[calc.color];
            const IconComponent = calc.icon;

            return (
              <motion.div
                key={calc.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group"
              >
                <Link href={`/calculators/${calc.id}`}>
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-br ${colors.gradient} p-6`}>
                    <div className={`w-16 h-16 ${colors.icon} rounded-2xl flex items-center justify-center`}>
                      <IconComponent className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mt-4">{calc.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{calc.desc}</p>
                  </div>

                  {/* Features */}
                  <div className="p-6">
                    <ul className="space-y-2">
                      {calc.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className={`w-1.5 h-1.5 bg-${calc.color}-500 rounded-full`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className={`mt-4 flex items-center gap-2 text-${calc.color}-600 font-medium`}>
                      <span>ব্যবহার করুন</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-ocean-500 to-emerald-500 rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-4">এডমিন প্যারামিটার এডিটিং</h3>
          <p className="text-white/80 mb-4">
            সকল ক্যালকুলেটরের প্যারামিটার (যেমন: স্টকিং ঘনত্ব, খাদ্য হার, বাজার মূল্য ইত্যাদি)
            এডমিন প্যানেল থেকে সহজেই পরিবর্তন করা যাবে।
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="px-4 py-2 bg-white text-ocean-600 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              এডমিন লগইন
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}