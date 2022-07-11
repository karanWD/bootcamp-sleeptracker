import React from "react";
import {useSelector} from "react-redux";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';


const Chart = () => {
    const myData = useSelector(state => state.listReducer.list)

    const yAxisHandler = ({payload:{value},x,y,width,height})=>{
        const hours =("0"+Math.floor(value / 1000 / 60 / 60)).slice(-2)
        const minutes =("0"+Math.floor(value / 1000 / 60 % 60)).slice(-2)
        return   <text x={x - width / 2} y={y} fill="999" textAnchor="middle" dy={0}>{hours}:{minutes}</text>
    }

    const xAxisHandler = ({payload:{value},x,y,width,height}) =>{
        return <text x={x} y={y} fill="999" textAnchor="middle" dy={10}>{new Date(value).toLocaleDateString("fa")}</text>
    }

    const TooltipHandler = ({payload,active})=>{
        if (active && payload?.length>0){
        const {sleep,wakeUp,duration,saveTime} = payload && payload[0]?.payload
        return(
            <div>
                <div>
                    از
                    <span>{sleep}</span>
                    تا
                    <span>{wakeUp}</span>
                    (
                    {duration/60/60/1000}
                    ساعت )
                </div>
                <div>
                    {new Date(saveTime).toLocaleDateString("fa")}
                    {new Date(saveTime).toLocaleTimeString("fa")}
                </div>
            </div>
        )
        }else return null
    }

    return (
        <div style={{width:"70%",height:"50vh"}}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={myData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="saveTime" tick={xAxisHandler}/>
                    <YAxis dataKey="duration" tick={yAxisHandler}/>
                    <Tooltip content={<TooltipHandler />} />
                    <Area type="monotone" dataKey="duration" stroke="#8884d8" fill="#8884d8"/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}


export default Chart