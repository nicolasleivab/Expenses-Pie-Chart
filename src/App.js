import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer} from 'recharts';
import SimpleSelect from './Dropdown';
import { StylesProvider } from '@material-ui/core';
import styles from './App.module.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF8077', '#FF2422'];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`$${value}K`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


export default class Example extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

    state = {
        activeIndex: 0,
        title: 'Yearly Expense Chart',
        data: [
            { name: 'Groceries', value: 25 },
            { name: 'Finance & Insurance', value: 27 },
            { name: 'Personal & Medical', value: 37 },
            { name: 'House & Utilities', value: 84 },
            { name: 'Transport', value: 13 },
            { name: 'Others', value: 15 },
        ]
    };

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    dataHandler2017 = () =>{
        const data2017 = [
            { name: 'Groceries', value: 55 },
            { name: 'Finance & Insurance', value: 77 },
            { name: 'Personal & Medical', value: 17 },
            { name: 'House & Utilities', value: 34 },
            { name: 'Transport', value: 16 },
            { name: 'Others', value: 22 },
        ];
        this.setState({
            data: data2017
        })
    }
    dataHandler2018 = () => {
        const data2018 = [
            { name: 'Groceries', value: 11 },
            { name: 'Finance & Insurance', value: 12 },
            { name: 'Personal & Medical', value: 107 },
            { name: 'House & Utilities', value: 54 },
            { name: 'Transport', value: 20 },
            { name: 'Others', value: 5 },
        ];
        this.setState({
            data: data2018
        })
    }
    dataHandler2019 = () => {
        const data2019 = [
            { name: 'Groceries', value: 45 },
            { name: 'Finance & Insurance', value: 35 },
            { name: 'Personal & Medical', value: 21 },
            { name: 'House & Utilities', value: 122 },
            { name: 'Transport', value: 7 },
            { name: 'Others', value: 33 },
        ];
        this.setState({
            data: data2019
        })
    }
    dataHandler2020 = () => {
        const data2020 = [
            { name: 'Groceries', value: 25 },
            { name: 'Finance & Insurance', value: 27 },
            { name: 'Personal & Medical', value: 37 },
            { name: 'House & Utilities', value: 84 },
            { name: 'Transport', value: 13 },
            { name: 'Others', value: 15 },
        ];
        this.setState({
            data: data2020
        })
    }

    render() {
        return (
        <div>
        <div className={styles.wrapper}>
        <div>{this.state.title}</div>
        <div>
        <SimpleSelect 
            parentMethod2017={this.dataHandler2017}
            parentMethod2018={this.dataHandler2018}
            parentMethod2019={this.dataHandler2019}
            parentMethod2020={this.dataHandler2020}
        />
        </div>
        </div>
        <ResponsiveContainer width="100%" height={700}>
            <PieChart>
                <Pie
                    activeIndex={this.state.activeIndex}
                    activeShape={renderActiveShape}
                    data={this.state.data}
                    cx={'50%'}
                    cy={'40%'}
                    innerRadius={'35%'}
                    outerRadius={'50%'}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={this.onPieEnter}
                >
                    {
                        this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        );
    }
}
