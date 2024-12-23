import {useState} from 'react'; 
import './Form.css'; 


function Form() {

    const [form, setForm] = useState({
        pregnancies: '',
        glucose : '',
        blood_pressure : '', 
        skin_thickness : '',
        insulin_level : '', 
        bmi : '', 
        diabetes_predigree : '', 
        age : ''
    }); 
    
    const [loading, setLoading] = useState(false)
    const[result, setResult] = useState(' ');
    
    const handlerSubmit = (event) => {
        event.preventDefault(); 
        const form_data  = new FormData();
        form_data.append('1', form.pregnancies); 
        form_data.append('2', form.glucose); 
        form_data.append('3', form.blood_pressure); 
        form_data.append('4', form.skin_thickness);
        form_data.append('5', form.insulin_level); 
        form_data.append('6', form.bmi);
        form_data.append('7', form.diabetes_predigree); 
        form_data.append('8', form.age);

        setLoading(true);

        fetch("https://dsdeploymodel-fb2b19c0e899.herokuapp.com/predict", {
            method : 'POST', 
            body: form_data })
        //.then(response => console.log(response))
        .then(response => response.text())
        .then(html => {
            setResult(html);
            setLoading(false);
        })
    }; 
    
    const onChange = (event) => {
        const name = event.target.name
        const value = event.target.value 
        setForm({...form, [name]: value});
    }
    const handlerClear = () =>{
        setForm({
            pregnancies: '',
            glucose : '',
            blood_pressure : '', 
            skin_thickness : '',
            insulin_level : '', 
            bmi : '', 
            diabetes_predigree : '', 
            age : ''
        });
    setResult('');
    }

    return(
        <form onSubmit= {handlerSubmit}>
            <h4> Diabetes Prediction Model </h4>
            <p> Example to predict probabilities of Diabetes </p>
            <input type = "number" name = 'pregnancies' onChange={onChange} value={form.pregnancies} placeholder='Number of pregnancies' required/>
            <input type = "number" name = 'glucose' onChange={onChange} value={form.glucose} placeholder='Number of glucose' required/>
            <input type = "number" name = 'blood_pressure' onChange={onChange} value={form.blood_pressure }placeholder='Number of blood pressures ' required/>
            <input type = "number" name = 'skin_thickness' onChange={onChange} value={form.skin_thickness} placeholder='skin thickness level' required/>
            <input type = "number" name = 'insulin_level' onChange={onChange} value={form.insulin_level} placeholder='Insulin Level' required/>
            <input type = "number" name = 'bmi' onChange={onChange} value={form.bmi} placeholder='Body mass index' required/>
            <input type = "number" name = 'diabetes_predigree' onChange={onChange} value={form.diabetes_predigree} placeholder='Diabetes Level' required/>
            <input type = "number" name = 'age' onChange={onChange} value={form.age} placeholder='Age' required/>
            <button type = 'submit' disable={loading}> {loading ? 'Predicting result ....': 'Submit Form'} </button>
            {result && <span onClick={handlerClear}> Clear Button</span>}
            {result && <div dangerouslySetInnerHTML = {{__html: result}} className='result'/>}
        </form>
    )
}

export default Form;