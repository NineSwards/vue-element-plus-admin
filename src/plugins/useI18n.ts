import type { App } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';

import { createI18n } from 'vue-i18n';

import messages from '/@/locales/getMessage';
const localeData: I18nOptions = {
  legacy: false,
  locale: 'zh-cn',
  fallbackLocale: 'en',
  availableLocales: ['zh-cn', 'en'],
  messages,
  sync: true,
  silentTranslationWarn: true,
  missingWarn: true,
  silentFallbackWarn: true,
};
export let i18n: I18n;

// setup i18n instance with glob
export function setupI18n(app: App) {
  i18n = createI18n(localeData) as I18n;
  app.use(i18n);
}

type I18nGlobalTranslation = {
  (key: string): string;
  (key: string, locale: string): string;
  (key: string, locale: string, list: unknown[]): string;
  (key: string, locale: string, named: Record<string, unknown>): string;
  (key: string, list: unknown[]): string;
  (key: string, named: Record<string, unknown>): string;
};

type I18nTranslationRestParameters = [string, any];

export function useI18n(
  namespace?: string
): {
  t: I18nGlobalTranslation;
} {
  function getKey(key: string) {
    if (!namespace) {
      return key;
    }
    if (key.startsWith(namespace)) {
      return key;
    }
    return `${namespace}.${key}`;
  }
  const normalFn = {
    t: (key: string) => {
      return getKey(key);
    },
  };

  if (!i18n) {
    return normalFn;
  }

  const { t, ...methods } = i18n.global;

  const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
    if (!key) return '';
    return t(getKey(key), ...(arg as I18nTranslationRestParameters));
  };
  return {
    ...methods,
    t: tFn,
  };
}

// Why write this function？
// Mainly to configure the vscode i18nn ally plugin. This function is only used for routing and menus. Please use useI18n for other places

// 为什么要编写此函数？
// 主要用于配合vscode i18nn ally插件。此功能仅用于路由和菜单。请在其他地方使用useI18n
export const t = (key: string) => key;
