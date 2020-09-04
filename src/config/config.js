// to add support for a new locale:
// 1. upload flag .png to public/images & import it here
// 2. add the new locale below to "supportedLocales" object
// 3. add new translations to "translations.js" in this folder
import en from '../../public/images/United_Kingdom.png'
import pl from '../../public/images/Poland.png'

export const supportedLocales = {
  en: {
    name: 'English',
    flag: en,
  },
  pl: {
    name: 'polski',
    flag: pl,
  },
}

export const fallbackLocale = 'en'
