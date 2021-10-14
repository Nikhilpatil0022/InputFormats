import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from "prop-types";


const Input = styled.input`
    width: 90%;
    margin: 5px 10px 15px 0;
    padding: 12px 8% 12px 12px;
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

class InputNumber extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            placeholder_currency: (this.props.currencyType==='INR' || this.props.currencyType==='USD')?(this.props.currencyType==='INR'?'₹':'$'):'€',
            placeholder_date : this.props.format==='MM/YY'?'MM/YY':'YYYY/MM/DD',
            placeholder_time: this.props.format==='hh:mm:ss'?'hh:mm:ss':'hh:mm'
        }
    }
//CurrencyFormat
    thousandSeparator(num, delimeter = ','){
        // takes number as an argument and converts it to string with thousand separator
        var l = num.length 
        var num1= ''
        var j = l
        if(l<4){
            return num 
        }
        else if(l === 4){
            num1 = num[0] + delimeter + num.slice(1,)
            return num1 
        }
        else{
            var i = l-3
            for(;i>=0;i-=3){
                num1 = delimeter+ num.slice(i,j) + num1 
                j = i
            }
        }
        if(i===-1){
		num1 = num[0] + num[1] + num1        
        }
        if(i===-2){
        	num1 = num[0] + num1
        }
        if(num1[0]===delimeter){
            num1 = num1.slice(1,)
        }
        return num1
    }

    hundredSeparator(num, delimeter = ','){
        // takes number as an argument and converts it to string with thousands,lakhs and crores separator
        var l = num.length 
        var num1= ''
        var j = l
        if(l<4){
            return num 
        }
        else if(l === 4){
            num1 = num[0] + delimeter + num.slice(1,)
            return num1 
        }
        else{
            var i = l-3
            for(;i>0;i-=2){
                num1 = delimeter+ num.slice(i,j) + num1 
                j = i
            }
        }
        if(i===-1){
		num1 = num[0] + num1        
        }
        if(i===0){
        	num1 = num[0] + num[1] + num1
        }
        if(num1[0]===delimeter){
            num1 = num1.slice(1,)
        }
        return num1
    }

    currencyValueHandler = e =>{
        //handles the currency value (validating, adding symbol, etc.) and overwrites the state of parent component
        if (this.props.currencyType === 'USD' || this.props.currencyType === 'INR'){
            const re = /^[0-9]+\.?[0-9]*$/;
            var val = e.target.value.replace(/,/g, '')
            var flag = false
            if(val.includes('.')){
                flag = true
            }
            var lst = val.split('.')
            var val1 = lst[0]
            var val2 = lst[1]
            
            if (val === '' || re.test(val)) {
                if (this.props.currencyType === 'USD' && val1.length){
                    val1 = this.thousandSeparator(val1)
                    if(flag){
                        val1 += '.'
                    }
                    this.setState({
                        placeholder_currency:' $'
                    })
                }
                if (this.props.currencyType === 'INR' && val1.length){
                    val1 = this.hundredSeparator(val1)
                    if(flag){
                        val1+='.'
                    }
                    this.setState({
                        placeholder_currency: ' ₹'
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
        if (this.props.currencyType === 'EUR'){
            const re = /^[0-9]+,?[0-9]*$/;
            val = e.target.value.replace(/\./g, '')
            flag = false
            if(val.includes(',')){
                flag = true
            }
            lst = val.split(',')
            val1 = lst[0]
            val2 = lst[1]

            if (val === '' || re.test(val)) {
                if (val1.length){
                    val1 = this.thousandSeparator(val1,'.')
                    if(flag){
                        val1 += ','
                    }
                    this.setState({
                        placeholder_currency:' €'
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
        
    }
//DateFormat
    dateHandler = (e,delimeter = this.props.delimeter?this.props.delimeter:'/') =>{
        //handles the date(validating, adding delimeter, etc.) and overwrites the state of parent component
        var val = e.target.value.replaceAll(delimeter,'')
        var finalDate = ''
        var leap
        if(this.props.format === 'MM/YY'){
            const re = /^[0-9\b]{0,4}$/;
            if (val === '' || re.test(val)){ 
                var len = val.length
                if(len<3){ 
                    var mm = val
                    if(mm.length === 1){
                        mm = parseInt(mm)
                        if(mm>1){
                            mm = '0' + mm.toString()
                        }
                    }
                    if(parseInt(mm)>12){
                        mm = '12'
                    }
                    finalDate = mm  
                }
                if(len > 2){
                    mm = val.slice(0,2)
                    var yy = val.slice(2)
                    finalDate = mm + delimeter + yy
                }
                //call to the function of parent component which is sent as a prop to overwrite the state of parent component
                this.props.handleDate(finalDate)
            } 
        }
        else{       //for YYYY/MM/DD
            const re = /^[0-9\b]{0,8}$/;
            if (val === '' || re.test(val)){
                len = val.length
                if(len<5){ 
                    var yyyy = val
                    finalDate = yyyy
                }
                if(len > 4 && len < 7){
                    yyyy = val.slice(0,4)
                    mm = val.slice(4,6)
    
                    if(mm.length === 1){
                        mm = parseInt(mm)
                        if(mm>1){
                            mm = '0' + mm.toString()
                        }
                    }
                    if(parseInt(mm)>12){
                            mm = '12'
                    }
                    finalDate = yyyy + delimeter + mm    
                }
                if(len > 6){
                    yyyy = val.slice (0,4)
                    leap = this.isLeap(parseInt(yyyy))
                    mm = val.slice(4,6)
                    if(parseInt(mm)>12){
                        mm = 12
                    }
                    var dd = val.slice(6)
                    var days = [31,29,31,30,31,30,31,31,30,31,30,31]
                    if(dd.length === 1){
                        if(parseInt(dd)>3){
                            dd = '0'+ dd
                        }
                    }
                    else{
                        if(parseInt(dd)>days[parseInt(mm)-1]){
                            dd = days[parseInt(mm)-1].toString()
                        }
                        if(parseInt(mm) === 2 && leap===0 && dd>28){  
                            dd = '28';
                        } 
                    }
                    finalDate = yyyy + delimeter + mm + delimeter + dd
                }
                //call to the function of parent component which is sent as a prop to overwrite the state of parent component
                this.props.handleDate(finalDate)
            }
        }
    }
    isLeap(year){
        if(((0 === year % 4) && (0 !== year % 100)) || (0 === year % 400)){
            return 1
        }
        else{
            return 0
        }
    }
//TimeFormat
    timeHandler = (e,delimeter=this.props.delimeter?this.props.delimeter:':') =>{
        //handles the time(validating, adding delimeter, etc.) and overwrites the state of parent component
        const re = /^[0-9\b]{0,6}$/;
        var val = e.target.value.replaceAll(delimeter,'')
        var finalTime = ''
        if(val === '' || re.test(val)){
            var len = val.length
            if(len<3){ 
                var hh = val
                if(hh.length === 1){
                    hh = parseInt(hh)
                    if(hh>2){
                        hh = '0' + hh.toString()
                    }
                }
                if(parseInt(hh)>23){
                    hh = '23'
                }
                finalTime = hh
            }
            if(len > 2 && len< 5){
                hh = val.slice(0,2)
                var mm = val.slice(2)
                if(mm.length === 1){
                    mm = parseInt(mm)
                    if(mm>5){
                        mm = '0' + mm.toString()
                    }
                }
                if(parseInt(mm)>59){
                    mm = '59'
                }
                finalTime = hh + delimeter + mm
            }
            if(len>4){
                hh = val.slice(0,2)
                mm = val.slice(2,4)
                var ss = val.slice(4)
                if(ss.length === 1){
                    ss = parseInt(ss)
                    if(ss>5){
                        ss = '0' + ss.toString()
                    }
                }
                if(parseInt(ss)>59){
                    ss = '59'
                }     
                finalTime = hh + delimeter + mm + delimeter + ss
                if(this.props.format==='hh:mm'){
                    finalTime = hh + delimeter + mm
                }  
            }  
            //call to the function of parent component which is sent as a prop to overwrite the state of parent component
            this.props.handleTime(finalTime)
        }

    }

    render() {
        var handlerFunction = null;
        var valueHandler = null;
        var placehold = null;
        switch(this.props.mode){
            case 'currency': 
                handlerFunction = this.currencyValueHandler;
                valueHandler = this.props.currencyValue;
                placehold = this.props.placeholder?this.props.placeholder:this.state.placeholder_currency;
                break;
            case 'date':  
                handlerFunction = this.dateHandler;
                valueHandler = this.props.dateValue;
                placehold = this.props.placeholder?this.props.placeholder:this.state.placeholder_date;
                break;
            case 'time': 
                handlerFunction = this.timeHandler;
                valueHandler = this.props.timeValue;
                placehold = this.props.placeholder?this.props.placeholder:this.state.placeholder_time;
                break;
            default: 
                handlerFunction = null;
                valueHandler = null;
                break;
        }
        return (
            <div>
                <Input type= 'text' value = {valueHandler} 
                    onChange = {handlerFunction} placeholder={placehold}></Input>
                    {   
                        this.props.currencyValue && this.props.mode === 'currency'  ?
                        <CurrencySymbol>{this.state.placeholder_currency}</CurrencySymbol>:
                        null
                    }    
            </div>
        )
    }
}

InputNumber.propTypes = {
    mode: PropTypes.string,  // valid values: currency, date, time
    currencyValue: PropTypes.string, // value to bind with state (it is like 'value' prop and is used when mode=currency)
    dateValue: PropTypes.string, // for date input
    timeValue: PropTypes.string, // for time input
    currencyType: PropTypes.string, // valid values: USD, INR, EUR 
    placeholder: PropTypes.string, 
    format: PropTypes.string, // use when mode=time(hh:mm:ss OR hh:mm) or mode= date(YYYY/MM/dd OR MM/YY)
    delimeter: PropTypes.string // use when mode=time or mode=date
};
Input.defaultProps = {
    mode: "",
    currencyValue: "",
    dateValue: "",
    timeValue: "",
    currencyType: "",
    placeholder: "",
    format: "",
    delimeter: ""
};

export default InputNumber
