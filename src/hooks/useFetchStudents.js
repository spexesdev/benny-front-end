import { useEffect, useState } from "react";

const useFetchStudents = () => {

    const [studentsData, setStudentsData] = useState([])
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        //fetch the data from the api...
        setIsLoading(true)
        fetch("http://localhost:3001/api/students")
            .then(response => (response.json()))
            .then(response => {
                //Output this if okay...
                if (response.status === 200) {
                    setStudentsData(response.data)

                } else {
                    setErrorMessage(response.message);
                }

            })
            .catch(error => {
                setErrorMessage(error.message);
            })

    }, [])

    return ({ studentsData, errorMessage, isLoading });
}

export default useFetchStudents;
