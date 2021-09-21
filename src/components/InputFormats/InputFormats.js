import React, { Component } from 'react'

class InputFormats extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currancyType:'inr',
            currancySymbol:'Rs',
            currancyValue:'',
            date1:'',
            date2:'',
            time1:''
        }
    }
    formatUSD(num){
        
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
    currancyValueHandler = e =>{
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
            if (this.state.currancyType === 'usd' && val1.length){
                val1 = this.formatUSD(val1)
                if(flag){
                    val1 += '.'
                }
                this.setState({
                    currancySymbol:' $'
                })
            }
            if (this.state.currancyType === 'inr' && val1.length){
                val1 = this.formatINR(val1)
                if(flag){
                    val1+='.'
                }
                this.setState({
                    currancySymbol: ' Rs'
                })
            }
            if(val1.length){
                val = val1
            }
            
            if (val2){
                val += val2
            }
            this.setState({currancyValue: val})
        }
    }
    currancyTypeHandler = e =>{
        this.setState({
            currancyType : e.target.value
        })
        if(e.target.value === 'inr'){
            this.setState({
                currancySymbol:' Rs'
            })
        }
        else{
            this.setState({
                currancySymbol:' $'
            })
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

    date1Handler = (e,delimeter = '/') =>{
        const re = /^[0-9\b]{0,8}$/;
        var val = e.target.value.replaceAll(delimeter,'')
        var finalDate = ''
        var leap
        if (val === '' || re.test(val)){
            var len = val.length
            if(len<5){ 
                var yyyy = val
                finalDate = yyyy
            }
            if(len > 4 && len < 7){
                yyyy = val.slice(0,4)
                var mm = val.slice(4,6)

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
            
            this.setState({
                date1: finalDate
            })
        }
    }
    date2Handler = (e,delimeter = '/') =>{
        const re = /^[0-9\b]{0,4}$/;
        var val = e.target.value.replaceAll(delimeter,'')
        var finalDate = ''
        
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
            this.setState({
                date2: finalDate
            })
        }
    }
    time1Handler = (e,delimeter=':') =>{
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
            this.setState({
                time1: finalTime
            })   

        }

    }

    clickEvent = e =>{
        console.log(this.state)   
    }
    
    render() {
        return (
            <div className = 'main'>
                <div className = 'content'>
                    <div className = 'container'>
                        <div>
                            <h2>Currancy Format</h2>
                            <input id='ip1' type= 'text' value = {this.state.currancyValue} 
                                onChange = {this.currancyValueHandler}
                                placeholder = {this.state.currancySymbol}></input>
                                {   
                                    this.state.currancyValue.length?
                                    <span className='currency-symbol'>{this.state.currancySymbol}</span>:
                                    null
                                }
                            <select className='moveRight' value = {this.state.currancyType}
                                onChange = {this.currancyTypeHandler}>
                                <option value="inr">INR</option>
                                <option value="usd">USD</option>
                            </select>
                        </div>  
                        <div>
                            <h2>Date Format 1: (YYYY/MM/DD)</h2>
                            <input type= 'text' value = {this.state.date1}
                                onChange = {(e)=>this.date1Handler(e)} placeholder='YYYY/MM/DD'></input>
                        </div>
                        <div>
                            <h2>Date Format 2: (MM/YY)</h2>
                            <input type= 'text' value = {this.state.date2} 
                                onChange = {(e)=>this.date2Handler(e)} placeholder='MM/YY'></input>
                        </div>
                        <div>
                            <h2>Time Format 1: (hh:mm:ss)</h2>
                            <input type= 'text' value = {this.state.time1}
                                onChange = {this.time1Handler} placeholder='hh:mm:ss'></input>
                        </div>
                        
                        <button onClick={this.clickEvent}>Print on console</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default InputFormats
