const Panels = (props) => {
        const arr = [1,2,3,4,5,6,7,8]
        const lines =  arr.map((e, i) => {
                return (
                    <li className="panel" key={i}>
                        <div className="panel-div">
                            Hello
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
		const url = 'http://fcctop100.herokuapp.com/api/fccusers/recent/:sortColumnName';
		$.getJSON(url, data => {
			console.log(data)
		})
	},

	render(){
        const {data} = this.state;
		return (
			<div>
				<Panels listOfCampers={data} />
			</div>
		)
	}
})

ReactDOM.render(<Main />, document.getElementById('root'))
