import React from 'react';
import 'regenerator-runtime/runtime.js';
import {createUseStyles} from 'react-jss';
import List from './list';
import useFetch from '../hooks/use-fetch';

const useStyles = createUseStyles({
    content: {
        margin: '76px 16px 0',
    },
});

const Content = () => {
    const classes = useStyles();
    const [data, loading, error] = useFetch('/discogs/entries/all', 'Access-Control-Allow-Origin: *');

    if (error) {
        return 'Error';
    }

    if (loading) {
        return <div className={classes.content}>Cargando...</div>;
    }

    return (
        <div className={classes.content}>
            <List items={data} />
        </div>
    );
};

export default Content;
