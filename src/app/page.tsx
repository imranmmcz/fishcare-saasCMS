'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Fish, Droplets, Activity, ShoppingCart, Bell, Globe, User, Phone, Mail, MapPin, Clock, ArrowRight, Star, Heart, Share2, Eye, TrendingUp, TrendingDown, Minus, Calculator, Thermometer, Wind, Scale } from 'lucide-react';

// Hero Slides Data
const heroSlides = [
  {
    id: 1,
    title: 'বাংলাদেশের আধুনিক মাছচাষ প্ল্যাটফর্ম',
    subtitle: 'পুকুর ব্যবস্থাপনা থেকে শুরু করে বাজার মূল্য পর্যন্ত সবকিছু এক জায়গায়',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80',
    stats: [
      { label: 'মাছচাষী', value: '10,000+' },
      { label: 'পুকুর', value: '50,000+' },
      { label: 'পণ্য', value: '5,000+' },
    ],
  },
  {
    id: 2,
    title: 'মাছের স্বাস্থ্য ও রোগ ব্যবস্থাপনা',
    subtitle: 'বিশেষজ্ঞদের পরামর্শ ও সেরা মানের ওষুধ',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=1920&q=80',
    stats: [
      { label: 'রোগ নির্দেশিকা', value: '100+' },
      { label: 'ওষুধের তালিকা', value: '500+' },
      { label: 'বিশেষজ্ঞ', value: '50+' },
    ],
  },
  {
    id: 3,
    title: 'আপডেটেড বাজার মূল্য',
    subtitle: 'সারাদেশের সকল বাজারের লাইভ মূল্য',
    image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=1920&q=80',
    stats: [
      { label: 'বাজার', value: '64+' },
      { label: 'মাছের জাত', value: '50+' },
      { label: 'দৈনিক আপডেট', value: '∞' },
    ],
  },
];

// Medicine Products Data
const medicineProducts = [
  {
    id: 1,
    name: 'অক্সিটেট্রাসাইক্লিন',
    nameBn: 'অক্সিটেট্রাসাইক্লিন',
    category: 'অ্যান্টিবায়োটিক',
    price: 350,
    oldPrice: 420,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
    badge: 'বেস্ট সেলার',
  },
  {
    id: 2,
    name: 'প্রোবায়োটিক মিক্স',
    nameBn: 'প্রোবায়োটিক মিক্স',
    category: 'প্রোবায়োটিক',
    price: 280,
    oldPrice: null,
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80',
    badge: 'জনপ্রিয়',
  },
  {
    id: 3,
    name: 'ভিটামিন প্রিমিক্স',
    nameBn: 'ভিটামিন প্রিমিক্স',
    category: 'ভিটামিন',
    price: 220,
    oldPrice: 260,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80',
    badge: 'ফ্ল্যাশ সেল',
  },
  {
    id: 4,
    name: 'ফর্মালিন সলিউশন',
    nameBn: 'ফর্মালিন সলিউশন',
    category: 'ডিসইনফেক্ট্যান্ট',
    price: 180,
    oldPrice: null,
    rating: 4.6,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80',
    badge: null,
  },
  {
    id: 5,
    name: 'পটাশিয়াম পারম্যাঙ্গানেট',
    nameBn: 'পটাশিয়াম পারম্যাঙ্গানেট',
    category: 'ডিসইনফেক্ট্যান্ট',
    price: 150,
    oldPrice: 180,
    rating: 4.5,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&q=80',
    badge: null,
  },
  {
    id: 6,
    name: 'এমোক্সিসিলিন',
    nameBn: 'এমোক্সিসিলিন',
    category: 'অ্যান্টিবায়োটিক',
    price: 420,
    oldPrice: 500,
    rating: 4.8,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80',
    badge: 'নতুন',
  },
];

// Disease Guide Data
const diseaseGuides = [
  {
    id: 1,
    name: 'আলসার রোগ',
    symptoms: ['লাল ক্ষত', 'খাওয়ায় অনাগ্রহ', 'স্থবিরতা'],
    severity: 'উচ্চ',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=400&q=80',
  },
  {
    id: 2,
    name: 'সাদা দাগ রোগ',
    symptoms: ['শরীরে সাদা দাগ', 'চুলকানি', 'পাখনা ক্ষতি'],
    severity: 'মাঝারি',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&q=80',
  },
  {
    id: 3,
    name: 'শ্বাসকষ্ট',
    symptoms: ['উপরে ওঠা', 'অক্সিজেন ঘাটতি', 'মৃত্যু'],
    severity: 'ক্রিটিক্যাল',
    image: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=80',
  },
];

