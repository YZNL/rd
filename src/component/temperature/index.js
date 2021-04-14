import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import React from 'react';
import './index.css';
class Temperature extends React.Component {
    contentStyle = {
        height: '90vh',
        color: '#fff',
        lineHeight: '100vh',
        textAlign: 'center',
    };
    tltleStyle = {
        height: '10vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    spanStyle = {
        cursor: 'pointer',
        fontSize: '18px',
        lineHeight: '1em',
        color: '#4e4e4e'
    }
    constructor() {
        super();
        this.state = {
            showWaht: false,
            edit: false,
            inputValue: ''
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:8080/wendu').then((res) => {
            const stats = res.data.data[0];
            this.setState({
                wen_date: stats.date,
                wen_hum: stats.hum,
                wen_time: stats.time
            })
        })

        // axios.get('http://localhost:8080/shidu').then((res) => {
        //     const stats = res.data.data[0];
        //     console.log(stats)
        //     this.setState({
        //         shidu_date: stats.date,
        //         shidu_hum: stats.hum,
        //         shidu_time: stats.time
        //     })
        // })
    }

    switchPage = () => {
        const { showWaht } = this.state;
        this.setState({
            showWaht: !showWaht
        })
    }

    inputChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    getTempOption = () => {
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{b}时 : 湿度{c}'
            },
            xAxis: {
                name: '时间',
                type: 'category',
                splitLine: { show: false },
                data: [9, 12, 15, 18, 21, 14, 3, 6]
            },
            yAxis: {
                name: '当日湿度变化（%）',
                axisLine: {
                    show: true
                },
                minorSplitLine: {
                    show: true
                }
            },
            series: [{
                name: '',
                data: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
                type: 'line'
            }]
        }
    }

    getOption = () => {
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{b}时 : 温度{c}'
            },
            xAxis: {
                name: '时间',
                type: 'category',
                splitLine: { show: false },
                data: [9, 12, 15, 18, 21, 14, 3, 6]
            },
            yAxis: {
                name: '当日温度变化',
                axisLine: {
                    show: true
                },
                minorSplitLine: {
                    show: true
                }
            },
            series: [{
                name: '',
                data: [-5, 0, 5, 10, 15, 20, 25, 30, 35, 40],
                type: 'line'
            }]
        };
    }

    doEdit = () => {
        const { edit } = this.state;
        this.setState({
            edit: !edit
        })
    }

    submit = () => {
        const { inputValue } = this.state;
        console.log(11111)
        if(inputValue === 'adimn') {
            alert('操作成功')
        }else {
            alert('操作失败')
        }
    }
    render() {
        const { showWaht, edit } = this.state;
        return <div>
            <div>
                <div style = { this.tltleStyle } >
                    <button className = "custom-btn btn-13" 
                        style = { this.spanStyle }
                        onClick = { this.switchPage } > { `${showWaht ? '日湿度变化' : '日温度变化'}` } </button >
                </div>
                <div> 
                    {
                        showWaht 
                        ? < div style = { this.contentStyle } >
                                <ReactEcharts
                                option = { this.getTempOption() }
                                style = {
                                    { width: '100%', height: '100%' }
                                }
                                /> </div> 
                        :
                        <div style = { this.contentStyle } >
                            <ReactEcharts
                                option = { this.getOption() }
                                style = {
                                    { width: '100%', height: '100%' }
                                }
                            />
                        </div>
                    } 
                </div> 
                <div className = "spanDiv" >
                    <span className = "spanType" > 温湿度折线图 </span> <span className="goSpan" onClick={this.doEdit}>可手动修改</span >
                </div>
            </div> 
            {
                edit && <div className = "alertDiv" >
                    <div className = "inputDiv">
                        <div className="closeDiv">
                            X
                        </div>
                        <div className="inputDiv">
                            <span className = "input input--haruki" >
                                <input 
                                    placeholder="匹配成功可手动调节蜂鸣器"
                                    className = "input__field input__field--haruki"
                                    type = "text"
                                    id = "input-1"
                                    onChange={this.inputChange}
                                />
                            </span>
                        </div>
                        <div className="buttonDiv">
                            <button className="abutton" onClick={this.submit}>点击验证</button>
                        </div>
                    </div > 
                </div>
            } 
        </div >
    }

}

export default Temperature;