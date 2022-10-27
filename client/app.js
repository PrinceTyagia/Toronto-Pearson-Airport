const tableBody = document.getElementById("table-body");

const getFlight = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "911fdb7b00msh4874820ea5cf870p189520jsn888a5d0f2795",
      "X-RapidAPI-Host": "toronto-pearson-airport.p.rapidapi.com",
    },
  };

  fetch("https://toronto-pearson-airport.p.rapidapi.com/departures", options)
    .then((response) => response.json())
    .then((flights) => populateTable(flights))

    .catch((err) => console.error(err));
};
getFlight();

const populateTable = (flights) => {
  console.log(flights);
  for (const flight of flights) {
    const tableRow = document.createElement("tr");
    const tableIcon = document.createElement("td");
    tableIcon.textContent = "✈";
    tableRow.append(tableIcon);

    const flightDetails = {
      time: flight.departing.slice(0, 5),
      destination: flight.destination.toUpperCase(),
      flight: flight.flightNumber.shift(),
      gate: flight.gate,
      remarks: flight.status.toUpperCase(),
    };

    for (const flightDetail in flightDetails) {
      const tableCell = document.createElement("td");
      const word = Array.from(flightDetails[flightDetail]);

      for (const [index, letter] of word.entries()) {
        const letterElement = document.createElement("span");

        setTimeout(() => {
          letterElement.classList.add("flip");
          letterElement.textContent = letter;
          tableCell.append(letterElement);
        }, 100 * index);
      }
      tableRow.append(tableCell);
    }
    tableBody.append(tableRow);
  }
};
