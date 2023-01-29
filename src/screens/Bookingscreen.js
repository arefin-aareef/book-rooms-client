import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Bookingscreen ({  }) {
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()
  const [room, setroom] = useState()

  let { roomid } = useParams();

  useEffect(() => {

    async function fetchData() {
      try {
        setloading(true);
        const data = (await axios.post('/api/rooms/getroombyid', {roomid : roomid} )).data;
        
        setroom(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    }

    fetchData();

  }, []);



  return (
    <div className="m-5">

      {loading ? (<Loader/>) : room ? (<div>

        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className='bigimg' />
          </div>

          <div className="col-md-6">
            <div style={{textAlign:'right'}}>
              <h1>Booking Details</h1>
              <hr />
              <b>
              <p>Name : </p>
              <p>From Date : </p>
              <p>To Date : </p>
              <p>Max Count : {room.maxcount}</p>
              </b>
            </div>

            <div style={{textAlign:'right'}}>
              <h1>Amount</h1>
              <hr />
              <b>
              <p>Total Days : </p>
              <p>Rent Per Day : {room.rentperday}</p>
              <p>Total Amount</p>
              </b>
            </div>

            <div style={{float:'right'}}>
              <button className="btn btn-primary">Pay Now</button>
            </div>

          </div>
        </div>

      </div>) : (<Error/>)}
      
    </div>
  );
}

export default Bookingscreen;












// function Bookingscreen ({match}) {
//   let { id } = useParams();

//   return (
//     <div>
//       <h1>Book screen</h1>
//       <h1>Room id = {id}</h1>
//     </div>
//   );
// }

// export default Bookingscreen;











// import React, { useState, useEffect } from 'react'
// import axios from 'axios';

// function Bookingscreen({ match }) {

//   const [loading, setloading] = useState(true);
//   const [error, seterror] = useState();
//   const [room, setroom] = useState();

  // useEffect(() => {

  //   async function fetchData() {
  //     try {
  //       setloading(true);
  //       const data = (await axios.get('/api/rooms/getroombyid', {roomid : match.params.roomid})).data;
        
  //       setroom(data);
  //       setloading(false);
  //     } catch (error) {
  //       setloading(false);
  //       seterror(true);
  //     }
  //   }

  //   fetchData();

  // }, []);
  
//   return (
    // <div>
    //   {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error...</h1>) : (<div>

    //     <div className="row">
    //       <div className="col-md-5">
    //         <h1>{room.name}</h1>
    //         <img src={room.imageurls[0]} className='bigimg' />
    //       </div>

    //       <div className="col-md-5">

    //       </div>
    //     </div>

    //   </div>)}
    // </div>
//   )
// }

// export default Bookingscreen