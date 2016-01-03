const Header = (props) => {

    return (
        <div className="header col-xs-12">
            <div className="col-xs-8">
                <h6><a href="http://www.freecodecamp.com/">FreeCodeCamp</a></h6>
                <h1>Top100</h1>
            </div>
            <div className="col-xs-4">
                <select className="form-control" id="time-toggle" onChange={props.handleSelect} value={props.value}>
                    <option value="recent">Past 30 days</option>
                    <option value="alltime">All time</option>
                </select>
            </div>
        </div>
    )
}

const Panels = (props) => {
    const {listOfCampers} = props
    const lines = listOfCampers.map((e, i) => {
        return (
            <li className="panel" key={i}>
                <a href={`http://www.freecodecamp.com/${e.username}`} target="_blank">
                <div className="panel-inner">
                    <img className="img-responsive" src={e.img}/>

                    <div className="number">
                        <h5>{i + 1}</h5>
                    </div>
                    <div className="info">
                        <h5>{e.username}</h5>
                        {props.value === 'recent'
                        // Adjust output depending on select
                        ?
                        <div>
                            <p>Past 30 Days: {e.recent}</p>
                            <p>All time: {e.alltime}</p>
                        </div>
                        :
                        <div>
                            <p>All time: {e.alltime}</p>
                            <p>Past 30 Days: {e.recent}</p>
                        </div>
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

const Footer = () => {
    return (
        <div className="footer">Made by <a href="http://www.github.com/alanbuchanan">alanbuchanan</a></div>
    )
}

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
        const url = `http://fcctop100.herokuapp.com/api/fccusers/top/${this.state.value}`
        $.getJSON(url, dataFromSource => {

            if(this.state.value === 'recent'){
                dataFromSource.sort((a, b) => { return a.recent > b.recent ? -1 : a.recent < b.recent ? 1 : 0 })
            } else { // alltime
                dataFromSource.sort((a, b) => { return a.alltime > b.alltime ? -1 : a.alltime < b.alltime ? 1 : 0 })
            }
            this.setState({data: dataFromSource})
        })
    },

    changeFromSelect(event) {
        // UX: Re-initilising state.data triggers `Loading`. Without it, no loading message.
        this.setState({data: []})
        this.setState({
            value: event.target.value
        }, () => {
            this.getCampers()
        })
    },

    render(){
        const {data} = this.state
        const {value} = this.state
        const loading = data.length === 0
        return (
            <div>
                <Header handleSelect={this.changeFromSelect} value={value}/>
                {loading ? <Loading /> :
                <div>
                    <Panels listOfCampers={data} value={value} />
                    <Footer />
                </div>
                }
            </div>
        )
    }
})

ReactDOM.render(<Main />, document.getElementById('root'))
//TODO: fix style problems that arise if image is too tall (resize with background property?)
//TODO: use placeholder image if no image is present
//TODO: fix overflow of long usernames
