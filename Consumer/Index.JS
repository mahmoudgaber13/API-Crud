function showEmployeeCreateBox() {
  Swal.fire({
    title: 'Create Employee',
    html:
      '<input id="id" type="hidden">' +

      '<div class="form-group row"><label for="name" class="col-sm-4 col-form-label">Name:</label>' +
      '<div class="col-sm-8"><input id="name" required class="form-control" placeholder="name">' +
      '</div></div>' +

      '<div class="form-group row"><label for="birthdate" class="col-sm-4 col-form-label">Birthdate:</label>' +
      '<div class="col-sm-8"><input id="birthdate" required type="date" class="form-control" placeholder="birthdate">' +
      '</div></div>' +

      '<div class="form-group row"><label for="title" class="col-sm-4 col-form-label">Title:</label>' +
      '<div class="col-sm-8"><input id="title" required class="form-control" placeholder="title">' +
      '</div></div>' +

      '<div class="form-group row"><label for="hiringDate" class="col-sm-4 col-form-label">Hiring date:</label>' +
      '<div class="col-sm-8"><input id="hiringDate" required type="date" class="form-control" placeholder="hiringDate">' +
      '</div></div>' +

      '<div class="form-group row"><label for="departmentId" class="col-sm-4 col-form-label">Department:</label>' +
      '<div class="col-sm-8"><select id="departmentId" required name="departmentId" class=" form-control" >' +
      '</div></div>'

    ,
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      if (document.getElementById('name').value.length < 1) {
        Swal.showValidationMessage('Name field is required')
      }
      else if (document.getElementById('birthdate').value.length < 1) {
        Swal.showValidationMessage('Birthdate field is required')
      }
      else if (document.getElementById('title').value.length < 1) {
        Swal.showValidationMessage('Title field is required')
      }
      else if (document.getElementById('hiringDate').value.length < 1) {
        Swal.showValidationMessage('Hiring date field is required')
      }

      else {
        EmployeeCreate();
      }
    }

  })
  getDepts();
}

function EmployeeCreate() {
  const name = document.getElementById("name").value;
  const birthdate = document.getElementById("birthdate").value;
  const title = document.getElementById("title").value;
  const hiringDate = document.getElementById("hiringDate").value;
  const selectList = document.getElementById("departmentId");
  const departmentId = selectList.value;
  const departmentName = selectList.options[selectList.selectedIndex].text;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://localhost:44311/api/Employee/AddEmployee");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    Id: 0, "Name": name, "Birthdate": birthdate, "Title": title, "HiringDate": hiringDate,
    "DepartmentId": departmentId, "DepartmentName": departmentName 
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({
        title: 'Create Employee',
        html:
          '<h1>Succeeded </h1>'
      })
      loadEmpTable();
    }
    else {
      Swal.fire({
        title: 'Create Employee',
        html:
          '<h1>Failed </h1>'
      })
    }
  };
}


function loadEmpTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://localhost:44311/api/Employee/GetAllEmployees");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = '';
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += '<tr>';
        trHTML += '<td>' + object['Id'] + '</td>';
        trHTML += '<td>' + object['Name'] + '</td>';
        trHTML += '<td>' + object['Birthdate'].split("T")[0] + '</td>';
        trHTML += '<td>' + object['Title'] + '</td>';
        trHTML += '<td>' + object['HiringDate'].split("T")[0] + '</td>';
        trHTML += '<td>' + object['DepartmentName'] + '</td>';
        trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showEmployeeEditBox(' + object['Id'] + ')">Edit</button>';
        trHTML += '<button type="button" class="btn btn-outline-danger" onclick="EmployeeDelete(' + object['Id'] + ')">Del</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}



function getDepts() {
  var url = "https://localhost:44311/api/Department/GetAllDepartments";
  var id, name;
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var res = JSON.parse(xhr.responseText),
        data = res;
      for (var i = 0; i < data.length; i++) {
        var ele = document.createElement("option");
        ele.value = data[i].Id;
        ele.innerHTML = data[i].Name;
        document.getElementById("departmentId").appendChild(ele);
      }
    }
  }
  xhr.open("GET", url, true);
  xhr.send();

}



