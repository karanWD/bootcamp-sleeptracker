import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItem, editItem, removeItem} from "../redux/listSlice";

const AddItemFields = () => {
    const [times, setTimes] = useState({})
    const dispatch = useDispatch()
    const [edited, setEdited] = useState(null)
    const data = useSelector(state => state.listReducer.list)
    const changeHandler = (key, value) => {
        setTimes(prev => ({
            ...prev,
            [key]: value
        }))
    }
    const deleteHandler = (id) => {
        dispatch(removeItem(id))
    }
    const clickHandler = () => {
        const saveTime = new Date()
        var time_start = new Date()
        var time_end = new Date()
        var value_start = times.sleep.split(':')
        var value_end = times.wakeUp.split(':')
        time_start.setHours(value_start[0], value_start[1], 0)
        time_end.setHours(value_end[0], value_end[1], 0)
        console.log(time_end - time_start)
        const diff = time_end > time_start ? time_end - time_start : time_end.getTime()+(24*60*60*1000) - time_start.getTime()
        const listItem = {
            ...times,
            duration: diff,
            id: data.length + 1,
            saveTime
        }
        dispatch(addItem(listItem))
    }
    const editHandler = (id) => {
        setEdited()
        dispatch(editItem({id, times}))
    }

    return (
        <div>
            <label htmlFor="">ساعت خواب</label>
            <input type="time" onChange={(e) => changeHandler("sleep", e.target.value)}/>
            <br/>
            <label htmlFor="">ساعت بیدار شدن</label>
            <input type="time" onChange={(e) => changeHandler("wakeUp", e.target.value)}/>
            <br/>
            <button onClick={clickHandler}>
                save
            </button>
            <br/>
            <br/>
            <br/>
            <br/>
            {
                data.map(item =>
                    <div>
                        {edited === item.id ?
                            <>
                                <label htmlFor="">ساعت خواب</label>
                                <input type="time" value={times.sleep ?? item.sleep}
                                       onChange={(e) => changeHandler("sleep", e.target.value)}/>
                                <br/>
                                <label htmlFor="">ساعت بیدار شدن</label>
                                <input type="time" value={times.wakeUp ?? item.wakeUp}
                                       onChange={(e) => changeHandler("wakeUp", e.target.value)}/>
                                <button onClick={() => editHandler(item.id)}>save edit</button>
                            </>
                            :
                            <>
                                <div>{item.sleep}</div>
                                -
                                <div>{item.wakeUp}</div>
                                <div>
                            <span>
                                ساعت
                                {Math.floor(item.duration / 1000 / 60 / 60)}
                            </span>
                                    <span>
                                دقیقه
                                        {Math.floor(item.duration / 1000 / 60 % 60)}
                            </span>
                                </div>
                                <span onClick={() => deleteHandler(item.id)}>DELETE</span>
                                <span onClick={() => setEdited(item.id)}>EDIT</span>
                            </>
                        }

                        <hr/>
                    </div>
                )
            }
        </div>
    )
}

export default AddItemFields