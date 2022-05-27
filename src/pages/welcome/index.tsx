import { Layout, Carousel, List, Avatar, Descriptions, Button, Divider } from 'antd';

import { DEVELOPERS_DATA, DEVELOPER_AVATAR } from '../../constants';

import './index.scss';

const { Content } = Layout;

const WelcomePage = () => (
  <Content className="welcome">
    <div className="welcome__content">
      <Carousel>
        <div className="welcome__slide">
          <h3 className="welcome__title">Project Management App</h3>
        </div>
        <div className="welcome__slide">
          <h3 className="welcome__title">Project Management App</h3>
        </div>
        <div className="welcome__slide">
          <h3 className="welcome__title">Project Management App</h3>
        </div>
      </Carousel>
      <Divider />
      <Descriptions title="Project and course info">
        <Descriptions.Item label="Project">Project Management App</Descriptions.Item>
        <Descriptions.Item label="Info">Application that helps to set tasks</Descriptions.Item>
        <Descriptions.Item label="Stack">React, Redux</Descriptions.Item>
        <Descriptions.Item label="Course">Rolling Scopes School React</Descriptions.Item>
        <Button type="link">
          <a
            className="footer__rsschool"
            href="https://rs.school/react/"
            target="_blank"
            rel="noreferrer"
          >
            Link to course
          </a>
        </Button>
      </Descriptions>
      <Divider />
      <List
        itemLayout="horizontal"
        header={<h3>Team</h3>}
        bordered
        dataSource={DEVELOPERS_DATA}
        renderItem={({ name, github }) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={DEVELOPER_AVATAR} />}
              title={
                <a href={github} target="_blank" rel="noreferrer">
                  {name}
                </a>
              }
              description="Front-End Developer"
            />
          </List.Item>
        )}
      />
    </div>
  </Content>
);

export default WelcomePage;
