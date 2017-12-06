import React, { Component } from 'react';
import '../App.css';
import Cell from './Cell.js';

class Row extends Component{

    render (){
        let Data =this.props.initialDataForTable;
        return(
            <tr key={Data.arrayOfObjects[this.props.i][0].id}>{
                Data.arrayOfObjects[this.props.i].map((element, j)=>
                    <Cell initialDataForTable={this.props.initialDataForTable}
                          key={Data.arrayOfObjects[this.props.i][j].id}
                          illuminationTable={this.props.illuminationTable}
                          onCellClick={this.props.onCellClick}
                          onMouseOverCell={this.props.onMouseOverCell}
                          getPercent={this.props.getPercent}
                          onMouseOutCell={this.props.onMouseOutCell}
                          i={this.props.i}
                          j={j}/>

                )
            }
            </tr>
        );
    }
}
export default Row;