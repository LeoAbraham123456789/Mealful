import "./Home.scss";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import Navigationbar from "../Components/Navigationbar";
function Home() {
  const [date3, setDate3]=useState('');
  const [data10, setData10] = useState([
    {
      time: "9am to 12am",
      count: 0,
    },
    {
      time: "12pm to 3pm",
      count: 0,
    },
    {
      time: "3pm to 6pm",
      count: 0,
    },
    {
      time: "6pm to 9pm",
      count: 0,
    },
    {
      time: "9pm to 9am",
      count: 0,
    },
  ]);
  const [loading0, setLoading0] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data4, setData4] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const [date, setDate] = useState();
  var k = 0;
  const data2 = [];
  var dates = [];
  var data2grouped = [];
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };
  function handleClick() {
    for (let i = 0; i < data.length; i++) {
      if (data[i].item_date === date) {
        console.log(data[i].schedule_time)
        data2.push(data[i]);
        var sch_time = data2[k].schedule_time.split(" ");
        data2[k].schedule_time = sch_time[0];
        k++;
      }
    }
    data2grouped = groupBy(data2, "schedule_time");
    dates = Object.keys(data2grouped);
    for (let i = 0; i < dates.length; i++) {
      data4.push({ date: dates[i], count: data2grouped[dates[i]].length });
    }
    setLoading(true);
  }
  function handleClick2(e) {
    setDate3(e.activeLabel);
    setLoading2(false);
    data10[0].count = 0;
    data10[1].count = 0;
    data10[2].count = 0;
    data10[3].count = 0;
    data10[4].count = 0;
    fetch("https://leoabraham123456789.github.io/JSON-File/P2VO.json")
      .then((res) => {
        if (!res.ok) {
          throw Error("Not able to fetch from the given end point");
        }
        return res.json();
      })
      .then((data) => {
        data=data.data;
        try {
          var k = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].item_date == date) {
              var schtime2 = data[i].schedule_time.split(" ");
              if (schtime2[0] == e.activeLabel) {
                if (schtime2[1] <= "12:00:00") {
                  data10[0].count += 1;
                } else if (
                  schtime2[1] > "12:00:00" &&
                  schtime2[1] <= "15:00:00"
                ) {
                  data10[1].count += 1;
                } else if (
                  schtime2[1] > "15:00:00" &&
                  schtime2[1] <= "18:00:00"
                ) {
                  data10[2].count += 1;
                } else if (
                  schtime2[1] > "18:00:00" &&
                  schtime2[1] <= "21:00:00"
                ) {
                  data10[3].count += 1;
                } else {
                  data10[4].count += 1;
                }

                console.log(schtime2[1]);
              }
            }
          }
          console.log(data10);
          setLoading2(true);
        } catch (e) {
          console.log(e);
        }
        {
          console.log(data[0].item_date);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <Navigationbar />
      <div className="topdiv">
        <img
          className="image"
          src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
          alt="image"
        />
        <div className="Comp">
          <button
            className="get_btn"
            onClick={async () => {
              setLoading0(true);
              await fetch("https://leoabraham123456789.github.io/JSON-File/P2VO.json")
                .then((res) => {
                  if (!res.ok) {
                    throw Error("Not able to fetch from the given end point");
                  }
                  return res.json();
                })
                .then((data) => {
                  try {
                    setData(data.data);
                    console.log(data.data);
                  } catch (e) {
                    console.log(e);
                  }
                  {
                    console.log(data[0].item_date);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Press to get Data from database
          </button>
          {
            loading0 &&
          <label>
            Choose Date: <nbsp />
            <nbsp />
            <input
              className="date_inp"
              type="date"
              onChange={(e) => {
                setLoading(false);
                setLoading2(false);
                setData4([]);
                setDate(e.target.value);
              }}
            ></input>
          </label>
}
{loading0 &&
          <button
            className="show_btn"
            onClick={() => {
              handleClick();
            }}
          >
            Show Graph
          </button>
}
          {loading && console.log(data4)}
          {loading && (
            <BarChart
              width={730}
              height={250}
              data={data4}
              onClick={(e) => {
                handleClick2(e);
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          )}
          {loading2 && <h2>Time Values on Date: {date3}</h2>}
          {loading2 && (
            <BarChart width={730} height={250} data={data10}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
