import { Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useCookiesStorage } from '../../hooks';

import './index.scss';

const SwitchLang = () => {
  const [cookies] = useCookies(['authToken', 'lang']);
  const { setCookie } = useCookiesStorage(['']);
  const { t, i18n } = useTranslation();
  const [checked, setChecked] = useState(false);

  const lang = cookies.lang;

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
      setChecked(lang === 'ru');
    }
  }, [lang]);

  const onChangeLanguage = (checked: boolean) => {
    const lang = checked ? 'ru' : 'en';

    i18n.changeLanguage(lang);
    setCookie('lang', lang);
    setChecked(lang === 'ru');
  };

  return (
    <Switch
      checked={checked}
      className="switch"
      checkedChildren={t('ru')}
      unCheckedChildren={t('en')}
      onChange={onChangeLanguage}
    />
  );
};

export default SwitchLang;
