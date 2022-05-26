import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/types';
import CardItem from './CardItem';

export interface IBoard {
  title: string;
  description: string;
}

const CardBoard = () => {
  const boardArr = useSelector((state: RootState) => state.board.boardItems);

  return (
    <ul>
      {boardArr?.map((board: any) => {
        return (
          <CardItem
            key={board.id}
            item={{
              id: board.id,
              title: board.title,
              description: board.description,
            }}
          />
        );
      })}
    </ul>
  );
};

export default CardBoard;
