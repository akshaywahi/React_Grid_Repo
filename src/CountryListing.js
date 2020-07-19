import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

class CountryListing extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = { open: false, countryData: {} }
    }

    columnDefs = [
        { headerName: "Name", field: "name" },
        { headerName: "Region", field: "region" },
        { headerName: "Population", field: "population" }
    ]

    defaultColDef = {
        filter: true,
        sortable: true
    }

    componentDidMount() {
        this.getCountryListing();
    }

    render() {
        return (
            <div className="ag-theme-alpine-dark" style={{ width: '100%' }}>
                <AgGridReact
                    defaultColDef={this.defaultColDef}
                    columnDefs={this.columnDefs}
                    rowData={this.state.rowData}
                    onGridReady={this.onGridReady}
                    domLayout='autoHeight'
                    onRowClicked={(params) => this.setState({ open: true, countryData: params.data })}
                />

                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        {this.state.countryData.name}
                    </DialogTitle>
                    <DialogContent dividers>
                        <pre>{JSON.stringify(this.state.countryData, null, 2)}</pre>;
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose} color="primary">Done</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );

    }

    handleClose() {
        this.setState({ open: false });
    }

    getCountryListing() {
        fetch("https://restcountries-v1.p.rapidapi.com/all", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
                "x-rapidapi-key": "1afe8129c3msh3048c164e898bf4p19a550jsn181b88370670"
            }
        }).then(res => res.json())
            .then(response => {
                this.setState({ rowData: response })
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    }

}

export default CountryListing;