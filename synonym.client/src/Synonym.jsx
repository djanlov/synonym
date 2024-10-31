import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
/*import './App.css';*/
import './Synonym.css';

function Synonym() {
    const [search, setSearch] = useState();
    const [show, setShow] = useState(false);
    const searchRef = useRef(null);
    const firstRef = useRef(null);
    const secondRef = useRef(null);

    const searchResult = search === undefined ?
        <p></p> :
        search.synonyms.length > 0 ?
            <p>{search.word} has the following synonyms: {search.synonyms.join(', ')} </p> :
            <p>{search.word} has no synonyms.</p>;
    return (
        <div className="d-flex justify-content-center bd-highlight mb-3">
            <div className="p-2 bd-highlight">
                <h1 id="tableLabel">Synonym lookup</h1>
                <p>This webpage give you the ability to search and add synonyms</p>

                <SearchBar />

                {searchResult}

                <ModalAdd />
            </div>
        </div>
    );   

    



    function ModalAdd() {
        function handleClearButtonClick() {
            firstRef.current.value = null;
            secondRef.current.value = null;
            firstRef.current.focus();
        }

        function handleAddButton2Click() {
            alert(`${firstRef.current.value}:${secondRef.current.value}`);
            firstRef.current.value = null;
            secondRef.current.value = null;
            firstRef.current.focus();
        }

        const handleClose = () => setShow(false);
        const handleShow = () => {
            setShow(true);

        }

        return (
            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={true}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add synonym</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex flex-row">
                            <div className="p-2">
                                <input
                                    ref={firstRef}
                                    name="first"
                                    type="text"
                                    autoFocus
                                    placeholder="first word..."
                                    className="form-control"
                                />
                            </div>
                            <div className="p-2">
                                <input
                                    ref={secondRef}
                                    name="second"
                                    type="text"
                                    placeholder="second word..."
                                    className="form-control"
                                />
                            </div>
                            <div className="p-2"><button onClick={addSynonyms} className="btn btn-secondary">Add</button></div>
                            <div className="p-2"><button onClick={handleClearButtonClick} className="btn btn-secondary">Clear</button></div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    async function searchSynonyms() {
        if (searchRef.current.value != "") {
            console.log(`SEARCH: ${searchRef.current.value}`);
            const response = await fetch(`synonym/search/${searchRef.current.value}`);
            const data = await response.json();
            setSearch(data);
            
        }
        searchRef.current.focus();
    }

    async function addSynonyms() {
        if (firstRef.current.value != "" && secondRef.current.value != "") {
            console.log(`ADD: ${firstRef.current.value}:${secondRef.current.value}`);
            const response = await fetch(`synonym/add/${firstRef.current.value}/${secondRef.current.value}`, { method: "POST" });

            if (response.status === 200) {
                firstRef.current.value = null;
                secondRef.current.value = null;
                firstRef.current.focus();

            }
        }        
    }

    function SearchBar() {
        const onFormSubmit = e => {
            e.preventDefault();
            // send state to server with e.g. `window.fetch`
            searchRef.current.focus();
        }

        const handleClose = () => setShow(false);
        const handleShow = () => {
            setShow(true);

        }

        return (
            <form onSubmit={onFormSubmit}>
                <div className="d-flex flex-row">            
                    <div className="p-2">
                        <input
                            type="text"
                            name="search"
                            ref={searchRef}
                            autoFocus
                            placeholder="Search..."  
                            className="form-control"
                            />
                    </div>
                    <div className="p-2">
                        <input
                            type="submit"
                            onClick={searchSynonyms}
                            value="Search"
                            className="btn btn-primary" />
                    </div>
                    <div className="p-2">
                        <Button variant="secondary" onClick={handleShow}>
                            Add synonym
                        </Button>
                    </div>                      
                </div>
            </form>
        );
    }
}

export default Synonym;