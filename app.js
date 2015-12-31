const Header = () => {

    const change = (event) => {

    }

    return (
        <div className="col-xs-12">
            <div className="col-xs-8">
                <h6>FreeCodeCamp</h6>

                <h1>100</h1>
            </div>
            <div className="col-xs-4">
                <select id="time-toggle" onChange={this.change} value={this.state.value}>
                    <option value="past30days">Past 30 days</option>
                    <option value="alltime">All time</option>
                </select>

                <h1>{$('#select-timeframe').val()}</h1>
            </div>
        </div>
    )
}

const Panels = (props) => {
    const {listOfCampers} = props;
    console.log('list from panels:', listOfCampers);
    const lines = listOfCampers.map((e, i) => {
        return (
            <li className="panel" key={i}>
                <div className="panel-inner">
                    <img className="img-responsive" src={e.img}/>

                    <div className="number">
                        <h5>{i + 1}</h5>
                    </div>
                    <div className="info">
                        <h5>{e.username}</h5>
                        <p>Past 30 Days: {e.totalRecent}</p>
                        <p>All time: {e.total}</p>
                    </div>
                </div>
            </li>
        )
    })
    return (

        <div>

            <ul className="col-sm-12 col-xs-12">
                {lines}
            </ul>
        </div>
    )
}

const Loading = () => <div className="loading"><h1>Loading...</h1></div>

const Main = React.createClass({

    getInitialState() {
        return {
            data: [],
            value: 'recent'
        }
    },

    componentDidMount() {
        this.getCampers()
    },

    // Only pass 'recent' or 'alltime' in
    getCampers() {
        const url = `http://fcctop100.herokuapp.com/api/fccusers/${this.state.value}/:sortColumnName`;
        $.getJSON(url, dataFromSource => {
            this.setState({data: dataFromSource});
        })
    },

    changeFromSelect(event) {

        this.setState({data: []})
        this.setState({
            value: event.target.value
        }, () => {
            this.getCampers()
        })
    },

    render(){
        const {data} = this.state;
        const {value} = this.state;
        const loading = data.length === 0;
        return (
            <div>
                <div className="col-xs-12">
                    <div className="col-xs-8">
                        <h6>FreeCodeCamp</h6>

                        <h1>100</h1>
                    </div>
                    <div className="col-xs-4">
                        <select id="time-toggle" onChange={this.changeFromSelect} value={value}>
                            <option value="recent">Past 30 days</option>
                            <option value="alltime">All time</option>
                        </select>
                    </div>
                </div>
                {loading
                    ? <Loading />
                    : <Panels listOfCampers={data}/>
                }
            </div>
        )
    }
})

ReactDOM.render(<Main />, document.getElementById('root'))
