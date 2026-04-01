fetch("http://127.0.0.1:5000/history")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("history");

    data.reverse().forEach(item => {

      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <h3>Page: ${item.page}</h3>
        <p>Time: ${item.time}</p>
        <pre>${JSON.stringify(item.data, null, 2)}</pre>
      `;

      container.appendChild(div);
    });

  });