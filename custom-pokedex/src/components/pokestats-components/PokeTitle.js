import React from 'react';

export function PokeTitle(props) {

    return (
        <div className="name">
            <h1>{props.data.name.toUpperCase()}</h1>
            <h1 className="id">#{props.data.number}</h1>
        </div>
    );
}