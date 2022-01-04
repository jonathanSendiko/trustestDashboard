import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

const Userdetail = () => {
    const location = useLocation();

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'NUMBER OF TIMES STUDENT WENT OUT OF FRAME',
          },
        },
    };
      
    const labels = ["'10", "'20", "'30", "'40", "'50", "'60"];
      
    const data = {
        labels,
        datasets: [
          {
            label: location.state.displayName,
            data: location.state.logs,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
    };

    useEffect(() => {
    }, [location]);
  
    return (
        <div className="user-container">
            <Line options={options} data={data} />;
            <h3>Student's informations:</h3>
            <p>Name: {location.state.displayName}</p>
            <p>Email: {location.state.email}</p>
            <p>NPM: {location.state.npm}</p>
        </div>
      );
  };
  
  export default Userdetail;