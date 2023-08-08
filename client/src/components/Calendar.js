import React, {useEffect, useState} from 'react';
import './Calendar.css'
import {Button} from "@mui/material";
import Modal from "./Modal";

const Calendar = (props) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const [turns, setTurns] = useState({
        morning: [],
        afternoon: [],
        evening: [],
    });
    const calendar = {1:[],2:[],3:[],4:[],5:[],6:[],7:[]}

    useEffect(()=> {
        renderTasks(selectedDate)

    },[selectedDate, props.tasks, isModalOpen])

    const setTurn = (turnIndex) => {
            if (turnIndex === 1) return 'morning'
            else if  (turnIndex === 2) return 'afternoon'
            else if (turnIndex === 3) return 'evening'
    };

    const scheduledExercises = props.tasks?.forEach(task=>{
        const workouts = task.workouts.map(workout=> {
            return { taskId: task.id, id:workout.id, time: workout.duration, turn: setTurn(workout.preferred_turn), name: workout.workoutname, description: workout.muscle_group_name }
        })
        return calendar[Number(task.weekday)] = workouts

    });

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const orderdDays = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];

    const handleDateClick = (day,weekday) => {
        setSelectedDay(day)
        setSelectedDate(weekday);
    };

    const fetchExercisesData = async (workoutId) => {
        try {
            const response = await fetch(`http://localhost:4000/workouts/${workoutId}/exercises`);
            const data = await response.json();
            return data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleRemoveSchedule = async (scheduleId) => {
        fetch(`/schedule-workout/${scheduleId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('data', data)
                // setSubmitSuccessful(true)
                // setSelectedDate(selectedDate)
                props.handleUserReload(true)
                // setTimeout(()=>renderTasks(selectedDate),2000)
            })
            .catch(error => {
                console.error('There was an error updating the user:', error);
            });
    };

    const renderTasks = date => {
        const tasksForDate = calendar[date];

        const turnsData = {
            morning: [],
            afternoon: [],
            evening: [],
        };

        if (!tasksForDate) {
            return
            // return <div>No tasks for this date.</div>;
        } else if (tasksForDate.length === 0) {
            setTurns(turnsData)
        }

        tasksForDate.forEach(task => {
            fetchExercisesData(task.id).then((exercises) => {
                turnsData[task.turn].push(<div>
                        <div>{task.time} - {task.name} -> {task.description}</div>
                    {(!exercises.status) ? <div>{exercises.map(exercise => <div>{exercise.exercisename}</div>)}</div>: null}
                        <button onClick={() => setModalOpen(true)}>-</button>

                        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                            <h2>Removing Schedule time</h2>
                            <p>Are you sure?</p>
                            <Button onClick={()=>handleRemoveSchedule(task.taskId)}>Remove</Button>

                        </Modal>

                </div>
                )
                setTurns(turnsData)
            })
        });
    };

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const renderDays = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const daysInMonth = getDaysInMonth(month, year);
        const firstDay = new Date(year, month, 1).getDay();
        const today = new Date().getDate()

        const calendarDays = [];
        for (let i = 1; i <= daysInMonth; i++) {
            const weekday = new Date(year, month - 1, i).getDay()+1;
            const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const day = i === today ? <strong className="calendar-day-today">{i}</strong> : <span>{i}</span>
            calendarDays.push(<div className={selectedDay === i ? "calendar-day-selected" : "calendar-day"} onClick={() => handleDateClick(i,weekday)}>{day}</div>);
        }

        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(<div className="calendar-day blank" />);
        }

        return calendarDays;
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
    };

    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
    };


    return (
        <div className={'calendar-container'}>
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={handlePreviousMonth}>Previous</button>
                    <h1>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h1>
                    <button onClick={handleNextMonth}>Next</button>
                </div>
                <div className="calendar-weekdays">
                    {days.map(day => (
                        <div className="calendar-day">{day}</div>
                    ))}
                </div>
                <div className="calendar-days">
                    {renderDays()}
                </div>

            </div>

            {selectedDate && (
                <div className="calendar-tasks">
                    <h2>Tasks for {orderdDays[selectedDate]}</h2>
                    <div>
                        <h3>Morning</h3>
                        {turns.morning.length > 0 ? turns.morning : 'No tasks'}
                        <h3>Afternoon</h3>
                        {turns.afternoon.length > 0 ? turns.afternoon : 'No tasks'}
                        <h3>Evening</h3>
                        {turns.evening.length > 0 ? turns.evening : 'No tasks'}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;