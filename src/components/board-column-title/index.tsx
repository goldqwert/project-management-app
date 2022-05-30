import { ChangeEvent, useState } from 'react';
import { Button, Input } from 'antd';

import './index.scss';

import { BoardColumnTitleProps } from './types';
import { columnsService } from '../../api';
import { useAppDispatch, useCookiesStorage } from '../../hooks';
import { getMessageFromError, openNotification } from '../../helpers';
import { getBoardsColumnsAsync } from '../../store';
import { useTranslation } from 'react-i18next';

const BoardColumnTitle = ({ title, order, boardId, columnId }: BoardColumnTitleProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { cookies } = useCookiesStorage(['authToken']);
  const [isEditColumnTitle, setIsEditColumnTitle] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);
  const [columnTitleLoading, setColumnTitleLoading] = useState(false);

  const onConfirmEditColumnTitle = async () => {
    setColumnTitleLoading(true);
    try {
      await columnsService.updateColumn(cookies.authToken, boardId, columnId, order, columnTitle);
      openNotification('success', t('columnUpdated'));
      dispatch(getBoardsColumnsAsync({ token: cookies.authToken, boardId }));
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    } finally {
      setColumnTitleLoading(false);
    }
  };

  const onChangeTitleColumn = (e: ChangeEvent<HTMLInputElement>) => setColumnTitle(e.target.value);

  const onEditColumnTitle = () => setIsEditColumnTitle(true);

  const onCancelEditColumnTitle = () => {
    setIsEditColumnTitle(false);
    setColumnTitle(title);
  };

  return (
    <>
      {isEditColumnTitle ? (
        <div className="board-columns__edit">
          <Input
            value={columnTitle}
            className="board-columns__title-edit"
            placeholder={t('newTitle')}
            onChange={onChangeTitleColumn}
            maxLength={30}
          />
          <div className="board-columns__title-btns">
            <Button
              loading={columnTitleLoading}
              type="link"
              size="small"
              onClick={onConfirmEditColumnTitle}
            >
              {t('submit')}
            </Button>
            <Button
              loading={columnTitleLoading}
              type="link"
              size="small"
              onClick={onCancelEditColumnTitle}
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      ) : (
        <h3 className="board-columns__title" onClick={onEditColumnTitle}>
          {title}
        </h3>
      )}
    </>
  );
};

export default BoardColumnTitle;
