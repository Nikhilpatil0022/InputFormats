import React, { Component } from 'react'
import styled from 'styled-components'


const Input = styled.input`
    width: 90%;
    margin: 5px 10px 15px 0;
    padding: 12px 40px 12px 12px;
    display: inline-block;
    border: none;
    background: #f1f1f1;

    &:focus{
        background-color: #ddd;
        outline: none;
    }
`;

const CurrencySymbol = styled.span`
    margin-left:-40px;
    margin-right: 20px;
`;

class CurrencyFormat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currencyValue:'',
            currencySymbol: this.props.currencyType==='INR'?'Rs':'$'
        }
    }
    formatUSD(num){

        // takes number as an argument and converts it to string with thousand separator
        
        var l = num.length 
        var num1= ''
        var j = l
        if(l<4){
            return num 
        }
        else if(l === 4){
            num1 = num[0] + ',' + num.slice(1,)
            return num1 
        }
        else{
            var i = l-3
            for(;i>=0;i-=3){
                num1 = ','+ num.slice(i,j) + num1 
                j = i
            }
        }
        if(i===-1){
		num1 = num[0] + num[1] + num1        
        }
        if(i===-2){
        	num1 = num[0] + num1
        }
        if(num1[0]===','){
            num1 = num1.slice(1,)
        }
        return num1
    }

    formatINR(num){

        // takes number as an argument and converts it to string with thousands,lakhs and crores separator
        
        var l = num.length 
        var num1= ''
        var j = l
        if(l<4){
            return num 
        }
        else if(l === 4){
            num1 = num[0] + ',' + num.slice(1,)
            return num1 
        }
        else{
            var i = l-3
            for(;i>0;i-=2){
                num1 = ','+ num.slice(i,j) + num1 
                j = i
            }
        }
        if(i===-1){
		num1 = num[0] + num1        
        }
        if(i===0){
        	num1 = num[0] + num[1] + num1
        }
        if(num1[0]===','){
            num1 = num1.slice(1,)
        }
        return num1
    }

    currencyValueHandler = e =>{

        //handles the currency value (validating, adding symbol, etc.) and overwrites the state of parent component
        
        const re = /^[0-9]+\.?[0-9]*$/;
        var val = e.target.value.replace(/(,)|(Rs)|($)|(\s)/g, '')
        var flag = false
        if(val.includes('.')){
            flag = true
        }
        var lst = val.split('.')
        var val1 = lst[0]
        var val2 = lst[1]
        
        if (val === '' || re.test(val)) {
            if (this.props.currencyType === 'USD' && val1.length){
                val1 = this.formatUSD(val1)
                if(flag){
                    val1 += '.'
                }
                this.setState({
                    currencySymbol:' $'
                })
            }
            if (this.props.currencyType === 'INR' && val1.length){
                val1 = this.formatINR(val1)
                if(flag){
                    val1+='.'
                }
                this.setState({
                    currencySymbol: ' Rs'
                })
            }
            if(val1.length){
                val = val1
            }
            
            if (val2){
                val += val2
            }

            //call to the function of parent component which is sent as a prop to overwrite the state of parent component

            this.props.handleCurrency(val)
            
        }
    }
    
    render() {
        return (
            <div>
                <Input id='ip1' type= 'text' value = {this.props.currencyValue} 
                    onChange = {this.currencyValueHandler}
                    placeholder = {this.state.currencySymbol}></Input>
                    {   
                        this.props.currencyValue?
                        <CurrencySymbol>{this.state.currencySymbol}</CurrencySymbol>:
                        null
                    }
                
            </div>
        )
    }
}

export default CurrencyFormat