function showEmployeeEditBox(id) {
  var x;
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://localhost:44311/api/Employee/GetEmployeeById?Id=" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const Employee = JSON.parse(this.responseText);
      x = Employee['departmentId'];

      Swal.fire({
        title: 'Update Employee',
        html:
          '<input id="Id" type="hidden" value=' + Employee['id'] + '>' +
          
          '<div class="form-group row"><label for="name" class="col-sm-4 col-form-label">Name:</label>' +
          '<div class="col-sm-8"><input id="name" required class="form-control" value="' + Employee['name'] +'"placeholder="name"  >'+
          '</div></div>' +

          '<div class="form-group row"><label for="birthdate" class="col-sm-4 col-form-label">Birthdate:</label>' +
          '<div class="col-sm-8"><input id="birthdate" required type="date" class="form-control" placeholder="birthdate"value=' + Employee['birthdate'].split("T")[0] + '>'+
          '</div></div>' +

          '<div class="form-group row"><label for="title" class="col-sm-4 col-form-label">Title:</label>' +
          '<div class="col-sm-8"><input id="title" required class="form-control" placeholder="title"value="' + Employee['title'] + '">'+
          '</div></div>' +

          '<div class="form-group row"><label for="hiringDate" class="col-sm-4 col-form-label">Hiring date:</label>' +
          '<div class="col-sm-8"><input id="hiringDate" required type="date" class="form-control" placeholder="hiringDate"value=' + Employee['hiringDate'].split("T")[0] + '>'+
          '</div></div>' +

          '<div class="form-group row"><label for="departmentId" class="col-sm-4 col-form-label">Department:</label>' +
          '<div class="col-sm-8"><select id="departmentId" required name="departmentId" class=" form-control" >' +
          '</div></div>'
        ,
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
          if (document.getElementById('name').value.length < 1) {
            Swal.showValidationMessage('Name field is required')
          }
          else if (document.getElementById('birthdate').value.length < 1) {
            Swal.showValidationMessage('Birthdate field is required')
          }
          else if (document.getElementById('title').value.length < 1) {
            Swal.showValidationMessage('Title field is required')
          }
          else if (document.getElementById('hiringDate').value.length < 1) {
            Swal.showValidationMessage('Hiring date field is required')
          }

          else {
            EmployeeEdit();
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

function EmployeeEdit() {
  const id = document.getElementById("Id").value;
  const name = document.getElementById("name").value;
  const birthdate = document.getElementById("birthdate").value;
  const title = document.getElementById("title").value;
  const hiringDate = document.getElementById("hiringDate").value;
  const selectList = document.getElementById("departmentId");
  const departmentId = selectList.value;
  const departmentName = selectList.options[selectList.selectedIndex].text;
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "https://localhost:44311/api/Employee/UpdateEmployee");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "id": id, "Name": name, "Birthdate": birthdate, "Title": title, "HiringDate": hiringDate,
    "DepartmentId": departmentId, "DepartmentName": departmentName
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({
        title: 'Update Employee',
        html:
          '<h1>Succeeded </h1>'
      })
      loadEmpTable();
    }
    else {
      Swal.fire({
        title: 'Update Employee',
        html:
          '<h1>Failed </h1>'
      })
    }
  };
}



function EmployeeDelete(id) {
  const xhttp = new XMLHttpRequest();
  console.log(id);
  xhttp.open("DELETE", "https://localhost:44311/api/Employee/DeleteEmployee?Id=" + id);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({
        title: 'Delete Employee',
        html:
          '<h1>Success </h1>'
      })
      loadEmpTable();
    }
    else {
      Swal.fire({
        title: 'Delete Employee',
        html:
          '<h1 > Failed </h1>'
      })
    }
  };
}


loadEmpTable();
