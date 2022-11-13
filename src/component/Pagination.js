import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import CryptoTable from './CryptoTable';
import { CoinListURL } from './config'
import { CryptoContext } from './Context';
import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';

// Example items, to simulate fetching from another resources.



function Pagination({ itemsPerPage }) {

    const { search, setSearch } = useContext(CryptoContext)


    const currency = 'inr'
    const [items, setitems] = useState([]);

    useEffect(() => {

        fetch(CoinListURL(currency))
            .then(res => res.json())
            .then(data => setitems(data));

    }, [search])

    function handleSearch() {

        let searchedcoin = [];
        if (search.length == 0) {
            return;
        }
        else {
            searchedcoin = items.filter((item) => (
                item?.name.toLowerCase().includes(search)
                || item?.symbol.toLowerCase().includes(search)
            ))
        }
        if (searchedcoin.length != 0) {
            setitems(searchedcoin)
        }
        console.log(items);

    }

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);




    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, items]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (



        //  Search BOX 
        <div className="container-fluid">

            <div className="row">
                <div className="col-md-12">

                    <div className="input-group mb-4">
                        <input
                            style={{ backgroundColor: 'black', color: "white", margin: '30px 0px 0px 12px' }}
                            type="text"
                            className="form-control"
                            placeholder="Search Crypto By Name" aria-label="Username"
                            value={search}
                            onChange={(e) => { (setSearch(e.target.value)) }}
                        />
                        &nbsp;
                        <div className="input-group-append">
                            <button
                                onClick={() => { handleSearch() }}
                                style={{ backgroundColor: 'black', color:"white", margin: "30px 12px 0px 0px",cursor:'pointer' }}
                                className="btn btn-outline-secondary" type="button">Search
                            </button>
                        </div>
                    </div>
                    
                </div>
                <CryptoTable currentItems={currentItems} />
            
            <div >
                    <ReactPaginate
                        previousLabel={"<<"}
                        nextLabel={">>"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={4}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />

                
            </div>
            </div>
        </div>

    );
}

export default Pagination;
