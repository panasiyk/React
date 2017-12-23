import React, { Component } from 'react';
import '../App.css';

class Cell extends Component{
    prevAmount;
    shouldComponentUpdate(nextProps) {
        return !(this.prevAmount === nextProps.getPercent(this.props.i, this.props.j) &&
            (nextProps.cellsColor === this.props.cellsColor));

    }

    render (){
        this.prevAmount = this.props.getPercent(this.props.i,this.props.j);
        let Data =this.props.initialDataForTable;
        return(
            <td key={Data.arrayOfObjects[this.props.i][this.props.j].id}
                id={Data.arrayOfObjects[this.props.i][this.props.j].id}
                style={{background: this.props.cellsColor}}
                onClick={(e)=>this.props.onCellClick(e,this.props.i,this.props.j)}
                onMouseOver={(e)=>this.props.onMouseOverCell(e,this.props.i,this.props.j)}
            >
                {
                    this.props.getPercent(this.props.i,this.props.j)
                }
            </td>
        );
    }
}
export default Cell;