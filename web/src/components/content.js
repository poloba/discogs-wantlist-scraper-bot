import React from 'react';
import t from 'prop-types';
import 'regenerator-runtime/runtime.js';
import {createUseStyles} from 'react-jss';
import List from './list';
import useFetch from '../hooks/use-fetch';

const useStyles = createUseStyles({
    content: {
        margin: '76px 16px 0',
    },
});

const Content = ({itemsLength}) => {
    const classes = useStyles();
    const [data, loading, error] = useFetch(`http://localhost:3333/rest/latest/discogs/${itemsLength}`);

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

Content.propTypes = {
    itemsLength: t.number.isRequired,
};

export default Content;
