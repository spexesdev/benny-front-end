import { useEffect, useState } from 'react';
import { Box, Container } from "@mui/material";
import InputComponent from "../components/input-component";
import useFetchStudents from '../hooks/useFetchStudents';


//Functional component implementation... Was a little buggy so
//I had to leave it for the sake of time...

const HomePage = () => {

    const { studentsData } = useFetchStudents();

    const [value01, setValue01] = useState(0);
    const [value02, setValue02] = useState(0);
    const [value03, setValue03] = useState(0);
    const [value04, setValue04] = useState(0);
    const [value05, setValue05] = useState(0);

    //Set on load complete...
    useEffect(() => {
        setValue01(studentsData[0]?.score)
        setValue02(studentsData[1]?.score)
        setValue03(studentsData[2]?.score)
        setValue04(studentsData[3]?.score)
        setValue05(studentsData[4]?.score)

    }, [])

    const [averageScore, setAverageScore] = useState()

    const namesMap = studentsData.map((item, index) => (<h5 key={index}><span>{index + 1}.</span>{item.fullname}</h5>));
    const scoresMap = studentsData.map((item, index) => {
        let value, setFunction;
        switch (index) {
            case 0:
                value = value01;
                setFunction = setValue01;
                break;
            case 1:
                value = value02;
                setFunction = setValue02;
                break;
            case 2:
                value = value03;
                setFunction = setValue03;
                break;
            case 3:
                value = value04;
                setFunction = setValue04;
                break;
            default:
                value = value05;
                setFunction = setValue05;
                break;
        }

        return (
            <InputComponent
                key={index}
                studentName={item.fullname}
                id={`txt${index}`}
                value={value}
                setValue={setFunction}
            />
        )
    })

    useEffect(() => {
        const sum = parseFloat(value01) + parseFloat(value02) + parseFloat(value03) + parseFloat(value04) + parseFloat(value05);
        setAverageScore((sum / 5).toFixed(1) || 0)

    }, [value01, value02, value03, value04, value05])

    return (
        <Container>
            <Box sx={{ bgcolor: '#fff', height: '100vh', padding: '30px' }}>
                <div className='header-part'>
                    <h2>Assessment Scores Adjuster</h2>
                </div>
                <div className='grid-container'>
                    <div className='left-grid'>
                        <h2>Students</h2>
                        {/* Names of all students... */}
                        {namesMap}
                    </div>
                    <div className='right-grid'>
                        <h2>Adjust Scores</h2>
                        {scoresMap}
                    </div>
                </div>
                <div className='grid-container'>
                    <div className='left-grid'>
                        <div className='score-container'>
                            <h3>Average Score</h3>
                            <h5>{averageScore}</h5>
                        </div>

                    </div>
                </div>

            </Box>

        </Container>
    );
}

export default HomePage;
