import React, { useState } from 'react';
import './calculator.css';
import Button from '../components/button';
import Display from '../components/display';

function Calculator() {
    const [operation, setOperation] = useState(null);
    const [displayValue, setDisplayValue] = useState('0');
    const [clearDisplay, setClearDisplay] = useState(false);
    const [values, setValues] = useState([0, 0]); 
    const [current, setCurrent] = useState(0);

    const clearMemory = () => {
        setDisplayValue('0');
        setOperation(null);
        setValues([0, 0]);
        setCurrent(0);
        setClearDisplay(false);
    };

    const safeCalculate = (a, b, op) => {
        const precision = 100;
        const aInt = Math.round(a * precision);
        const bInt = Math.round(b * precision);
        
        switch(op) {
            case '+': return (aInt + bInt) / precision;
            case '-': return (aInt - bInt) / precision;
            case '*': return (aInt * bInt) / (precision * precision);
            case '/': return aInt / bInt;
            default: return b;
        }
    };

    const calculateResult = () => {
        const [a, b] = values;
        const result = safeCalculate(a, b, operation);
        
        return parseFloat(result.toFixed(8));
    };

    const handleOperation = (op) => {
        if (current === 0) {
            setCurrent(1);
            setClearDisplay(true);
        } else {
            const result = calculateResult();
            setDisplayValue(result.toString());
            setValues([result, 0]);
            setClearDisplay(true);
        }
        setOperation(op);
    };

    const addDigit = (n) => {
        if (n === '.' && displayValue.includes('.')) return;

        const newDisplayValue = (clearDisplay || displayValue === '0') 
            ? (n === '.' ? '0.' : n.toString()) 
            : displayValue + n.toString();
        
        setDisplayValue(newDisplayValue);
        setClearDisplay(false);

        if (n !== '.') {
            const newValue = parseFloat(newDisplayValue);
            setValues(prevValues => {
                const newValues = [...prevValues];
                newValues[current] = newValue;
                return newValues;
            });
        }
    };

    return (
        <div className='calculator'>
            <Display value={displayValue} />
            <Button label='AC' click={clearMemory} col3 />
            <Button label='/' click={handleOperation} operation />
            <Button label='7' click={() => addDigit('7')} />
            <Button label='8' click={() => addDigit('8')} />
            <Button label='9' click={() => addDigit('9')} />
            <Button label='*' click={handleOperation} operation />
            <Button label='4' click={() => addDigit('4')} />
            <Button label='5' click={() => addDigit('5')} />
            <Button label='6' click={() => addDigit('6')} />
            <Button label='-' click={handleOperation} operation/>
            <Button label='1' click={() => addDigit('1')} />
            <Button label='2' click={() => addDigit('2')} />
            <Button label='3' click={() => addDigit('3')} />
            <Button label='+' click={handleOperation} operation />
            <Button label='0' click={() => addDigit('0')} col2/>
            <Button label='.' click={() => addDigit('.')} />
            <Button label='=' click={handleOperation} operation />
        </div>
    );
}

export default Calculator;