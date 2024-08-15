let totalMoney;

// Arrays to store the data for the charts
let things = [];
let costs = [];

// Prompt for the user's total money when the page loads
window.onload = function () {
  totalMoney = Number(prompt("Enter your total money:"));

  if (isNaN(totalMoney) || totalMoney <= 0) {
    alert("Please enter a valid amount of money.");
    totalMoney = 0; // Default to 0 if the input is invalid
  }

  // Display the user's money in the .money div
  updateMoneyDisplay();

  // Create the charts when the page loads
  createBarChart();
  createDoughnutChart();
};

// Function to update the money display
function updateMoneyDisplay() {
  let moneyDiv = document.querySelector(".money p");
  moneyDiv.textContent = `Your money: $${totalMoney}`;
}

// Function to create a new thing element and deduct its cost
function createThing() {
  // Prompt the user for the name and cost of the thing
  let name = prompt("Enter the name of the thing:");
  let cost = Number(prompt("How much does this thing cost?"));

  // Check if the cost is valid and the user has enough money
  if (name && !isNaN(cost) && cost > 0) {
    if (totalMoney >= cost) {
      // Deduct the cost from the total money
      totalMoney -= cost;

      // Update the money display
      updateMoneyDisplay();

      // Create a new div element for the thing
      let newThing = document.createElement("div");
      newThing.textContent = `Name: ${name}, Cost: $${cost}`;

      // Style the new thing element
      newThing.style.border = "1px solid black";
      newThing.style.margin = "5px";
      newThing.style.padding = "10px";
      newThing.style.backgroundColor = "#f0f0f0";

      // Append the new thing to the .things div
      let thingsDiv = document.querySelector(".things");
      thingsDiv.appendChild(newThing);

      // Add data to the charts
      things.push(name);
      costs.push(cost);
      updateCharts();
    } else {
      alert("You don't have enough money for this thing.");
    }
  } else {
    alert("Please provide a valid name and cost.");
  }
}

// Add event listener to the Add button to trigger the createThing function
document.querySelector(".add").addEventListener("click", createThing);

// Chart.js instances
let barChart, doughnutChart;

// Function to create the bar chart
function createBarChart() {
  const barCtx = document.getElementById("barChart").getContext("2d");

  barChart = new Chart(barCtx, {
    type: "bar", // Bar chart type
    data: {
      labels: things,
      datasets: [
        {
          label: "Cost of Things",
          data: costs,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Function to create the doughnut chart
function createDoughnutChart() {
  const doughnutCtx = document.getElementById("doughnutChart").getContext("2d");

  doughnutChart = new Chart(doughnutCtx, {
    type: "doughnut", // Doughnut chart type
    data: {
      labels: things,
      datasets: [
        {
          label: "Cost of Things",
          data: costs,
          backgroundColor: generateRandomColors(costs.length),
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
}

// Function to update both charts with new data
function updateCharts() {
  // Update bar chart
  barChart.data.labels = things;
  barChart.data.datasets[0].data = costs;
  barChart.update();

  // Update doughnut chart
  doughnutChart.data.labels = things;
  doughnutChart.data.datasets[0].data = costs;
  doughnutChart.data.datasets[0].backgroundColor = generateRandomColors(
    costs.length
  );
  doughnutChart.update();
}

// Function to generate random colors for the chart segments
function generateRandomColors(numColors) {
  let colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(`hsl(${Math.random() * 360}, 100%, 75%)`); // Generate random pastel colors
  }
  return colors;
}
