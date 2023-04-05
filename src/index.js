import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client'
import axios from 'axios';

const App = () => {
    

    const [ reports, setReports] = useState([]);
    const [title, setTitle ] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const getReports = async() => {

        try{
            const response = await axios.get('/api/reports')
            setReports(response.data.reports);
        } catch(err) {
            console.log(err)
        }
    }
        getReports();
    }, [])

    const onChange = (event) => {
        if(event.target.name === 'title') {
            setTitle(event.target.value)
        } else if(name === 'location') {
            setLocation(value);
        } else if (name === 'description'){
            setDescription(value);
        } else {
            setPassword(value);
        }
    }

    const createReport = async(event) => {
        try{
            const response = await axios.post('/api/reports', {
            title, location, description, password
        });
        setReports([...reports, response.data])
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
        <h1>Phenomena</h1>


        <ul>
            {
                reports.map((report, i) => {
                    return <li key={i}></li>
                })
            }
        </ul>

        <form onSubmit={ createReport }>
            <input value={ title } onChange={ onChange }  name='title' placeholder='title' />
            <input value= {location} onChange= {onChange} name='location' placeholder='location'/>
            <input value=  {description} onChange={onChange} name='description' placeholder='description'/>
            <input value={password} onChange={onChange} name='password' placeholder= 'password'/>
            <button> Create Report</button>
        </form>

        </>
    )
}


const root = createRoot(document.getElementById('root'));
root.render(<App/ >)