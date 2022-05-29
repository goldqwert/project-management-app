import React from 'react';
import { List } from 'antd';

const data = [
  {
    id: '1',
    title: 'Ant Design Title 1',
    description: '1',
  },
];

const BoardsList = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={({ title, description }: IBoard) => (
      <List.Item>
        <List.Item.Meta
          title={<a href="https://ant.design">{title}</a>}
          description={description}
        />
      </List.Item>
    )}
  />
);

export default BoardsList;