// Calculator Types
const calculators = [
  { id: 'water', name: 'পানির পরিমাণ', icon: Droplets, desc: 'পুকুরের পানির পরিমাণ গণনা' },
  { id: 'feed', name: 'খাবার পরিমাণ', icon: Scale, desc: 'দৈনিক খাবারের হিসাব' },
  { id: 'oxygen', name: 'অক্সিজেন', icon: Wind, desc: 'অক্সিজেন প্রয়োজনীয়তা' },
  { id: 'medicine', name: 'ওষুধের ডোজ', icon: Activity, desc: 'সঠিক ডোজ গণনা' },
  { id: 'profit', name: 'লাভ-ক্ষতি', icon: TrendingUp, desc: 'আয়-ব্যয় হিসাব' },
  { id: 'temperature', name: 'তাপমাত্রা', icon: Thermometer, desc: 'পানির তাপমাত্রা' },
];

// Market Prices Data
const marketPrices = [
  { fish: 'রুই', size: 'বড়', wholesale: 280, retail: 320, trend: 'up' },
  { fish: 'কাতলা', size: 'মাঝারি', wholesale: 260, retail: 300, trend: 'stable' },
  { fish: 'তেলাপিয়া', size: 'ছোট', wholesale: 120, retail: 150, trend: 'down' },
  { fish: 'পাঙাশ', size: 'বড়', wholesale: 180, retail: 220, trend: 'up' },
  { fish: 'কই', size: 'মাঝারি', wholesale: 350, retail: 400, trend: 'stable' },
];

