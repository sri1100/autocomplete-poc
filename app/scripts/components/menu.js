/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import axios from 'axios';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchTerm: '',
            inputTimer: null,
            searchResults: []
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch,
            searchResults: []
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    async onSearch(e) {
        const inputTimer = this.state.inputTimer;
        const textEntered = e.target.value.toString();
        console.log('textEntered', textEntered)
        this.setState({ searchTerm: textEntered });
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                // "Origin": "http://localhost:3030"
            }
        };
        clearTimeout(inputTimer);
        let timeout = setTimeout(() => {
            console.log("FETCHING RESULTS");
            fetch(
                `http://localhost:3035/autocomplete?searchTerm=${e.target.value}`)
                .then(async (res) => {
                    const response = await res.json();
                    console.log('res', response);
                    if (response.searchResults && Array.isArray(response.searchResults)) {
                        this.setState({ searchResults: response.searchResults });
                    }
                });
        }, 300);
        this.setState({ inputTimer: timeout });
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    <div style={{display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            this.state.searchResults ? this.state.searchResults.map((result) => {
                                return (
                                    <div style={{alignItems: 'center', justifyContent: 'center', width: 400, margin: 50}}>
                                        <img src={result.picture} height={200} width={200} />
                                        <div style={{fontWeight: 600}}>{result.name}</div>
                                        <div>{result.about}</div>
                                    </div>
                                );
                            }) 
                            : null
                        }
                    </div>
                </div>
            </header>
        );
    }


}

// Export out the React Component
export default Menu;