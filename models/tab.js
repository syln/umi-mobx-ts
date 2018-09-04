import {
    observable,
    set,
    autorun,
    configure,
    action,
    reaction
} from 'mobx';

import {
    MENU
} from '../utils/menu';

import router from 'umi/router'

configure({
    enforceActions: true
});

const Tabmodel = observable({
    tablist: [],
    tabActiveKey: 'index',
    keyArr: ['index'],
    // action
    addTab(payload) {
        this.tablist = payload.tablist;
        this.keyArr = payload.keyArr;
    },
    updateState(payload) {
        set(this, payload);
    },
    get tabpane() {
        let arr = [];
        let keyarrs = this.keyArr;

        function getItem(data) {
            if (keyarrs.indexOf(data.key) !== -1) {
                arr.push(data);
            }
            if (data.children) {
                if (data.children.length > 0) {
                    getItems(data.children);
                }
            }
        }

        function getItems(data) {
            for (let i = 0; i < data.length; i++) {
                getItem(data[i]);
            }
        }

        getItems(MENU);

        return arr;

    },
    /* 获取当前路径 */
    get currentPath() {
        let currentUrl;

        let urlKey = this.tabActiveKey;

        function getPath(data) {
            if (data.key === urlKey) {
                currentUrl = data.url;

                return currentUrl;
            }
            if (data.children && data.children.length > 0) {
                getPaths(data.children);
            }
        }

        function getPaths(data) {
            for (let i = 0; i < data.length; i++) {
                getPath(data[i]);
            }
        }

        getPaths(MENU);

        return currentUrl;
    },
}, {
    addTab: action,
    updateState: action
});

/* 检测数据改动 */
autorun(() => {
    router.replace({
        pathname: Tabmodel.currentPath
    });
});

export default Tabmodel;