import React, { Component } from 'react';
import '../App.css';

class Cell extends Component{
    shouldComponentUpdate(nextProps) {
        return nextProps.arrayOfColorsForillumination !== this.props.arrayOfColorsForillumination;
    }

    render (){
        let Data =this.props.initialDataForTable;
        return(
            <td key={Data.arrayOfObjects[this.props.i][this.props.j].id}
                id={Data.arrayOfObjects[this.props.i][this.props.j].id}
                style={{background: this.props.arrayOfColorsForillumination}}

                onClick={(e)=>this.props.onCellClick(e,this.props.i,this.props.j)}
                onMouseOver={(e)=>this.props.onMouseOverCell(e,this.props.i,this.props.j)}
                onMouseOut={this.props.onMouseOutCell}
            >
                {
                    this.props.getPercent(this.props.i,this.props.j)
                }
            </td>
        );
    }
}
export default Cell;