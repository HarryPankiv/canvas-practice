import React from 'react';
import Canvas from './Canvas';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import './App.css';

class App extends Canvas {
    constructor(props) {
        super(props);

        this.state = {
            xaxis1: 2,
            yaxis1: -2,
            xaxis2: 4,
            yaxis2: 0,
            angle: 0,
            color: '#3d3d3d',
            picker: false,
            pickerText: false,
            info: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleInfo = this.handleInfo.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.draw = this.draw.bind(this);
        this.scaleUp = this.scaleUp.bind(this);
        this.scaleDown = this.scaleDown.bind(this);
    }

    componentDidMount() {
        var canvas = this.refs.canvas;
        var ctx = canvas.getContext('2d');
        this.ctx = ctx;
        this.height = canvas.height;
        this.width = canvas.width;
        this.drawGrid();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        let state = Object.assign(this.state, {});
        state[e.target.name] = e.target.value;
        this.setState(prevState => ({
            yaxis2: state.yaxis1 - (state.xaxis2 - state.xaxis1)
        }));
    }

    handleChangeComplete(color) {
        this.setState({ color: color.hex });
    }

    handleClick() {
        this.setState({ picker: !this.state.picker, pickerText: true });
    }

    handleInfo() {
        this.setState({ info: !this.state.info });
    }

    handleClear() {
        this.clear()
        this.clearHistory();
        this.drawGrid();
    }
    
    draw() {
        this.drawRect(this.state);
    }

    render() {
        return (
            <div className="main">
                <div className="row">
                    <div className="row">
                        <div className="input">
                            <span>xaxis1 :</span>
                            <input type="number" name="xaxis1" value={this.state.xaxis1} onChange={this.handleChange} />
                            <span>yaxis1 :</span>
                            <input type="number" name="yaxis1" value={this.state.yaxis1} onChange={this.handleChange} />
                        </div>
                        <div className="input">
                            <span>xaxis2 :</span>
                            <input type="number" name="xaxis2" value={this.state.xaxis2} onChange={this.handleChange} />
                            <span>yaxis2 :</span>
                            <span>{this.state.yaxis2}</span>
                        </div>
                        <div className="input">
                            <span>angle :</span>
                            <input type="number" name="angle" value={this.state.angle} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div>
                        <Color onClick={this.handleClick} color={this.state.color}>
                            {!this.state.pickerText ? 'choose color' : this.state.color}
                        </Color>
                        {this.state.picker && (
                            <ChromePicker
                                className="picker"
                                color={this.state.color}
                                onChangeComplete={this.handleChangeComplete}
                            />
                        )}
                    </div>
                    <p onClick={this.draw}>draw</p>
                    <p onClick={this.handleClear}>clear</p>
                    <p onClick={this.handleInfo}>info</p>
                    <p onClick={this.scaleUp}>scale up</p>
                    <p onClick={this.scaleDown}>scale down</p>
                </div>
                <canvas height="600" width="600" ref="canvas" style={{ border: '1px solid black' }} />
                {this.state.info && 
                <Info>
                    
                </Info>}
            </div>
        );
    }
}

const Color = styled.div`
    cursor: pointer;
    padding: 10px 20px;
    background: ${props => props.color};
    color: white;
    border-radius: 5px;
    margin: 10px;
`;

const Info = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 5px;
    color: white;
    position: absolute;
    background: #3d3d3d;
    width: 300px;
    height: 400px;
    right: 20px;
`;

export default App;
