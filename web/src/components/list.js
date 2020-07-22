import React from 'react';
import t from 'prop-types';
import {createUseStyles} from 'react-jss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle, faMapMarkerAlt, faFolder, faCompactDisc} from '@fortawesome/free-solid-svg-icons';
import BanSeller from './ban-seller';

const useStyles = createUseStyles({
    row: {
        display: 'flex',
        flexDirection: 'row',
        margin: '16px 0',
        paddingBottom: 16,
        borderBottom: '1px solid #ececec',

        '&:last-child': {
            borderBottom: 0,
        },
    },
    rowContent: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        flex: 1,
        position: 'relative',
        marginLeft: 16,
    },
    imageWrapper: {
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 2,
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 13,
        fontWeight: 700,
        lineHeight: 1.5,
        textTransform: 'capitalize',
    },
    condition: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        fontSize: 10,
    },
    conditionIcon: {
        marginRight: 4,

        '&:last-child': {
            margin: '0 4px 0 12px',
        },
    },
    description: {
        minHeight: 42,
        margin: '8px 0 12px',
        fontSize: 12,
        lineHeight: 1.4,
        textTransform: 'lowercase',
    },
    information: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 11,
        fontWeight: 700,
        color: '#7d7d7d',
    },
    link: {
        color: '#259dff',
        textDecoration: 'none',
    },
    linkSell: {
        fontSize: 12,
    },
    linkSeller: {
        marginLeft: 8,
    },
    price: {
        marginTop: 16,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#B12704',
    },
    ban: {
        display: 'flex',
        flexDirection: 'row',
    },
});

const Row = ({
    artist,
    description,
    price,
    image,
    urlCart,
    urlRelease,
    urlDetails,
    location,
    conditionMedia,
    conditionSleeve,
    seller,
    sellerLink,
}) => {
    const classes = useStyles();
    const baseUrl = 'https://www.discogs.com';

    return (
        <li className={classes.row}>
            <a
                href={baseUrl + urlCart}
                target="_blank"
                title={`Buy ${artist}`}
                className={classes.imageWrapper}
            >
                <img src={image} title={`Buy ${artist}`} className={classes.image} />
                <div className={classes.price}>{price}</div>
            </a>
            <div className={classes.rowContent}>
                <h3 className={classes.title}>
                    {artist}
                    <a
                        href={baseUrl + urlRelease}
                        target="_blank"
                        title="View release information"
                        className={classes.link}
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </a>
                </h3>
                <div className={classes.condition}>
                    <span className={classes.conditionIcon}>
                        <FontAwesomeIcon icon={faFolder} />
                    </span>
                    {conditionMedia}
                    <span className={classes.conditionIcon}>
                        <FontAwesomeIcon icon={faCompactDisc} />
                    </span>
                    {conditionSleeve}
                </div>
                <p className={classes.description}>{description}</p>
                <div className={classes.information}>
                    <span>
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
                    </span>
                    <div className={classes.ban}>
                        <BanSeller seller={seller} />
                        <a
                            href={baseUrl + sellerLink}
                            target="_blank"
                            title="View seller profile"
                            className={`${classes.link} ${classes.linkSeller}`}
                        >
                            {seller}
                        </a>
                    </div>
                </div>
            </div>
        </li>
    );
};

Row.propTypes = {
    artist: t.string.isRequired,
    description: t.string,
    price: t.string.isRequired,
    image: t.string.isRequired,
    urlCart: t.string.isRequired,
    urlRelease: t.string,
    urlDetails: t.string.isRequired,
    location: t.string,
    conditionMedia: t.string,
    conditionSleeve: t.string,
    seller: t.string.isRequired,
    sellerLink: t.string.isRequired,
};

const List = ({items}) => (
    <ul>
        {items.map((item) => {
            const {
                id,
                artist,
                description,
                price,
                image,
                urlCart,
                urlRelease,
                urlDetails,
                location,
                conditionMedia,
                conditionSleeve,
                seller,
                sellerLink,
            } = item;

            return (
                <Row
                    key={id}
                    artist={artist}
                    description={description}
                    price={price}
                    image={image}
                    urlCart={urlCart}
                    urlRelease={urlRelease}
                    urlDetails={urlDetails}
                    location={location}
                    conditionMedia={conditionMedia}
                    conditionSleeve={conditionSleeve}
                    seller={seller}
                    sellerLink={sellerLink}
                />
            );
        })}
    </ul>
);

List.propTypes = {
    items: t.arrayOf(
        t.shape({
            artist: t.string.isRequired,
            description: t.string,
            price: t.string.isRequired,
            image: t.string.isRequired,
            urlCart: t.string.isRequired,
            urlRelease: t.string,
            urlDetails: t.string.isRequired,
            location: t.string,
            conditionMedia: t.string,
            conditionSleeve: t.string,
            seller: t.string.isRequired,
            sellerLink: t.string.isRequired,
        })
    ),
};

export default List;
