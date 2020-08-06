import React from 'react';
import t from 'prop-types';
import {createUseStyles} from 'react-jss';
import useAxios from 'axios-hooks';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBan, faCheckCircle} from '@fortawesome/free-solid-svg-icons';

const useStyles = createUseStyles({
    ban: {
        padding: '0 20px',
    },
    link: {
        color: '#ec3000',
        cursor: 'pointer',
    },
    banned: {
        color: '#03bf24',
    },
});

const BanSeller = ({seller}) => {
    const classes = useStyles();
    const [{data, loading, error}, executePut] = useAxios(
        {
            url: `${process.env.API_URL}/discogs/ban`,
            method: 'POST',
        },
        {manual: true}
    );

    const ban = () => {
        executePut({data: `seller=${seller}`});
    };

    if (loading) {
        return <p>Banning...</p>;
    }

    if (error) {
        console.log(error);
        return <p>Error!</p>;
    }

    return (
        <div className={classes.form}>
            {data ? (
                <span className={classes.banned}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                </span>
            ) : (
                <a className={classes.link} onClick={ban} title={`Block ${seller} seller`}>
                    <FontAwesomeIcon icon={faBan} />
                </a>
            )}
        </div>
    );
};

BanSeller.propTypes = {
    seller: t.string.isRequired,
};

export default BanSeller;
