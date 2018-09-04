import React from 'react'
import styles from './index.less';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import { observer, inject } from 'mobx-react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Row, Col } from 'antd';
import { MENU } from '../utils/menu'

const { SubMenu } = Menu;
const { Header } = Layout;


const Headerpage = observer(({ tabmodel, location }) => {

    const { tabActiveKey, tablist, keyArr } = tabmodel;

    const headMenuClick = (item) => {
        let itemKey = item.key;
        let arr = [].concat(tablist);
        let keyArr1 = [].concat(keyArr);
        if (keyArr1.indexOf(itemKey) === -1) {
            keyArr1.push(itemKey);
            tabmodel.updateState({
                keyArr: keyArr1,
                tabActiveKey: itemKey
            });
        } else {
            tabmodel.updateState({
                tabActiveKey: itemKey
            });
        }
    };

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <a href="javascript:;">用户信息</a>
            </Menu.Item>
            <Menu.Item key="0">
                <a href="javascript:;">退出</a>
            </Menu.Item>
        </Menu>
    );
    const menuItem = MENU.map((v) => {
        return (
            v.children ?
                <SubMenu key={v.key} title={<span>{v.title}</span>}>
                    {
                        v.children.map(k => {
                            return (
                                <Menu.Item key={k.key} onClick={e => headMenuClick(k)}>
                                    <Link to={k.url}>{k.title}</Link>
                                </Menu.Item>
                            );
                        })
                    }
                </SubMenu>
                :
                <Menu.Item key={v.key} onClick={e => headMenuClick(v)}>
                    <Link to={v.url}>
                        {v.title}
                    </Link>
                </Menu.Item>
        );
    });
    return (
        <Header className={styles.header}>
            <Row gutter={8}>
                <Col span={2}>
                    <div className="logo">
                        <Icon type="appstore" />
                        <span>LOGO</span>
                    </div>
                </Col>
                <Col span={20}>
                    <Menu
                        mode="horizontal"
                        className="menu-nav"
                        defaultSelectedKeys={[tabActiveKey]}
                        selectedKeys={[tabActiveKey]}
                    >
                        {menuItem}
                    </Menu>
                </Col>
                <Col span={2}>
                    <div className="user">
                        <div>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" href="javascript:;">
                                    用户 <Icon type="down" />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </Col>
            </Row>
        </Header>
    );
});

export default withRouter(inject('tabmodel')(Headerpage));