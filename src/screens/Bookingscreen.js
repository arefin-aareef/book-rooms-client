import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function Bookingscreen ({  }) {
  const [loading, setloading] = useState()
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
    <div>
      <h1>Booking screen</h1>
      <h1>Room id = {roomid}</h1> 
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
//     <div>
//       {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error...</h1>) : (<div>

//         <div className="row">
//           <div className="col-md-5">
//             <h1>{room.name}</h1>
//             <img src={room.imageurls[0]} className='bigimg' />
//           </div>

//           <div className="col-md-5">

//           </div>
//         </div>

//       </div>)}
//     </div>
//   )
// }

// export default Bookingscreen