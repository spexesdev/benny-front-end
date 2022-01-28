import React from 'react';
import { Box, Container } from "@mui/material";
import InputComponent from "../components/input-component";

class HomePage extends React.Component {

    constructor() {
        super()
        this.state = {
            value01: 0,
            value02: 0,
            value03: 0,
            value04: 0,
            value05: 0,
            studentsData: [],
            averageScore: 0,

        }
    }

    fetchStudentsData = () => {
        fetch("http://localhost:3001/api/students")
            .then(response => (response.json()))
            .then(response => {
                //Output this if okay...
                if (response.status === 200) {
                    this.setState({
                        studentsData: response.data,
                        value01: response.data[0]?.score,
                        value02: response.data[1]?.score,
                        value03: response.data[2]?.score,
                        value04: response.data[3]?.score,
                        value05: response.data[4]?.score,
                    })

                } else {
                    alert(response.message);
                }

            })
            .catch(error => {
                alert(error.message);
            })
    }
    componentDidMount() {
        //Fetch the values, then set...
        this.fetchStudentsData();
    }

    handleChange = () => {

        //The useEffect equivalent...
        const sum = parseFloat(this.state.value01) +
            parseFloat(this.state.value02) + parseFloat(this.state.value03) +
            parseFloat(this.state.value04) + parseFloat(this.state.value05);

        this.setState({
            averageScore: (sum / 5).toFixed(1) || 0
        })

    }

    render() {

        const namesMap = this.state.studentsData.map((item, index) => (<h5 key={index}><span>{index + 1}.</span>{item.fullname}</h5>));
        const scoresMap = this.state.studentsData.map((item, index) => {
            let value, setFunction;
            switch (index) {
                case 0:
                    value = this.state.value01;
                    setFunction = (val) => this.setState({ value01: val }, () => this.handleChange());
                    break;
                case 1:
                    value = this.state.value02;
                    setFunction = (val) => this.setState({ value02: val }, () => this.handleChange());
                    break;
                case 2:
                    value = this.state.value03;
                    setFunction = (val) => this.setState({ value03: val }, () => this.handleChange());
                    break;
                case 3:
                    value = this.state.value04;
                    setFunction = (val) => this.setState({ value04: val }, () => this.handleChange());
                    break;
                default:
                    value = this.state.value05;
                    setFunction = (val) => this.setState({ value05: val }, () => this.handleChange());
                    break;
            }

            return (
                <InputComponent
                    key={index}
                    studentName={item.fullname}
                    studentsId={item.id}
                    id={`txt${index}`}
                    value={value}
                    setValue={setFunction}
                    refreshData={this.fetchStudentsData}
                />
            )
        })

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
                                <h5>{this.state.averageScore}</h5>
                            </div>

                        </div>
                    </div>

                </Box>

            </Container>
        );
    }

}

export default HomePage;
