import React, { PureComponent } from 'react';
import '../App.css';

class AverageRow extends PureComponent{
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