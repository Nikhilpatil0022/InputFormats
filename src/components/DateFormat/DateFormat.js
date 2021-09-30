import React, { Component } from 'react'
import styled from 'styled-components'

const Input = styled.input`
    width: 100%;
    padding: 12px 40px 12px 12px;
    margin: 5px 0 15px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;

    &:focus{
        background-color: #ddd;
        outline: none;
    }
`;


export class DateFormat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             date:''
        }
    }

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
        else{
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
    
    render() {
        return (
            <div>
                <Input type= 'text' value = {this.props.dateValue}
                    onChange = {(e)=>this.dateHandler(e)} 
                    placeholder={this.props.format==='MM/YY'?'MM YY':'YYYY MM DD'}></Input> 
            </div>
        )
    }
}

export default DateFormat
