import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];
    console.log("LineChart component re-rendered");

    // Check if coinHistory contains data
    if (coinHistory && coinHistory.data && coinHistory.data.history) {
        // Extract historical data
        const historicalData = coinHistory.data.history;

        for (let i = 0; i < historicalData.length; i += 1) {
            coinPrice.push(parseFloat(historicalData[i].price)); // Convert price to a numeric value
            coinTimestamp.push(
                new Date(
                    historicalData[i].timestamp * 1000
                ).toLocaleDateString()
            ); // Convert timestamp to a valid date
        }
    }

    coinTimestamp.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });

    console.log("Coinnnnnnnnnnnn",coinTimestamp);

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: "Price In INR",
                data: coinPrice,
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd",
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    console.log("Data for Line Chart:", data); // Add this line
    console.log("Options for Line Chart:", options); // Add this line

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart{" "}
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">
                        Change: {coinHistory?.data?.change}%
                    </Title>
                    <Title level={5} className="current-price">
                        Current {coinName} Price: ₹ {currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart;
