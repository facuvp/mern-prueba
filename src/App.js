import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      description: '',
      tasks: [],
      _id: ''
    }
    this.agregarTarea = this.agregarTarea.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  agregarTarea(e){
    e.preventDefault();
    if(this.state._id){
      fetch(`http://localhost:4000/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description
        }),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          _id: '',
          title: '',
          description: '',
        });
        this.obtenerTareas();
      })
      .catch(err => console.error(err));
    }else{
      fetch('http://localhost:4000/add', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: '',
          description: '',
        });
        this.obtenerTareas();
      })
      .catch(err => console.error(err));
    }
  }

  eliminarTarea(id){
    fetch(`http://localhost:4000/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.obtenerTareas();
    })
    .catch(err => console.error(err));
  }

  editarTarea(id){
    fetch(`http://localhost:4000/${id}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        _id: data._id,
        title: data.title,
        description: data.description
      });
    })
    .catch(err => console.error(err));
  }

  componentDidMount(){
    this.obtenerTareas();
  }
  
  obtenerTareas(){
    fetch('http://localhost:4000/')
    .then(res => res.json())
    .then(data => {
      this.setState({tasks: data});
      console.log(this.state.tasks)
    });
  }

  handleChange(e){
    const {name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    let button;
    if(this.state._id){
      button = <button type="submit" className="btn btn-primary">Actualizar</button>
    } else {
      button = <button type="submit" className="btn btn-success">Agregar</button>
    }
    return (
      <div className="container-fluid container-xl">
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-brand">Listado de tareas</div>
        </nav>
        <div className="row my-3">
          <div className="col">
            <div className="card bg-dark text-light">
              <div className="card-body">
                <form onSubmit={this.agregarTarea}>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="tituloInput">Nueva tarea</label>
                      <input name="title" onChange={this.handleChange} type="text" className="form-control" id="tituloInput" value={this.state.title}/>
                    </div>
                    <div className="form-group col-md-auto flex-grow-1">
                      <label htmlFor="descriptionInput">Descripción</label>
                      <input name="description" onChange={this.handleChange} type="text" className="form-control" id="descriptionInput" value={this.state.description}/>
                    </div>
                    <div className="col-md-auto align-self-end mb-3">
                      {button}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.tasks.map(task => {
                  return(
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>
                        <button onClick={() => this.editarTarea(task._id)} className="btn btn-outline-primary button">
                          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                          <span className="sr-only">Edit</span>
                        </button>
                        <button onClick={() => this.eliminarTarea(task._id)} className="ml-3 btn btn-danger button">
                          <i className="fa fa-trash" aria-hidden="true"></i>
                          <span className="sr-only">Delete</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
}

export default App;
