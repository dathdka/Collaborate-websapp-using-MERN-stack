import { randomColor } from "randomcolor";
import { PieChart } from "react-minimal-pie-chart";
import { useEffect, useState } from "react";
export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://scraping-8v2x.onrender.com/api/itviec").then(
        async (res) => {
          if (res.ok) setData(await res.json());
        }
      );
    };
    fetchData();
    console.log(data);
  }, []);

  return (
    <div>
      {data?.languages?.map((skill) => {
        return (
          <h1>
            {skill.skill} {skill.quantity} {randomColor()}
          </h1>
        );
      })}
      <PieChart
        data={[
          { title: "One", value: 10, color: "#E38627" },
          { title: "Two", value: 15, color: "#C13C37" },
          { title: "Three", value: 20, color: "#6A2135" }
        ]}
      />
    </div>
  );
}
