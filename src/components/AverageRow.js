import React, { Component } from 'react';
import '../App.css';

class AverageRow extends Component{
    render (){
        return(
            <tr>
                {
                    this.props.initialDataForTable.arrayForAverageBlock.map((element, i)=>
                        <td key={i}>
                            {this.props.initialDataForTable.arrayForAverageBlock[i]}
                        </td>
                    )
                }
            </tr>
        );
    }
}
export default AverageRow;