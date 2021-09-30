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

export class TimeFormat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             time:''
        }
    }
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

            }  

            //call to the function of parent component which is sent as a prop to overwrite the state of parent component

            this.props.handleTime(finalTime)

        }

    }
    
    render() {
        return (
            <div>
                <Input type= 'text' value = {this.props.timeValue}
                    onChange = {this.timeHandler} placeholder='hh:mm:ss'></Input>
                
            </div>
        )
    }
}

export default TimeFormat
