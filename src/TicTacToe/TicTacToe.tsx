import './ticTacToe.css';
import { useState } from 'react';

type cellProps = {
    num: number;
};

type Combo = number[];

type Combos = {
    horizontal: Combo[];
    vertical: Combo[];
    diagonal: Combo[];
};

const TicTacToe = () => {
    const [turn, setTurn] = useState<string>('X');
    const [winner, setWinner] = useState<string | undefined>(undefined);
    const [cells, setCells] = useState<string[]>(Array(9).fill(''));
    const [isDraw, setIsDraw] = useState<boolean>(false);

    const handleReset = () => {
        setCells(Array(9).fill(''));
        setWinner(undefined);
        setTurn('X');
        setIsDraw(false);
    };

    const checkWinner = (arr: string[]) => {
        let combos: Combos = {
            horizontal: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            vertical: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        };
        for (let combo in combos) {
            const patterns = combos[combo as keyof Combos];

            patterns.forEach(pattern => {
                if (
                    arr[pattern[0]] === '' ||
                    arr[pattern[1]] === '' ||
                    arr[pattern[2]] === ''
                ) {
                } else if (
                    arr[pattern[0]] === arr[pattern[1]] &&
                    arr[pattern[1]] === arr[pattern[2]]
                ) {
                    setWinner(arr[pattern[0]]);
                }
            });
        }
    };

    const handleClick = (num: number) => {
        if (winner || cells[num] !== '') return;

        let arr = [...cells];

        if (turn === 'X') {
            arr[num] = 'X';
            setTurn('O');
        } else {
            arr[num] = 'O';
            setTurn('X');
        }

        checkWinner(arr);
        setCells(arr);
        if (!arr.includes('') && !winner) {
            setIsDraw(true);
        }
    };

    const Cell = ({ num }: cellProps) => {
        const cellValue = cells[num];
        const cellClassName = cellValue ? `cell cell-${cellValue}` : 'cell';

        return (
            <>
                <td className={cellClassName} onClick={() => handleClick(num)}>
                    {cellValue}
                </td>
            </>
        );
    };

    return (
        <>
            <h1>Tic Tac Toe</h1>
            <div className={`${winner || isDraw ? 'show' : ''}`}>
                {winner ? `winner is ${winner}` : isDraw ? "It's a draw" : ''}
            </div>
            <table>
                <tbody>
                    <tr>
                        <Cell num={0} />
                        <Cell num={1} />
                        <Cell num={2} />
                    </tr>
                    <tr>
                        <Cell num={3} />
                        <Cell num={4} />
                        <Cell num={5} />
                    </tr>
                    <tr>
                        <Cell num={6} />
                        <Cell num={7} />
                        <Cell num={8} />
                    </tr>
                </tbody>
            </table>
            <button className='reset-btn' onClick={handleReset}>
                Reset
            </button>
        </>
    );
};

export default TicTacToe;
