// import React from "react";

// export default function Head() {
//   const [countyNames, setCountyNames] = React.useState([]);
//   const [currentCounty, setCurrentCounty] = React.useState("Dallam");

//   function picker(e) {
//     setCurrentCounty(e.target.value);
//   }

//   React.useEffect(function () {
//     fetch("https://data.texas.gov/resource/m3yf-ffwm.json")
//       .then((res) => res.json())
//       .then((data) =>
//         setCountyNames(
//           data.map((obj) => (
//             <option key={obj.name} value={obj.name}>
//               {obj.name}
//             </option>
//           ))
//         )
//       );
//   }, []);

//   return (
//     <>
//       <div className="head-container">
//         <nav>
//           <img src="./images/tx-flag.png" className="tx-icon" />
//           <h1 id="title" className="title">Texas County Viewer: </h1> <h1 id="tc" className="title">{currentCounty}</h1>
//           <div className="picker">
//             <label for="county">Choose county: </label>
//             <select onChange={picker} id="county" name="county">
//               {countyNames}
//             </select>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// }
