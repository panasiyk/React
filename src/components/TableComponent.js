import React, { Component } from 'react';
import AverageRow from './AverageRow.js';
import '../App.css';

class TableComponent extends Component{
    render (){
        let Data =this.props.initialDataForTable;
        return(
            <table>
                <tbody>
                {
                    Data.arrayOfObjects.map((element, i) =>
                        <tr key={i}>{
                            Data.arrayOfObjects[i].map((element, j)=>
                                <td key={Data.arrayOfObjects[i][j].id}
                                    id={Data.arrayOfObjects[i][j].id}
                                    style={{background: this.props.illuminationTable(i,j)}}
                                    onClick={(e)=>this.props.onCellClick(e,i,j)}
                                    onMouseOver={(e)=>this.props.onMouseOverCell(e,i,j)}
                                    onMouseOut={this.props.onMouseOutCell}
                                >
                                    {
                                        this.props.getPercent(i,j)
                                    }
                                </td>
                            )
                        }
                            <td key={i}
                                onMouseOver={(e)=>this.props.onMouseOverSumBlock(e,i)}
                                onMouseOut={this.props.onMouseOutSumBlock}>
                                {Data.arrayForSumBlock[i]}
                            </td>
                        </tr>)
                }
                <AverageRow initialDataForTable={Data}/>
                </tbody>
            </table>
        );
    }
}
export default TableComponent;