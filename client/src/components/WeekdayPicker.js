import React, { useState } from 'react';

function WeekdayPicker(props) {
    const [showModal, setShowModal] = useState(false);

    const { daysOfWeek } =  props
    const indexOfWeek = (day) => daysOfWeek?.indexOf(day)

    const handleClick = (day) => {
        const dayAdjusted = day === 0 ? 7 : day
        props.setSelectedDay(dayAdjusted);
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Select a Weekday</button>
            {showModal && (
                <div className="modal">
                    <h3>Select a day</h3>
                    {daysOfWeek?.map((day) => (
                        <button key={day} onClick={() => handleClick(indexOfWeek(day))}>
                            {day}
                        </button>
                    ))}
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default WeekdayPicker;