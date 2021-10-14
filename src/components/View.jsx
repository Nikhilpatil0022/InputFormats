import React, { Component } from 'react'
import styled from 'styled-components'
import InputNumber from './InputNumber/InputNumber'


const Main = styled.div`
    box-sizing: border-box;
    position: fixed;
    background-color: rgb(223, 223, 223);
    height: 100%;
    width: 100%;
    overflow: auto;
`;
const Content = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    margin: 5% auto 15% auto;
    border: 3px solid #bebdbd;
    width: 40%;
    background-color: #fefefe;
`;
const Container = styled.div`
    padding: 16px;
`;
const Button = styled.button`
    background-color: gray;
    padding: 14px 20px;
    margin: 8px 5px;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.8;
    color: white;

    &:hover{
        opacity:1;
    }
`;

class View extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currencyValueUSD:'',
            currencyValueINR:'',
            currencyValueEUR:'',
            date1: '',
            date2:'',
            time1:'',
            time2:''
        }
    }
    

    clickEvent = e =>{
        console.log(this.state)   
    }
    
    render() {
        return (
            <Main>
                <Content>
                    <Container>
                        <div>
                            <h2>Currancy Formats</h2>
                            <InputNumber mode='currency' value = {this.state.currencyValueUSD}
                                currencyType = 'USD' onValueChange = {val=>this.setState({currencyValueUSD:val})} ></InputNumber>
                            <InputNumber mode='currency' value = {this.state.currencyValueINR} 
                                currencyType = 'INR' onValueChange = {val=>this.setState({currencyValueINR:val})} ></InputNumber>
                            <InputNumber mode='currency' value = {this.state.currencyValueEUR}
                                currencyType = 'EUR' onValueChange = {val=>this.setState({currencyValueEUR:val})} ></InputNumber>
                        </div>  
                        <div>
                            <h2>Date Formats</h2>
                            <InputNumber mode='date' format = 'MM/YY' value = {this.state.date1}
                               onValueChange = {val =>this.setState({date1:val})} ></InputNumber>
                            <InputNumber mode='date' value = {this.state.date2}
                               onValueChange = {val =>this.setState({date2:val})} ></InputNumber>
                        </div>
                        <div>
                            <h2>Time Format: (hh:mm:ss)</h2>
                            <InputNumber mode='time' value = {this.state.time1}
                                onValueChange = {val =>this.setState({time1:val})} format='hh:mm'></InputNumber>
                            <InputNumber mode='time' value = {this.state.time2}
                                onValueChange = {val =>this.setState({time2:val})} format='hh:mm:ss'></InputNumber>
                        </div>
                        
                        <Button onClick={this.clickEvent}>Print on console</Button>
                    </Container>
                </Content>
            </Main>
        )
    }
}

export default View
