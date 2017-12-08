import React, { Component } from 'react';
import AverageRow from './AverageRow.js';
import Row from './Row.js';
import '../App.css';

class TableComponent extends Component{
    render (){
        let Data =this.props.initialDataForTable;
        return(
            <table>
                <tbody>
                {
                    Data.arrayOfObjects.map((element, i) =>
                        <Row initialDataForTable={this.props.initialDataForTable}
                             i={i}
                             key={Data.arrayOfObjects[i][0].id}
                             illuminationTable={this.props.illuminationTable}
                             onCellClick={this.props.onCellClick}
                             onMouseOverCell={this.props.onMouseOverCell}
                             getPercent={this.props.getPercent}
                             onMouseOutCell={this.props.onMouseOutCell}
                             onMouseOverSumBlock={this.props.onMouseOverSumBlock}
                             onMouseOutSumBlock={this.props.onMouseOutSumBlock}/>
                    )
                }
                <AverageRow initialDataForTable={Data}/>
                </tbody>
            </table>
        );
    }
}
export default TableComponent;
