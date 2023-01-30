import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Room from '../components/Room';
import Loader from "../components/Loader";
import Error from '../components/Error';
import 'antd/dist/reset.css';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

function Homescreen () {

  const [rooms, setrooms] = useState([])
  const [loading, setloading] = useState()
  const [error, seterror] = useState()
  
  const [fromdate, setfromdate] = useState()
  const [todate, settodate] = useState()

  useEffect(() => {

    async function fetchData() {
      try {
        setloading(true)
        const data = (await axios.get('/api/rooms/getallrooms')).data;
        
        setrooms(data)
        setloading(false)
      } catch (error) {
        seterror(true)
        console.error(error);
        setloading(false)
      }
    }
  
    fetchData();

  }, []);

  // function filterByDate(dates)
  // {
  //   setfromdate(dates[0]);
  //   settodate(dates[1]);
  // }

  const filterByDate = (dates) => {
    const from = moment(dates[0].$d).format('DD-MM-YYYY');
    const to = moment(dates[1].$d).format('DD-MM-YYYY');
    setfromdate(from);
    settodate(to);
}
  


  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className="col-md-3">
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
      </div>

      <div className='row justify-content-center mt-5 '>
        {loading ? (
          <Loader/>
          ) : rooms.length>1 ? (
            rooms.map(room=>{
              return <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            })
          ) : (
            <Error/>
          )
        }
      </div>
    </div>
  )
}

export default Homescreen