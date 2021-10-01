import React, { Component } from 'react'
import styled from 'styled-components'
import CurrencyFormat from './CurrencyFormat/CurrencyFormat'
import DateFormat from './DateFormat/DateFormat'
import TimeFormat from './TimeFormat/TimeFormat'


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

class InputFormats extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currencyValueUSD:'',
            currencyValueRS:'',
            currencyValueEUR:'',
            date1: '',
            date2:'',
            time1:''
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
                            <CurrencyFormat currencyType = 'USD'  
                                currencyValue = {this.state.currencyValueUSD}
                                handleCurrency = {(currency)=>this.setState({currencyValueUSD:currency})}></CurrencyFormat>
                            <CurrencyFormat currencyType = 'INR'
                                currencyValue = {this.state.currencyValueRS}
                                handleCurrency = {(currency)=>this.setState({currencyValueRS:currency})}></CurrencyFormat>
                            <CurrencyFormat currencyType = 'EUR'
                                currencyValue = {this.state.currencyValueEUR}
                                handleCurrency = {(currency)=>this.setState({currencyValueEUR:currency})}></CurrencyFormat>
                        </div>  
                        <div>
                            <h2>Date Formats</h2>
                            <DateFormat format = 'MM/YY'
                                dateValue = {this.state.date1}
                                handleDate = {(date)=>this.setState({date1:date})}></DateFormat>
                            <DateFormat delimeter='-'
                                dateValue = {this.state.date2}
                                handleDate = {(date)=>this.setState({date2:date})}></DateFormat>
                        </div>
                        <div>
                            <h2>Time Format: (hh:mm:ss)</h2>
                            <TimeFormat timeValue = {this.state.time1}
                                handleTime = {(time)=>this.setState({time1:time})}></TimeFormat>
                        </div>
                        
                        <Button onClick={this.clickEvent}>Print on console</Button>
                    </Container>
                </Content>
            </Main>
        )
    }
}

export default InputFormats
