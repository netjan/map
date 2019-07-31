import React from "react";
import Axios from 'axios';
import ReactTable from 'react-table'

class Archive extends React.Component {
    state = {
        count: 0,
        itemsPerPage: 10,
        page: 1,
        pages: -1
    }

    formatDate(timestamp) {
        var a = new Date(timestamp * 1000);
        return a.toLocaleString();
    }

    getWeather = (page) => {
        Axios.get('/weathers', {
            params: {
                page: page
            }
        })
        .then(response => {
            this.setState({
                data: response.data.items,
                pages: response.data.pages
            })
        })
        .catch(error => {
            console.log(error);
        }); 
    }

    render() {
        const columns = [{
            Header: 'ID',
            width: 50,
            accessor: 'id'
        }, {
            Header: 'Lat.',
            width: 75,
            accessor: 'lat'
        }, {
            Header: 'Lon.',
            width: 75,
            accessor: 'lon'
        }, {
            Header: 'Click time',
            width: 155,
            accessor: 'dt',
            Cell: props => this.formatDate(props.value)
        }, {
            Header: 'Name',
            accessor: 'name'
        }, {
            Header: 'Country',
            width: 75,
            accessor: 'country'
        }, {
            Header: 'Description',
            accessor: 'description'
        }, {
            Header: 'Temp',
            width: 75,
            accessor: 'temperature',
            Cell: props => props.value.toString().replace(".",",") + "°C"
        }, {
            Header: 'Pressure',
            accessor: 'pressure',
            Cell: props => props.value.toString().replace(".",",") + "hPa"
        }, {
            Header: 'Humidity',
            accessor: 'humidity',
            Cell: props => props.value + "%"
        }, {
            Header: 'Wind (speed / direction)',
            Cell: props => {
                const { original } = props;
                const { wind_speed, wind_deg } = original;
                return (
                    <span>{ wind_speed.toString().replace(".",",") }m/s / { wind_deg.toString().replace(".",",") }°</span>
                )
                
            }
        }, {
            Header: 'Clouds',
            accessor: 'clouds',
            Cell: props => props.value + "%"
        },]
        const { data, loading, pages } = this.state;
        return (
            <div>
                <h1>Archive</h1>
                <ReactTable
                    data={data}
                    loading={loading}
                    pageSizeOptions={[10]}
                    defaultPageSize={10}
                    pages={pages}
                    manual
                    columns={columns}
                    onFetchData={(state, instance) => {
                        // show the loading overlay
                        this.setState({loading: true})
                        // fetch your data
                        Axios.get('/weathers', {
                            params: {
                                page: state.page + 1
                                // pageSize: state.pageSize,
                                // sorted: state.sorted,
                                // filtered: state.filtered
                            }
                        })
                          .then((res) => {
                            // Update react-table
                            this.setState({
                              data: res.data.items,
                              pages: res.data.pages,
                              loading: false
                            })
                          })
                    }}
                />
            </div>
        )
    }
}

export default Archive;