import React from 'react';

const Report = (props) => {
    
    return (
        <div>
            <h3>{props.title}</h3>
            <table>
                <tr>
                    <th>Instrument</th>
                    <th>Average buy</th>
                    <th>Average sell</th>
                </tr>
            </table>
        </div>
    );
};

export default Report;