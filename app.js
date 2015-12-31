const Header = () => {

    return (
        <div></div>
    )
}

const Panels = (props) => {
    const {listOfCampers} = props;
    console.log('list from panels:', listOfCampers);
    const lines = listOfCampers.map((e, i) => {
        return (
            <li className="panel" key={i}>
                <a href={`http://www.freecodecamp.com/${e.username}`}>
                <div className="panel-inner">
                    <img className="img-responsive" src={e.img}/>

                    <div className="number">
                        <h5>{i + 1}</h5>
                    </div>
                    <div className="info">
                        <h5>{e.username}</h5>
                        {listOfCampers[0].hasOwnProperty('totalRecent')
                        // Adjust output depending on select
                            ? <p>Past 30 Days: {e.totalRecent}</p>
                            : <p>All time: {e.total}</p>
                        }

                    </div>
                </div>
                </a>
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

            if(this.state.value === 'recent'){
                dataFromSource.sort((a, b) => { return a.totalRecent > b.totalRecent ? -1 : a.totalRecent < b.totalRecent ? 1 : 0 });
            } else { // alltime
                dataFromSource.sort((a, b) => { return a.total > b.total ? -1 : a.total < b.total ? 1 : 0 });
            }
            this.setState({data: dataFromSource});
        })
    },

    changeFromSelect(event) {
        // UX: Re-initilising state.data triggers `Loading`. Without it, no loading.
        //this.setState({data: []})
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
                <div className="header col-xs-12">
                    <div className="col-xs-8">
                        <h6><a href="http://www.freecodecamp.com/">FreeCodeCamp</a></h6>
                        <h1>Top100</h1>
                    </div>
                    <div className="col-xs-4">
                        <select className="form-control" id="time-toggle" onChange={this.changeFromSelect} value={value}>
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
//TODO: ESLint
//TODO: fix style problems that arise if image is too tall
//TODO: use placeholder image if no image is present
