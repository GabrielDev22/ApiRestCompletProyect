import { useEffect, useState } from 'react'
import { Buffer } from 'buffer';
import axios from 'axios';
import './App.css'

function App() {

  const [listUsers, setListUsers] = useState([]);

  const username = 'gabriel';
  const password = '1234';
  
  const credentials = Buffer.from(`${username}:${password}`).toString('base64');
  const authorizationHeader = `Basic ${credentials}`; 

  useEffect(() => {
    axios.get('http://localhost:8080/test/getAll',{
      headers:{
        'Authorization' : authorizationHeader
      }
    })
    .then(response => {
      console.log(response.data)
      setListUsers(response.data)
    })
  },[])

  const createPost = () => {
    const name = document.getElementById('name').value 
    const lastName = document.getElementById('lastName').value
    const gmail = document.getElementById('gmail').value
    const bodyText = document.getElementById('bodyText').value

    axios.post('http://localhost:8080/test/create',{
      name : name,
      lastName : lastName,
      gmail : gmail,
      bodyText : bodyText
      },{
        headers:{
          'Authorization' : authorizationHeader
        }
      })
      .then((response) => {
        console.log(response.data)
        console.log('Se ha creado el post exitosamente')
      })
    }

    const actualizarUsuario = () => {
      const name = document.getElementById('name').value 
      const lastName = document.getElementById('lastName').value
      const gmail = document.getElementById('gmail').value
      const bodyText = document.getElementById('bodyText').value

      axios.put('http://localhost:8080/test/update',{
        name : name,
        lastName : lastName,
        gmail : gmail,
        bodyText : bodyText
      },{
        headers:{
          'Authorization' : authorizationHeader
        }
      })
      .then(() => {
        console.log("Posted update finish!")
        setListUsers(true)
      })
    }

    const deleteUsuario = (response) => {
      try{
        axios.delete(`http://localhost:8080/test/delete/${response}`,{
          headers:{
            'Authorization' : authorizationHeader
          },
        })
        .then(() => {
          console.log("Post delete finish!")
          setListUsers(true)
        })
      }catch (err){
        console.log(err)
        alert(err)
      }
    }

  return (
    <>
 
      <form className='formulario'>
        <input className='input' id='id' type='number' placeholder='ID' required />
        <input className='input' id='name'  type="text" placeholder='Name' />
        <input className='input' id='lastName' type='text' placeholder='LastName' />
        <input className='input' id='gmail' type='text' placeholder='Gmail' />
        <textarea className='textarea'id='bodyText' type="text" placeholder='bodyText' />
        <button onClick={createPost} className='envioSolicitud'>Enviar Solicitud</button>
      </form>

      {listUsers.map(list => (
        <div className='contenedorListado' key={list.id}>
          <ul className='listadoContenido'>
            <li className='lista'>{list.id}</li>
            <li className='lista'>{list.name}</li>
            <li className='lista'>{list.lastName}</li>
            <li className='lista'>{list.correo}</li>
            <li className='lista'>{list.bodyText}</li>
            <button onClick={actualizarUsuario}>ActualizarUsuario</button>
            <button onClick={() => deleteUsuario(list.id)}>EliminarUsuario</button>
          </ul>
        </div>
      ))}


    </>
  )
}

export default App
