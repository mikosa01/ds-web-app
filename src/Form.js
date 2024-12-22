import {useState} from 'react'; 

function Form() {

    const [form, setForm] = useState({name: ' ', email: ' '})
    const handlerSubmit = (event) => {
        event.preventDefault(); 
        console.log('Form Submitted')
        console.log(form)
    }; 
    
    const onChange = (event) => {
        console.log('Changed input field')
        const name = event.target.name
        const value = event.target.value 
        console.log('event.target.name:${name}, event.target.value: ${value}');
        setForm({...form, [name]: value})
    }

    return(
        <form onSubmit= {handlerSubmit}>
            <input type = "text" name = 'name' onChange={onChange} placeholder='Name (e.g John)'/>
            <input type = "text" name = 'email' onChange={onChange} placeholder='email john.doe@example.com'/>
            <button type = 'submit'> Submit Here </button>

        </form>
    )
}

export default Form;