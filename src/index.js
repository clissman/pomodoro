import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Clock extends Component {
    constructor(props) {
        super(props)
        this.minutes =  1
        this.state={ 
            seconds: (this.minutes * 5),
            paused: true
        }
    }

    tick = () => {
        this.setState(current => ({
            seconds: current.seconds - 1  
        }))
        clearInterval(this.mainInterval)
            if (this.state.seconds === 0) {
                this.alarm()
            } else {
                this.start()
            }
    }

    alarm = () => {
        this.pause()
        clearInterval(this.mainInterval)
        console.log("Brrrring🔔")
        document.getElementById('Ticker').classList.add('brrng')
    }

    pause = () => {
        this.setState({
            paused: !this.state.paused
        })
        this.state.paused ? this.start() : this.stop()
    }

    start = () => {
        document.getElementById('Ticker').classList.remove('brrng')
        this.mainInterval = setInterval(this.tick, 1000)
        this.setState({
            paused: false
        })
    }

    stop = () => {
        clearInterval(this.mainInterval)
        this.setState({
            paused: true
        })
    }
    
    handleIncrement = (e) => {
        const {name} = e.target
        if (this.minutes === 0 && name === 'incrementDown') return
        if (name === 'incrementUp') this.minutes++
        if (name === 'incrementDown') this.minutes--
        this.setState({
            seconds: this.minutes * 60  
        })
        console.log(e.target.name)
    }

    reset = () => {
        this.minutes = 25
        this.setState({
            seconds: (this.minutes * 60)
        })
    }

    render() {
        const {seconds} = this.state;
        return (
            <div className="Clock">
                <Ticker seconds={seconds} alarm={this.alarm} />
                <Controls 
                    seconds={seconds} 
                    pause={this.pause} 
                    paused={this.state.paused} 
                    handleIncrement={this.handleIncrement}
                    reset={this.reset}
                />
            </div>
        )
    }
}


function Ticker(props) {
    let {seconds} = props;
    let minutes = Math.floor(seconds / 60); 
    seconds = seconds % 60
     
    if (seconds < 10) seconds = `0${seconds}`
    if (minutes < 10) minutes = `0${minutes}`

    return (
        <div className="Ticker" id="Ticker">
            <h1>{minutes}:{seconds}</h1>
            <span 
                id="tomato"
                role="img" 
                aria-label="A tomato" 
                style={{fontSize: "200px"}}
            >🍅</span> 
        </div>
    )
}

function Controls(props) {
    return (
      <div className="Controls">
        <button
          name="incrementUp"
          onClick={props.handleIncrement}
          className="fas fa-arrow-up"
        />
        <button name="reset" onClick={props.reset}>
          Reset
        </button>
        <button 
            name="incrementDown" 
            onClick={props.handleIncrement}
            className="fas fa-arrow-down"
        />
        <button onClick={props.pause} style={{ width: "60px" }}>
          {props.paused ? (
            <i class="fas fa-play" />
          ) : (
            <i class="fas fa-pause" />
          )}
        </button>
      </div>
    );
}

ReactDOM.render(<Clock />, document.getElementById('root'));

