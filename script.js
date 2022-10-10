//URL
const url = "https://magnetic-melon-yam.glitch.me";

//VIP Checkbox function
const createCheckbox = () => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "checkbox";
  checkbox.value = "value";
  checkbox.id = "vipCheckbox";
  document.body.append(checkbox);

  const checkboxLabel = document.createElement("label");
  checkboxLabel.htmlFor = "vipCheckbox";
  checkboxLabel.textContent = "Show VIP only";
  document.body.append(checkboxLabel);
};

//searchBox function
const createSearchBox = () => {
  const searchBox = document.createElement("input");
  searchBox.type = "search";
  searchBox.name = "search";
  searchBox.id = "searchBox";

  const searchBoxButton = document.createElement("button");
  searchBoxButton.textContent = "Search";
  searchBoxButton.id = "searchBoxButton";

  const form = document.createElement("form");
  form.append(searchBox, searchBoxButton);
  document.body.append(form);
};

// Table headers function
const drawTableHeaders = () => {
  const id = document.createElement("th");
  id.textContent = "ID";
  id.id = "id";

  //image header
  const image = document.createElement("th");
  image.textContent = "Image";

  const firstName = document.createElement("th");
  firstName.textContent = "First Name";
  firstName.id = "firstName";

  const lastName = document.createElement("th");
  lastName.textContent = "Last Name";
  lastName.id = "lastName";

  const city = document.createElement("th");
  city.textContent = "City";
  city.id = "city";

  const favouriteColour = document.createElement("th");
  favouriteColour.textContent = "Favourite Colour";
  favouriteColour.id = "favouriteColour";

  const tr = document.createElement("tr");
  tr.append(id, image, firstName, lastName, city, favouriteColour);

  const thead = document.createElement("thead");
  thead.append(tr);

  const tbody = document.createElement("tbody");
  const table = document.createElement("table");

  table.append(thead, tbody);
  document.body.append(table);
};

const drawTableData = (data) => {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  data.forEach((dataItem) => {
    const idData = document.createElement("td");
    idData.textContent = dataItem.id;

    //image
    const imageData = document.createElement("img");
    imageData.src = dataItem.image;
    const imageDataTd = document.createElement("td");
    imageDataTd.append(imageData);
    //first name
    const firstName = document.createElement("td");
    firstName.textContent = dataItem.name.split(" ")[0];

    //last name
    const lastName = document.createElement("td");
    lastName.textContent = dataItem.name.split(" ")[1];

    const cityData = document.createElement("td");
    cityData.textContent = dataItem.city;

    const fav_color = document.createElement("td");
    fav_color.textContent = dataItem.fav_color;

    const tr = document.createElement("tr");

    tr.append(idData, imageDataTd, firstName, lastName, cityData, fav_color);

    tbody.append(tr);
  });
};

createCheckbox();
createSearchBox();
drawTableHeaders();

//show vip only
function showOnlyVip() {
  const isChecked = document.getElementById("vipCheckbox").checked;

  isChecked
    ? drawTableData(
        data.filter((item) => {
          return item.vip === true;
        })
      )
    : drawTableData(data);
}

document.getElementById("vipCheckbox").addEventListener("change", showOnlyVip);

//Search

function search(event) {
  event.preventDefault();
  const searchQuery = document.getElementById("searchBox").value.toLowerCase();
  drawTableData(
    data.filter((item) => item.name.toLowerCase().includes(searchQuery))
  );
}

document.querySelector("form").addEventListener("submit", search);
document.getElementById("searchBox").addEventListener("input", search);

//fetch
async function getData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      data = await response.json();
      console.log(data);

      drawTableData(data);
    }
  } catch (error) {
    console.error(error);
  }
}
getData(url);

// sort table
function sortTableA2Z(column) {
  if (column === "lastName") {
    data.sort((a, b) => {
      if (a.name.split(" ")[1] < b.name.split(" ")[1]) {
        return -1;
      } else if (a.name.split(" ")[1] < b.name.split(" ")[1]) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    data.sort((a, b) => {
      if (a[column] < b[column]) {
        return -1;
      } else if (a[column] < b[column]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  drawTableData(data);
}

function sortTableZ2A(column) {
  data
    .sort((a, b) => {
      if (a[column] < b[column]) {
        return -1;
      } else if (a[column] < b[column]) {
        return 1;
      } else {
        return 0;
      }
    })
    .reverse();

  drawTableData(data);
}

let clicked = false; //global variable

document.getElementById("city").addEventListener("click", () => {
  if (clicked) {
    sortTableZ2A("city");
    clicked = false;
  } else {
    sortTableA2Z("city");
    clicked = true;
  }
});

document.getElementById("favouriteColour").addEventListener("click", () => {
  //"fav_color"
  if (clicked) {
    sortTableZ2A("fav_color");
    clicked = false;
  } else {
    sortTableA2Z("fav_color");
    clicked = true;
  }
});

document.getElementById("lastName").addEventListener("click", () => {
  if (clicked) {
    sortTableZ2A("lastName");
    clicked = false;
  } else {
    sortTableA2Z("lastName");
    clicked = true;
  }
});

document.getElementById("id").addEventListener("click", () => {
  //"id"
  if (clicked) {
    sortTableZ2A("id");
    clicked = false;
  } else {
    sortTableA2Z("id");
    clicked = true;
  }
});

//1 pastebejimas
document.getElementById("firstName").addEventListener("click", () => {
  //"name"
  if (clicked == true || document.getElementById("id").clicked == true) {
    sortTableA2Z("name");
    clicked = false;
  } else if (clicked == false) {
    sortTableZ2A("name");
    clicked = true;
  } else {
    sortTableA2Z("name");
    clicked = true;
  }
});
