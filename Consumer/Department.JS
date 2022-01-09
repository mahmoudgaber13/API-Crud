function showDepartmentCreateBox() {
  Swal.fire({
    title: 'Create Department',
    html:
      '<input id="id" type="hidden">' +
      '<label for="name">Name:<input id="name" required class="swal2-input" placeholder="name"></label>'
    // '<label for="birthdate">Birthdate:<input id="birthdate" type="date" class="swal2-input" placeholder="birthdate"></label>' +
    // '<label for="title">Title:<input id="title" class="swal2-input" placeholder="title"></label>' +
    // '<label for="hiringDate">Hiring date:<input id="hiringDate" type="date" class="swal2-input" placeholder="hiringDate"></label>' +
    // '<label for="departmentId">Department:<select id="departmentId" name="departmentId" class="swal2-input" ></select></label>'
    ,
    showCancelButton: true,

    focusConfirm: false,
    preConfirm: () => {
      if (document.getElementById('name').value.length < 1) {
        Swal.showValidationMessage('Name field is required')
      }
      else{
        DepartmentCreate();
      }
      
    }

  })
  //getDepts();
}

function DepartmentCreate() {
  const name = document.getElementById("name").value;
  // const birthdate = document.getElementById("birthdate").value;
  // const title = document.getElementById("title").value;
  // const hiringDate = document.getElementById("hiringDate").value;
  // const departmentId = document.getElementById("departmentId").value

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://localhost:44311/api/Department/AddDepartment");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    Id: 0, "Name": name
    // , "Birthdate": birthdate, "Title": title, "HiringDate": hiringDate,
    // "DepartmentId": departmentId
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({
        title: 'Create Department',
        html:
          '<h1>Succeeded </h1>'
      })
      loadDeptTable();
    }
    else {
      Swal.fire({
        title: 'Create Department',
        html:
          '<h1>Failed </h1>'
      })
    }
  };
}


function loadDeptTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://localhost:44311/api/Department/GetAllDepartments");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = '';
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += '<tr>';
        trHTML += '<td>' + object['Id'] + '</td>';
        trHTML += '<td>' + object['Name'] + '</td>';
        // trHTML += '<td>' + object['Birthdate'].split("T")[0] + '</td>';
        // trHTML += '<td>' + object['Title'] + '</td>';
        // trHTML += '<td>' + object['HiringDate'].split("T")[0] + '</td>';
        // trHTML += '<td>' + object['DepartmentId'] + '</td>';
        trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showDepartmentEditBox(' + object['Id'] + ')">Edit</button>';
        trHTML += '<button type="button" class="btn btn-outline-danger" onclick="DepartmentDelete(' + object['Id'] + ')">Del</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}


function showDepartmentEditBox(id) {
  var x;
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://localhost:44311/api/Department/GetDepartmentById?Id=" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const Department = JSON.parse(this.responseText);
      x = Department['departmentId'];

      Swal.fire({
        title: 'Update Department',
        html:
          '<input id="Id" type="hidden" value=' + Department['id'] + '>' +
          '<label for="name">Name:<input id="Name" required class="swal2-input" placeholder="First" value="' + Department['name'] + '"></label>'
        // '<input type="date" id="Birthdate" class="swal2-input" placeholder="Last" value="' + Department['birthdate'].split("T")[0] + '">' +
        // '<input id="Title" class="swal2-input" placeholder="Departmentname" value="' + Department['title'] + '">' +
        // '<input type="date" id="HiringDate" class="swal2-input" placeholder="Email" value="' + Department['hiringDate'].split("T")[0] + '">' +
        // '<select id="departmentId" name="departmentId" class="swal2-input" ></select>'
        ,
        showCancelButton: true,

        focusConfirm: false,

        preConfirm: () => {
          if (document.getElementById('Name').value.length < 1) {
            Swal.showValidationMessage('Name field is required')
          }
          else {
            DepartmentEdit();
          }
        }
      })

      getDepts();
      setTimeout(function () {
        $("#departmentId").val(x).change();
      }, 10);
    }

  };


}

function DepartmentEdit() {
  const id = document.getElementById("Id").value;
  const name = document.getElementById("Name").value;
  // const birthdate = document.getElementById("Birthdate").value;
  // const title = document.getElementById("Title").value;
  // const hiringDate = document.getElementById("HiringDate").value;
  // const departmentId = document.getElementById("departmentId").value
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "https://localhost:44311/api/Department/UpdateDepartment");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "id": id, "Name": name
    // , "Birthdate": birthdate, "Title": title, "HiringDate": hiringDate,
    // "DepartmentId": departmentId
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({
        title: 'Update Department',
        html:
          '<h1>Succeeded </h1>'
      })
      loadDeptTable();
    }
    else {
      Swal.fire({
        title: 'Update Department',
        html:
          '<h1>Failed </h1>'
      })
    }
  };
}



function DepartmentDelete(id) {
  const xhttp = new XMLHttpRequest();
  console.log(id);
  xhttp.open("DELETE", "https://localhost:44311/api/Department/DeleteDepartment?Id=" + id);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({
        title: 'Delete Department',
        html:
          '<h1>Success </h1>'
      })
      loadDeptTable();
    }
    else {
      Swal.fire({
        title: 'Delete Department',
        html:
          '<h1 > Failed </h1>'
      })
    }
  };
}


loadDeptTable();
