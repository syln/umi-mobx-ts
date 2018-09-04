import React from 'react';
import styles from './index.less';
import withRouter from 'umi/withRouter';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';
import Header from './header';
import Tabbar from './tabbar';
import {SIDE_MENU} from '../utils/menu';
import {Provider} from 'mobx-react';
import stores from '../models';

const { Content } = Layout;

const Layoutpage = ({ children, location }) => {
    return (
        <Provider {...stores}>
            <Layout className={styles.mainLayout}>
                <Header />
                <Tabbar />
                <Content className="main-content">
                    <Layout>
                        <Content className="content-wrap">
                            {children}
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Provider>
    );
};

export default withRouter(Layoutpage);