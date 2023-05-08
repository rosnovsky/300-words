const languages = {
  us_en: {
    "dashboard":{
      "navigation":{
        "get support":"Get Support",
      },
      "activity": {
        "active users": "Active Users",
        "description": "Users who have logged in the last 30 days",
        "empty": "No active users",
        "total logins": "Total Logins",
        "last 7 days": "Last 7 Days",
        "last 30 days": "Last 30 Days",
      }
    }
  },
  ru_ru: {
    "dashboard":{
      "navigation":{
        "get support":"Поддержка",
      },
      "activity": {
        "active users": "Активные пользователи",
        "description": "Пользователи, которые вошли в систему за последние 30 дней",
        "empty": "Нет активных пользователей",
        "total logins": "Всего входов",
        "last 7 days": "Последние 7 дней",
        "last 30 days": "Последние 30 дней",
      },
    },
  },
};

type LanguageMap = typeof languages;

type LanguageName = keyof LanguageMap;

type Language = LanguageMap[LanguageName];

type PathInto<T extends Record<string, any>> = keyof {
  [K in keyof T as T[K] extends string
    ? K
    : T[K] extends Record<string, any>
      ? `${K & string}.${PathInto<T[K]> & string}`
      : never]: any;
};

function get(
  object: Record<string, unknown>,
  path: string[],
  index = 0,
): string {
  const key = path[index];
  if( key === undefined ) return '';
  const result = object[key];
  if( result === undefined ) return '';
  if( typeof result === 'string' ) return result;
  return get(Object(result), path, index + 1);
}

const language: LanguageName = 'us_en';

function translate(key: PathInto<Language>): string {
  return get(languages[language], key.split('.'));
}

const translated = translate('dashboard.navigation.get support');
