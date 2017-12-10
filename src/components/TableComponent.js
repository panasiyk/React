import React, { Component } from 'react';
import AverageRow from './AverageRow.js';
import Cell from './Cell.js';
import SumCell from './SumCell.js';
import '../App.css';

class TableComponent extends Component{
    render (){
        let Data =this.props.initialDataForTable;
        return(
            <table onMouseLeave={this.props.onMouseOutCell}>
                <tbody>
                {
                    Data.arrayOfObjects.map((element, i) =>
                    <tr key={Data.arrayOfObjects[i][0].id}>{
                    Data.arrayOfObjects[i].map((element, j)=>
                        <Cell initialDataForTable={this.props.initialDataForTable}
                              key={Data.arrayOfObjects[i][j].id}
                              onCellClick={this.props.onCellClick}
                              onMouseOverCell={this.props.onMouseOverCell}
                              getPercent={this.props.getPercent}
                              arrayOfColorsForillumination={this.props.arrayOfColorsForillumination[i][j]}
                              i={i}
                              j={j}/>

                    )
                }
                    <SumCell key={Data.arrayOfObjects[i][0].id}
                    onMouseOverSumBlock={this.props.onMouseOverSumBlock}
                    initialDataForTable={this.props.initialDataForTable}
                    i={i}/>
                    </tr>


                    )
                }
                <AverageRow initialDataForTable={Data}
                            onMouseOutCell={this.props.onMouseOutCell}/>
                </tbody>
            </table>
        );
    }
}
export default TableComponent;
