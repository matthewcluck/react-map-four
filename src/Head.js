import React from "react";

export default function Head() {
  const [countyNames, setCountyNames] = React.useState([]);

  React.useEffect(function () {
    console.log("Effect ran");
    fetch("https://data.texas.gov/resource/m3yf-ffwm.json")
      .then((res) => res.json())
      .then ((data) => setCountyNames(data.map(obj => <option value={obj.name}>{obj.name}</option>)));
  }, []);
  
  return (
    <>
      <div className="head-container">
        <nav>
          <img src="./images/tx-flag.png" className="tx-icon" />
          <h1 className="title">Texas County Viewer</h1>
          <div className="picker">
            <label for="county">Choose county:  </label>
            <select id="county" name="county">
              {countyNames}
            </select>
          </div>
        </nav>
      </div>
    </>
  );
}
