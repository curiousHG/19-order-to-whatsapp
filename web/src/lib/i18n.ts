import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Lang = 'en' | 'hi'

const STRINGS = {
  shopName: { en: 'Khari Baoli', hi: 'खारी बावली' },
  shopAddress: { en: 'Chandni Chowk, Delhi 6', hi: 'चांदनी चौक, दिल्ली 6' },
  shopSeal: { en: '19 Khari Baoli', hi: '19 खारी बावली' },

  searchProducts: { en: 'Search products', hi: 'सामान खोजें' },
  searchPlaceholder: { en: 'Search products…', hi: 'सामान खोजें…' },
  clearInput: { en: 'Clear input', hi: 'मिटाएँ' },
  cancel: { en: 'Cancel', hi: 'रद्द करें' },
  startTyping: {
    en: 'Start typing to search across all products',
    hi: 'सभी सामान में खोजने के लिए टाइप करें',
  },
  noItemsInCategory: {
    en: 'No items available in this category',
    hi: 'इस श्रेणी में कोई सामान उपलब्ध नहीं है',
  },
  failedToLoad: { en: 'Failed to load products.', hi: 'सामान लोड नहीं हो सका।' },

  openCart: { en: 'Open cart', hi: 'टोकरी खोलें' },
  closeCart: { en: 'Close cart', hi: 'टोकरी बंद करें' },
  yourCart: { en: 'Your Cart', hi: 'आपकी टोकरी' },
  empty: { en: 'Empty', hi: 'खाली' },
  cartEmpty: { en: 'Your cart is empty', hi: 'आपकी टोकरी खाली है' },
  cartEmptyHint: {
    en: 'Browse the catalog and tap + next to any product to add it here.',
    hi: 'सूची देखें और किसी भी सामान के आगे + दबाकर उसे यहाँ जोड़ें।',
  },
  checkout: { en: 'Checkout', hi: 'आगे बढ़ें' },
  clearCart: { en: 'Clear cart', hi: 'टोकरी खाली करें' },
  item: { en: 'item', hi: 'सामान' },
  items: { en: 'items', hi: 'सामान' },

  orderSummary: { en: 'Order summary', hi: 'ऑर्डर का विवरण' },
  confirmAmount: {
    en: 'The shop will confirm the final amount on WhatsApp',
    hi: 'दुकान व्हाट्सएप पर अंतिम राशि बताएगी',
  },
  deliveryDetails: { en: 'Delivery details', hi: 'डिलीवरी की जानकारी' },
  notYou: { en: 'Not you?', hi: 'आप नहीं?' },
  signInWithGoogle: { en: 'Sign in with Google', hi: 'गूगल से साइन इन करें' },
  labelName: { en: 'Name', hi: 'नाम' },
  labelPhone: { en: 'Phone', hi: 'फ़ोन' },
  labelEmail: { en: 'Email', hi: 'ईमेल' },
  labelAddress: { en: 'Delivery address', hi: 'डिलीवरी का पता' },
  namePlaceholder: { en: 'Your name', hi: 'आपका नाम' },
  submitting: { en: 'Submitting…', hi: 'भेजा जा रहा है…' },
  submitAndOpenWhatsApp: {
    en: 'Submit & Open WhatsApp',
    hi: 'भेजें और व्हाट्सएप खोलें',
  },
  orderRecorded: {
    en: 'Your order is recorded with us and sent to the shop via WhatsApp.',
    hi: 'आपका ऑर्डर हमारे पास दर्ज हो जाता है और व्हाट्सएप से दुकान को भेजा जाता है।',
  },
  confirmOrder: { en: 'Confirm order', hi: 'ऑर्डर पक्का करें' },
  backToShop: { en: 'Back to shop', hi: 'दुकान पर वापस' },

  errEnterName: { en: 'Enter your name', hi: 'अपना नाम भरें' },
  errEnterNameDesc: {
    en: 'The shop needs a name to label your order.',
    hi: 'ऑर्डर पर नाम लिखने के लिए दुकान को यह चाहिए।',
  },
  errEnterPhone: {
    en: 'Enter a 10-digit phone number',
    hi: '10 अंकों का फ़ोन नंबर भरें',
  },
  errEnterAddress: { en: 'Enter your delivery address', hi: 'डिलीवरी का पता भरें' },
  errEnterAddressDesc: {
    en: 'The shop needs somewhere to deliver to.',
    hi: 'दुकान को पता चाहिए ताकि सामान पहुँचाया जा सके।',
  },
  errOrderFailed: { en: 'Order failed', hi: 'ऑर्डर नहीं भेजा जा सका' },

  remove: { en: 'Remove', hi: 'हटाएँ' },

  language: { en: 'Language', hi: 'भाषा' },
  switchToHindi: { en: 'हिंदी में देखें', hi: 'हिंदी में देखें' },
  switchToEnglish: { en: 'View in English', hi: 'अंग्रेज़ी में देखें' },
} as const

export type StringKey = keyof typeof STRINGS

interface LangState {
  lang: Lang
  setLang: (lang: Lang) => void
}

function applyLang(lang: Lang) {
  document.documentElement.lang = lang
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
    }),
    {
      name: 'lang',
      onRehydrateStorage: () => (state) => state && applyLang(state.lang),
    }
  )
)

applyLang(useLangStore.getState().lang)
useLangStore.subscribe((state) => applyLang(state.lang))

export function useLang(): Lang {
  return useLangStore((s) => s.lang)
}


export function useT(): (key: StringKey) => string {
  const lang = useLang()
  return (key) => STRINGS[key][lang]
}

export function cartLabel(
  item: { name: string; nameHi?: string },
  lang: Lang
): string {
  return lang === 'hi' && item.nameHi ? item.nameHi : item.name
}

export function localName(
  entity: { name: string; name_hi?: string },
  lang: Lang
): string {
  return lang === 'hi' && entity.name_hi ? entity.name_hi : entity.name
}
