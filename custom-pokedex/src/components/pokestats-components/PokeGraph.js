import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export function PokeGraph(props) {
    const data = [
        {
            name: "HP",
            value: props.hp
        },
        {
            name: "Attack",
            value: props.attack
        },
        {
            name: "Defense",
            value: props.defense
        },
        {
            name: "Sp.Attack",
            value: props.spAttack
        },
        {
            name: "Sp.Defense",
            value: props.spDefense
        },
        {
            name: "Speed",
            value: props.speed
        }
    ]

    return (
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{fill:'white'}}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );

}
