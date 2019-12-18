/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-indent */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-indent-props */
import React from "react";
import ReactNextPaging from "react-next-paging";
import { Spin, Button } from 'antd';
import PropTypes from 'prop-types'


const buttonStyles = {
    margin: 5,
    width: 50
};


const PaginacionTabla = ({ itemsperpage, items, pagesspan }) => {
    return (
        <ReactNextPaging
            itemsperpage={itemsperpage}
            items={items}
            pagesspan={pagesspan}
        >
            {({
                getBackButtonProps,
                getFastBackButtonProps,
                getFwdButtonProps,
                getFastFwdButtonProps,
                getSelPageButtonProps,
                inipagearray,
                pagesforarray,
                currentpage,
                noitems,
                initialitem,
                lastitem,
                goBackBdisabled,
                goFastBackBdisabled,
                goFwdBdisabled,
                goFastFwdBdisabled
            }) => (
                    // eslint-disable-next-line max-len
                    <div className="ant-list ant-list-lg ant-list-split ant-list-something-after-last-item">
                        <div className="ant-spin-nested-loading">
                            <div className="ant-spin-container">
                                {items.length === 0 && <Spin size="large" />}
                                <ul className="ant-list-items">
                                    {items.slice(initialitem, lastitem).map((item) => {
                                        return item;
                                    })}
                                </ul>
                            </div>
                        </div>

                        {noitems > 0
                            ? [
                                <div key='list-pagination' className="ant-list-pagination">
                                    <Button
                                        style={buttonStyles}
                                        {...getFastBackButtonProps()}
                                        disabled={goFastBackBdisabled}
                                    >
                                        {"<<"}
                                    </Button>
                                    <Button
                                        style={buttonStyles}
                                        {...getBackButtonProps()}
                                        disabled={goBackBdisabled}
                                    >
                                        {"<"}
                                    </Button>
                                    {Array.from(
                                        { length: pagesforarray },
                                        (v, i) => i + inipagearray
                                    ).map(page => {
                                        return (
                                            <Button
                                                key={page}
                                                style={{ margin: '2px' }}
                                                {...getSelPageButtonProps({ page })}
                                                disabled={currentpage == page}
                                            >
                                                {page}
                                            </Button>
                                        );
                                    })}
                                    <Button
                                        style={buttonStyles}
                                        {...getFwdButtonProps()}
                                        disabled={goFwdBdisabled}
                                    >
                                        {">"}
                                    </Button>
                                    <Button
                                        style={buttonStyles}
                                        {...getFastFwdButtonProps()}
                                        disabled={goFastFwdBdisabled}
                                    >
                                        {">>"}
                                    </Button>
                                </div>
                            ]
                            : null}
                    </div>
                )}
        </ReactNextPaging>
    );
};

PaginacionTabla.propTypes = {
    itemsperpage: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.object),
    pagesspan: PropTypes.number,
}

PaginacionTabla.defaultProps = {
    itemsperpage: 5,
    items: [],
    pagesspan: 3
}

export default PaginacionTabla;