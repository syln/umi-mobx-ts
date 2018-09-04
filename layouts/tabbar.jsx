import React from 'react';
import { Icon } from 'antd';
import Link from 'umi/link'
import router from 'umi/router'
import withRouter from 'umi/withRouter';
import { observer, inject } from 'mobx-react';
import style from './index.less';

const Tabbar = observer(({ tabmodel, location }) => {
    const { tabActiveKey, tablist, keyArr, tabpane, currentPath } = tabmodel;
    
    const tabClick = (item) => {
        tabmodel.updateState({
            tabActiveKey: item.key
        });
    };

    const remove = (targetKey) => {
        let activeKey = targetKey;
        let lastIndex;
        keyArr.map((key, i) => {
            if (key === targetKey) {
                lastIndex = i - 1;
            }
        });

        const panes = keyArr.filter(key => key !== activeKey);

        if (lastIndex >= 0 && activeKey === tabActiveKey) {
            activeKey = panes[lastIndex];
            tabmodel.updateState({
                keyArr: panes,
                tabActiveKey: activeKey,
            });

        } else {
            activeKey = tabActiveKey;
            tabmodel.updateState({
                keyArr: panes,
                tabActiveKey: activeKey,
            });
        }
    };

    const listItem = tabpane.map(v => {
        return (
            <li key={v.key} className={tabActiveKey == v.key ? 'active-tab' : ''}>
                <Link to={v.url} onClick={e => tabClick(v)}>{v.title}</Link>
                {v.key == 'index' ? '' 
                : <Icon className="close-icon" type="close-circle" theme="filled" onClick={e => remove(v.key)} />}
            </li>
        );
    });
    return (
        <div className={style.tabbar}>
            <ul>
                {listItem}
            </ul>
        </div>
    );
}
);

export default withRouter(inject('tabmodel')(Tabbar));