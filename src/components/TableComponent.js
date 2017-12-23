import React, { Component } from 'react';
import AverageRow from './AverageRow.js';
import Row from './Row.js';
import '../App.css';

class TableComponent extends Component{
    render (){
        let Data =this.props.initialDataForTable;
        return(
            <table onMouseLeave={this.props.onMouseOutCell}>
                <tbody>
                {
                    Data.arrayOfObjects.map((element, i) =>
                        <Row i={i}
                             initialDataForTable={this.props.initialDataForTable}
                             onMouseOverSumBlock={this.props.onMouseOverSumBlock}
                             key={Data.arrayOfObjects[i][0].id}
                             onCellClick={this.props.onCellClick}
                             onMouseOverCell={this.props.onMouseOverCell}
                             getPercent={this.props.getPercent}
                             arrayOfColorsForillumination={this.props.arrayOfColorsForillumination}
                             onMouseOutSumBlock={this.props.onMouseOutSumBlock}
                             cache={this.props.cache[i]}
                        />

                    )
                }
                <AverageRow initialDataForTable={Data}
                            onMouseOutCell={this.props.onMouseOutCell}
                />
                </tbody>
            </table>
        );
    }
}
export default TableComponent;
