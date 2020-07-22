import 'reset-css';
import React from 'react';
import ReactDom from 'react-dom';
import {create as createJss} from 'jss';
import {JssProvider} from 'react-jss';
import vendorPrefixer from 'jss-plugin-vendor-prefixer';
import camelCase from 'jss-plugin-camel-case';
import defaultUnit from 'jss-plugin-default-unit';
import nested from 'jss-plugin-nested';
import ErrorBoundary from 'react-error-boundary';
import App from './components/app';

const jss = createJss();
jss.use(nested(), camelCase(), defaultUnit(), vendorPrefixer());

const RenderApp = () => (
    <ErrorBoundary>
        <JssProvider jss={jss}>
            <App />
        </JssProvider>
    </ErrorBoundary>
);

ReactDom.render(<RenderApp />, document.getElementById('root'));
