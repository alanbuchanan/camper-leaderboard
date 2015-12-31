const Header = () => {
    return (
        <div className="col-xs-12">
            <div className="col-xs-8">
                <h6>FreeCodeCamp</h6>

                <h1>100</h1>
            </div>
            <div className="col-xs-4">
                <select name="boobs" id="">
                    <option value="">All time</option>
                    <option value="">Past 30 days</option>
                </select>
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

const Loading = () => <div><h1>Loading...</h1></div>

const Main = React.createClass({

    getInitialState() {
        return {
            data: []
        }
    },

    componentDidMount() {
        this.getCampers()
    },

    getCampers() {
        const urlPastThirty = 'http://fcctop100.herokuapp.com/api/fccusers/recent/:sortColumnName';
        const urlAllTime = 'http://fcctop100.herokuapp.com/api/fccusers/alltime/:sortColumnName.';
        $.getJSON(urlPastThirty, dataFromSource => {
            this.setState({data: dataFromSource});
        })
    },

    render(){
        const {data} = this.state;
        const loading = data.length === 0;
        return (
            <div>
                <Header />
                {loading
                    ? <Loading />
                    : <Panels listOfCampers={data}/>
                }
            </div>
        )
    }
})

ReactDOM.render(<Main />, document.getElementById('root'))