// District data by division
const districtData: Record<string, { name: string; nameBn: string; upazilas: string[] }[]> = {
  dhaka: [
    { name: 'Dhaka', nameBn: 'ঢাকা', upazilas: ['Dhanmondi', 'Gulshan', 'Mirpur', 'Mohammadpur', 'Uttara', 'Motijheel'] },
    { name: 'Gazipur', nameBn: 'গাজীপুর', upazilas: ['Kaliganj', 'Kaliakair', 'Kapasia', 'Sreepur', 'Tongi'] },
    { name: 'Narayanganj', nameBn: 'নারায়ণগঞ্জ', upazilas: ['Araihazar', 'Bandar', 'Rupganj', 'Sonargaon'] },
    { name: 'Tangail', nameBn: 'টাঙ্গাইল', upazilas: ['Basail', 'Bhuapur', 'Delduar', 'Ghatail', 'Kalihati', 'Madhupur'] },
    { name: 'Manikganj', nameBn: 'মানিকগঞ্জ', upazilas: ['Daulatpur', 'Ghior', 'Harirampur', 'Manikganj Sadar', 'Saturia', 'Shivalaya'] },
  ],
  chittagong: [
    { name: 'Chittagong', nameBn: 'চট্টগ্রাম', upazilas: ['Pahartali', 'Panchlaish', 'Double Mooring', 'Kotwali', 'Patar Hat'] },
    { name: 'Cox\'s Bazar', nameBn: 'কক্সবাজার', upazilas: ['Chakaria', 'Kutubdia', 'Pekua', 'Ramu', 'Teknaf', 'Ukhiya'] },
    { name: 'Comilla', nameBn: 'কুমিল্লা', upazilas: ['Brahman Para', 'Burichang', 'Chandina', 'Chauddagram', 'Comilla Sadar'] },
    { name: 'Feni', nameBn: 'ফেনী', upazilas: ['Chhagalnaiya', 'Daganbhuiyan', 'Feni Sadar', 'Parshuram', 'Sonagazi'] },
  ],
  khulna: [
    { name: 'Khulna', nameBn: 'খুলনা', upazilas: ['Batiaghata', 'Dumuria', 'Dighalia', 'Koyra', 'Paikgachha', 'Rupsa'] },
    { name: 'Jessore', nameBn: 'যশোর', upazilas: ['Abhaynagar', 'Bagherpara', 'Chaugachha', 'Jhikargachha', 'Keshabpur'] },
    { name: 'Satkhira', nameBn: 'সাতক্ষীরা', upazilas: ['Assasuni', 'Debhata', 'Kalaroa', 'Kaliganj', 'Shyamnagar', 'Tala'] },
  ],
  rajshahi: [
    { name: 'Rajshahi', nameBn: 'রাজশাহী', upazilas: ['Bagha', 'Bagmara', 'Charghat', 'Durgapur', 'Godagari', 'Mohanpur'] },
    { name: 'Bogra', nameBn: 'বগুড়া', upazilas: ['Adamdighi', 'Bogra Sadar', 'Gabtali', 'Kahaloo', 'Nandigram', 'Shajahanpur'] },
    { name: 'Pabna', nameBn: 'পাবনা', upazilas: ['Atgharia', 'Bera', 'Bhangabaria', 'Chatmohar', 'Faridpur', 'Ishwardi'] },
  ],
  sylhet: [
    { name: 'Sylhet', nameBn: 'সিলেট', upazilas: ['Balaganj', 'Beanibazar', 'Bishwanath', 'Companiganj', 'Fenchuganj'] },
    { name: 'Moulvibazar', nameBn: 'মৌলভীবাজার', upazilas: ['Barlekha', 'Juri', 'Kamalganj', 'Moulvibazar Sadar', 'Rajnagar', 'Sreemangal'] },
    { name: 'Habiganj', nameBn: 'হবিগঞ্জ', upazilas: ['Ajmiriganj', 'Bahubali', 'Baniyachong', 'Chunarughat', 'Habiganj Sadar'] },
  ],
  barisal: [
    { name: 'Barisal', nameBn: 'বরিশাল', upazilas: ['Agailjhara', 'Babuganj', 'Bakerganj', 'Banaripara', 'Gaurnadi'] },
    { name: 'Bhola', nameBn: 'ভোলা', upazilas: ['Burhanuddin', 'Char Fasson', 'Daulatkhan', 'Lalmohan', 'Manpura', 'Tazumuddin'] },
    { name: 'Jhalokati', nameBn: 'ঝালকাঠি', upazilas: ['Kathalia', 'Jhalokati Sadar', 'Nalchity', 'Rajapur'] },
  ],
  rangpur: [
    { name: 'Rangpur', nameBn: 'রংপুর', upazilas: ['Badarganj', 'Gangachara', 'Kaunia', 'Mithapukur', 'Pirgachha', 'Pirganj'] },
    { name: 'Dinajpur', nameBn: 'দিনাজপুর', upazilas: ['Birampur', 'Birganj', 'Biral', 'Bochaganj', 'Chirirbandar', 'Dinajpur Sadar'] },
    { name: 'Gaibandha', nameBn: 'গাইবান্ধা', upazilas: ['Fulchhari', 'Gaibandha Sadar', 'Gobindaganj', 'Palashbari', 'Sadullapur', 'Saghata'] },
  ],
  mymensingh: [
    { name: 'Mymensingh', nameBn: 'ময়মনসিংহ', upazilas: ['Bhaluka', 'Dhobaura', 'Fulbaria', 'Gaffargaon', 'Gauripur', 'Ishwarganj'] },
    { name: 'Jamalpur', nameBn: 'জামালপুর', upazilas: ['Bakshiganj', 'Dewanganj', 'Islampur', 'Jamalpur Sadar', 'Madarganj', 'Melandaha'] },
    { name: 'Sherpur', nameBn: 'শেরপুর', upazilas: ['Jhenaigati', 'Nakla', 'Nalitabari', 'Sherpur Sadar', 'Sreebardi'] },
  ],
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [cartItems, setCartItems] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Get districts for selected division
  const districts = selectedDivision ? districtData[selectedDivision] || [] : [];

  // Get upazilas for selected district
  const upazilas = selectedDistrict
    ? districts.find(d => d.nameBn === selectedDistrict)?.upazilas || []
    : [];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/20">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-ocean-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Fish className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gradient">Fish Care</h1>
                <p className="text-xs text-gray-500 hidden sm:block">মাছচাষের বিশ্বস্ত সাথী</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-ocean-600 font-medium transition-colors">
                ড্যাশবোর্ড
              </Link>
              <Link href="/medicine" className="text-gray-700 hover:text-ocean-600 font-medium transition-colors">
                ওষুধ
              </Link>
              <Link href="/market" className="text-gray-700 hover:text-ocean-600 font-medium transition-colors">
                বাজার মূল্য
              </Link>
              <Link href="/disease-guide" className="text-gray-700 hover:text-ocean-600 font-medium transition-colors">
                রোগ নির্দেশিকা
              </Link>
              <Link href="/calculators" className="text-gray-700 hover:text-ocean-600 font-medium transition-colors">
                ক্যালকুলেটর
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-ocean-600 font-medium transition-colors">
                ব্লগ
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 lg:gap-4">
              {/* Language */}
              <button className="hidden sm:flex items-center gap-1 text-gray-600 hover:text-ocean-600">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">বাং</span>
              </button>

              {/* Cart */}
              <button className="relative p-2 text-gray-600 hover:text-ocean-600 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-ocean-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Login */}
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-ocean-500 hover:bg-ocean-600 text-white rounded-lg font-medium transition-colors"
              >
                <User className="w-4 h-4" />
                লগইন
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <nav className="container-custom py-4 space-y-2">
                <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-ocean-50 rounded-lg">
                  ড্যাশবোর্ড
                </Link>
                <Link href="/medicine" className="block px-4 py-2 text-gray-700 hover:bg-ocean-50 rounded-lg">
                  ওষুধ
                </Link>
                <Link href="/market" className="block px-4 py-2 text-gray-700 hover:bg-ocean-50 rounded-lg">
                  বাজার মূল্য
                </Link>
                <Link href="/disease-guide" className="block px-4 py-2 text-gray-700 hover:bg-ocean-50 rounded-lg">
                  রোগ নির্দেশিকা
                </Link>
                <Link href="/calculators" className="block px-4 py-2 text-gray-700 hover:bg-ocean-50 rounded-lg">
                  ক্যালকুলেটর
                </Link>
                <Link href="/blog" className="block px-4 py-2 text-gray-700 hover:bg-ocean-50 rounded-lg">
                  ব্লগ
                </Link>
                <div className="pt-2">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-ocean-500 text-white rounded-lg font-medium"
                  >
                    <User className="w-4 h-4" />
                    লগইন / রেজিস্ট্রেশন
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] lg:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/80 to-emerald-900/60 z-10" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container-custom">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-2xl"
                >
                  <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg lg:text-xl text-white/90 mb-8">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    <Link
                      href="/register"
                      className="px-6 py-3 bg-ocean-500 hover:bg-ocean-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                      বিনামূল্যে শুরু করুন
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/demo"
                      className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium backdrop-blur-sm transition-colors"
                    >
                      ডেমো দেখুন
                    </Link>
                  </div>
                  {/* Stats */}
                  <div className="flex gap-8">
                    {slide.stats.map((stat, i) => (
                      <div key={i}>
                        <p className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</p>
                        <p className="text-sm text-white/70">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: Fish, title: 'মাছচাষ ব্যবস্থাপনা', desc: 'পুকুর ও মাছের সম্পূর্ণ ব্যবস্থাপনা' },
              { icon: Activity, title: 'স্বাস্থ্য পর্যবেক্ষণ', desc: 'মাছের রোগ নির্ণয় ও চিকিৎসা' },
              { icon: ShoppingCart, title: 'ওষুধ কেনা', desc: 'সেরা মানের মাছের ওষুধ' },
              { icon: TrendingUp, title: 'বাজার মূল্য', desc: 'আপডেটেড বাজার দর' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-ocean-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-ocean-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Medicine Ecommerce Slider */}
      <section className="py-16 section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                জনপ্রিয় মাছের ওষুধ
              </h2>
              <p className="text-gray-600">সেরা মানের ও সেরা দাম</p>
            </div>
            <Link
              href="/medicine"
              className="hidden sm:flex items-center gap-2 text-ocean-600 hover:text-ocean-700 font-medium"
            >
              সব দেখুন
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {medicineProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all snap-start group"
                >
                  {/* Image */}
                  <div className="relative h-48 rounded-t-2xl overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                          }`}
                        />
                      </button>
                      <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <span className="text-xs text-ocean-600 font-medium">{product.category}</span>
                    <h3 className="font-semibold text-gray-900 mt-1 mb-2 line-clamp-1">
                      {product.nameBn}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-gray-900">৳{product.price}</span>
                        {product.oldPrice && (
                          <span className="text-sm text-gray-400 line-through ml-2">৳{product.oldPrice}</span>
                        )}
                      </div>
                      <button className="w-10 h-10 bg-ocean-500 hover:bg-ocean-600 rounded-xl flex items-center justify-center text-white transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Link href="/medicine" className="sm:hidden flex items-center justify-center gap-2 text-ocean-600 hover:text-ocean-700 font-medium mt-6">
            সব দেখুন
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Fish Disease Guide */}
      <section className="py-16 bg-gradient-to-b from-ocean-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              মাছের রোগ নির্দেশিকা
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              সাধারণ মাছের রোগ, তাদের লক্ষণ, কারণ এবং চিকিৎসা সম্পর্কে জানুন
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diseaseGuides.map((disease, index) => (
              <motion.div
                key={disease.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group"
              >
                <div className="relative h-48">
                  <Image
                    src={disease.image}
                    alt={disease.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{disease.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        disease.severity === 'ক্রিটিক্যাল' ? 'bg-red-500 text-white' :
                        disease.severity === 'উচ্চ' ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-white'
                      }`}>
                        {disease.severity}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">প্রধান লক্ষণ:</p>
                  <ul className="space-y-1">
                    {disease.symptoms.map((symptom, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-ocean-500 rounded-full" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/disease-guide/${disease.id}`}
                    className="flex items-center gap-2 text-ocean-600 hover:text-ocean-700 font-medium mt-4"
                  >
                    বিস্তারিত দেখুন
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              ইউটিলিটি ক্যালকুলেটর
            </h2>
            <p className="text-gray-600">দরকারি হিসাব-নিকাশ সহজেই করুন</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {calculators.map((calc, index) => (
              <motion.div
                key={calc.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/calculators/${calc.id}`}
                  className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-ocean-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-3">
                    <calc.icon className="w-7 h-7 text-ocean-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 text-center">{calc.name}</h3>
                  <p className="text-xs text-gray-500 text-center mt-1">{calc.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Price Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Selector */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">আপনার এলাকা নির্বাচন করুন</h3>
                <div className="space-y-4">
                  <select
                    value={selectedDivision}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                      setSelectedDistrict('');
                      setSelectedUpazila('');
                    }}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    <option value="dhaka">ঢাকা</option>
                    <option value="chittagong">চট্টগ্রাম</option>
                    <option value="khulna">খুলনা</option>
                    <option value="rajshahi">রাজশাহী</option>
                    <option value="sylhet">সিলেট</option>
                    <option value="barisal">বরিশাল</option>
                    <option value="rangpur">রংপুর</option>
                    <option value="mymensingh">ময়মনসিংহ</option>
                  </select>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedUpazila('');
                    }}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                    disabled={!selectedDivision}
                  >
                    <option value="">জেলা নির্বাচন করুন</option>
                    {districts.map((district) => (
                      <option key={district.nameBn} value={district.nameBn}>
                        {district.nameBn}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedUpazila}
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                    disabled={!selectedDistrict}
                  >
                    <option value="">উপজেলা নির্বাচন করুন</option>
                    {upazilas.map((upazila) => (
                      <option key={upazila} value={upazila}>
                        {upazila}
                      </option>
                    ))}
                  </select>
                </div>
                <Link
                  href="/market"
                  className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 bg-ocean-500 hover:bg-ocean-600 text-white rounded-xl font-medium transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  লাইভ বাজার দেখুন
                </Link>
              </div>
            </div>

            {/* Prices */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">আজকের বাজার মূল্য</h3>
                  <p className="text-sm text-gray-500">ঢাকা বাজার, সর্বশেষ আপডেট: আজ সকাল ১০টা</p>
                </div>
                <div className="divide-y">
                  {marketPrices.map((price, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{price.fish}</h4>
                          <p className="text-sm text-gray-500">{price.size} সাইজ</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">পাইকারি</p>
                            <p className="font-semibold text-gray-900">৳{price.wholesale}/কেজি</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">খুচরা</p>
                            <p className="font-semibold text-gray-900">৳{price.retail}/কেজি</p>
                          </div>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center">
                            {price.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                            {price.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                            {price.trend === 'stable' && <Minus className="w-4 h-4 text-gray-400" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              আজই শুরু করুন আপনার মাছচাষ যাত্রা
            </h2>
            <p className="text-lg text-white/90 mb-8">
              বিনামূল্যে রেজিস্ট্রেশন করুন এবং আমাদের সম্পূর্ণ ফিচার ব্যবহার করুন
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-ocean-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                বিনামূল্যে রেজিস্ট্রেশন করুন
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-colors"
              >
                যোগাযোগ করুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Company */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Fish className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Fish Care</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                বাংলাদেশের সবচেয়ে বিশ্বস্ত মাছচাষ ও ব্যবস্থাপনা প্ল্যাটফর্ম।
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">দ্রুত লিংক</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">আমাদের সম্পর্কে</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">সেবাসমূহ</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">মূল্য তালিকা</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">সচরাচর প্রশ্ন</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">সেবাসমূহ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">ড্যাশবোর্ড</Link></li>
                <li><Link href="/medicine" className="hover:text-white transition-colors">ওষুধ</Link></li>
                <li><Link href="/market" className="hover:text-white transition-colors">বাজার মূল্য</Link></li>
                <li><Link href="/disease-guide" className="hover:text-white transition-colors">রোগ নির্দেশিকা</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">যোগাযোগ</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +880 1700-000000
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@fishcare.com
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  ঢাকা, বাংলাদেশ
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 Fish Care। সর্বস্বত্ব সংরক্ষিত।
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-white transition-colors">গোপনীয়তা নীতি</Link>
              <Link href="/terms" className="hover:text-white transition-colors">ব্যবহারের শর্তাবলী</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}