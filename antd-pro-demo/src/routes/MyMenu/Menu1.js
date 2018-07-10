import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, List } from 'antd';
import moment from 'moment';
import styles from './Menu1.less';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ menu1, loading }) => ({
  menu1,
  menu1Loading: loading.effects['menu1/fetchList'],
}))
export default class Menu1 extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu1/fetchList',
    });
  }

  renderActivities() {
    const {
      menu1: { list },
    } = this.props;
    return list.map(item => {
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            title={
              <span>
                <a className={styles.username}>{item.key}</a>
                &nbsp;
                <span className={styles.event}>{item.value}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const { menu1Loading } = this.props;

    return (
      <PageHeaderLayout className={styles.bar1}>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="栅格1"
              loading={menu1Loading}
            >
              <List loading={menu1Loading} size="large">
                <div>{this.renderActivities()}</div>
              </List>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="栅格2"
              loading={menu1Loading}
            >
              待规划
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
