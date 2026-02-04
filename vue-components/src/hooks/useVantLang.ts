import { Locale } from 'vant';
import bnBD from 'vant/es/locale/lang/bn-BD';
import enUS from 'vant/es/locale/lang/es-ES';
import esEs from 'vant/es/locale/lang/es-ES';
import frFR from 'vant/es/locale/lang/fr-FR';
import hiIN from 'vant/es/locale/lang/hi-IN';
import idID from 'vant/es/locale/lang/id-ID';
import ruRU from 'vant/es/locale/lang/ru-RU';
import zhCN from 'vant/es/locale/lang/zh-CN';

import filPh from '../i18n/vant/fil-PH';
import haNG from '../i18n/vant/ha-NG';
import igNG from '../i18n/vant/ig-NG';
import swKE from '../i18n/vant/sw-KE';
import yoNG from '../i18n/vant/yo-NG';
import { getLanguage } from '../utils';

const langOptions: Record<string, any> = {
  bn: bnBD,
  en: enUS,
  es: esEs,
  fr: frFR,
  hi: hiIN,
  id: idID,
  ru: ruRU,
  zh: zhCN,
  fil: filPh,
  ha: haNG,
  ig: igNG,
  sw: swKE,
  yo: yoNG,
};

export const useVantLang = () => {
  const lang = getLanguage();

  Locale.use(lang, langOptions[lang] ?? langOptions['en']);
};
