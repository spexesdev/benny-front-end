import { useEffect, useState } from 'react';

const InputComponent = props => {

    const [inputValue, setInputValue] = useState(props.value)

    const updateRecord = () => {
        if (inputValue === "") {
            alert('Cannot update empty value');
            return
        }

        const data = {
            id: props.studentsId,
            score: inputValue,
        }

        //Else, proceed to send...
        const options = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
            'method': 'POST',
            'body': JSON.stringify(data)
        }

        fetch("http://localhost:3001/api/post-results", options)
            .then(response => (response.json()))
            .then(response => {
                if (response && response.status === 200) {
                    alert('Score updated!');
                    props.refreshData();
                } else {
                    alert(response.message)
                }

            })
            .catch(error => {
                alert(error.message);
            })

    }

    useEffect(() => {
        props.setValue(inputValue)

    }, [inputValue])

    return (
        <div className='input-group'>
            <input
                className='form-control'
                type='number'
                id={props.id}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <label className='d-none'>({props.studentName})</label>
            <button onClick={updateRecord}>Update Score</button>
        </div>
    );
}

export default InputComponent;
