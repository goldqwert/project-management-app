import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ButtonGoHome = () => {
  const { t } = useTranslation();

  return (
    <Button type="primary">
      <Link to="/">{t('goToHome')}</Link>
    </Button>
  );
};

export default ButtonGoHome;
