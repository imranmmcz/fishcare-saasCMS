import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string, currency = 'BDT'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatDate(date: Date | string, locale = 'bn-BD'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export const fishCategories = [
  { value: 'CARP', label: 'কার্প', labelEn: 'Carp' },
  { value: 'CATFISH', label: 'বাঘা মাছ', labelEn: 'Catfish' },
  { value: 'TILAPIA', label: 'তেলাপিয়া', labelEn: 'Tilapia' },
  { value: 'PERCH', label: 'পার্চ', labelEn: 'Perch' },
  { value: 'EEL', label: 'চিংড়ি', labelEn: 'Eel' },
  { value: 'HERRING', label: 'হেরিং', labelEn: 'Herring' },
  { value: 'SHRIMP', label: 'চিংড়ি', labelEn: 'Shrimp' },
  { value: 'OTHER', label: 'অন্যান্য', labelEn: 'Other' },
];

export const fishSizes = [
  { value: 'FINGERLING', label: 'পোনা', weight: '< 100g' },
  { value: 'SMALL', label: 'ছোট', weight: '100g - 500g' },
  { value: 'MEDIUM', label: 'মাঝারি', weight: '500g - 1kg' },
  { value: 'LARGE', label: 'বড়', weight: '1kg - 3kg' },
  { value: 'EXTRA_LARGE', label: 'অতি বড়', weight: '> 3kg' },
];

export const medicineCategories = [
  { value: 'ANTIBIOTIC', label: 'অ্যান্টিবায়োটিক', color: 'red' },
  { value: 'VITAMIN', label: 'ভিটামিন', color: 'yellow' },
  { value: 'ANTIFUNGAL', label: 'ছত্রাকনাশক', color: 'purple' },
  { value: 'PROBIOTIC', label: 'প্রোবায়োটিক', color: 'green' },
  { value: 'DISINFECTANT', label: 'জীবাণুনাশক', color: 'blue' },
  { value: 'MINERAL', label: 'খনিজ', color: 'orange' },
];

export const divisions = [
  { value: 'Dhaka', label: 'ঢাকা' },
  { value: 'Chittagong', label: 'চট্টগ্রাম' },
  { value: 'Khulna', label: 'খুলনা' },
  { value: 'Rajshahi', label: 'রাজশাহী' },
  { value: 'Sylhet', label: 'সিলেট' },
  { value: 'Barisal', label: 'বরিশাল' },
  { value: 'Rangpur', label: 'রংপুর' },
  { value: 'Mymensingh', label: 'ময়মনসিংহ' },
];

export const paymentMethods = [
  { value: 'COD', label: 'ক্যাশ অন ডেলিভারি' },
  { value: 'BPAY', label: 'বিকাশ' },
  { value: 'NAGAD', label: 'নগদ' },
  { value: 'SSLCOMMERZ', label: 'কার্ড/মোবাইল ব্যাংকিং' },
];