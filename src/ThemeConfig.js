import React, {Suspense} from 'react';
import './ThemeConfig.css';
import {useSelector} from "react-redux";
import {Spin} from "antd";

const ThemeConfig = () => {

    const AppDark = React.lazy(() => import("./themes/AppDark"));
    const AppLight = React.lazy(() => import("./themes/AppLight"));

    const {isDark} = useSelector(state => state.app)
    if (isDark) {
        return (
            <Suspense fallback={ <div className="example"> <Spin size="large" /></div>}>
                <AppDark/>
            </Suspense>
        )
    } else {
        return (
            <Suspense fallback={ <div className="example"> <Spin size="large" /></div>}>
                <AppLight/>
            </Suspense>
        )
    }
};

export default ThemeConfig;