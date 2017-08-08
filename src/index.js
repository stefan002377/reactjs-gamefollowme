import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';

class TestInfor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: true,
      score: 0,
      size: 1,
      time: 0,
      position:[true,true],
      direction:[0,0],
      level: 1,
      interval: false,
      move: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.timeSeting = this.timeSeting.bind(this);
    this.movesSquare = this.movesSquare.bind(this);
  }

  handleChange(event) {
    this.setState({
      status: true
    });
   }

  mouseOver() {
     this.setState({
       status: true,
       interval: setInterval(this.timeSeting, 1000),
       move: setInterval(this.movesSquare, 1)
     });
  }

  mouseOut() {
    clearInterval(this.state.interval);
    clearInterval(this.state.move);
    this.setState({
      status: false
    });
  }

  playAgain(){
    this.setState({
      status: true,
      time: 0,
      score: 0,
      level: 1,
      position:[true,true],
      direction:[0,0],
    });
  }

  size(type){
    this.setState({
      size: type
    });
  }

  timeSeting() {
    let temptime = this.state.time;
    temptime += 1;
    let templevel = Math.ceil(temptime/5);
    let tempscore = this.state.score;
    tempscore += templevel*this.state.size*2;
    this.setState({
      time: temptime,
      score: tempscore,
      level: templevel
    });
  }

  movesSquare() {

    let limitHorti = (600-2) - (200/this.state.size);
    let limitVerti = (800-32) - (200/this.state.size);

    let horti = this.state.position[0];
    let verti = this.state.position[1];
    let directionSet = Math.floor((Math.random() * 10/5) + 1);
    let dt = (directionSet===1) ? this.state.direction[0]+this.state.level : this.state.direction[0];
    let dl = (directionSet===2) ? this.state.direction[1]+this.state.level : this.state.direction[1];

    if(dt>=limitHorti) {
      dt = 0;
      horti = !horti;
    }
    if(dl>=limitVerti) {
      dl = 0;
      verti = !verti;
    }

    let tempposition = {[horti]: dt+"px", [verti]: dl+"px"};
    this.setState({
      position:[horti,verti],
      direction:[dt,dl]
    });
  }

  render() {

    return (
      <div className="container gamefollow">
        <div className="row header">
          <div className="col-md-12 col-lg-12 col-sm-12 page-header clearfix">
            <h2 className="pull-left">Game Follow Me!</h2>
            <h5 className="nquest pull-right">Version 0.1.0</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 content">
            <div className="topbar pull-right size">
                  <button className={"btn " + (this.state.size===1 ? 'btn-info' : 'btn-default')} onClick={this.size.bind(this,1)}>Easy</button>
                  <button className={"btn " + (this.state.size===2 ? 'btn-info' : 'btn-default')}  onClick={this.size.bind(this,2)}>Medium</button>
                  <button className={"btn " + (this.state.size===4 ? 'btn-info' : 'btn-default')}  onClick={this.size.bind(this,4)}>Hard</button>
            </div>
            <div className="topbar pull-left">
              <p>Level <span>{this.state.level}</span></p>
              <p>Score <span>{this.state.score}</span> Points</p>
            </div>
          </div>
          <div className="col-md-12 col-lg-12 col-sm-12 content">
            {this.state.status ? (
            <div className="zonemove">
                  <div className={"boxmove btn-info"+this.state.size}
                       onClick={this.size.bind(this,1)}
                       style={{[this.state.position[0] ? "top" : "bottom"]: this.state.direction[0]+"px", [this.state.position[1] ? "left" : "right"]: this.state.direction[1]+"px"}}
                       onMouseOver={this.mouseOver}
                       onMouseOut={this.mouseOut} >
                  </div>
            </div>

            ):(
            <div className="lose text-center zonemove">
                  <h2>You Lose!</h2>
                  <h5>Your score is {this.state.score} Points</h5>
                  <button className="btn btn-info" onClick={this.playAgain}>Play Again</button>
            </div>
            )}
          </div>
          <p className="caption">* Place the cursor over the square and follow</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<TestInfor/>, document.getElementById('root'));
