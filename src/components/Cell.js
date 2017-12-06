import React, { Component } from 'react';
import '../App.css';

class Cell extends Component{
    shouldComponentUpdate() {
        return false;
    }

    render (){
        let Data =this.props.initialDataForTable;
        return(
            <td key={Data.arrayOfObjects[this.props.i][this.props.j].id}
                id={Data.arrayOfObjects[this.props.i][this.props.j].id}
                style={{background: this.props.illuminationTable(this.props.i,this.props.j)}}
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