import React from 'react';
import {createUseStyles} from 'react-jss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCompactDisc, faBan} from '@fortawesome/free-solid-svg-icons';

const useStyles = createUseStyles({
    header: {
        position: 'fixed',
        top: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: 'calc(100% - 40px)',
        padding: '0 20px',
        background: '#333',
        color: '#fff',
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        color: '#fcea63',
        fontSize: 24,
        fontWeight: '700',
    },
    text: {
        marginLeft: 16,
    },
});

const Header = () => {
    const classes = useStyles();

    return (
        <header className={classes.header}>
            <h1 className={classes.title}>
                <div>
                    <FontAwesomeIcon icon={faCompactDisc} />
                    <span className={classes.text}>Discogs wantlist</span>
                </div>
                <FontAwesomeIcon icon={faBan} />
            </h1>
        </header>
    );
};

export default Header;
